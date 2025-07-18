
import * as React from 'react';
import { getValueByPath } from "./helper-modal";
import { contentField, FieldCheckBox} from "../interfaces/type-fields";
import { ComponentFieldCheckBox, ComponentFieldRadio, ComponentFieldSearch, ComponentFieldSelection, ComponentFieldTimeLine, ComponentFieldTypeHidden, ComponentFieldTypeInput, ComponentFieldTypePassword } from './component-fields';


export function ResolveFieldByType({type,currentData,setCurrentData}:{type?:contentField, currentData?: Record<string | number, any>,setCurrentData?: React.Dispatch<React.SetStateAction<Record<string, any>>>}){
    //kode diambil dari: https://flowbite.com/docs/forms/floating-label/
    
    switch (type?.type){
        case 'text':
            return  <ComponentFieldTypeInput type={type} currentData={currentData} setCurrentData={setCurrentData}/>
        case 'number':
            return  <ComponentFieldTypeInput type={type} currentData={currentData} setCurrentData={setCurrentData}/>
        case 'hidden':
            return  <ComponentFieldTypeHidden type={type} currentData={currentData} setCurrentData={setCurrentData}/>
        case 'password':
            return  <ComponentFieldTypePassword type={type} currentData={currentData} setCurrentData={setCurrentData}/>
        case 'selection-one':
            return  <ComponentFieldSelection type={type} currentData={currentData} setCurrentData={setCurrentData}/>
        case 'combobox':
            return  <ComponentFieldCheckBox type={type} currentData={currentData} setCurrentData={setCurrentData}/>
        case 'timeline':
            return  <ComponentFieldTimeLine type={type} currentData={currentData}/>
        case 'radio':
            return  <ComponentFieldRadio type={type} currentData={currentData} setCurrentData={setCurrentData}/>
        case 'search':
            return  <ComponentFieldSearch type={type} currentData={currentData} setCurrentData={setCurrentData}/>
        default:
            return null;
    }
}



export function ResolveFieldByTypeOnly({type, currentData, setCurrentData,layoutingTabsOnly}:{type?:contentField, currentData?: Record<string | number, any>,setCurrentData?: React.Dispatch<React.SetStateAction<Record<string, any>>>,layoutingTabsOnly?:string[]}){
    //kode diambil dari: https://flowbite.com/docs/forms/floating-label/
    
    if(type?.key && layoutingTabsOnly?.includes(type?.key)){
        return <ResolveFieldByType type={type} currentData={currentData} setCurrentData={setCurrentData}/>
                    
    }
    
    if(type?.type && ['description','timeline'].includes(type?.type)){
        return <ResolveFieldByType type={type} currentData={currentData} setCurrentData={setCurrentData}/>
    }
    
    if(type?.type && ['combobox'].includes(type?.type)){
        return <ResolveConvertFieldList type={type as FieldCheckBox} currentData={currentData} setCurrentData={setCurrentData} />
    }
    
    return (
            <div className="relative my-3">
                <div className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  bg-white dark:bg-gray-700 peer">{getValueByPath(currentData, type?.key||'')} </div>
                <div className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-1 ps-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:w-64  peer-focus:w-auto peer-focus:top-2 peer-focus:left-1 peer-focus:ps-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{type?.label}</div>
            </div> 
        );
    
}

export function ResolveConvertFieldList({type,currentData, setCurrentData}:{type: FieldCheckBox, currentData?:Record<string| number,  any>, setCurrentData?: React.Dispatch<React.SetStateAction<Record<string, any>>>}){
    const fieldValue:string[] = Array.isArray(getValueByPath(currentData, type.key))
    ? getValueByPath(currentData, type.key)
    : [];
    
    return (
        <ol className="list-outside list-disc">
            {type.options.map((ops,i)=>
                fieldValue.includes(ops.value)&&(
                <li key={i+ops.id}>
                    {
                        <span dangerouslySetInnerHTML={{ __html:ops.label }}/>
                    }
                </li>
                    )
            )}
        </ol>
    )
}