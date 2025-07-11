
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
                    FieldDescription |
                    FieldComboBox |
                    FieldTimeline 
                    ;
export interface ModalCustomInterface{
    //title dan description bisa ditimpa saat pembuatan props atau tipe modal
    title: string;
    description?: string;
    // trigger saat modal open/close;
    open:boolean;
    setOpen:(open:boolean)=>void;
    // contentType sifatnya wajib, karena ini akan menentukan konten modal di komponen <DialogContent>
    contentType: 'form'|'tabs-form'|'tabs-form-only';
    // semua field-field diisi disini
    contentFields: contentField[];
    // jika field dibuat 'tabs-form', maka mengikuti konfigurasi ini:
    contentTabHeaders?:TabsField[];
    // jika field dibuat 'tabs-form-only', maka seluruh 'tabs-form' dibuat text/children selain nilai key 
    // yang diatur di sini:
    contentTabHeadersOnly?:string[];
    // setter state (useState) untuk mengupdate data yang ada di form modal;
    currentData?:Record<string|number, any>;
    setCurrentData?:  React.Dispatch<React.SetStateAction<Record<string, any>>>
    
    mode: crudAction;
    onUpdate?:()=>void;
    onDelete?:()=>void;
    onAdd?:()=>void;
    
    className?:string;
    messageDelete?:string
    
    polymorphicFields?:polymorphicField[];
    
    closeOnOutsideClick: boolean

    interactiveField?:FieldInteractive[]
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
    // groupTabs?:string
    
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
export interface RadioField{
    id:string;
    value:string;
    name:string;
    label:string;
    disabled?:boolean
    checked?:boolean
}

export interface FieldSelectOne extends Omit<baseField, 'accent'>{
    type: 'select-one'
    value:string|number
    multiple?: false;
    onChange:(value:string|number)=>void
    options: OptionField[];
    action?:ActionFieldInteractive[];
}

export interface FieldComboBox extends Omit<baseField, 'accent'>{
    type: 'combobox';
    refKey:string
    value?:string|number
    onChange:(value:string|number)=>void
    lists: RadioField[];
    action?:ActionFieldInteractive[];
}

export interface FieldDescription{
    id: string
    key:string
    label?:string
    name?:string
    type : 'description'
    children: React.ReactNode
}

export interface FieldTimeline{
    id: string
    key:string
    label?:string
    name?:string
    type : 'timeline'
    list?:ListFieldItem;
}

export interface ListFieldItem{
    key_time:string;
    key_description:string;
    key_badge:string
    [key: string]: any;
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

export interface FieldInteractive{
    fieldKeyHasInteractive: string;
    // proposalKeyAction:string[]
    action: ActionFieldInteractive[]
}

export interface ActionFieldInteractive{
    fieldValue:string;
    resultThruthly: contentField[]|undefined
    levelComponent?:'single'|'card'
}