import { ModalCustomInterface } from "@/components/modals/type";
import { DataPaginationType, TheadType, ThRefrencesType, ThType } from "@/components/table-pagination";
import { PrintAreaWithToolbarDefault } from "@/components/templating/workplace-provider-toolbar";
import PtkController from "@/containers/ptk-controller";
import FiturTemplate from "@/layouts/fitur/fitur-template";
import { Head, usePage } from "@inertiajs/react";
import { configPtkModal } from "./config-ptk-modal";


export default function() {
    const {asli} = usePage().props;
    console.log('asli', asli)
    const barisPertama : ThType[] = [
            { label: 'No', key: 'no' },
            { label: 'Nama PTK', key: 'name' },
            { label: 'NIP', key: 'nip' },
            { label: 'NUPTK', key: 'nuptk' },
            { label: 'Peran', key: 'role' },
            { label: 'Tempat Mengajar Aktif', key: 'type_school' },
            { label: 'Punya Akun Login', key: 'status' },
            { label: 'Aksi', key: 'actions' }
        ];
    const columnKey : ThRefrencesType[]= [
            { key: 'index', className:'text-center'},
            { key: 'name',className:'text-nowrap' },
            { key: 'nip',className:'text-nowrap' },
            { key: 'nuptk',className:'text-nowrap' },
            { key: 'peran', className:'text-center'},
            { key: 'tempat_mengajar_aktif.school_name', className:'text-center'},
            { key: 'callback', actionKey:'hasAkun', isCallback:(param)=>{
                return param?'Ya':'Tidak'
            }, className:'text-center' },
            { key: 'action', actionKey:'user_id', actionKeyType: 'edit' }
        ];
    const rowsheader: TheadType[] = [
            { rowHeaders: barisPertama }
        ];

    return (
        <FiturTemplate title="PTK">
            <Head title="PTK"/>
            <PrintAreaWithToolbarDefault>
                <h1 className="text-center font-bold mb-2 text-3xl">Daftar Seluruh PTK</h1>
                <div className="border-1 rounded-4xl p-3 text-xs">Keterangan:
                    <ul className="list-outside list-disc ms-1">
                        <li>Di sini Anda akan melihat daftar PTK, baik yang memiliki akses login ataupun tidak</li>
                        <li>Di sini Anda akan melihat peran masing-masing PTK</li>
                        <li>Di sini memungkinkan terdapat peran ganda dari PTK tertentu, misalnya data PTK kepsek, bisa jadi dalam satu masa tapel PTK Kepsek berisi ganda</li>
                        <li>Anda bisa menambahkan data PTK, tapi tidak ada fitur untuk menjadikan Ptk tersebut punya hak akses login. Gunakan di sini untuk menambah data untuk keperluan di luar akses login. Misalnya, untuk kebutuhan data nama kepsek atau walikelas.</li>
                    </ul>
                </div>
                <PtkController
                    paginationHeaderLabel={rowsheader} 
                    paginationColumnKey={columnKey}
                    configModal = {configPtkModal}
                />
            </PrintAreaWithToolbarDefault>
        </FiturTemplate>
    )
}