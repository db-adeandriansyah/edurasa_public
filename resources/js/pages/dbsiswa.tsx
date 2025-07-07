import DbSiswaTemplate from "@/layouts/fitur/db-siswa-template";
import { Head } from "@inertiajs/react";
import logo from "../../images/lamaso.webp"
import { DbsiswaController } from "@/controllers/dbsiswa-controller";

export default function Dbsiswa(){
    return(
        <DbSiswaTemplate title="Database Siswa">
            <Head title="Database Siswa"/>
            <DbsiswaController/>
        </DbSiswaTemplate>
    )
}
