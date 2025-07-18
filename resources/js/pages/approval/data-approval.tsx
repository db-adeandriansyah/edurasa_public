// Components
import { TheadType, ThRefrencesType, ThType } from "@/components/table-pagination";

import { PrintAreaWithToolbarDefault } from "@/components/templating/workplace-provider-toolbar";
import ApprovalController from "@/containers/approval-controller";
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

    return (
        <FiturTemplate title="Approval">
            <Head title="Approval"/>
            <PrintAreaWithToolbarDefault>
                <h1 className="text-center font-bold mb-2">Daftar User yang Perlu Diapprove</h1>
                <div className="border-1 rounded-4xl ms-1 p-3 text-xs">Keterangan:
                    <ul className="list-outside list-disc">
                        <li>Di sini Anda perlu melakukan approve bagi user yang butuh diapprove</li>
                        <li>Anda harus memastikan bahwa user tersebut benar-benar sesuai dengan peran yang didaftarkan</li>
                        <li>Jika ragu, atau pengguna mendaftarkan tidak sesuai peran, silakan pilih selain status 'Approve' kemudian berikan alasannya</li>
                    </ul>
                </div>
                <ApprovalController 
                    paginationHeaderLabel={rowsheader} 
                    paginationColumnKey={columnKey}
                    configModal = {configModal}
                />
            </PrintAreaWithToolbarDefault>
        </FiturTemplate>
    )
}