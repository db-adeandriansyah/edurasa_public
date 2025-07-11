
import { ModalCustomInterface } from "@/components/modals/type";
import {DataPaginationType, TheadType, ThRefrencesType} from "@/components/table-pagination";
import { FieldProps, ModalInTablePagination } from "@/components/table-pagination/modal-in-table-pagination";
import { TableConfigPaginationProps, TablePagination } from "@/components/table-pagination/table-paginaton";
import { ApprovalData } from "@/models/approval-user-data.d";
import {crudAction, type SharedData } from "@/types";
import { usePage } from "@inertiajs/react";

import { useCallback, useMemo, useState } from "react";

export default function DaftarAkunController({
        paginationHeaderLabel,
        paginationColumnKey,
        // fieldsTemplate,
        configModal,
    }:{
        paginationHeaderLabel : TheadType[],
        paginationColumnKey :  ThRefrencesType[],
        // fieldsTemplate : FieldProps[]
        configModal: ModalCustomInterface
    }) {

        const {data } = usePage<SharedData & {data:DataPaginationType<ApprovalData>}>().props;
        // console.log('data woy', data);
        // const {data  as ApprovalData } = usePage<SharedData>().props;
        const [configTable, setConfigTable] = useState<TableConfigPaginationProps<ApprovalData>>({
                dataawal: data,
                addSearch:true,
                addButton:true,
                refFindData: 'user_id'
            });
        
        const [showModal, setShowModal] = useState(false);
        const [dataModal, setDataModal] = useState<ApprovalData|undefined>();
        const [modeCrud, setModeCrud] = useState<crudAction>();
        
        const updateCurrentData = useCallback(()=>{
            console.log('edit dijalankan karena dependeny dataModal berubah', dataModal,'\n\n modecrud', modeCrud);
            
        },[dataModal, configTable]);
        
        //tambahkan fungsi onAdd pada configModal;
        configModal.onAdd = ()=>console.log('ditambah dari Controller dengan dataModal', dataModal)
        configModal.onUpdate = ()=>console.log('ditambah dari Controller dengan dataModal', dataModal);
        
    return (
        <>
            <TablePagination<ApprovalData> 
                configTable = {configTable} 
                columnsKey = {paginationColumnKey} 
                columnsSel = {paginationHeaderLabel}
                //triger untuk open/close modal
                showModal = {showModal}
                setShowModal = {setShowModal}
                // state untuk dataModal yang dipilih
                dataModal = {dataModal}
                setDataModal = {setDataModal}
                // setState/action untuk ditempatkan dimodal tipe Edit;
                editModal = {updateCurrentData}
                // saat modal ditampilkan, beritahu crud apa yang harus dilakukan
                setModeCrud = {setModeCrud}
                modeCrud = {modeCrud}
                // templates Form
                // fieldsTemplate = {fieldsTemplate}
                // templat modal = 
                configModal = {configModal}
            />
            
        </>

    );
}