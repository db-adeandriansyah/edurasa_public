import { ReactNode } from "react";
import { contentField } from "./type-fields";
import { crudAction } from "@/types";


export type typeFormModal = 'form'|'tabs-form'|'tabs-form-only';

export interface ModalCustomInterface{
    /** setting for Modal */
    title:string,
    // occasionally, title shouldBe translate by callback
    defineTitle?:(param?:string)=>string;
    // if you want add description
    description?:string;
    // if you want to set className on DialogContent;
    className?:string;
    // if you want to set disabled close when you click outside modal
    closeOnOutsideClick: boolean
    // controll show/hide modal
    open: boolean;
    setOpen: (open:boolean)=>void;

    /** setting for fields view in Modal */
    contentType: typeFormModal;
    contentFields: contentField[];

    /** layouting field on Tab Component*/
    layoutingTabs?: TabsField[];
    /** if contentType as 'tabs-form-only' this value on array will be rendered as real fielad form 
     *  and other just children
     */
    layoutingTabsOnly?:string[];

    /** polymorphic data 
     * if you have data wich has polymorphic by relation_type,
     * its should be rerendered by conditional
     * make sure data is object, do not use this if polymorphic has not.
    */
    polymorphicFields?:polymorphicField[]



    /** state data */
    currentData?:Record<string, any>;
    setCurrentData?:  React.Dispatch<React.SetStateAction<Record<string, any>>>
    
    /** interact with external data*/
    mode: crudAction;
    onUpdate?:()=>void;
    onDelete?:()=>void;
    onAdd?:()=>void;

    /** prompt when delete action */
    messageDelete?:ReactNode


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


export interface paramPaginationOnModal{
    page? : number,
    per_page? : number,
    search? : string
}