import { crudAction } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "@headlessui/react";
import { useState } from "react";


interface AddButtonProps {
    id: string;
    label: string;
    className: string;
    icon: string;
    type: 'button' | 'submit' | 'reset' | undefined;
    variant: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | undefined;
}

interface FieldProps {
    id: string;
    key: string;
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    autocomplete?: string;
    tabIndex: number;
    autoFocus?: boolean;
    rows?: number;
    accept?: string;
    className?: string;
}

interface ButtonProps {
    key: string;
    type: 'button' | 'submit' | 'reset' | undefined;
    label: string;
    variant: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | undefined;
    className: string;
}

interface CustomModalFormProps {
    addButton?: AddButtonProps;
    title: string;
    description: string;
    fields: FieldProps[];
    buttons: ButtonProps[];
    data: Record<string, any>;
    setData: (name: string, value: any) => void;
    errors: Record<string, string>;
    processing: boolean;
    handleSubmit: (data: any) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: 'create' | 'view' | 'edit';
    previewImage?: string | null;
}


interface ModalInTablePaginationProps{
    title : string;
    stateOpen:boolean;
    onStateOpen:(stateOpen:boolean)=>void;
    onEdit?:()=>void;
    mode?: crudAction;
    fieldsInput:FieldProps[];
    data: Record<string,any>
    setData:React.Dispatch<React.SetStateAction<Record<string,any>>>
    
}
function ModalInTablePagination({
    title = 'label',
    stateOpen,
    onStateOpen,
    onEdit,
    fieldsInput,
    mode,
    data,
    setData,
}:ModalInTablePaginationProps){
    
    
    return(
        <Dialog open={stateOpen} onOpenChange={onStateOpen}>
            <DialogContent onPointerDownOutside={(e) => e.preventDefault()}  className="p-0 overflow-hidden outline-0 ring-0 border-0">
                <DialogHeader className="bg-sky-400 p-2">
                    <DialogTitle>{title.toUpperCase()}</DialogTitle>
                        <DialogDescription>
                            Anyone who has this link will be able to view this. 
                        </DialogDescription>
                </DialogHeader>
                <div className="p-5">
                    {
                        fieldsInput && fieldsInput.map((field, index)=>{
                            return <div key={field.key} className="grid gap-2">
                                    <Label htmlFor={field.id}>{field.label}</Label>

                                    <Input
                                        id={field.id}
                                        name={field.name}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        autoComplete={field.autocomplete}
                                        tabIndex={field.tabIndex}
                                        autoFocus={field.autoFocus}
                                        onChange={(e) => setData({...data, [field.key]:e.currentTarget.value})}
                                        value={data?.[field.key] || ''}
                                        // disabled={processing || mode === 'view'}
                                    />
                                    </div>
                        })
                    }

                </div>
                {
                    mode==='edit' && (
                        <Button onClick={()=>{onEdit?.(),onStateOpen(!stateOpen)}}>{mode}</Button>
                    )
                }
            </DialogContent>
        </Dialog>
    )
}
export {
    ModalInTablePagination,
    type FieldProps
}