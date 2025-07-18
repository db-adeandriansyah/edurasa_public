
import { createConfigModal } from "@/components/interactive-modals/interfaces/default-config";
import { FieldApprovalConfig, FieldLogApprovalTimeLineConfig, FieldPeranConfig } from "@/components/interactive-modals/reusable-field-config";


export const configModal =  createConfigModal({
        title:'Approval',
        contentType: 'tabs-form-only',
        contentFields:[
            {id:'id_nama_user',label:'Nama User', key: 'name',name:'id',type:"text",placeholder:'Nama Lengkap',value:'', onChange:()=>{}},
            {id:'id_deskripsi1', key:'id_deskripsi1', type:'children', children:(
                <p>Periksalah data ini dengan benar!</p>
            )},
            FieldLogApprovalTimeLineConfig,
            FieldApprovalConfig,
            {id:'id_email',label:'Email',key: 'email',name:'email',type:"text",placeholder:'Email harus diisi',value:'', onChange:()=>{}, autoFocus:false},
            FieldPeranConfig,
            {id:'id_asal_sekolah',label:'Asal Sekolah',key: 'data_sekolah.name',name:'name',type:"text",placeholder:'Sekolah',value:'', onChange:()=>{}, autoFocus:false},
            {id:'id_type_school',label:'Tingkat',key: 'data_sekolah.type_school',name:'type_school',type:"selection-one",placeholder:'Tingkat',value:'', onChange:()=>{}, autoFocus:false,
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
            // FieldSearchForModal
        ],
        messageDelete:'Yakin mau dihapus?',
        layoutingTabs:[
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
                        label: 'Log',
                        fieldGroupKey: ['id_deskripsi1','log_approval']
                    },{
                        isCard:true,
                        label: 'Status Approve',
                        fieldGroupKey: ['state_approval','permission']
                    },
                ]
            },
            {
                value: 'cari',
                label: 'Cari',
                groupContents:[
                    {   
                        isCard: true,
                        label: 'cari',
                        fieldGroupKey: ['searching']
                    },
                ]
            }
            
        ],
        layoutingTabsOnly:['searching','state_approval'],
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
        closeOnOutsideClick: false   
    
    });
    