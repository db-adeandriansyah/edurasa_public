

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,  DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { contentField, groupContent, ModalCustomInterface, polymorphicField, TabsField } from "./type";
import { SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { PenLine } from "lucide-react";




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
        className,
        polymorphicFields,
        closeOnOutsideClick=true

    }: ModalCustomInterface){
        
        const tagsKeysPolymorphic = polymorphicFields?.filter(s=>s.relation_type !== currentData?.[s.keyRef]).map(m=>m.keyFields).flat(1);
        const fieldByPolymorphic = contentFields.filter(s=> !tagsKeysPolymorphic?.includes(s.key));
        
        const [shake, setShake] = useState("");
        
        console.log(currentData)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent 
                    // onPointerDownOutside={(e) => e.preventDefault()} 
                     // Hanya prevent close kalau `closeOnOutsideClick` = false
                    onPointerDownOutside={(e) => {
                    if (!closeOnOutsideClick) {
                        e.preventDefault();
                        setShake("scale-105");
                        setTimeout(() => setShake(""), 300)
                    }
                    }}
                    // Jika kamu ingin cegah ESC juga, bisa tambahkan ini:
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
                                contentFields={fieldByPolymorphic}
                                currentData={currentData}
                                mode={mode}
                                setCurrentData={setCurrentData}
                                onAdd={onAdd}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                                messageDelete={messageDelete}
                                contentTabHeaders={contentTabHeaders}
                                
                                />

                    </div>
                    {
                        (contentType === 'tabs-form' && mode !== 'delete' ) && (
                                <DialogFooter className="py-3 bg-sky-300 relative  justify-center">
                                    {mode==='add' && <button onClick={onAdd} type='button' className="border-1 rounded-4xl px-2 py-0 w-fit mx-auto bg-green-400/80 ">Tambah</button>}
                                    {mode === 'edit' && <button onClick={onUpdate} type='button' className="rounded-lg relative w-36 h-8 cursor-pointer flex items-center border border-sky-500 bg-sky-500 group hover:bg-sky-500 active:bg-sky-500 active:border-green-500 mx-auto">
                                        <span className="text-gray-200 font-semibold ml-4 transform group-hover:translate-x-10 transition-all duration-300">Update</span>
                                        <PenLine className="absolute right-0 h-full w-10 rounded-lg bg-sky-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300"/>
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
        contentTabHeaders
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
            
            default:
                return null
        }
}

function ContentFieldForm({
        contentFields,
        currentData,
        mode,
        setCurrentData,
        onAdd,
        onUpdate,
        onDelete,
        messageDelete,
        // handleInputChange
    }:Partial<ModalCustomInterface> ){

    return ( <div className="p-2 self-stretch">
                    { 
                        mode === 'delete'?(
                            <p>{messageDelete}</p>
                        ):(
                            contentFields && contentFields.map((field, index)=>{
                            return (
                                    <ResolveFieldByType key={index} type={field} currentData={currentData} setCurrentData={setCurrentData}/>
                                        // {/* {ResolveFieldByType(field,currentData as Record<string|number, any>,setCurrentData as React.Dispatch<SetStateAction<Record<string, any>>>)} */}
                                    
                                    )
                                }
                            )
                        )
                    }

                {
                    onAdd && (<button onClick={onAdd} type='button' className="border-1 rounded-4xl px-2 py-0 w-fit mx-auto bg-green-400/80 ">Tambah</button>)
                }
            </div>
        )
}

function ContentFieldTabsForm({
        contentFields,
        currentData,
        mode,
        setCurrentData,
        onAdd,
        onUpdate,
        onDelete,
        messageDelete,
        contentTabHeaders,
        // handleInputChange
    }:Partial<ModalCustomInterface> ){

    if(mode === 'delete'){
        return messageDelete
    }
    return (
        <Tabs defaultValue={contentTabHeaders?.[0].value} className="gap-0">
            <TabsList className="bg-sky-400 dark:bg-sky-700  rounded-b-none pb-0">
            {
                contentTabHeaders?.map((tab,index)=>
                    <TabsTrigger key={index} value={tab.value} className="rounded-b-none hover:bg-gray-200 duration-700 transition-colors dark:hover:text-black border-b-0 data-[state=active]:bg-sky-300 dark:data-[state=active]:bg-sky-600 dark:data-[state=active]:border-sky-400 dark:data-[state=active]:text-white">
                        {tab.label}
                    </TabsTrigger>
                )
            }
            </TabsList>
            {
                contentTabHeaders?.map((tabContent, index)=>
                    <TabsContent key={index} value={tabContent.value} className="border-t-2 rounded-3xl rounded-s-none pt-2 dark:border-sky-700">
                        <GroupContent groupContent={tabContent?.groupContents} contentFields={contentFields} currentData={currentData} setCurrentData={setCurrentData}/>
                    </TabsContent>
                )
            }

        </Tabs>
    )
}

function GroupContent({
        currentData,
        mode,
        setCurrentData,
        onAdd,
        onUpdate,
        onDelete,
        messageDelete,
    groupContent, 
    contentFields
    }: Partial<ModalCustomInterface> & {
        groupContent?: groupContent[], 
        
    }){
    
    
    return (
        <div className="flex px-2 justify-between gap-2  overflow-hidden">
            {
                groupContent && groupContent?.map((content, index)=>
                    <div key={index} className="w-full mx-auto">
                        {
                            content.isCard ?
                                <CardGroupContent 
                                    label={content.label}
                                    fieldGroupKey={content.fieldGroupKey}
                                    dataField={contentFields}
                                    currentData={currentData}
                                    setCurrentData={setCurrentData}

                                    />
                                : 
                                    contentFields && contentFields.filter(s=>content.fieldGroupKey.includes(s.key)).map((field, index)=>{
                                            return (
                                                    <ResolveFieldByType key={index} type={field} currentData={currentData} setCurrentData={setCurrentData}/>
                                                )
                                        })
                        }
                    </div>
                )
            }
        </div>
    )
}
function CardGroupContent({
        currentData,
        mode,
        setCurrentData,
        onAdd,
        onUpdate,
        onDelete,
        messageDelete,
        label,
        fieldGroupKey, 
        dataField
    }:  Partial<ModalCustomInterface> &{
        label: string,
        fieldGroupKey:string[],
        dataField?:contentField[]
    }){


    return (
        <Card className="flex flex-col gap-0 pt-0 pb-0 overflow-hidden rounded-t-2xl min-h-64  dark:bg-gray-400">
            <CardHeader className="bg-gray-300 dark:bg-gray-500 min-h-8">
                <CardTitle className="my-auto">
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {
                    dataField?.filter(s=>fieldGroupKey.includes(s.key)).map((field, key)=> 
                        <ResolveFieldByType key={key} type={field} currentData={currentData} setCurrentData={setCurrentData}/>
                    )   
                }
            </CardContent>
        </Card>
    );
}
function ResolveFieldByType({type,currentData,setCurrentData}:{type?:contentField, currentData?: Record<string | number, any>,setCurrentData?: React.Dispatch<SetStateAction<Record<string, any>>>}){
    //kode diambil dari: https://flowbite.com/docs/forms/floating-label/
    switch (type?.type){
        case 'text':
            return  <div className="relative my-3">
                        <input id={type.id as string} name={type.name} value={getValueByPath(currentData, type.key)??""} type={type.type}  onChange={(e) => setCurrentData?.({...currentData, ...setValueByPath(currentData, type.key, e.currentTarget.value)})} placeholder={type.placeholder} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  bg-white dark:bg-gray-700 peer"/>
                        <label htmlFor={type.id as string} className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-1 ps-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:w-64  peer-focus:w-auto peer-focus:top-2 peer-focus:left-1 peer-focus:ps-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{type.label}</label>
                    </div>
        case 'hidden':
            return <Input value={getValueByPath(currentData, type.key)??''} name={type.name} type={type.type}  onChange={(e) => setCurrentData?.({...currentData, ...setValueByPath(currentData, type.key, e.currentTarget.value)})}/>
        case 'select-one':
            return <ResolveSelectField type={type} currentData={currentData} setCurrentData={setCurrentData}/>;
        case 'description':
            return type.children
        default:
            return null;
    }
}

function ResolveSelectField({type, currentData, setCurrentData}:{type: contentField, currentData?:Record<string| number,  any>, setCurrentData?: React.Dispatch<SetStateAction<Record<string, any>>>}){
    
    
    return(
        <>
        <div className="relative my-3">
            <select 
                id={type.id as string} 
                name={type.name}
                value={getValueByPath(currentData, type.key)??""}
                onChange={(e) => setCurrentData?.({...currentData, ...setValueByPath(currentData, type.key, e.currentTarget.value)})}
                className="mb-2  bg-white dark:bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                {
                    ('options' in type)?(
                        type.options.map((opt,index)=>
                            <option key={index} selected={opt.selected} value={opt.value}>{opt.label}</option>
                        )

                    ):null
                }
            </select>
            <label htmlFor={type.id as string} className="absolute text-sm  bg-white   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{type.label}</label>
            
        </div>
        </>
    )
}

function getValueByPath(obj: any, path: string) {
    if(path==="") return "";
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}
function setValueByPath(obj: any, path: string, value: any): any {
    const keys = path.split('.');
    return keys.reduceRight((acc, key, idx) => {
        if (idx === keys.length - 1) {
        return { [key]: value };
        }
        return { [key]: { ...(getNested(obj, keys.slice(0, idx + 1)) || {}), ...acc } };
    }, {});
}

function getNested(obj: any, keys: string[]): any {
    return keys.reduce((acc, key) => acc?.[key], obj);
}

function getRelastionName(key:string, polymorphicField:polymorphicField[]){
    return polymorphicField?.find(s=>s.keyFields.includes(key))?.relation_type
}