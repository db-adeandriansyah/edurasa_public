
// import { ModalCustomInterface } from "@/components/modals/type";
import { ModalCustomInterface } from "@/components/interactive-modals/interfaces/type";
import {DataPaginationType, TheadType, ThRefrencesType} from "@/components/table-pagination";
import { TableConfigPaginationProps, TablePagination } from "@/components/table-pagination/table-paginaton";
import { ApprovalData } from "@/models/approval-user-data.d";
import {crudAction, type SharedData } from "@/types";
import { usePage } from "@inertiajs/react";

import {useState } from "react";

export default function ApprovalController({
        paginationHeaderLabel,
        paginationColumnKey,
        configModal,
    }:{
        paginationHeaderLabel : TheadType[],
        paginationColumnKey :  ThRefrencesType[],
        configModal: ModalCustomInterface
    }) {

        const {data } = usePage<SharedData & {data:DataPaginationType<ApprovalData>}>().props;
        
        const [configTable, setConfigTable] = useState<TableConfigPaginationProps<ApprovalData>>({
                dataawal: data,
                refFindData: 'user_id'
            });
        
        const [showModal, setShowModal] = useState(false);
        
        const [currentData, setCurrentData] = useState<ApprovalData|ApprovalData>()
        const [modeCrud, setModeCrud] = useState<crudAction>();
        
        //tambahkan fungsi onAdd pada configModal;
        configModal.onAdd = ()=>console.log('ditambah dari Controller dengan dataModal untuk Add',  currentData)
        configModal.onUpdate = ()=>console.log('ditambah dari Controller dengan dataModal edited',currentData);
        
    return (
        <>
            <TablePagination<ApprovalData> 
                configTable = {configTable} 
                columnsKey = {paginationColumnKey} 
                columnsSel = {paginationHeaderLabel}
                //triger untuk open/close modal
                showModal = {showModal}
                setShowModal = {setShowModal}
                
                setModeCrud = {setModeCrud}
                modeCrud = {modeCrud}
                // templates Form
                // fieldsTemplate = {fieldsTemplate}
                // templat modal = 
                configModal = {configModal}
                
                currentData={currentData}
                setCurrentData={setCurrentData}
            />
            
        </>

    );
}