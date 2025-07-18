import { createModalConfig } from "@/components/modals/config-overiding";
import { PeranEnum } from "@/models/enums";

export const configPtkModal =  createModalConfig({
        title:'PTK',
        // description:'Haloo ini test',
        contentType: 'tabs-form',
        contentFields:[
            {id:'id_deskripsi1', key:'id_deskripsi1', type:'description', children:(
                <p>Periksalah data ini dengan benar!</p>
            )},
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
    