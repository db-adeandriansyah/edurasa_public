import * as React from "react";
import { cn } from "@/lib/utils";
import { DataPaginationType,LinkPaginationType,LinkUrlPagination,MetaPaginatonType,TheadType,ThRefrencesType, typeActionKey } from ".";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Search, SquarePen, Trash } from "lucide-react";
import { Select, SelectContent, SelectItem,  SelectTrigger, SelectValue } from "../ui/select";
import { useApi } from "@/hooks/use-api";
import { apiGet, FetchOptions} from "@/lib/api";
import { TableDefault, TBodyComponent, TdComponent, TdHeadComponent, TheadComponent, TrComponent, WrapperTablePagination } from "./my-table";
import { Input } from "../ui/input";
import { crudAction } from "@/types";
// import { ModalCustomInterface } from "../modals/type";
// import { ModalByConfig } from "../modals/modal-by-config";
import { getValueByPath } from "../modals/fields/helper-modal";
import { ModalCustomInterface } from "../interactive-modals/interfaces/type";
import ModalByConfig from "../interactive-modals/modal-by-config";
import { AkunRegisteredByAdmin } from "@/models/approval-user-data";


// import axios from "axios";

interface TableConfigPaginationProps<T1> {
    dataawal : DataPaginationType<T1>;
    addButton?:boolean;
    addSearch?:boolean;
    refFindData?:string;
}
interface paramPagination{
    page? : number,
    per_page? : number,
    search? : string
}
function TablePagination<T1, T2 = T1>({
    configTable,
    className, 
    columnsSel,
    columnsKey,
    showModal,
    setShowModal,
    //--->problemCode
    // dataModal,
    // setDataModal,
    //---
    modeCrud,
    setModeCrud,
    
    configModal,
    configModalAddModeCrud,
    //---
    // newDataModal,
    // setNewDataModal,
    newAddDataForm,
    //----
    currentData, 
    setCurrentData,
    ...props
    }:React.ComponentProps<'table'> & {
        /** setting layout table and his data */
        configTable:TableConfigPaginationProps<T1>,
        /** setting columnSel format in table header */
        columnsSel: TheadType[],
        /** refrences key for define value according this source data, source data come from 'configTable' on property 'data' */
        columnsKey: ThRefrencesType[],
        /** state open/close modal */
        showModal: boolean,
        /** setter state open/close modal */
        setShowModal:React.Dispatch<React.SetStateAction<boolean>>
        /** state Crud on mode modal, include for add, edit/update, or delete */
        modeCrud? : crudAction;
        /** setter state crud on model */
        setModeCrud?: React.Dispatch<React.SetStateAction<crudAction|undefined>>
        /** setting modal, especially for edited. Currentdata retrieve from filtering/finding in source data (configtable.data) */
        configModal: ModalCustomInterface
        /** setting modal especially for add data. Its difference on configModal which retrieve from external data, this config has attributes for be sended to external */
        configModalAddModeCrud?: ModalCustomInterface;
        /** formating empty data */
        newAddDataForm?:T2
        /** state current data that showing on modal. It retrieve from newAddDataForm (modeCrud: add) or retrieve from filtering external data*/
        currentData?:T1|T2|undefined , 
        /** setter state currentData. */
        setCurrentData?:React.Dispatch<React.SetStateAction<T1|T2|undefined>>
    }
    ){
        const addButton = configTable.addButton;
        const addSearch = configTable.addSearch;
        const findId = configTable?.refFindData as string;
        const defaultModalContentType = configModal;
        const defaultModalContentTypeAddMode = configModalAddModeCrud as ModalCustomInterface;
        const [stateConfigModal, setStateConfigModal] = React.useState(defaultModalContentType);
        const [titleModal, setTitleModal] = React.useState('');
        
        /** Data Pagination 
         * Semua hal terkait action dan handler akan terjadi di sini, tingkat atas hanya sebagai pengirim render utama
        */
        const {request, loading} = useApi();
        const {data, links, meta} = configTable.dataawal;
        const [dataRow, setDataRow] = React.useState<T1[]>(data);
        const [dataLinks, setDataLink] = React.useState<LinkPaginationType>(links);
        const [dataMeta, setDataMeta] = React.useState<MetaPaginatonType>(meta);
        
        /** semua setState disini akan dieksekusi via useCallback
         * alasannya karena kita akan cache setState-nya sebagai fungsi yang tetap;
         * Lalu, nilai awal akan dipanggil/dikelola di useMemo.
         */
        const [dataPerPage, setDataPerPage] = React.useState<number>();
        const [dataCurrentPage, setDataCurrentPage] = React.useState<number>();
        const [dataSearch, setDataSearch] = React.useState<string>('');
        const [dataFrom, setDataFrom] = React.useState<number>(1);
        const [dataTotal, setDataTotal] = React.useState<number>(meta.total);
        const [dataMetaLinks, setDataMetaLinks] = React.useState<LinkUrlPagination[]|[]>(meta.links);
        const [dataParam, setDataParam] = React.useState<paramPagination>({})
        /** selesai mengurusi setState */

        const buttonPage = React.useMemo(()=>{
            return defineCountButtonPapge(dataMeta.last_page,dataMeta.current_page);
            ;
        },[dataMeta]);
        
        const fetchData = React.useCallback(
            () =>{
                if(!dataCurrentPage) return;
                
                const dataFetcth:FetchOptions ={
                    params: dataParam
                }

                return request(() => apiGet(dataMeta.path, dataFetcth,false), {
                    successMessage: 'Berhasil memuat data',
                    errorMessage: 'Gagal memanggil data.',
                    onSuccess: (r) => {
                            setDataRow(r.data);
                            setDataLink(r.links);
                            setDataMeta(r.meta);
                            setDataFrom(r.meta.from);
                            setDataPerPage(r.meta.per_page);
                            setDataTotal(r.meta.total);
                            setDataMetaLinks(r.meta.links)
                        },
                    onError:(err)=>{
                        setDataRow([]);
                        setDataTotal(0);
                        setDataMetaLinks([]);
                    }
                });
            },
            [dataParam]
        ) 
        
        React.useEffect(()=>{
            fetchData();
        },[fetchData]);

        function onChangePage(e: React.MouseEvent<HTMLButtonElement>){
            e.preventDefault();
            const url = new URL(e.currentTarget.dataset.url  as string);
            const param = new URLSearchParams(url.search);
            const stringPage = param.get('page');
            const numbPage = Number(stringPage);
            setDataCurrentPage(numbPage);
            setDataParam((prev)=>({ ... prev, 'page':numbPage}));
        }

        function onHandleCountPage(value:string){
            const numb = Number(value);

            setDataCurrentPage(1);
            setDataPerPage(numb);
            setDataParam((prev)=>({ ... prev, 
                'page': 1,
                'per_page': numb
            }));
        }
        
        const onHandleChangeSearch= (value:string)=>{
                if(value ===""){
                    dataCurrentPage?? setDataCurrentPage(1);
                    setDataParam(prev=>({
                        'page': dataCurrentPage,
                    }));
                    setDataSearch('');
                }else{
                    setDataSearch(value);
                }
            };

        const handleClickSearch = React.useCallback(()=>{
            
            if(dataSearch===""){
                
                    setDataParam(prev=>({
                        'page': dataCurrentPage,
                        
                    }));
            }else{
                dataCurrentPage?? setDataCurrentPage(1);
                setDataParam(prev=>({
                    ...prev,
                    'page':1,//dataCurrentPage,
                    'search': dataSearch,
                }));

            }
            
        },[dataSearch,setDataSearch])
        
        const handleShowModal = React.useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
            const currentData = dataRow.find(s => (s as Record<string, any>)[findId] == e.currentTarget.dataset.id);
            const datasetMode =  e.currentTarget.dataset.mode as crudAction;
            
            setModeCrud?.(datasetMode );
            setShowModal(!showModal);
            
            if(datasetMode === 'add'){
                setStateConfigModal(defaultModalContentTypeAddMode);
                if(stateConfigModal.defineTitle){
                    setTitleModal(()=>(stateConfigModal as {defineTitle:(param?:string)=>string})?.defineTitle());
                }else{
                    setTitleModal(datasetMode);
                }

                setCurrentData?.(newAddDataForm as T2);

            }else{
                setStateConfigModal(defaultModalContentType);
                setCurrentData?.(currentData); 

                if(datasetMode === 'edit'){
                    setTitleModal('Edit '+ ((currentData as { name: string })?.name));
                }else if(datasetMode === 'delete'){
                    setTitleModal('Konfirmasi Hapus?');
                }
            }
        },[dataRow]);
        
        return (
            <>
                <WrapperPagination className="border-t-0 mb-2">
                        {
                            addSearch && (
                                <div className="flex gap-2 w-1/2">
                                    <div className="relative w-full">
                                        <Search className="absolute top-0 translate-y-2 left-1 text-gray-400 size-5"/>
                                        <Input 
                                            value={dataSearch} 
                                            type="text" 
                                            onChange={(e)=>onHandleChangeSearch(e.target.value)} 
                                            tabIndex={0}
                                            placeholder="cari berdasarkan kolom yang ada di dalam tabel"
                                            className="py-0 indent-3"
                                            />
                                    </div>
                                    <Button onClick={handleClickSearch}>Cari</Button>
                                </div>
                            )
                        }
                        {
                            addButton && (
                                <Button variant={'outline'} data-mode="add" onClick={handleShowModal}>Tambah Data</Button>
                            )
                        }
                </WrapperPagination>
                <WrapperTablePagination>
                        <TableDefault className={className}>
                            <TheadComponent>
                                {
                                    columnsSel.map((column, index) => {
                                        return (
                                            <TrComponent key={index}>
                                                {
                                                    column.rowHeaders.map((header, indexHeader) => {
                                                        return (
                                                            <TdHeadComponent 
                                                                key={indexHeader} 
                                                                rowSpan = {header.rowSpan}
                                                            >
                                                                {header.label}
                                                            </TdHeadComponent>
                                                        )
                                                    })
                                                }
                                            </TrComponent>
                                        )
                                    })  
                                }
                            </TheadComponent>
                            <TBodyComponent>
                                {
                                    dataRow.map((dataItem,index)=> {
                                            return (
                                                <TrComponent key={index}>
                                                    {
                                                        columnsKey.map((col,i)=>{
                                                            if(!col.key){
                                                                
                                                                return <TdComponent className={col.className} key={i+index}/>
                                                            }else if(col.key === 'index'){
                                                                
                                                                return <TdComponent className={col.className}  key={i+index}>{index+dataFrom}</TdComponent>
                                                            }else if(col.key === 'callback'){
                                                                const param= getValueByPath(dataItem, col.actionKey as string);
                                                                const result = col.isCallback?.(param)
                                                                return <TdComponent className={col.className}  key={i+index}>{result}</TdComponent>
                                                            }else if(col.key ==='action'){
                                                                
                                                                return <TdComponent className={col.className}  key={i+index}>
                                                                        {
                                                                            resolveButtonAction(col?.actionKeyType as typeActionKey, handleShowModal, getValueByPath(dataItem, String(col?.actionKey)))
                                                                        }
                                                                        </TdComponent>
                                                            }else{
                                                                
                                                                return <TdComponent className={col.className}  key={i+index}>{getValueByPath(dataItem, col.key)}</TdComponent>
                                                            }
                                                        })
                                                    }
                                                </TrComponent>
                                            )
                                        }
                                    )
                                }
                            </TBodyComponent>
                        </TableDefault>
                </WrapperTablePagination>
                <WrapperPagination>
                    <div className="hidden md:block text-xs py-1 h-5 align-middle border-b-1 border-t-1 rounded-3xl">
                        <span dangerouslySetInnerHTML={{ __html:dataRow.length }}/> data dari  <span dangerouslySetInnerHTML={{ __html:dataTotal??0}}/>
                    </div>
                    <div className="flex">
                        <SelectCountPage 
                            value={dataPerPage??20} 
                            onChangeValue={onHandleCountPage}
                            />
                    </div>
                    <div className="grid grid-cols-6 md:flex text-xs border-b-1 border-t-1 rounded-lg">
                        {
                            dataMeta.current_page !== 1 ? (<>
                                <Button className={`text-xs py-0 h-5`} variant={'ghost'} type="button" onClick={onChangePage} data-url={dataLinks?.first} disabled={!dataLinks?.first}>Awal</Button>
                                <Button className="text-xs py-0 h-5" variant={'ghost'} type="button" onClick={onChangePage} data-url={dataLinks?.prev} disabled={!dataLinks?.prev}><ArrowLeft/></Button>
                            </>):null
                        }
                        {
                            buttonPage.map((btn:string|number,index:number)=>{
                                const getUrlPage = dataMetaLinks.find(s=>s.label == btn);
                                if(!getUrlPage){
                                    return (<span className="py-0 h-5 align-middle px-3" key={index}>{btn}</span>);
                                }
                                return (<Button key={index} className={`text-xs h-5 px-2 py-0 ${getUrlPage.active?'bg-sky-400':''}`} variant={'ghost'} type="button" onClick={onChangePage} data-url={getUrlPage.url} disabled={!getUrlPage.url}>{btn}</Button>)
                            })
                        }
                        {
                            dataMeta.current_page !== dataMeta.last_page ?(
                                <>
                                    <Button className="text-xs py-0 h-5" variant={'ghost'} type="button" onClick={onChangePage} data-url={dataLinks?.next} disabled={!dataLinks?.next}><ArrowRight/></Button>
                                    <Button className="text-xs py-0 h-5" variant={'ghost'} type="button" onClick={onChangePage} data-url={dataLinks?.last} disabled={!dataLinks?.last}>Akhir</Button>
                                </>
                            ):null
                        }
                    </div>
                </WrapperPagination>
                <ModalByConfig 
                    className="md:min-w-3xl"
                    title = {titleModal}
                    description = {stateConfigModal.description}
                    open = {showModal}
                    setOpen = {setShowModal}
                    contentType ={stateConfigModal.contentType}
                    contentFields = {stateConfigModal.contentFields}
                    currentData={currentData as Record<string, any>}
                    setCurrentData={setCurrentData as React.Dispatch<React.SetStateAction<Record<string, any>>> | undefined}
                    mode = {modeCrud??stateConfigModal.mode}
                    onAdd = {stateConfigModal.onAdd??undefined}
                    messageDelete={stateConfigModal.messageDelete}
                    layoutingTabs={stateConfigModal.layoutingTabs}
                    layoutingTabsOnly={stateConfigModal.layoutingTabsOnly}
                    polymorphicFields={stateConfigModal.polymorphicFields}
                    onUpdate={stateConfigModal.onUpdate}
                    onDelete={stateConfigModal.onDelete}
                    closeOnOutsideClick={stateConfigModal.closeOnOutsideClick}
                />
            </>
    );
}

