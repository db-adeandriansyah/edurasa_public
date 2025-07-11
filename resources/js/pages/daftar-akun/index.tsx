import { TheadType, ThRefrencesType, ThType } from "@/components/table-pagination";
import { PrintAreaWithToolbarDefault } from "@/components/templating/workplace-provider-toolbar";
import FiturTemplate from "@/layouts/approval/approval-template";
import { Head } from "@inertiajs/react";
import { fnconfigModal } from "./config-modal-daftar-akun";
import DaftarAkunController from "@/controllers/daftar-akun-controller";

export default function(){
    
    const configModal = fnconfigModal();
    // const {permission} = usePage().props;
    // const test = getValueByPath(configModal,'contentTabHeaders[3].groupContents');
    // console.log(permission, test)
    const barisPertama : ThType[] = [
            { label: 'No', key: 'no' },
            { label: 'Email', key: 'email' },
            { label: 'Nama', key: 'name' },
            { label: 'Mendaftar Sebagai', key: 'role' },
            { label: 'Tingkat', key: 'type_school' },
            { label: 'Nama Sekolah', key: 'school' },
            { label: 'Status', key: 'status' },
            { label: 'Aksi', key: 'actions' }
        ];
    const columnKey : ThRefrencesType[]= [
            { key: 'index', className:'text-center'},
            { key: 'email'},
            { key: 'name',className:'text-nowrap' },
            { key: 'peran', className:'text-center'},
            { key: 'data_sekolah.type_school', className:'text-center'},
            { key: 'data_sekolah.name' },
            { key: 'state_approval'},
            { key: 'action', actionKey:'user_id', actionKeyType: 'edit' }
        ];
    const rowsheader: TheadType[] = [
            { rowHeaders: barisPertama }
        ];

    
    return (
        <FiturTemplate title="Approval">
            <Head title="Approval"/>
            <PrintAreaWithToolbarDefault>
                <h1 className="text-center font-bold mb-2">Daftar seluruh Akun</h1>
                <DaftarAkunController
                                    paginationHeaderLabel={rowsheader} 
                                    paginationColumnKey={columnKey}
                                    configModal = {configModal}
                                />
            </PrintAreaWithToolbarDefault>
        </FiturTemplate>
    )
}