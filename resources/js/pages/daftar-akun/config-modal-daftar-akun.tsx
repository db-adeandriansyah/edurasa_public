import { createModalConfig } from "@/components/modals/config-overiding";
import { RadioField } from "@/components/modals/type";
import { PeranEnum } from "@/models/enums";
import { PermissionType, SharedData } from "@/types";
import { usePage } from "@inertiajs/react";

export const fnconfigModal = ()=>{
    
    const {permission,dataschool} = usePage<SharedData  & {permission: PermissionType[], dataschool:Record<string,any>[]}>().props;
    const mapingPermission = permission.map((item, i)=>({id:'permission_'+i, value:item.name, name:'permission', label: item.name}));
    // const ListField = dataschool

    return createModalConfig({
        title:'Approval',
        // description:'Haloo ini test',
        contentType: 'tabs-form-only',
        contentFields:[
            {id:'id_nama_user',label:'Nama User', key: 'name',name:'id',type:"text",placeholder:'Nama Lengkap',value:'', onChange:()=>{}},
            {id:'id_deskripsi1', key:'id_deskripsi1', type:'description', children:(
                <p>Periksalah data ini dengan benar!</p>
            )},
            {id:'id_listitem', key:'log_approval', name:'log_approval', type:'timeline', list:
                {
                    key_time:'created_at',
                    key_description: 'description',
                    key_badge: 'status'
                }
            },
            {id:'id_email',label:'Email',key: 'email',name:'email',type:"text",placeholder:'Email harus diisi',value:'', onChange:()=>{}, autoFocus:false},
            {id:'id_password',label:'Password',key: 'password',name:'password',type:"text",placeholder:'Password (default:password)',value:'password', onChange:()=>{}, autoFocus:false},
            
            {id:'id_status_approve',label:'Status Approve',key: 'state_approval', name:'state_aproval',type:"select-one",placeholder:'Email',value:'', onChange:()=>{},
                options:[
                {value:'',label:'Silakan Pilih',disabled:true},
                // {value:'pending',label:'Pending'},
                {value:'approve',label:'Approve'},
                {value:'reject',label:'Tolak'},
                {value:'delete',label:'Hapus'},
                {value:'suspended',label:'Banned'},
            ], multiple:false, autoFocus:false
            },{id:'id_nip',label:'NIP',key: 'data_profile.nip',name:'nip',type:"text",placeholder:'NIP',value:'', onChange:()=>{}, autoFocus:false},
            {id:'id_nuptk',label:'NUPTK',key: 'data_profile.nuptk',name:'nuptk',type:"text",placeholder:'NUPTK',value:'', onChange:()=>{}, autoFocus:false},
            {id:'id_nisn',label:'NISN',key: 'data_profile.nisn',name:'nisn',type:"text",placeholder:'NISN',value:'', onChange:()=>{}, autoFocus:false},
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
            
            {id:'id_permission',label:'Hak Akses', key: 'permission',refKey:'permissions', name:'permissions',type:"combobox",placeholder:'Hak Akses',value:'', onChange:()=>{}, autoFocus:false,
                lists: mapingPermission
            },
        ],
        messageDelete:'Yakin mau dihapus?',
        contentTabHeaders:[
            {
                value: 'data_akun',
                label: 'Status Data Diri',
                groupContents:[
                    {   
                        isCard: true,
                        label: 'Untuk Login',
                        fieldGroupKey: ['email','password']
                    },
                    {   
                        isCard: true,
                        label: 'Data Diri',
                        fieldGroupKey: ['name','peran','data_profile.nip','data_profile.nuptk', 'data_profile.nisn']
                    },
                ]
            },
            {
                value: 'data_pribadi',
                label: 'Data Instansi',
                groupContents:[
                    {
                        isCard:true,
                        label: 'Data Sekolah Aktif',
                        fieldGroupKey: ['data_sekolah.name', 'data_sekolah.type_school', 'data_sekolah.npsn']
                    },
                    {
                        isCard:true,
                        label: 'Pengampu Kelas',
                        fieldGroupKey: []
                    }
                ]
            },
            {
                value: 'data_approval',
                label: 'Approval',
                groupContents:[
                    
                    {
                        isCard:true,
                        label: 'Riwayat Approval',
                        fieldGroupKey: ['id_deskripsi1','log_approval']
                    }, {
                        isCard:true,
                        label: 'Approval',
                        fieldGroupKey: ['state_approval']
                    }
                ]
            },
            
        ],
        contentTabHeadersOnly:['state_approval','log_approval'],
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
        ],
        interactiveField: [
            {
                fieldKeyHasInteractive:'state_approval',
                action:[
                    {
                        fieldValue:'reject',
                        resultThruthly:[
                            {id:'id_state_approval_rejek',label:'Alasan Reject', key: 'description',name:'description',type:"text",placeholder:'Tuliskan Alasannya',value:'', onChange:()=>{}},
                        ]
                    },
                    {
                        fieldValue:'delete',
                        resultThruthly:[
                            {id:'id_state_approval_rejek',label:'Alasan Hapus', key: 'description',name:'description',type:"text",placeholder:'Tuliskan Alasannya',value:'', onChange:()=>{}},
                        ]
                    },
                    {
                        fieldValue:'suspended',
                        resultThruthly:[
                            {id:'id_state_approval_rejek',label:'Alasan Banned', key: 'description',name:'description',type:"text",placeholder:'Tuliskan Alasannya',value:'', onChange:()=>{}},
                        ]
                    },
                ]
            },
            {
                fieldKeyHasInteractive:'peran',
                action:[
                    {
                        fieldValue:'guru kelas',
                        
                        resultThruthly:[
                            {id:'id_state_approval_guru_kelas', key: 'description', type:"description",children:<p className="text-xs text-red-500">Khusus Guru SD</p>},
                        ]
                    },
                    {
                        fieldValue:'guru mapel',
                        resultThruthly:[
                            
                            {id:'id_state_approval_mapel', key: 'description', type:"description",children:<p className="text-red-400 text-xs">Khusus Guru Bidang Studi (SD/SMP/SMA)</p>},
                        ]
                    },
                ]
            },
        ],
        closeOnOutsideClick: false   
    
    });
}

