
import * as React from 'react';
import { getValueByPath, setValueByPath } from "./helper-modal";
import { contentField, FieldCheckBox, FieldInputHidden, FieldInputNumber, FieldInputPassword, FieldInputText, FieldRadio, FieldRadioItem, FieldSearch, FieldSelection, FieldSelectionItem, FieldTimeLine, TimelineItem } from "../interfaces/type-fields";
import { ArrowLeft, ArrowRight, Eye, EyeClosed } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ResolveFieldByType } from './resolve-field';
import { useCleanupFieldData } from '@/hooks/use-clean-up-field';
import { Button } from '@/components/ui/button';
import { useApi } from '@/hooks/use-api';
import { apiGet, FetchOptions } from '@/lib/api';
import { DataPaginationType } from '@/components/table-pagination';
import { paramPaginationOnModal } from '../interfaces/type';
type fieldTypeInput = FieldInputText | FieldInputNumber | FieldInputHidden | FieldInputPassword;

export function ComponentFieldTypeInput({type,currentData,setCurrentData}:{type?:fieldTypeInput, currentData?: Record<string | number, any>,setCurrentData?: React.Dispatch<React.SetStateAction<Record<string, any>>>}){
    const field = type as fieldTypeInput;
    const fieldValue = getValueByPath(currentData, field.key); 

    return (<div className="relative my-3">
                <input id={type?.id} name={field.name} value={fieldValue||""} type={field.type}  onChange={(e) => setCurrentData?.({...currentData, ...setValueByPath(currentData, field.key, e.currentTarget.value)})} placeholder={field.placeholder} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  bg-white dark:bg-gray-700 peer"/>
                {/* <input id={type?.id} name={field.name} value={fieldValue||""} type={field.type}  onChange={(e) => setCurrentData?.((currentData)=> setValueByPath(currentData, field.key, e.currentTarget.value))} placeholder={field.placeholder} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  bg-white dark:bg-gray-700 peer"/> */}
                <label htmlFor={field.id} className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-1 ps-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:w-64  peer-focus:w-auto peer-focus:top-2 peer-focus:left-1 peer-focus:ps-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    {field.label}
                </label>
            </div>
        )
}

export function ComponentFieldTypeHidden({type,currentData,setCurrentData}:{type?:FieldInputHidden, currentData?: Record<string | number, any>,setCurrentData?: React.Dispatch<React.SetStateAction<Record<string, any>>>}){
    const field = type as fieldTypeInput;
    React.useEffect(() => {
        if (field?.key && field?.value !== undefined) {
        setCurrentData?.(prev => ({
            ...prev,
            ...setValueByPath(prev, field.key, field.value)
        }));
        }
    }, [field?.key, field?.value, setCurrentData]);

    return (
        <input
        id={type?.id}
        value={field?.value}
        name={field.name}
        type={field.type}
        readOnly
        />
    );
    
}

export function ComponentFieldTypePassword({type,currentData,setCurrentData}:{type?:contentField, currentData?: Record<string | number, any>,setCurrentData?: React.Dispatch<React.SetStateAction<Record<string, any>>>}){
    const field = type as fieldTypeInput;
    const fieldValue = getValueByPath(currentData, field.key); 
    const [stateInputType, setStateInputType] = React.useState('password');

    return (<div className="relative my-3">
                <input id={type?.id} name={field.name} value={fieldValue||""} type={stateInputType}  onChange={(e) => setCurrentData?.({...currentData, ...setValueByPath(currentData, field.key, e.currentTarget.value)})} placeholder={field.placeholder} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  bg-white dark:bg-gray-700 peer"/>
                <label htmlFor={field.id} 
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-1 ps-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:w-64  peer-focus:w-auto peer-focus:top-2 peer-focus:left-1 peer-focus:ps-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    {field.label}
                </label>
                <button className="absolute right-2 top-0 translate-y-3 my-auto z-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500" onClick={()=>stateInputType ==='text'?setStateInputType('password'):setStateInputType('text')}>{stateInputType==='text'?<Eye/>:<EyeClosed/>}</button>
            </div>
        )
                
}

