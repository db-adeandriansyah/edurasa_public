import React, { ChangeEvent, ChangeEventHandler, FormEventHandler, ReactEventHandler, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ColumnsHeaderType, DataPaginationType,LinkPaginationType,LinkUrlPagination,ThRefrencesType } from ".";
import { Button } from "../ui/button";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import axiosInstance from "@/lib/axios-instance";
import { useApi } from "@/hooks/use-api";
import { apiGet, FetchOptions } from "@/lib/api";
import { TableDefault, TBodyComponent, TdComponent, TdHeadComponent, TheadComponent, TrComponent, WrapperTablePagination } from "./my-table";

// import axios from "axios";

interface TablePaginationProps<T> {
    columnsSel: ColumnsHeaderType;
    columnsKey : ThRefrencesType[] ;
    data : DataPaginationType<T>;
}
function getValueByPath(obj: any, path: string) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}
function defineCountButtonPapge(lastPages:number, currentPage:number,links:LinkUrlPagination[]){
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
function TablePagination<T>({
    configTable,
    className, 
    ...props
    }:React.ComponentProps<'table'> & {configTable:TablePaginationProps<T>}
    ){
        const columnsSel = configTable.columnsSel;
        const columnsKey = configTable.columnsKey;
        /** Data Pagination 
         * Semua hal terkait action dan handler akan terjadi di sini, tingkat atas hanya sebagai pengirim render utama
        */
        const {request, loading} = useApi();
        const {data, links, meta} = configTable.data;
        const urlActive = meta.links.find(s=>s.active);
        const [dataLinkActive, setDataLinkActive] = useState<LinkUrlPagination>();
        const [dataRow, setDataRow] = useState<T[]>([]);
        const [dataLinks, setDataLink] = useState<LinkPaginationType>();
        const [dataFrom, setDataFrom] = useState<number>(1);
        const [dataPerPage, setDataPerPage] = useState<number>(20);
        const [dataTotal, setDataTotal] = useState<number>();
        const [dataTotalPage, setDataTotalPage] = useState<number>(0);
        const [dataCurrentPage, setDataCurrentPage] = useState<number>(1);
        const [dataMetaLinks, setDataMetaLinks] = useState<LinkUrlPagination[]|[]>([]);
         
        const [buttonPage, setButtonPage] = useState<(string | number)[]>([]);;
        useEffect(()=>{
            console.log('diload/render sekali saja, dan ini urlActivenya', urlActive, data, meta );
            setDataLinkActive(()=>meta.links.find(s=>s.active));
            setDataRow(data);
            setDataFrom(meta.from);
            setDataLink(links);
            setDataPerPage(meta.per_page);
            setDataTotal(meta.total);
            setDataTotalPage(meta.last_page);
            setDataCurrentPage(meta.current_page);
            setDataMetaLinks(meta.links);

            // setButtonPage(()=>defineCountButtonPapge(r.meta.links.length-2,Number(r.meta.current_page)));
            const ButtonPages = defineCountButtonPapge(meta.last_page,Number(meta.current_page),meta.links);
            
            setButtonPage(ButtonPages);
            


        },[]
        );
        async function fetchData(numb:number){
            console.log(dataLinkActive);
            const url = new URL(dataLinkActive?.url as string);
            const param = new URLSearchParams(url.search);
            const FetchOptionsPage:FetchOptions = {
                params: {
                    'page': 1,
                    'search': param.get('search'),
                    'per_page':numb
                }
            }
            await request(() => apiGet(route('approval-api'), FetchOptionsPage,false), {
                    successMessage: 'Berhasil memuat data',
                    errorMessage: 'Gagal memanggil data.',
                    onSuccess: (r) => {
                        
                            console.log('data panggil,',r);
                            setDataRow(r.data);
                            setDataFrom(r.meta.from);
                            setDataLink(r.links);
                            setDataPerPage(r.meta.per_page);
                            setDataTotal(r.meta.total);
                            setDataTotalPage(r.meta.last_page)
                            setDataMetaLinks(r.meta.links)
                            setDataCurrentPage(r.meta.current_page);
                            // const ButtonPages = defineCountButtonPapge(r.data.meta.links.length-2,Number(r.data.meta.current_page));
                            
                            // setButtonPage(ButtonPages);
                            setButtonPage(()=>defineCountButtonPapge(r.meta.last_page,Number(r.meta.current_page),r.meta.links));
                            // setButtonPage(()=>defineCountButtonPapge(dataTotalPage,dataCurrentPage,r.meta.links));
                            setDataLinkActive(()=> r.meta.links.find((s:{ active : boolean})=>s.active));
                            
                    },
                    onError:(err)=>{
                        console.log(err);
                        setDataRow([]);
                    }
                });

        }
        async function onChangePage(e: React.MouseEvent<HTMLButtonElement>){
            e.preventDefault();
            /** pake useAPi */
            const url = new URL(e.currentTarget.dataset.url  as string);
            const param = new URLSearchParams(url.search)
            const FetchOptionsPage = {
                params: {
                    'page': param.get('page'),
                    'search': param.get('search'),
                    'per_page':dataPerPage
                    }
                // headers?: Headers
                };

            await request(() => apiGet(route('approval-api'), FetchOptionsPage,false), {
                successMessage: 'Berhasil memanggil data di halaman ' + param.get('page'),
                errorMessage: 'Gagal memanggil data.',
                onSuccess: (r) => {
                    
                        console.log('data panggil by axios,',r);
                        setDataRow(r.data);
                        setDataFrom(r.meta.from);
                        setDataLink(r.links);
                        setDataPerPage(r.meta.per_page);
                        setDataTotal(r.meta.total);
                        setDataTotalPage(r.meta.last_page)
                        setDataMetaLinks(r.meta.links)
                        setDataCurrentPage(r.meta.current_page);
                        // const ButtonPages = defineCountButtonPapge(r.data.meta.links.length-2,Number(r.data.meta.current_page));
                        
                        // setButtonPage(ButtonPages);
                        setButtonPage(()=>defineCountButtonPapge(r.meta.last_page,Number(r.meta.current_page),r.meta.links));
                        setDataLinkActive(()=> r.meta.links.find((s:{ active : boolean})=>s.active));
                        
                },
                onError:(err)=>{
                    console.log(err);
                    setDataRow([]);
                }
            });
        }
        async function onHandleCountPage(value:string){
            
            
            const numb = Number(value);
            setDataPerPage(numb);
            fetchData(numb);
            
            
            
        }
        // 
        return (
            <>
            <WrapperTablePagination>
                    <TableDefault>
                        <TheadComponent>
                            {
                                columnsSel.columns.map((column, index) => {
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
                                                            // return <td key={i+index}/>
                                                            return <TdComponent className={col.className} key={i+index}/>
                                                        }else if(col.key === 'index'){
                                                            // return <td key={i+index}>{i+index+1}</td>
                                                            return <TdComponent className={col.className}  key={i+index}>{index+dataFrom}</TdComponent>
                                                        }else if(col.key ==='action'){
                                                            // return <td key={i+index}>tombol</td>
                                                            return <TdComponent className={col.className}  key={i+index}>tombol</TdComponent>
                                                        }else{
                                                            // return <td key={i+index}>{getValueByPath(data, col.key)}</td>
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
                   <SelectCountPage value={dataPerPage} onChangeValue={onHandleCountPage}/>
                </div>
                <div className="grid grid-cols-6 md:flex text-xs border-b-1 border-t-1 rounded-lg">
                    <Button className={`text-xs py-0 h-5`} variant={'ghost'} type="button" onClick={onChangePage} data-url={dataLinks?.first} disabled={!dataLinks?.first}>Awal</Button>
                    <Button className="text-xs py-0 h-5" variant={'ghost'} type="button" onClick={onChangePage} data-url={dataLinks?.prev} disabled={!dataLinks?.prev}><ArrowLeft/></Button>
                    {
                        buttonPage.map((btn,index)=>{
                            const getUrlPage = dataMetaLinks.find(s=>s.label == btn);

                            if(!getUrlPage){
                                return (<span className="py-0 h-5 align-middle px-3" key={index}>{btn}</span>);
                            }
                            
                            return (<Button key={index} className={`text-xs h-5 px-2 py-0 ${getUrlPage.active?'bg-sky-400':''}`} variant={'ghost'} type="button" onClick={onChangePage} data-url={getUrlPage.url} disabled={!getUrlPage.url}>{btn}</Button>)
                        })
                    }
                    <Button className="text-xs py-0 h-5" variant={'ghost'} type="button" onClick={onChangePage} data-url={dataLinks?.next} disabled={!dataLinks?.next}><ArrowRight/></Button>
                    <Button className="text-xs py-0 h-5" variant={'ghost'} type="button" onClick={onChangePage} data-url={dataLinks?.last} disabled={!dataLinks?.last}>Akhir</Button>
                </div>
                    
                
            </WrapperPagination>
            </>
    );
}
function SelectCountPage({value,onChangeValue}:{value:number,onChangeValue:(value:string)=>void}){
    return (
            <Select value={value.toString()} onValueChange={onChangeValue}>
                    
                <SelectTrigger className="w-16 h-7 py-0 text-xs border-b-1 border-t-1 rounded-xl focus-visible:border-0 focus-visible:transparent">
                    <SelectValue className="py-0" placeholder='Show'></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem className="text-xs" value="10">10</SelectItem>
                    <SelectItem className="text-xs" value="20">20</SelectItem>
                    <SelectItem className="text-xs" value="50">50</SelectItem>
                    <SelectItem className="text-xs" value="100">100</SelectItem>
                </SelectContent>
            </Select>
        
    )
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

export {
    TablePagination
}