import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export type crudAction = "edit" | "delete" | "add" | "update" ;

export interface Auth {
    user: User;
    config_data:ConfigData
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    data:T[];
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles : PeranType[];
    [key: string]: unknown; // This allows for additional properties...
}

/**
 * @info: peranType diambil dari database di tabel Roles;
 */
export interface PeranType {
    uuid : string;
    name : string;
    permissions : PermissionType[];
}
/**
 * @info: permissionType diambil dari database di tabel Permission;
 */
export interface PermissionType {
    uuid:string;
    name:string;
}

export interface SchoolType{
    id: string;
    name : string;
    npsn : string;
    type_school : string;
    logo : string;
    kepsek_name : string;
    kepsek_nip : string;
    provinsi_name: string;
    use_uptd: boolean;
    kota_name: string;
    kota_status: string;
    kota_id: string;
    alamat: string;
    nss:string
    npsn:string;
    email: string;
    kode_pos: string;
    kelurahan_name: string;
    kelurahan_status: string;
    kecamatan_name: string;
    
    [key: string]: unknown;
};

export interface KopSurType {
    id: string;
    label_name: string;
    type_kop: string;
    konten: string;
}

export interface KelasAmpuType {
    id : string;
    name: string;
    jenjang_id: string;
    jenjang_name: string;
    walas_name: string;
    walas_nip: string;
}
export interface ConfigData {
    school: SchoolType;
    kop_surat: KopSurType[];
    kelas_ampu: KelasAmpuType[]|null;
    peran: PeranType[];
    [key: string]: unknown;
}
