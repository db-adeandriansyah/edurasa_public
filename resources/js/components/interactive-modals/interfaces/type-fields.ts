import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export type contentField =  /** field inputing value -->*/ FieldInputText | FieldInputNumber | FieldInputNumber | FieldInputHidden |
                            FieldInputPassword |
                            // field authentication:

                            // field select date or date-time, no have actions
                            FieldInputDate |FieldInputDateTime | 

                            // field single selection or multiple selection
                            // fields has action if needed:
                            FieldRadio | FieldCheckBox | FieldSelection | 

                            // component not field to add description or another views
                            FieldChild | FieldTimeLine |
                            // component search
                            FieldSearch;

interface baseField{
    id:string;
    /** this key will be used when getValue for external, or attribute will send to external */
    key: string;
    /** type of Component Field, not only type of form input and maybe not */
    type:string;
}

export interface FieldInputHidden extends baseField{
    type:'hidden'
    label?:string
    value?:string
    name?:string
    onChange?:(value:string)=>void
    placeholder?: string;
    autocomplete?: string;
    tabIndex?: number;
    autoFocus?: boolean;
    className?: string;
    needEffect?:boolean
}

export interface FieldInputText extends baseField{
    type:'text'
    label?:string
    value?:string
    name?:string
    onChange?:(value:string)=>void
    placeholder?: string;
    autocomplete?: string;
    tabIndex?: number;
    autoFocus?: boolean;
    className?: string;
}

export interface FieldInputPassword extends baseField{
    type:'password'
    label?:string
    value?:string
    name?:string
    onChange?:(value:string)=>void
    placeholder?: string;
    autocomplete?: string;
    tabIndex?: number;
    autoFocus?: boolean;
    className?: string;
}

export interface FieldInputNumber extends baseField{
    type:'number'
    label?:string
    value?:string
    name?:string
    onChange?:(value:string)=>void
    placeholder?: string;
    autocomplete?: string;
    tabIndex?: number;
    autoFocus?: boolean;
    className?: string;
}

export interface FieldInputDate extends baseField{
    type:'date'
    label?:string
    value?:string
    name?: string;
    onChange?:(value:string)=>void
    placeholder?: string;
    autocomplete?: string;
    tabIndex?: number;
    autoFocus?: boolean;
    className?: string;
}

export interface FieldInputDateTime extends baseField{
    type:'datetime-local'
    label?:string
    value?:string
    name?: string
    onChange?:(value:string)=>void
    placeholder?: string;
    autocomplete?: string;
    tabIndex?: number;
    autoFocus?: boolean;
    className?: string;
}

export interface FieldRadio extends baseField{
    //in here, 'FieldRadio' as wrapper for input type=radio globally. It should be wrap in Div Element;
    type:'radio'
    // options are to rendered as real field input-radio
    options?:FieldRadioItem[];
    /**use this property to define name attribute on 'options':*/
    globalname?: string; 
    /**use this property to define key attribute on 'options': make sure this value different with key value*/
    globalkey?: string; 
    // label for define title in wraper div;
    label?:string;
    // if you wanna be set className in wrapper Div
    className?: string;
    
    hasReactive?:FieldReaction[];
}

export interface FieldRadioItem{
    id:string;
    /** if 'name' undefined (not included), it will be filled using globalName */
    name?:string;
    label:string;//|FieldInputText;
    value?:string;
    disabled?:boolean
    // checked property not usable when you retrive data from external, set using value instead.
    checked?:boolean
    onChange?:(value:string)=>void
    placeholder?: string;
    autocomplete?: string;
    tabIndex?: number;
    autoFocus?: boolean;
    className?:string;
}

export interface FieldCheckBox extends baseField{
    //in here, 'FieldCheckBox' as wrapper for input type=checkbox globally. It should be wrap in Div Element;
    type:'combobox'
    // options are to rendered as real field input-radio
    options:FieldCheckItem[];
    //use this property to define name attribute on 'options':
    globalname?: string; 
    // label for define title in wraper div;
    label?:string;
    // if you wanna be set className in wrapper Div
    className?: string;
    
}

export interface FieldCheckItem{
    id:string;
    value:string;
    name?:string;
    // sometime, we need retrive label using children/element or maybe another field has defined to render
    // its make more dinamic until deep tree level component.
    label:string;//|FieldInputText;
    disabled?:boolean
    //checkbox more usable then value property if you set from external data;
    checked?:boolean
    onChange?:(value:string)=>void
    placeholder?: string;
    autocomplete?: string;
    tabIndex?: number;
    autoFocus?: boolean;
    className?:string;
}

export interface FieldSelection extends baseField{
    type:'selection-one'
    // options are to rendered as real field select options
    options:FieldSelectionItem[];
    label?:string;
    value?:string;
    defaultValue?:string
    name?:string;
    globalname?:string;
    disabled?:boolean
    onChange?:(value:string)=>void
    placeholder?: string;
    autocomplete?: string;
    tabIndex?: number;
    autoFocus?: boolean;
    // if you wanna be set className in wrapper Div
    className?: string;
    /** if value on selected option has change, result array Field [{fieldValue, renderedField}] */
    hasReactive?:FieldReaction[];
}

export interface FieldSelectionItem{
    value:string;
    label:string;
    disabled?:boolean
    selected?:boolean
}

export interface FieldChild extends baseField{
    type:'children',
    children?:ReactNode
    label?:ReactNode
    
}
export interface FieldTimeLine extends baseField{
    type:'timeline',
    timelineitems:TimelineItem
    label?:ReactNode
    
}

export interface TimelineItem{
    key_time: string;
    key_description: string;
    key_badge: string
    badge_className?:ConditionalClassName[];
    //this property probably use callback/another action or trigger
    
}
export interface ConditionalClassName{
    valueIf:string;
    className:string;
}

export interface FieldReaction{
    fieldValue:string;
    /** fields will be revealed if fieldValue is selected/checked */
    renderField:contentField[];
}

export interface FieldSearch extends baseField{
    type: 'search';
    label?:string;
    /** render field input and button */
    // renderField?:[FieldInputText]
    /** route for search, should be route on Laravel 
     * \n\n example: routeSearch="https://laravel.test/mysearch"
     * \n\n or using route-name from ziggy: routeSearch ={route('user-sarch)} 
     * 
     * */
    routeSearch?:string;
    /** parameter for search, such: 'search'. it will be defined url like: http://laravel.test/mysearch?search= */
    paramSearch?:string;
    /** afterResult has loaded, value will covered this render field for next action on another use case */
    wrapResultField?:FieldRadio|FieldSelection;
    /** count data perPage */
    countPerPage?:number,
    /** key for detection value in options */
    childOptionKeyValue?: string;
    /** key for detection label in options */
    childOptionKeyLabel?: string;

    /** value is query to search */
    // value?:string;
    // /** handleSearch for onclik button */
    // handleSearch?:(value:string)=>void;
    // name?:string
    // onChange?:(value:string)=>void
    // placeholder?: string;
    // autocomplete?: string;
    // tabIndex?: number;
    // autoFocus?: boolean;
    // className?: string;
}
