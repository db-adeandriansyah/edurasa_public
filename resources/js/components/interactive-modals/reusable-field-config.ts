import { PeranEnum } from "@/models/enums";
import { FieldCheckBox, FieldRadio, FieldReaction, FieldSearch, FieldSelection, FieldTimeLine } from "./interfaces/type-fields";


export const FieldApprovalConfig: FieldSelection = {
    id:'id_status_approve',
    label:'Status Approve',
    key: 'state_approval', 
    name:'state_aproval',
    type:"selection-one",
    placeholder:'Email',
    options:[
        {value:'',label:'Silakan Pilih',disabled:true},
        {value:'approve',label:'Approve'},
        {value:'reject',label:'Tolak'},
        {value:'delete',label:'Hapus'},
        {value:'suspended',label:'Banned'},
    ], 
    autoFocus:false,
    hasReactive:[
        {
            fieldValue: 'reject',
            renderField: [
                {   id: 'id_keterangan_approve',
                    label: 'Alasan Ditolak',
                    key: 'log_alasan_description',
                    name:'description',
                    type:"text",
                    placeholder:'Alasan Ditolak',
                    
                },
                {   id: 'id_keterangan_oleh',
                    label: 'Alasan Ditolak',
                    key: 'log_alasan_oleh',
                    name:'log_alasan_oleh',
                    type:"hidden",
                    value:'ini kebawa ga',
                    placeholder:' ',
                    needEffect:true
                },
            ]
        },
        {
            fieldValue: 'delete',
            renderField: [
                {   id: 'id_keterangan_approve',
                    label: 'Alasan Dihapus',
                    key: 'log_alasan_description',
                    name:'description',
                    type:"text",
                    placeholder:'Alasan Dihapus'
                },
                {   id: 'id_keterangan_oleh',
                    label: 'Alasan Dihapus',
                    key: 'log_alasan_oleh',
                    name:'log_alasan_oleh',
                    type:"hidden",
                    value:'ini kebawa ga',
                    placeholder:' ',
                    needEffect:true
                },
            ]
        },
        {
            fieldValue: 'suspended',
            renderField: [
                {   
                    id: 'id_keterangan_approve',
                    label: 'Alasan Dibanned',
                    key: 'log_alasan_description',
                    name:'description',
                    type:"text",
                    placeholder:'Alasan Dibanned'
                },
                {   id: 'id_keterangan_oleh',
                    label: 'Alasan Dibanned',
                    key: 'log_alasan_oleh',
                    name:'log_alasan_oleh',
                    type:"hidden",
                    value:'ini kebawa ga',
                    placeholder:' ',
                    needEffect:true
                },
            ]
        },
        
    ]
}

export const FieldPeranConfig:FieldSelection = {
    id:'id_peran',
    label:'Mendaftar sebagai (peran di sekolah):',
    key: 'peran',
    name:'peran',
    type:"selection-one",
    placeholder:'Peran',
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
}

export const FieldPeranRadioConfig:FieldRadio = {
    id:'id_peran',
    label:'Mendaftar sebagai (peran di sekolah):',
    key: 'peran',
    globalname:'peran',
    type:"radio",
    options:[
        {id:'id_radio_1', name:'peran', value:PeranEnum.KEPSEK, label:'Kepala Sekolah'},
        {id:'id_radio_2', name:'peran', value:PeranEnum.GURU_KELAS,label:'Guru Kelas (SD)'},
        {id:'id_radio_3', name:'peran', value:PeranEnum.GURU_MAPEL, label:'Guru Mapel'},
        {id:'id_radio_4', name:'peran', value:PeranEnum.OPS, label:'Operator Sekolah'},
        {id:'id_radio_5', name:'peran', value:PeranEnum.PENJAGA, label:'Penjaga'},
        {id:'id_radio_6', name:'peran', value:PeranEnum.SISWA, label:'Siswa'},
        {id:'id_radio_7', name:'peran', value:PeranEnum.ORTU, label:'Orang Tua Siswa'},
        {id:'id_radio_8', name:'peran', value:PeranEnum.TAMU, label:'Tamu'},
    ]  
}

export const FieldLogApprovalTimeLineConfig:FieldTimeLine ={
    id:'id_listitem', 
    key:'log_approval',  
    type:'timeline', 
    timelineitems: {
        key_time:'created_at',
        key_description: 'description',
        key_badge: 'status',
        badge_className:[
            {
                valueIf:'pending',
                className:'bg-yellow-600'
            },
            {
                valueIf:'approve',
                className:'bg-green-400 text-blue-600'
            },
            {
                valueIf:'reject',
                className:'bg-rose-500'
            }
        ]
    }
}
const mapingPermission = [
    {
    id:'permission_1', value:'view Approval', name:'permission', label: 'View Approval'
    },
    {
    id:'permission_2', value:'view Absensi Siswa', name:'permission', label: 'view Absensi Siswa'
    },
    {
    id:'permission_3', value:'view Data Siswa', name:'permission', label: 'view Data Siswa'
    },
    {
    id:'permission_4', value:'view KBM', name:'permission', label: 'view KBM'
    },
]
    
export function FieldPermissionCheckBoxByInertia (): FieldCheckBox{
    
    return {id:'id_permission',label:'Hak Akses', key: 'permissions', globalname:'permissions',type:"combobox",
                options: mapingPermission
            }
}

export const HasReactiveOnSelectedField: FieldReaction[] = [
                {
                    fieldValue: PeranEnum.KEPSEK, 
                    renderField: [
                        {
                            id:'if_kepsek_selected_nip', name:'nip', key:'ptk_nip', type:'text', label:'NIP'
                        },
                        {
                            id:'if_kepsek_selected_nuptk', name:'nuptk', key:'ptk_nip', type:'text', label:'NUPTK'
                        },
                    ]
                },
                {
                    fieldValue: PeranEnum.GURU_KELAS, 
                    renderField: [
                        {
                            id:'if_gk_selected_nip', name:'nip', key:'ptk_nip', type:'text', label:'NIP'
                        },
                        {
                            id:'if_gk_selected_nuptk', name:'nuptk', key:'ptk_nip', type:'text', label:'NUPTK'
                        },
                    ]
                },
                {
                    fieldValue: PeranEnum.GURU_MAPEL, 
                    renderField: [
                        {
                            id:'if_gmp_selected_nip', name:'nip', key:'ptk_nip', type:'text', label:'NIP'
                        },
                        {
                            id:'if_gmp_selected_nuptk', name:'nuptk', key:'ptk_nip', type:'text', label:'NUPTK'
                        },
                    ]
                },
                {
                    fieldValue: PeranEnum.SISWA, 
                    renderField: [
                        {
                            id:'if_siswa_selected_nip', name:'nisn', key:'siswa_nisn', type:'text', label:'NISN'
                        },
                    ]
                },
            ];

/** example field to search on external data. Source will be attrieve from zigy route name */
export const FieldSearchForModal:FieldSearch = {
    id: 'field_search',
    type:'search',
    key:'searching',
    
    label:'Hasil Pencarian Tidak Ditemukan',

    routeSearch:route('dataakunapi'),
    
    paramSearch: 'search',
    
    wrapResultField: {
        id:'timpain_idnya_aja', 
        key: 'search_school_id', 
        globalname : 'school_id', 
        globalkey : 'school_id', 
        type: 'radio',
        label:'Hasil Pencarian',
        options:[]
    },
    countPerPage:3,
    childOptionKeyLabel: 'name',
    childOptionKeyValue: 'name',

}