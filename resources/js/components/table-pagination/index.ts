
export interface ThType {
    label: string;
    key?: string;
    className?: string;
    colSpan?: number;
    rowSpan?: number;
    isImage?: boolean;
    isAction?: boolean;   
}
export type typeActionKey = "edit" | "delete" | "edit-delete";
export interface ThRefrencesType {
    key: string|'action'|'index'|null
    className?:string
    isImage?: boolean
    isAction?: boolean
    actionKey?:string | number
    actionKeyType?: typeActionKey;
}

export interface TheadType {
    rowHeaders: ThType[];
};

export interface ColumnsHeaderType {
    columns: TheadType[];
    // data: Record<string|number, any>[];
}
export interface LinkPaginationType{
    first:string;
    last:string|null
    next:string|null
    prev:string|null
}
export interface MetaPaginatonType{
    current_page:number;
    from:number
    last_page:number;
    links:LinkUrlPagination[];
    path:string;
    per_page:number;
    to: number;
    total:number;
}
export interface LinkUrlPagination{
    url : string;
    label:string;
    active:boolean
}
export interface DataPaginationType<T>{
    data: T[];
    links:LinkPaginationType;
    meta: MetaPaginatonType;
}
// export interface DataPaginationTypeProps extends SharedData{
//     data: DataPaginationType
// }