import DbSiswaTemplate from "@/layouts/fitur/db-siswa-template";
import { Head } from "@inertiajs/react";
import logo from "../../images/lamaso.webp"
import { DbsiswaController } from "@/controllers/dbsiswa-controller";

export default function Dbsiswa(){
    return(
        <DbSiswaTemplate title="Database Siswa">
            <Head title="Database Siswa"/>
            <DbsiswaController/>
            {/* <h1 className="font-semibold">Hello Db Siswa</h1>
            <p className="text-red-500">Hello Red</p>
            <img src={logo}/>
            <img src="https://lh3.googleusercontent.com/d/15gz7k42prJhAgBIjIwhaGKkRVx7qLBG5" className="size-24 bg-fixed rounded-full"/> */}
        </DbSiswaTemplate>
    )
}
