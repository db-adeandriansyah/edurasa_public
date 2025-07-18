import { ApprovalEnum } from "./enums";

export interface ApprovalData {
    user_id: string;
    name:string;
    email:string;
    state_approval:ApprovalEnum;
    data_profile:DataProfil;
    data_sekolah:DataSekolah;
    peran:string;
    [key:string]:any
}
export interface DataProfil{
    ptk_id: number;
    nip:string;
    nuptk:string;
    siswa_id: number;
    nis:string;
}
export interface DataSekolah{
    //id sekolah
    id:number;
    name:string;
    npsn:string;
    type_school:string;
    start_at:Date
    end_at:Date|null

}

export interface AkunRegisteredByAdmin{
    // user_id:string
    /** email, for table/model User */
    user_email: string;
    user_password: string;
    user_state_approval: string;

    /** attribute for table/model profile */
    profile_peran: string;

    /** by conditional 'profile_peran', attribut for tabel ptk in nip*/
    ptk_nip: string;
    /** by conditional 'profile_peran', attribut for tabel ptk in nuptk*/
    ptk_nuptk: string;
    /** by conditional 'profile_peran', attribut for tabel siswa in nisn*/
    siswa_nisn: string;

    /** school data */
    /** if school exist on database, use this: but if this interface, must call from exist data*/
    // school_id: number;
    school_name: string;
    school_npsn: string
    school_type_school: string;


}