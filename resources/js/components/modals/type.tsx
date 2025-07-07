
/**
 * Interface ini menentukan interface global modal secara umum
 * ini menentukan bentuk dari modal yang akan ditentukan di level atas, seperti:
 * file-file yang ada di directory: js/pages/* .tsx
 */

import { crudAction } from "@/types";
import React from "react";

export type contentField = FieldInputText | 
                    FieldInputNumber |
                    FieldInputTextArea |
                    FieldInputHidden |
                    FieldSelectOne |
                    FieldDescription
                    ;
export interface ModalCustomInterface{
    //title dan description bisa ditimpa saat pembuatan props atau tipe modal
    title: string;
    description?: string;
    // trigger saat modal open/close;
    open:boolean;
    setOpen:(open:boolean)=>void;
    // contentType sifatnya wajib, karena ini akan menentukan konten modal di komponen <DialogContent>
    contentType: 'form'|'html'|'tabs-form';
    contentFields: contentField[];
    contentTabHeaders?:TabsField[];
    currentData?:Record<string|number, any>;
    setCurrentData?:  React.Dispatch<React.SetStateAction<Record<string, any>>>
    mode: crudAction;
    onUpdate?:()=>void;
    onDelete?:()=>void;
    onAdd?:()=>void;
    className?:string;
    messageDelete?:string
    polymorphicFields?:polymorphicField[];
    closeOnOutsideClick:boolean
}
interface baseField{
    id: string|number // kadang id dari db itu uuid, jadi string dipake
    key: string
    name: string;
    label: string;
    type: string;
    placeholder: string;
    autocomplete?: string;
    tabIndex?: number;
    autoFocus?: boolean;
    accept?: string;
    className?: string;
    groupTabs?:string
    
}

export interface FieldInputText extends Omit<baseField,'accept'>{
    type:'text'
    value: string
    onChange:(value:string)=>void
}
export interface FieldInputHidden extends Omit<baseField,'accept'>{
    type:'hidden';
    value: string|number
    onChange:(value:string)=>void
}
export interface FieldInputNumber extends Omit<baseField,'accept'>{
    type:'number'
    value: number
    min:number;
    max:number;
    onChange:(value:string)=>void
}
export interface FieldInputTextArea extends Omit<baseField,'accept'>{
    type:'textarea'
    value: string 
    onChange:(value:string)=>void
}
export interface OptionField{
    value:string|number;
    label:string;
    disabled?:boolean
    selected?:boolean
}
export interface FieldSelectOne extends Omit<baseField, 'accent'>{
    type: 'select-one'
    value:string|number
    multiple?: false;
    onChange:(value:string|number)=>void
    options: OptionField[];
}
export interface FieldDescription{
    id: string
    key:string
    label?:string
    name?:string
    type : 'description'
    showIf?:string
    children: React.ReactNode
}

export interface TabsField{
    value: string
    label: string;
    groupContents?:groupContent[]
}
export interface groupContent{
    isCard: boolean
    label: string
    fieldGroupKey:string[]
}
export interface polymorphicField{
    relation_type: string;
    keyFields: string[],
    keyRef: string
}