

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,  DialogTitle } from "../ui/dialog";
import { ModalCustomInterface} from "./type";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Save } from "lucide-react";
import { ContentFieldForm } from "./fields/content-field-form";
import { ContentFieldTabsForm, ContentFieldTabsFormOnly } from "./fields/content-field-tabs";




export function ModalByConfig ({
        title,
        description,
        open,
        setOpen,
        contentType,
        contentFields,
        currentData,
        mode,
        setCurrentData,
        onAdd,
        onUpdate,
        onDelete,
        messageDelete,
        contentTabHeaders,
        contentTabHeadersOnly,
        className,
        polymorphicFields,
        closeOnOutsideClick=true,
        interactiveField

    }: ModalCustomInterface){
        
        const tagsKeysPolymorphic = polymorphicFields?.filter(s=>s.relation_type !== currentData?.[s.keyRef]).map(m=>m.keyFields).flat(1);
        const fieldByPolymorphic = contentFields.filter(s=> !tagsKeysPolymorphic?.includes(s.key));
        const fieldInteractiveMap = interactiveField?.map(s=>s.fieldKeyHasInteractive);
        const fieldWithActionInteractive = fieldByPolymorphic.map(s=> (fieldInteractiveMap?.includes(s.key))?({...s, action: interactiveField?.find(m=>m.fieldKeyHasInteractive === s.key)?.action}):({...s}))

        
        const [shake, setShake] = useState("");
    return (
        <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent 
                    onPointerDownOutside={(e) => {
                        if (!closeOnOutsideClick) {
                            e.preventDefault();
                            setShake("scale-105");
                            setTimeout(() => setShake(""), 300)
                        }
                    }}
                    onEscapeKeyDown={(e) => {
                        if (!closeOnOutsideClick) {
                            e.preventDefault()
                        }
                    }}
                    className={cn("p-0 flex flex-col gap-2 overflow-y-auto outline-0 ring-0 border-0 min-h-96 translate-y-0 top-[5%] dark:bg-gray-600 transition-all duration-500", className,shake)}>
                    <DialogHeader className="bg-sky-300 p-2 max-h-16">
                        <DialogTitle>{title.toUpperCase()}</DialogTitle>
                            <DialogDescription className="text-indigo-600">
                                {description}
                            </DialogDescription>
                    </DialogHeader>
                    <div className="h-96 rounded-md p-4 overflow-y-auto">
                        <ContentTypeTemplateSwitch
                                contentType={contentType}
                                contentFields={fieldWithActionInteractive}
                                currentData={currentData}
                                mode={mode}
                                setCurrentData={setCurrentData}
                                onAdd={onAdd}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                                messageDelete={messageDelete}
                                contentTabHeaders={contentTabHeaders}
                                contentTabHeadersOnly={contentTabHeadersOnly}
                                interactiveField = {interactiveField}
                                />
                    </div>
                        {
                            ((contentType === 'tabs-form'||contentType === 'tabs-form-only') && mode !== 'delete' ) && (
                                    <DialogFooter className="py-3 bg-sky-300 relative  justify-center">
                                        {mode==='add' && onAdd && <button onClick={onAdd} type='button' className="border-1 rounded-4xl px-2 py-0 w-fit mx-auto bg-green-400/80 ">Tambah</button>}
                                        {mode === 'edit' && onUpdate && <button onClick={onUpdate} type='button' className="rounded-lg relative w-36 h-8 cursor-pointer flex items-center border border-sky-500 bg-sky-500 group hover:bg-sky-500 active:bg-sky-500 active:border-green-500 mx-auto">
                                            <span className="text-gray-200 font-semibold ml-4 transform group-hover:translate-x-10 transition-all duration-300">Update</span>
                                            <Save className="absolute right-0 h-full w-10 text-white rounded-lg bg-sky-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300"/>
                                        </button> }
                                    </DialogFooter>
                            )
                        }
                </DialogContent>
        </Dialog>
    )
}

function ContentTypeTemplateSwitch({
        contentType,
        contentFields,
        currentData,
        mode,
        setCurrentData,
        onAdd,
        onUpdate,
        onDelete,
        messageDelete,
        contentTabHeaders,
        contentTabHeadersOnly
    }:Partial<ModalCustomInterface>){
        switch(contentType){
            case 'form':
                return <ContentFieldForm 
                            contentFields={contentFields}
                            currentData={currentData}
                            mode={mode}
                            setCurrentData={setCurrentData}
                            onAdd={onAdd}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            messageDelete={messageDelete}
                            />
            case 'tabs-form':
                return <ContentFieldTabsForm
                            contentFields={contentFields}
                            currentData={currentData}
                            mode={mode}
                            setCurrentData={setCurrentData}
                            onAdd={onAdd}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            messageDelete={messageDelete}
                            contentTabHeaders ={contentTabHeaders}
                            />
            
            case 'tabs-form-only':
                return <ContentFieldTabsFormOnly
                            contentFields={contentFields}
                            currentData={currentData}
                            mode={mode}
                            setCurrentData={setCurrentData}
                            onAdd={onAdd}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            messageDelete={messageDelete}
                            contentTabHeaders ={contentTabHeaders}
                            contentTabHeadersOnly ={contentTabHeadersOnly}
                            />
            
            default:
                return null
        }
}
