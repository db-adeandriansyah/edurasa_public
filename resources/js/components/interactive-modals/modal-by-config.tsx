import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { ModalCustomInterface } from "./interfaces/type";
import { useState } from "react";
import { ContentFieldForm } from "./fields/content-field-form";
import ContentFieldTabsForm, { ContentFieldTabsFormOnly } from "./fields/content-field-tabs";

export default function ModalByConfig({
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
        layoutingTabs,
        layoutingTabsOnly,
        className,
        polymorphicFields,
        closeOnOutsideClick=true,
        
    }:ModalCustomInterface){

        const tagsKeysPolymorphic = polymorphicFields?.filter(s=>s.relation_type !== currentData?.[s.keyRef]).map(m=>m.keyFields).flat(1);
        const fieldByPolymorphic = contentFields.filter(s=> !tagsKeysPolymorphic?.includes(s.key));
        
        const [shake, setShake] = useState("");

        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent 
                    onPointerDownOutside={(e) => {
                        if (!closeOnOutsideClick) {
                            e.preventDefault();
                            setShake("scale-105");
                            setTimeout(() => setShake(""), 150)
                        }
                    }}
                    onEscapeKeyDown={(e) => {
                        if (!closeOnOutsideClick) {
                            e.preventDefault()
                        }
                    }}
                    className={cn("p-0 flex flex-col gap-2 overflow-y-auto outline-0 ring-0 border-0 min-h-96 translate-y-0 top-[5%] dark:bg-gray-600 transition-all duration-500", className,shake)}>
                    <DialogHeader className="bg-sky-300 p-2 max-h-16">
                        <DialogTitle className="truncate">{title.toUpperCase()}</DialogTitle>
                            <DialogDescription className="text-indigo-600">
                                {description}
                            </DialogDescription>
                    </DialogHeader>
                    
                    <div className="h-96 rounded-md p-4 overflow-y-auto">
                        <ContentTypeTemplateSwitch
                                contentType={contentType}
                                contentFields={fieldByPolymorphic}
                                currentData={currentData}
                                mode={mode}
                                setCurrentData={setCurrentData}
                                // onAdd={onAdd}
                                // onUpdate={onUpdate}
                                // onDelete={onDelete}
                                messageDelete={messageDelete}
                                layoutingTabs={layoutingTabs}
                                layoutingTabsOnly={layoutingTabsOnly}
                                />
                    </div>
                    <DialogFooter className="bg-sky-300 flex-col sm:justify-center [&>button]:mt-3 [&>button]:mb-4">
                        {
                            (mode === 'add' && onAdd) && (
                                <button onClick={onAdd} className="inline-flex mx-auto w-fit items-center justify-center px-4 py-2 bg-blue-600 ease-in-out delay-75 hover:bg-blue-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 active:scale-95 transition-all duration-200">Simpan</button>
                            )
                        }
                        {
                            (mode === 'edit' && onUpdate) && (
                                <button onClick={onUpdate} className="inline-flex mx-auto w-fit items-center justify-center px-4 py-2 bg-blue-600 ease-in-out delay-75 hover:bg-blue-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 active:scale-95 transition-all duration-200">Simpan Perubahan</button>
                            )
                        }
                        {
                            (mode === 'delete' && onDelete) && (
                                <button onClick={onDelete} className="inline-flex mx-auto w-fit items-center justify-center px-4 py-2 bg-blue-600 ease-in-out delay-75 hover:bg-blue-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 active:scale-95 transition-all duration-200">Hapus</button>
                            )
                        }
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
};

function ContentTypeTemplateSwitch({
        contentType,
        contentFields,
        currentData,
        mode,
        setCurrentData,
        // onAdd,
        // onUpdate,
        // onDelete,
        layoutingTabs,
        layoutingTabsOnly,
        messageDelete
    }:Partial<ModalCustomInterface>){
        switch(contentType){
            case 'form':
                return <ContentFieldForm 
                            contentFields={contentFields}
                            currentData={currentData}
                            mode={mode}
                            setCurrentData={setCurrentData}
                            // onAdd={onAdd}
                            // onUpdate={onUpdate}
                            // onDelete={onDelete}
                            messageDelete={messageDelete}
                            />
            case 'tabs-form':
                return <ContentFieldTabsForm
                            contentFields={contentFields}
                            currentData={currentData}
                            mode={mode}
                            setCurrentData={setCurrentData}
                            // onAdd={onAdd}
                            // onUpdate={onUpdate}
                            // onDelete={onDelete}
                            messageDelete={messageDelete}
                            layoutingTabs={layoutingTabs}
                            />
            case 'tabs-form-only':
                return <ContentFieldTabsFormOnly
                            contentFields={contentFields}
                            currentData={currentData}
                            mode={mode}
                            setCurrentData={setCurrentData}
                            // onAdd={onAdd}
                            // onUpdate={onUpdate}
                            // onDelete={onDelete}
                            messageDelete={messageDelete}
                            layoutingTabs={layoutingTabs}
                            layoutingTabsOnly={layoutingTabsOnly}
                            />
            default:
                return null
        }
}