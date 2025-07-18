import { Input } from "@/components/ui/input";
import { contentField, FieldComboBox, FieldInputText, FieldRadio, FieldSelectOne, FieldTimeline, ListFieldItem, RadioField } from "../type";
import * as React from 'react';
import { Badge } from "@/components/ui/badge";
import { getValueByPath, setValueByPath } from "./helper-modal";
import { useCleanupFieldData } from "@/hooks/use-clean-up-field";

export function ResolveFieldByType({type,currentData,setCurrentData}:{type?:contentField, currentData?: Record<string | number, any>,setCurrentData?: React.Dispatch<React.SetStateAction<Record<string, any>>>}){
    //kode diambil dari: https://flowbite.com/docs/forms/floating-label/
    const fieldValue = type?.key && getValueByPath(currentData, type.key); 
    switch (type?.type){
        case 'text':
            return  <div className="relative my-3">
                        <input id={type.id as string} name={type.name} value={fieldValue||""} type={type.type}  onChange={(e) => setCurrentData?.({...currentData, ...setValueByPath(currentData, type.key, e.currentTarget.value)})} placeholder={type.placeholder} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  bg-white dark:bg-gray-700 peer"/>
                        <label htmlFor={type.id as string} className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-1 ps-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:w-64  peer-focus:w-auto peer-focus:top-2 peer-focus:left-1 peer-focus:ps-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{type.label}</label>
                    </div>
        case 'hidden':
            return <Input value={getValueByPath(currentData, type.key)??''} name={type.name} type={type.type}  onChange={(e) => setCurrentData?.({...currentData, ...setValueByPath(currentData, type.key, e.currentTarget.value)})}/>
        case 'select-one':
            return <ResolveSelectField type={type} currentData={currentData} setCurrentData={setCurrentData}/>;
        case 'combobox':
            return <ResolveComboboxField type={type} currentData={currentData} setCurrentData={setCurrentData}/>;
        case 'radio':
            return <ResolveRadioField type={type} currentData={currentData} setCurrentData={setCurrentData}/>;
        case 'timeline':
            return <ResolveTimeLine type={type} currentData={currentData}/>
        case 'description':
            return type.children
        default:
            return null;
    }
}

export function ResolveFieldByTypeOnly({type, currentData, setCurrentData,contentTabHeadersOnly}:{type?:contentField, currentData?: Record<string | number, any>,setCurrentData?: React.Dispatch<React.SetStateAction<Record<string, any>>>,contentTabHeadersOnly?:string[]}){
    //kode diambil dari: https://flowbite.com/docs/forms/floating-label/
    
    if(type?.key && contentTabHeadersOnly?.includes(type?.key)){
        return <ResolveFieldByType type={type} currentData={currentData} setCurrentData={setCurrentData}/>
                    
    }
    
    if(type?.type && ['description','timeline'].includes(type?.type)){
        return <ResolveFieldByType type={type} currentData={currentData} setCurrentData={setCurrentData}/>
    }
    
    if(type?.type && ['combobox'].includes(type?.type)){
        return <ResolveConvertFieldList type={type as FieldComboBox} currentData={currentData} setCurrentData={setCurrentData} />
    }
    
    return (
            <div className="relative my-3">
                <div className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  bg-white dark:bg-gray-700 peer">{getValueByPath(currentData, type?.key||'')} </div>
                <div className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-1 ps-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:w-64  peer-focus:w-auto peer-focus:top-2 peer-focus:left-1 peer-focus:ps-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{type?.label}</div>
            </div> 
        );
    
}

export function ResolveTimeLine({type,currentData}:{type:FieldTimeline, currentData?:Record<string|number, any>}){
    const dataList = getValueByPath(currentData, type.key);
    if(!dataList) return null;
    return (
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {
                dataList.map((listItem:ListFieldItem, index:number)=><li key={index} className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">{type.list?.key_time ? new Date(listItem[type.list.key_time]).toLocaleString('id-ID',{dateStyle:'long'}) : ''}</time>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{type.list?.key_description ? listItem[type.list.key_description] : ''}</h3>
                    <Badge variant='destructive' className="text-xs">{type.list?.key_badge ? listItem[type.list.key_badge] : ''}</Badge>
                </li>)
            }
        </ol>
    
    )
}

export function ResolveSelectField({type, currentData, setCurrentData}:{type: FieldSelectOne, currentData?:Record<string| number,  any>, setCurrentData?: React.Dispatch<React.SetStateAction<Record<string, any>>>}){
    const fieldValue = type?.key && getValueByPath(currentData, type.key); 
    
    const activeFields = type?.action
        ?.find((s) => s.fieldValue === fieldValue)
        ?.resultThruthly || [];

    
    const currentKeys = activeFields.map((field) => field.key);
    const allkeys = currentData?.map((keys:any)=>keys.key);
    console.log('currentKeys on ResolveSelectedField', currentKeys, allkeys)
    useCleanupFieldData(currentKeys, setCurrentData ?? (() => {}));
    
    return(
        <>
            <div className="relative mt-3 mb-1">
                <select 
                    id={type.id as string} 
                    name={type.name}
                    value={fieldValue||""}
                    
                    disabled={type?.disabled}
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
            {   
                
                type?.action && type.action.find(s=>s.fieldValue==fieldValue)?.resultThruthly?.map((field, index)=>
                    <ResolveFieldByType key={index} type={field} currentData={currentData} setCurrentData={setCurrentData}/>
                )
            }
        </>
    )
}