/** checbox field */
export function ComponentFieldCheckBox({type, currentData, setCurrentData}:{type:FieldCheckBox, currentData?: Record<string|number, any>, setCurrentData?: React.Dispatch<React.SetStateAction<Record<string, any>>>}){
    const fieldValue:string[] = Array.isArray(getValueByPath(currentData, type.key))
        ? getValueByPath(currentData, type.key)
        : [];
        
        const handleChange = (value: string) => {
            const newValue = fieldValue.includes(value)
            ? fieldValue.filter(v => v !== value) // uncheck
            : [...fieldValue, value]; // check
    
            const updated = setValueByPath(currentData, type.key, newValue);
            setCurrentData?.({...currentData, ...updated});
        };
        
        return (
            <div className="relative my-3">
                <div className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  bg-white dark:bg-gray-700 peer'>
                    {
                        type.options.map((ops,i)=>
                                <div className="flex items-center mb-4" key={ops.id+i}>
                                    <input 
                                        id={ops.id} 
                                        name={ops.name} 
                                        value={ops.value} 
                                        type="checkbox" 
                                        checked={fieldValue.includes(ops.value)}
                                        onChange={() => handleChange(ops.value)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg outline-0 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        <label htmlFor={ops.id}  className="ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">    
                                            {ops.label}
                                        </label>
                                    
                                </div>
                        )
                    }     
                        </div>
                <div className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-1 ps-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:w-64  peer-focus:w-auto peer-focus:top-2 peer-focus:left-1 peer-focus:ps-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{type?.label}</div>
            </div>

        );
}

/** component not trully field form */
export function ComponentFieldTimeLine({type,currentData}:{type:FieldTimeLine, currentData?:Record<string|number, any>}){
    // good refrences: https://github.com/rpearce/react-medium-image-zoom#readme
    const dataList:TimelineItem[]= getValueByPath(currentData, type.key);
    const key_description = type?.timelineitems.key_description;
    const key_time = type?.timelineitems.key_time;
    const key_badge = type?.timelineitems.key_badge;
    const badge_className = type?.timelineitems?.badge_className;
    const defineClassName = React.useCallback(
        (datalist:Record<string|number, any>)=>{
            if(!badge_className){
                return '';
            }

            const currentValue = datalist[key_badge];
            const findClassName = badge_className?.find(s=>s.valueIf === currentValue)?.className
            return findClassName ;
        }
    ,[]);

    if(!dataList) return null;
    return (
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {
                dataList.map((listItem:Record<string|number, any>, index:number) =>
                    <li key={index} className="mb-10 ms-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time className="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">{new Date(listItem[key_time]).toLocaleString('id-ID',{dateStyle:'full', timeStyle:'long'})}</time>

                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{listItem[key_description]}</h3> 
                        
                        <Badge variant='default' className={cn("text-xs", defineClassName(listItem))}>{listItem[key_badge]}</Badge> 
                    </li>
                )
            }
        </ol>
    
    )
}


/** radio field */
export function ComponentFieldRadio({type, currentData, setCurrentData}:{type:FieldRadio, currentData?: Record<string|number, any>, setCurrentData?: React.Dispatch<React.SetStateAction<Record<string, any>>>}){
    
    const fieldValue = type?.key && getValueByPath(currentData, type.key); 
        
        const activeFields = type?.hasReactive
                ?.find((s) => s.fieldValue === fieldValue)
                ?.renderField || [];
    
        const currentKeys = activeFields.map((field) => field.key);
        
        
        useCleanupFieldData(currentKeys,  setCurrentData ?? (() => {}));
        const handleChecked = (value:string|number)=>{
                setCurrentData?.({...currentData, ...setValueByPath(currentData, type.key, value)})
            }
        return (<>
        <div className="relative my-3">
            <div className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  bg-white dark:bg-gray-700 peer'>
                {
                    type?.options?.map((ops,i)=>
                                    <div className="flex items-center mb-4 " key={ops.id+i}>
                                        <input 
                                            id={ops.id} 
                                            name={ops.name} 
                                            value={ops.value} 
                                            type="radio" 
                                            checked={fieldValue ===ops.value}
                                             onChange={(e) => handleChecked(e.currentTarget.value)}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg outline-0 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor={ops.id}  className="ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">    
                                                {ops.label}
                                            </label>
                                        
                                    </div>
                            )
                }
            </div>
            <div className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-1 ps-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:w-64  peer-focus:w-auto peer-focus:top-2 peer-focus:left-1 peer-focus:ps-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{type?.label}</div>
        </div>
                {   
                    type?.hasReactive && type.hasReactive.find(s=>s.fieldValue==fieldValue)?.renderField?.map((field, index)=>
                        <ResolveFieldByType key={index} type={field} currentData={currentData} setCurrentData={setCurrentData}/>
                    )
                }
            </>
        );
}

/** Probably has action if selected value has interface resolve field */
export function ComponentFieldSelection({type, currentData, setCurrentData}:{
        type:FieldSelection, currentData?: Record<string|number, any>, setCurrentData?: React.Dispatch<React.SetStateAction<Record<string, any>>> })
        {
        
        const fieldValue = type?.key && getValueByPath(currentData, type.key); 
        
        const activeFields = type?.hasReactive
                ?.find((s) => s.fieldValue === fieldValue)
                ?.renderField || [];
    
        const currentKeys = activeFields.map((field) => field.key);
        
        
        useCleanupFieldData(currentKeys,  setCurrentData ?? (() => {}));

        return (
            <div className="relative mt-3 mb-1">
                <select 
                    id={type.id as string} 
                    name={type.name}
                    value={fieldValue||""}
                    disabled={type?.disabled}
                    onChange={(e) => setCurrentData?.({...currentData, ...setValueByPath(currentData, type.key, e.currentTarget.value)})}
                    className={cn("mb-2  bg-white dark:bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",type?.className)}
                >
                    {
                        // ('options' in type)?(
                            type.options.map((opt,index)=>
                                <option key={index} selected={opt.selected} value={opt.value}>{opt.label}</option>
                            )
                        // ):null
                    }
                </select>
                <label htmlFor={type.id as string} className="absolute text-sm  bg-white   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    {type.label}
                </label>
                {   
                    type?.hasReactive && type.hasReactive.find(s=>s.fieldValue==fieldValue)?.renderField?.map((field, index)=>
                        <ResolveFieldByType key={index} type={field} currentData={currentData} setCurrentData={setCurrentData}/>
                    )
                }
            </div>
        )
}

export function ComponentFieldSearch({
    type, currentData, setCurrentData
    }:{
        type:FieldSearch, currentData?: Record<string|number, any>, setCurrentData?: React.Dispatch<React.SetStateAction<Record<string, any>>>}){
            
            const url = type?.routeSearch as string;
            
            const [searchInput, setSearchInput] = React.useState<string>('');
            const {request, loading} = useApi();

            /** pagination */
            const [resultDataSearch, setResultDataSearch] = React.useState<Partial<DataPaginationType<Record<string, any>>>>({
                data:[],
            });

            const [dataParam, setDataParam] = React.useState<paramPaginationOnModal>();
            
            const onChangePage = (e: React.MouseEvent<HTMLButtonElement>)=>{
                        e.preventDefault();
                        const url = new URL(e.currentTarget.dataset.url  as string);
                        const param = new URLSearchParams(url.search);
                        const stringPage = param.get('page');
                        const numbPage = Number(stringPage);
                        setDataParam((prev)=>({ ... prev, 'page':numbPage}));
                    }
            
            /**fetching Data */
            const fetchDataSearch = React.useCallback(
                ()=>{
                    
                    if(!dataParam) return;
                    const fetchOps : FetchOptions = {
                        params: dataParam
                    }
                
                    return request(() => apiGet(url, fetchOps, false), {
                            successMessage: 'Berhasil memuat data',
                            errorMessage: 'Gagal memanggil data.',
                            onSuccess: (r) => {
                                    
                                    setResultDataSearch(r);
                                    const ops : FieldRadioItem[]|FieldSelectionItem[] = [];
                                    r.data.forEach((item:any,i:number)=>{
                                        ops?.push({
                                            id:'opsi_result_api_' + i,
                                            name: type?.wrapResultField?.globalname,
                                            value: item[type?.childOptionKeyValue as string],
                                            label: item[type?.childOptionKeyLabel as string],
                                        })
                                    });
                                    handleApiFieldResult(ops);
                                },
                            onError:(err)=>{
                                
                                setResultDataSearch({data:[]});
                            }
                        })
                    },
                [dataParam, setDataParam]
            );
            
            React.useEffect(()=>{
                    fetchDataSearch();
                }, [fetchDataSearch]
            );

            /** layoutingResult */
            const [apiFieldResult, setApiFieldResult] = React.useState(type?.wrapResultField);
            
            const handleApiFieldResult = (ops:any[])=>{
                setApiFieldResult(prev => {
                    if (!prev) return prev;

                    if (prev.type === 'radio') {
                        return {
                        ...prev,
                        options: ops,
                        } as FieldRadio;
                    }

                    if (prev.type === 'selection-one') {
                        return {
                        ...prev,
                        options: ops,
                        } as FieldSelection;
                    }
                    return prev;
                });
            };

            const onClickHandleSearch = () =>{
                    if(searchInput === "") {
                        setDataParam(undefined);
                    }else{
                        setDataParam(prev=>({
                                ...prev,
                                'per_page':type?.countPerPage,
                                'search': searchInput,
                            }));
                    }
                }

            const onHandleInputSearch = React.useCallback(
                (value:string)=>{
                    if(value===""){
                        setResultDataSearch({data:[]});
                        setSearchInput("");
                        handleApiFieldResult([]);
                        setDataParam(undefined);

                        const key = type?.wrapResultField?.key as string;
                        setCurrentData?.((prev) => {
                            const updated = { ...prev };
                            let changed = false;
                            
                            if (updated.hasOwnProperty(key)) {
                                delete updated[key];
                                changed = true;
                            }
                            

                            return changed ? updated : prev;
                        });
    
                    }else{
                        setSearchInput(value);
                    }
                },
                [searchInput,setSearchInput]
            );
            
        return (
            <>
                <div className="relative my-3">
                    <div className="flex align-middle w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  bg-white dark:bg-gray-700 peer">
                        <input 
                            id='field_cari' 
                            name="field_cari_name" 
                            value={searchInput} 
                            type="text"  
                            onChange={(e) =>onHandleInputSearch(e.currentTarget.value)} placeholder="Ketikan sesuatu" className="block px-2.5 py-0 w-full text-sm text-gray-900 rounded-lg rounded-e-none border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  bg-white dark:bg-gray-700 peer"/>
                        <Button variant="outline" className="self-center cursor-pointer rounded-s-none py-6 bg-sky-300" onClick={onClickHandleSearch}>Cari</Button>
                    </div>
                    <div className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-1 ps-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:w-64  peer-focus:w-auto peer-focus:top-2 peer-focus:left-1 peer-focus:ps-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Cari Di sini</div>
                </div>
                {
                    resultDataSearch?.data && resultDataSearch?.data?.length > 0 ?(
                        <>
                            <ResolveFieldByType type={apiFieldResult} currentData={currentData} setCurrentData={setCurrentData}/>
                            <div className='flex justify-between text-xs -mt-3 mx-2'>
                                <div>
                                    {
                                        resultDataSearch.meta?.current_page !==1 ?(
                                            <Button className="text-xs py-0 h-5" variant={'ghost'} type="button" onClick={onChangePage} data-url={resultDataSearch?.links?.prev} disabled={!resultDataSearch?.links?.prev}><ArrowLeft/></Button>
                                        ):null
                                    }
                                </div>
                                <div>
                                {
                                    resultDataSearch.meta?.current_page !== resultDataSearch.meta?.last_page ?(
                                        <Button className="text-xs py-0 h-5 self-end" variant={'ghost'} type="button" onClick={onChangePage} data-url={resultDataSearch?.links?.next} disabled={!resultDataSearch?.links?.next}><ArrowRight/></Button>
                                    ):null
                                }
                                </div>
                            </div>
                        </>
                    ):(
                        <div className="relative my-3">
                            <div className='block px-2.5 pb-2.5 pt-4 w-full text-xs text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  bg-white dark:bg-gray-700 peer'>
                            'Not Found'
                            </div>
                            <div className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-1 ps-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:w-64  peer-focus:w-auto peer-focus:top-2 peer-focus:left-1 peer-focus:ps-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{type?.label}</div>
                        </div>
                    )
                }
            </>
        )
}