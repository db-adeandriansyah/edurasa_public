import { ModalCustomInterface } from "@/components/interactive-modals/interfaces/type"
import { FieldApprovalConfig, FieldLogApprovalTimeLineConfig, HasReactiveOnSelectedField } from "@/components/interactive-modals/reusable-field-config"
import { PeranEnum } from "@/models/enums";



export const ConfigFieldDaftarAkun: Partial<ModalCustomInterface> = {
        title:'Approval',
        // description:'Haloo ini test',
        defineTitle:()=>'Tambah Akun',
        contentType: 'tabs-form-only',
        contentFields:[
            {id:'id_nama_user',label:'Nama Lengkap', key: 'name',name:'id',type:"text",placeholder:'Nama Lengkap'},
            FieldLogApprovalTimeLineConfig,
            FieldApprovalConfig ,
            {id:'id_email',label:'Email',key: 'email',name:'email',type:"text",placeholder:'Email harus diisi',},
            {id:'id_password',label:'Password',key: 'password',name:'password',type:"password",placeholder:'Password (default:password)', autoFocus:false},
            {id:'id_peran',label:'Mendaftar sebagai (peran di sekolah):',key: 'peran',name:'peran',type:"selection-one",placeholder:'Peran',
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
            ],
        },
            // 
            {id:'id_type_school',label:'Tingkat',key: 'data_sekolah.type_school',name:'type_school',type:"selection-one",placeholder:'Tingkat',
                options:[
                    {value:'',label:'Silakan Pilih',disabled:true},
                    {value:'SD',label:'SD'},
                    {value:'SMP',label:'SMP'},
                    {value:'SMA',label:'SMA'},
                    {value:'lainnya',label:'lainnya'},
                ]
            },
            {id:'id_npsn',label:'npsn',key: 'data_sekolah.npsn',name:'npsn',type:"text",placeholder:'NPSN'},
            {id:'id_asal_sekolah',label:'Instansi Sekolah',key: 'data_sekolah.name',name:'name',type:"text",placeholder:'Sekolah'},
            {id:'id_nip',label:'NIP',key: 'data_profile.nip',name:'nip',type:"text",placeholder:'NIP'},
            {id:'id_nuptk',label:'NUPTK',key: 'data_profile.nuptk',name:'nuptk',type:"text",placeholder:'NUPTK'},
            {id:'id_nisn',label:'NISN',key: 'data_profile.nisn',name:'nisn',type:"text",placeholder:'NISN'},
        ],
        layoutingTabs:[
            {
                value: 'data_akun',
                label: 'Data Akun',
                groupContents:[
                    {   
                        isCard: true,
                        label: 'Data Autentikasi (login)',
                        fieldGroupKey: ['name','email','password']
                    },
                    {   
                        isCard: true,
                        label: 'Mendaftar sebagai',
                        fieldGroupKey: ['peran','data_profile.nip', 'data_profile.nuptk', 'data_profile.nisn']
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
        layoutingTabsOnly:['state_approval'],
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
        messageDelete:'Hello World',
        closeOnOutsideClick: false   
    
    }

export const ConfigFieldRegisteringAkun: Partial<ModalCustomInterface> = {
        title:'Approval',
        // description:'Haloo ini test',
        defineTitle:()=>'Tambah Akun',
        contentType: 'tabs-form',
        contentFields:[
            {id:'id_nama_user',label:'Nama Lengkap', key: 'user_name',name:'id',type:"text",placeholder:'Nama Lengkap'},
            FieldLogApprovalTimeLineConfig,
            FieldApprovalConfig ,
            {id:'id_email',label:'Email',key: 'user_email',name:'user_email',type:"text",placeholder:'Email harus diisi',},
            {id:'id_password',label:'Password',key: 'user_password',name:'password',type:"password",placeholder:'Password (default:password)', autoFocus:false},
            {id:'id_peran',label:'Mendaftar sebagai (peran di sekolah):',key: 'user_peran',name:'peran',type:"selection-one",placeholder:'Peran',
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
            ],hasReactive: HasReactiveOnSelectedField
        },
            // 
            {id:'id_type_school',label:'Tingkat',key: 'school_type_school',name:'type_school',type:"selection-one",placeholder:'Tingkat',
                options:[
                    {value:'',label:'Silakan Pilih',disabled:true},
                    {value:'SD',label:'SD'},
                    {value:'SMP',label:'SMP'},
                    {value:'SMA',label:'SMA'},
                    {value:'lainnya',label:'lainnya'},
                ]
            },
            {id:'id_npsn',label:'npsn',key: 'school_npsn',name:'npsn',type:"text",placeholder:'NPSN'},
            // {id:'id_asal_sekolah',label:'Instansi Sekolah',key: 'data_sekolah.name',name:'name',type:"text",placeholder:'Sekolah'},
            // {id:'id_nip',label:'NIP',key: 'data_profile.nip',name:'nip',type:"text",placeholder:'NIP'},
            // {id:'id_nuptk',label:'NUPTK',key: 'data_profile.nuptk',name:'nuptk',type:"text",placeholder:'NUPTK'},
            // {id:'id_nisn',label:'NISN',key: 'data_profile.nisn',name:'nisn',type:"text",placeholder:'NISN'},
        ],
        layoutingTabs:[
            {
                value: 'data_akun',
                label: 'Data Akun',
                groupContents:[
                    {   
                        isCard: true,
                        label: 'Data Autentikasi (login)',
                        fieldGroupKey: ['user_name','user_email','user_password']
                    },
                    {   
                        isCard: true,
                        label: 'Mendaftar sebagai',
                        fieldGroupKey: ['user_peran']
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
                        fieldGroupKey: ['school_name', 'school_type_school', 'school_npsn']
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
        layoutingTabsOnly:['state_approval'],
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
        messageDelete:'Hello World',
        closeOnOutsideClick: false   
    
    }