export const configModalAddForm =  ()=>{ 
    const {permission,dataschool} = usePage<SharedData  & {permission: PermissionType[], dataschool:Record<string,any>[]}>().props;
    const mapingPermission = permission.map((item, i)=>({id:'permission_'+i, value:item.name, name:'permission', label: item.name}));
    const mapingSchool = dataschool.map((item, i)=>({id:'school_'+i, value:item.name, name:'school', label: `(${item.npsn}) ${item.name}`}));
    
    return createModalConfig({
        title:'Approval',
        // description:'Haloo ini test',
        contentType: 'tabs-form',
        contentFields:[
            {id:'id_nama_user',label:'Nama Lengkap', key: 'name',name:'id',type:"text",placeholder:'Nama Lengkap',value:'', onChange:()=>{}},
            
            {id:'id_listitem', key:'log_approval', name:'log_approval', type:'timeline', list:
                {
                    key_time:'created_at',
                    key_description: 'description',
                    key_badge: 'status'
                }
            },
            {disabled:true, id:'id_status_approve',label:'Status Approve',key: 'state_approval', name:'state_aproval',type:"select-one",placeholder:'Email', onChange:()=>{}, 
                defaultValue:'approve',
                options:[
                {value:'',label:'Silakan Pilih',disabled:true},
                // {value:'pending',label:'Pending'},
                {value:'approve',label:'Approve'},
                {value:'reject',label:'Tolak'},
                {value:'delete',label:'Hapus'},
                {value:'suspended',label:'Banned'},
            ], multiple:false, autoFocus:false
            },
            {id:'id_email',label:'Email',key: 'email',name:'email',type:"text",placeholder:'Email harus diisi',value:'', onChange:()=>{}, autoFocus:false},
            {id:'id_password',label:'Password',key: 'password',name:'password',type:"text",placeholder:'Password (default:password)',value:'password', onChange:()=>{}, autoFocus:false},
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
            // {id:'id_asal_sekolah',label:'Asal Sekolah',key: 'data_sekolah.name',name:'name',type:"text",placeholder:'Sekolah',value:'', onChange:()=>{}, autoFocus:false},
            {id:'id_type_school',label:'Tingkat',key: 'data_sekolah.type_school',name:'type_school',type:"select-one",placeholder:'Tingkat',value:'', onChange:()=>{}, autoFocus:false,
            options:[
                    {value:'',label:'Silakan Pilih',disabled:true},
                    {value:'SD',label:'SD'},
                    {value:'SMP',label:'SMP'},
                    {value:'SMA',label:'SMA'},
                    {value:'lainnya',label:'lainnya'},
                ]
            },
            // {id:'id_npsn',label:'npsn',key: 'data_sekolah.npsn',name:'npsn',type:"text",placeholder:'NPSN',value:'', onChange:()=>{}, autoFocus:false},
            // {id:'id_nip',label:'NIP',key: 'data_profile.nip',name:'nip',type:"text",placeholder:'NIP',value:'', onChange:()=>{}, autoFocus:false},
            {id:'id_nuptk',label:'NUPTK',key: 'data_profile.nuptk',name:'nuptk',type:"text",placeholder:'NUPTK',value:'', onChange:()=>{}, autoFocus:false},
            {id:'id_nisn',label:'NISN',key: 'data_profile.nisn',name:'nisn',type:"text",placeholder:'NISN',value:'', onChange:()=>{}, autoFocus:false},
        ],
        contentTabHeaders:[
            {
                value: 'data_akun',
                label: 'Data Akun yaa',
                groupContents:[
                    {   
                        isCard: true,
                        label: 'Data Autentikasi (login)',
                        fieldGroupKey: ['name','email','password']
                    },
                    {   
                        isCard: true,
                        label: 'Mendaftar sebagai',
                        fieldGroupKey: ['peran','data_sekolah.name','data_sekolah.npsn']
                    },
                ]
            },
            {
                value: 'data_pribadi',
                label: 'Data Sekolah',
                groupContents:[
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
                        label: 'Log',
                        fieldGroupKey: ['id_deskripsi1','log_approval']
                    },{
                        isCard:true,
                        label: 'Status Approve',
                        fieldGroupKey: ['state_approval']
                    },
                ]
            },
            
        ],
        contentTabHeadersOnly:['state_approval'],
        interactiveField: [
            {
                fieldKeyHasInteractive:'state_approval',
                action:[
                    {
                        fieldValue:'reject',
                        resultThruthly:[
                            {id:'id_state_approval_rejek',label:'Alasan Reject', key: 'description',name:'description',type:"text",placeholder:'Tuliskan Alasannya',value:'', onChange:()=>{}},
                        ]
                    },
                    {
                        fieldValue:'delete',
                        resultThruthly:[
                            {id:'id_state_approval_rejek',label:'Alasan Hapus', key: 'description',name:'description',type:"text",placeholder:'Tuliskan Alasannya',value:'', onChange:()=>{}},
                        ]
                    },
                    {
                        fieldValue:'suspended',
                        resultThruthly:[
                            {id:'id_state_approval_rejek',label:'Alasan Banned', key: 'description',name:'description',type:"text",placeholder:'Tuliskan Alasannya',value:'', onChange:()=>{}},
                        ]
                    },
                ]
            },
            {
                fieldKeyHasInteractive:'peran',
                action:[
                    {
                        fieldValue:'guru kelas',
                        
                        resultThruthly:[
                            {id:'id_state_approval_guru_kelas', key: 'description', type:"description",children:<p className="text-xs text-red-500">Khusus Guru SD</p>},
                        ]
                    },
                    {
                        fieldValue:'guru mapel',
                        resultThruthly:[
                            {id:'id_state_approval_mapel', key: 'description', type:"description",children:<p className="text-red-400 text-xs">Khusus Guru Bidang Studi (SD/SMP/SMA)</p>},
                        ]
                    },
                ]
            },
            {
                fieldKeyHasInteractive:'data_sekolah.type_school',
                action:[
                    {
                        fieldValue:'SD',
                        resultThruthly: [{id:'id_school',label:'Sekolah Pilihan', key: 'school',refKey:'data_sekolah.id', name:'school',type:"radio",placeholder:'School',value:'', onChange:()=>{}, autoFocus:false,
                                    lists: dataschool.filter(s=>s.type_school === 'SD').map((item, i)=>({id:'school_'+i, value:item.id, name:'school', label: `(${item.npsn}) ${item.type_school} ${item.name}`})) as RadioField[],
                                    
                                }]
                    },
                    {
                        fieldValue:'SMP',
                        resultThruthly: [{id:'id_school',label:'Sekolah Pilihan', key: 'school',refKey:'data_sekolah.id', name:'school',type:"radio",placeholder:'School',value:'', onChange:()=>{}, autoFocus:false,
                                    lists: dataschool.filter(s=>s.type_school === 'SMP').map((item, i)=>({id:'school_'+i, value:item.id, name:'school', label: `(${item.npsn}) ${item.type_school} ${item.name}`})) as RadioField[],
                                    
                                }]
                    },
                    {
                        fieldValue:'SMA',
                        resultThruthly:[{id:'id_school',label:'Sekolah Pilihan', key: 'school',refKey:'data_sekolah.id', name:'school',type:"radio",placeholder:'School',value:'', onChange:()=>{}, autoFocus:false,
                                    lists: dataschool.filter(s=>s.type_school === 'SMA').map((item, i)=>({id:'school_'+i, value:item.id, name:'school', label: `(${item.npsn}) ${item.type_school} ${item.name}`})) as RadioField[],
                                    
                                }]
                    },
                    {
                        fieldValue:'lainnya',
                        resultThruthly:[
                            {id:'id_schoollain',disabled:true, label:'Sekolah Lain',key: 'data_sekolahlainnya.name',name:'data_sekolah.name',type:"text",placeholder:'Nama Sekolah Lain',value:'', onChange:()=>{}, autoFocus:false},
                            {id:'id_type_school',label:'Tingkat',key: 'data_sekolahlainnya.type_school',name:'type_school',type:"select-one",placeholder:'Tingkat',value:'', onChange:()=>{}, autoFocus:false,
                                options:[
                                        
                                        {value:'SD',label:'SD'},
                                        {value:'SMP',label:'SMP'},
                                        {value:'SMA',label:'SMA'},
                                    ]
                                },
                        ]

                    }
                ]
            },
            {
                fieldKeyHasInteractive:'school',
                action:[{
                    fieldValue:'lainnya',
                    resultThruthly:[{id:'id_schoollain',disabled:true, label:'Sekolah Lain',key: 'data_sekolah.name',name:'data_sekolah.name',type:"text",placeholder:'Nama Sekolah Lain',value:'', onChange:()=>{}, autoFocus:false}]

                }
                ]
            }
        ],
        closeOnOutsideClick: false   
    
    });
}