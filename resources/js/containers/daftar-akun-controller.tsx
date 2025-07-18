
// import { ModalCustomInterface } from "@/components/modals/type";
import { ModalCustomInterface } from "@/components/interactive-modals/interfaces/type";
import {DataPaginationType, TheadType, ThRefrencesType} from "@/components/table-pagination";
import { TableConfigPaginationProps, TablePagination } from "@/components/table-pagination/table-paginaton";
import { AkunRegisteredByAdmin, ApprovalData } from "@/models/approval-user-data.d";

import {crudAction, type SharedData } from "@/types";
import { usePage } from "@inertiajs/react";

import {useState } from "react";

export default function DaftarAkunController({
        paginationHeaderLabel,
        paginationColumnKey,
        configModal,
        configModalAddForm
    }:{
        paginationHeaderLabel : TheadType[],
        paginationColumnKey :  ThRefrencesType[],
        configModal: ModalCustomInterface,
        configModalAddForm?:ModalCustomInterface
    }) {

        const {data } = usePage<SharedData & {data:DataPaginationType<ApprovalData>}>().props;
        
        const [configTable, setConfigTable] = useState<TableConfigPaginationProps<ApprovalData>>({
                dataawal: data,
                addSearch:true,
                addButton:true,
                refFindData: 'user_id'
            });
        
        const [showModal, setShowModal] = useState(false);
        
        const newAddData: AkunRegisteredByAdmin = {
                    user_email: '',
                    user_password: '',
                    user_state_approval: '',
                    profile_peran: '',
                    ptk_nip: '',
                    ptk_nuptk: '',
                    siswa_nisn: '',
                    school_name: '',
                    school_npsn: '',
                    school_type_school: ''
                };
        const [currentData, setCurrentData] = useState<ApprovalData|AkunRegisteredByAdmin>()
        const [modeCrud, setModeCrud] = useState<crudAction>();
        
        //tambahkan fungsi onAdd pada configModal;
        configModal.onAdd = ()=>console.log('ditambah dari Controller dengan dataModal untuk Add',  currentData)
        configModal.onUpdate = ()=>console.log('ditambah dari Controller dengan dataModal edited',currentData);
        
    return (
        <>
            <TablePagination<ApprovalData,AkunRegisteredByAdmin> 
                configTable = {configTable} 
                columnsKey = {paginationColumnKey} 
                columnsSel = {paginationHeaderLabel}
                showModal = {showModal}
                setShowModal = {setShowModal}
                setModeCrud = {setModeCrud}
                modeCrud = {modeCrud}
                configModal = {configModal}
                configModalAddModeCrud={configModalAddForm}
                newAddDataForm = {newAddData}
                currentData={currentData}
                setCurrentData={setCurrentData}
            />
        </>
    );
}