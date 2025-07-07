import { ApprovalEnum } from "./enums";

export interface ApprovalData {
    user_id: string;
    name:string;
    email:string;
    state_approval:ApprovalEnum;
    data_profile:DataProfil;
    data_sekolah:DataSekolah;
    peran:string;
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