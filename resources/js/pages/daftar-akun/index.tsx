import { TheadType, ThRefrencesType, ThType } from "@/components/table-pagination";
import { PrintAreaWithToolbarDefault } from "@/components/templating/workplace-provider-toolbar";
import FiturTemplate from "@/layouts/approval/approval-template";
import { Head } from "@inertiajs/react";
import DaftarAkunController from "@/containers/daftar-akun-controller";
import { createConfigModal } from "@/components/interactive-modals/interfaces/default-config";
import { ConfigFieldDaftarAkun, ConfigFieldRegisteringAkun } from "./config-fields";

export default function(){
    const configModal = createConfigModal(ConfigFieldDaftarAkun);
    const configModalAdd = createConfigModal(ConfigFieldRegisteringAkun);
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
            { key: 'action', actionKey:'user_id', actionKeyType: 'edit-delete' }
        ];
    const rowsheader: TheadType[] = [
            { rowHeaders: barisPertama }
        ];

    return (
        <FiturTemplate title="Approval">
            <Head title="Approval"/>
            <PrintAreaWithToolbarDefault>
                <h1 className="text-center font-bold mb-2">Daftar seluruh Akun</h1>
                <div className="border-1 rounded-4xl p-3 text-xs">Keterangan:
                    <ul className="list-outside list-disc ms-1">
                        <li>Di sini Anda dapat mengubah status approve</li>
                        <li>Mengubah status approve pada dasarnya terkait kebijakan komunitas yang dibangun di aplikasi ini</li>
                        <li>Anda berhak menambah data user baru (meregistrasikan user baru) di sini. Data akun akan berimbas pada data Ptk/Siswa. Jika user yang didaftarkan berperan sebagai 'guru kelas, guru mapel, kepsek, dll' maka punya data di Ptk. Jika didaftarkan sebagai siswa, maka punya data di data siswa.</li>
                        <li>Jika menambahkan data di sini, maka user punya hak akses login</li>
                    </ul>
                </div>
                <DaftarAkunController
                    paginationHeaderLabel={rowsheader} 
                    paginationColumnKey={columnKey}
                    configModal = {configModal}
                    configModalAddForm = {configModalAdd}
                />
            </PrintAreaWithToolbarDefault>
        </FiturTemplate>
    )
}