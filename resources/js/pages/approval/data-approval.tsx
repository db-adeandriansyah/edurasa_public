// Components
import { TheadType, ThRefrencesType, ThType } from "@/components/table-pagination";
import { FieldProps } from "@/components/table-pagination/modal-in-table-pagination";
import { PrintAreaWithToolbarDefault } from "@/components/templating/workplace-provider-toolbar";
import ApprovalController from "@/controllers/approval-controller";
import FiturTemplate from "@/layouts/approval/approval-template";
import { Head } from "@inertiajs/react";
import { configModal } from "./config-modal-approval";


export default function DataApproval(){
    const barisPertama : ThType[] = [
            { label: 'No', key: 'no' },
            { label: 'Nama', key: 'name' },
            { label: 'Mendaftar Sebagai', key: 'role' },
            { label: 'Sekolah', key: 'school' },
            { label: 'Status', key: 'status' },
            { label: 'Akun Login', key: 'email' },
            { label: 'Aksi', key: 'actions' }
        ];
    const columnKey : ThRefrencesType[]= [
            { key: 'index', className:'text-center'},
            { key: 'name',className:'text-nowrap' },
            { key: 'peran', className:'text-center'},
            { key: 'data_sekolah.name' },
            { key: 'state_approval'},
            { key: 'email'},
            { key: 'action', actionKey:'user_id', actionKeyType: 'edit' }
        ];
    const rowsheader: TheadType[] = [
            { rowHeaders: barisPertama }
        ];

    const fieldsInputForm : FieldProps[] = [
            {
                id: 'inputId_user_name',
                key: 'name',
                name: 'name',
                label: 'Nama User',
                type: 'text',
                placeholder: 'Nama Akun/User',
                autocomplete: 'name',
                tabIndex: -1,
                autoFocus: false,
            }, {
                id: 'id_state_approval',
                key: 'state_approval',
                name: 'state_approval',
                label: 'Status Approve',
                type: 'text',
                placeholder: 'Status Approval',
                // autocomplete: 'name',
                tabIndex: -1,
                // autoFocus?: boolean;
                // rows?: number;
                // accept?: string;
                // className?: string;
            },
        ];
        
    return (
        <FiturTemplate title="Approval">
            <Head title="Approval"/>
            <PrintAreaWithToolbarDefault>
                <h1 className="text-center font-bold mb-2">Daftar User yang Perlu Diapprove</h1>
                <ApprovalController 
                    paginationHeaderLabel={rowsheader} 
                    paginationColumnKey={columnKey}
                    fieldsTemplate = {fieldsInputForm}
                    configModal = {configModal}
                />
            </PrintAreaWithToolbarDefault>
        </FiturTemplate>
    )
}