/**
 * 
 * @param type "edit" | "delete" | "edit-delete"
 */
function resolveButtonAction(type:typeActionKey, handleClick:(e: React.MouseEvent<HTMLButtonElement>) => void, dataId:string|number){
    switch(type){
        case "edit":
            return <Button data-mode = "edit" data-id={dataId} className="p-0  has-[>svg]:p-0 bg-emerald-300 size-5" onClick={handleClick} asChild><SquarePen /></Button>
            
        case "edit-delete":
            return (
                <>
                    <Button data-mode = "edit" data-id={dataId} className="p-0  has-[>svg]:p-0 bg-emerald-300 size-5" onClick={handleClick} asChild><SquarePen /></Button>
                    <Button data-mode = "delete" data-id={dataId} className="p-0 ms-1 has-[>svg]:p-0 bg-red-400 size-5" onClick={handleClick} asChild><Trash /></Button>
                </>
            )
        case "delete":
            return <Button data-mode = "delete" data-id={dataId} className="p-0  has-[>svg]:p-0 bg-red-400 size-5"  onClick={handleClick} asChild><Trash /></Button>
    }
}

function defineCountButtonPapge(lastPages:number, currentPage:number){
    const static_middle_page = lastPages - 4;

    if(lastPages <= 7){
        return Array.from({length:lastPages},(_,i)=>i+1);
    }

    if(currentPage <= 3){
        return [1,2,3,4,5, '...' , lastPages - 1, lastPages ];
    }

    if(currentPage > 3 && (currentPage + 5) <= lastPages){
        return[
            currentPage - 2,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            currentPage + 2,
            '...',
            lastPages - 1,
            lastPages
        ]
    }
    return [
        static_middle_page - 2,
        static_middle_page - 1,
        static_middle_page,
        static_middle_page + 1,
        static_middle_page + 2,
        lastPages - 1,
        lastPages
    ]
}

function WrapperPagination({ className, children , ...props}:React.ComponentProps<'div'>) {
    return ( 
        <div className={cn("flex justify-between mt-2 border-t-2 gap-2", className)}
            {...props}
        >
            {children}
        </div>
    );
} 

function SelectCountPage({value,onChangeValue}:{value:number,onChangeValue:(value:string)=>void}){
    return (
            <Select value={value.toString()} onValueChange={onChangeValue}>
                    
                <SelectTrigger 
                    className="w-16 h-7 py-0 text-xs border-b-1 border-t-1 rounded-xl focus-visible:border-0 focus-visible:transparent"
                    >
                    <SelectValue className="py-0" placeholder='Show'></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem className="text-xs" value="10" tabIndex={1}>10</SelectItem>
                    <SelectItem className="text-xs" value="20">20</SelectItem>
                    <SelectItem className="text-xs" value="50">50</SelectItem>
                    <SelectItem className="text-xs" value="100">100</SelectItem>
                </SelectContent>
            </Select>
    )
}

export {
    TablePagination,
    type TableConfigPaginationProps
}