export function ResolveComboboxField({type, currentData, setCurrentData}:{type: FieldComboBox, currentData?:Record<string| number,  any>, setCurrentData?: React.Dispatch<React.SetStateAction<Record<string, any>>>}){
    const fieldValue:string[] = Array.isArray(getValueByPath(currentData, type.refKey))
    ? getValueByPath(currentData, type.refKey)
    : [];
    
    const handleChange = (value: string) => {
        const newValue = fieldValue.includes(value)
        ? fieldValue.filter(v => v !== value) // uncheck
        : [...fieldValue, value]; // check

        const updated = setValueByPath(currentData, type.refKey, newValue);
        setCurrentData?.({...currentData, ...updated});
    };
    

    return (
        type.lists.map((ops,i)=>
                <div className="flex items-center mb-4" key={ops.id+i}>
                    <input 
                        id={ops.id} 
                        name={ops.name} 
                        value={ops.value} 
                        type="checkbox" 
                        checked={fieldValue.includes(ops.value)}
                        onChange={() => handleChange(ops.value)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg outline-0 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor={ops.id}  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">    
                            {typeof ops.label ==='string'?<span dangerouslySetInnerHTML={{ __html:ops.label }}/>:(
                            
                                    <ResolveFieldByType type={ops.label} currentData={currentData} setCurrentData={setCurrentData}/>

                            )}
                    </label>
                    
                </div>
        )
    )
}

export function ResolveRadioField({type, currentData, setCurrentData}:{type: FieldRadio, currentData?:Record<string| number,  any>, setCurrentData?: React.Dispatch<React.SetStateAction<Record<string, any>>>}){
    const fieldValue = type?.key && getValueByPath(currentData, type.refKey); 
    const activeFields = type?.action
    ?.find((s) => s.fieldValue === fieldValue)
    ?.resultThruthly || [];

    const dataFind = type?.action?.find(s=>s.fieldValue==fieldValue);
    // const shouldBe = dataFind?.;
    const currentKeys = activeFields.map((field) => field.key);
    useCleanupFieldData(currentKeys, setCurrentData ?? (() => {}));
    const hasLabelField = type.lists.find(s=>typeof s.label !=='string') ;//as RadioField;
    
    const handleChecked = (value:string|number)=>{
        if(hasLabelField){
            setCurrentData?.({...currentData, ...setValueByPath(currentData, (hasLabelField.label as FieldInputText).key, '')})

        }
        setCurrentData?.({...currentData, ...setValueByPath(currentData, type.refKey, value)})
    }
    return (
        type.lists.map((ops,i)=>
                <div className="flex items-center mb-4" key={ops.id+i}>
                    <input 
                        id={ops.id} 
                        name={ops.name} 
                        value={ops.value} 
                        type="radio" 
                        // onChange={(e) => setCurrentData?.({...currentData, ...setValueByPath(currentData, type.refKey, e.currentTarget.value)})}
                        onChange={(e) => handleChecked(e.currentTarget.value)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg outline-0 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor={ops.id}  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">    
                                {typeof ops.label ==='string'?<span dangerouslySetInnerHTML={{ __html:ops.label }}/>:(
                                    <ResolveFieldByType type={ops.label} currentData={currentData} setCurrentData={setCurrentData}/>
                                )}
                        </label>
                </div>
        )
    )
}

export function ResolveConvertFieldList({type,currentData, setCurrentData}:{type: FieldComboBox, currentData?:Record<string| number,  any>, setCurrentData?: React.Dispatch<React.SetStateAction<Record<string, any>>>}){
    const fieldValue:string[] = Array.isArray(getValueByPath(currentData, type.refKey))
    ? getValueByPath(currentData, type.refKey)
    : [];
    
    return (
        <ol className="list-outside list-disc">
            {type.lists.map((ops,i)=>
                    
                        fieldValue.includes(ops.value)&&(
                        <li key={i+ops.id}>
                            {
                                typeof ops.label ==='string'?(
                                    <span dangerouslySetInnerHTML={{ __html:ops.label }}/>
                                ):(
                                    <ResolveFieldByType type={ops.label} currentData={currentData} setCurrentData={setCurrentData}/>
                                )
                            }
                        </li>

                        )

                    
                    // <div className="flex items-center mb-4" key={ops.id+i}>
    
                    //     <input 
                    //         id={ops.id} 
                    //         name={ops.name} 
                    //         value={ops.value} 
                    //         type="checkbox" 
                    //         checked={fieldValue.includes(ops.value)}
                    //         onChange={() => handleChange(ops.value)}
                    //         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg outline-0 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    //     <label htmlFor={ops.id} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    //     {ops.label}
    
                    //     </label>
                    // </div>
            )}

        </ol>
    )
}
