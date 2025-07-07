// Components

import { createModalConfig } from "@/components/modals/config-overiding";
import { ModalCustomInterface } from "@/components/modals/type";
import { TheadType, ThRefrencesType, ThType } from "@/components/table-pagination";
import { FieldProps } from "@/components/table-pagination/modal-in-table-pagination";
import { PrintAreaWithToolbarDefault } from "@/components/templating/workplace-provider-toolbar";
import ApprovalController from "@/controllers/approval-controller";
import FiturTemplate from "@/layouts/approval/approval-template";
import { PeranEnum } from "@/models/enums";
import { Head } from "@inertiajs/react";


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
            { key: 'action', actionKey:'user_id', actionKeyType: 'edit-delete' }
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
    // const layoutModal: ModalCustomInterface ={
    //     title:'judul-judulan',
    //     description:'Haloo ini test'
    // };
    const configModal =  createModalConfig({
        title:'Approval',
        // description:'Haloo ini test',
        contentType: 'tabs-form',
        contentFields:[
            {id:'id_nama_user',label:'Nama User', key: 'name',name:'id',type:"text",placeholder:'Nama Lengkap',value:'', onChange:()=>{}},
            {id:'id_deskripsi1', key:'id_deskripsi1', name:'description',  type:'description', children:(
                <p>Periksalah data ini dengan benar!</p>
            )},
            {id:'id_status_approve',label:'Status Approve',key: 'state_approval', name:'state_aproval',type:"select-one",placeholder:'Email',value:'', onChange:()=>{},
                options:[
                {value:'',label:'Silakan Pilih',disabled:true},
                {value:'pending',label:'Pending'},
                {value:'approve',label:'Approve'},
                {value:'reject',label:'Tolak'},
                {value:'delete',label:'Hapus'},
                {value:'suspended',label:'Banned'},
            ], multiple:false, autoFocus:false
            },
            {id:'id_email',label:'Email',key: 'email',name:'email',type:"text",placeholder:'Email harus diisi',value:'', onChange:()=>{}, autoFocus:false},
            {id:'id_peran',label:'Mendaftar sebagai (peran di sekolah):',key: 'peran',name:'peran',type:"select-one",placeholder:'Peran',value:'', onChange:()=>{}, autoFocus:false,
            options:[
                {value:'',label:'Silakan Pilih',disabled:true},
                // {value:PeranEnum.PENGAWAS, label:'Siswa'},
                {value:PeranEnum.KEPSEK, label:'Kepala Sekolah'},
                {value:PeranEnum.GURU_KELAS,label:'Guru Kelas (SD)'},
                {value:PeranEnum.GURU_MAPEL, label:'Guru Mapel'},
                {value:PeranEnum.OPS, label:'Operator Sekolah'},
                {value:PeranEnum.PENJAGA, label:'Penjaga'},
                {value:PeranEnum.SISWA, label:'Siswa'},
                {value:PeranEnum.ORTU, label:'Orang Tua Siswa'},
                {value:PeranEnum.TAMU, label:'Tamu'},
            ]  
        },
            {id:'id_asal_sekolah',label:'Asal Sekolah',key: 'data_sekolah.name',name:'name',type:"text",placeholder:'Sekolah',value:'', onChange:()=>{}, autoFocus:false},
            {id:'id_type_school',label:'Tingkat',key: 'data_sekolah.type_school',name:'type_school',type:"select-one",placeholder:'Tingkat',value:'', onChange:()=>{}, autoFocus:false,
            options:[
                    {value:'',label:'Silakan Pilih',disabled:true},
                    {value:'SD',label:'SD'},
                    {value:'SMP',label:'SMP'},
                    {value:'SMA',label:'SMA'},
                ]
            },
            {id:'id_npsn',label:'npsn',key: 'data_sekolah.npsn',name:'npsn',type:"text",placeholder:'NPSN',value:'', onChange:()=>{}, autoFocus:false},
            {id:'id_nip',label:'NIP',key: 'data_profile.nip',name:'nip',type:"text",placeholder:'NIP',value:'', onChange:()=>{}, autoFocus:false},
            {id:'id_nuptk',label:'NUPTK',key: 'data_profile.nuptk',name:'nuptk',type:"text",placeholder:'NUPTK',value:'', onChange:()=>{}, autoFocus:false},
            {id:'id_nisn',label:'NISN',key: 'data_profile.nisn',name:'nisn',type:"text",placeholder:'NISN',value:'', onChange:()=>{}, autoFocus:false},
        ],
        messageDelete:'Yakin mau dihapus?',
        contentTabHeaders:[
            {
                value: 'data_akun',
                label: 'Data Akun',
                groupContents:[
                    {   
                        isCard: true,
                        label: 'Untuk Login',
                        fieldGroupKey: ['name','email']
                    },
                    {   
                        isCard: true,
                        label: 'Mendaftar sebagai',
                        fieldGroupKey: ['peran','data_sekolah.name']
                    },
                ]
            },
            {
                value: 'data_pribadi',
                label: 'Data Diri dan Sekolah',
                groupContents:[
                    {   
                        isCard: true,
                        label: 'Data Diri',
                        fieldGroupKey: ['name','data_profile.nip','data_profile.nuptk', 'data_profile.nisn']
                    },
                    {
                        isCard:true,
                        label: 'Data Sekolah',
                        fieldGroupKey: ['data_sekolah.name', 'data_sekolah.type_school', 'data_sekolah.npsn']
                    }
                ]
            },
            {
                value: 'data_approval',
                label: 'Status',
                groupContents:[
                    
                    {
                        isCard:false,
                        label: 'Status Approve',
                        fieldGroupKey: ['id_deskripsi1']
                    },{
                        isCard:true,
                        label: 'Status Approve',
                        fieldGroupKey: ['state_approval']
                    },
                ]
            },
            
        ],
        polymorphicFields:[
            {
                relation_type:"App\\Models\\Ptk",
                keyFields: ['data_profile.nip','data_profile.nuptk'],
                keyRef: 'profilable'
            },
            {
                relation_type:"App\\Models\\Siswa",
                keyFields: ['data_profile.nisn'],
                keyRef: 'profilable'
            },
        ]
    
    });
    console.log('configModal',configModal)
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