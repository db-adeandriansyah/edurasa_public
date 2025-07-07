import { PrintAreaWithToolbarDefault } from "@/components/templating/workplace-provider-toolbar";
import FiturTemplate from "@/layouts/fitur/fitur-template";
import { Head, usePage } from "@inertiajs/react";
import { Fragment } from "react/jsx-runtime";


export default function ApprovalSiswaSekolah(){
    const data = usePage().props.data_sekolah as Record<string|number,string>[];
    const dataptk = usePage().props.data_ptk_sekolah as Record<string|number,string>[];
    
    console.log(data);
    console.log(dataptk);
    
    return (
        <FiturTemplate title="Approval">
            <Head title="Database Siswa"/>
            <PrintAreaWithToolbarDefault>
                <h2 className="text-center font-bold text-4xl">Daftar Sekolah dan Siswa yang punya akun</h2>
                <table className="border border-black leading-normal w-full text-xs">
                    <thead>
                        <tr>
                            <th className="bg-gray-300 border border-black text-center align-middle">#</th>
                            <th className="bg-gray-300 border border-black text-center align-middle">Nama Sekolah</th>
                            <th className="bg-gray-300 border border-black text-center align-middle">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((item,key)=>{
                                
                                return <tr key={key}>
                                    <td className="border border-black p-1 text-center">{key+1}</td>
                                    <td className="border border-black p-1">{item.type_school} {item.name}</td>
                                    <td className="border border-black p-1">{item.siswas_count} orang</td>
                                    
                                </tr>
                            })
                        }

                    </tbody>
                </table>
                <h2 className="mt-3 text-center font-bold">Daftar Siswa dan Sekolahnya</h2>
                <table className="w-full border-1 border-black text-xs">
                    <thead>
                        <tr>
                            <th className="border border-black text-center">#</th>
                            <th className="border border-black text-center">Nama Ptk</th>
                            <th className="border border-black text-center">Sekolah</th>
                            <th className="border border-black text-center">NISN</th>
                            <th className="border border-black text-center">NIS</th>
                            <th className="border border-black text-center">Akun</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataptk.map((ptk,i)=>{
                                return (
                                    <tr key={i}>
                                        <td className="border border-black p-1 text-center">{i+1}</td>
                                        <td className="border border-black p-1 text-start">{ptk.name}</td>
                                        <td className="border border-black p-1 text-start">{
                                            ptk.riwayatsekolahsiswa.map((sekolah,ii)=><p key={ii}>{sekolah.type_school} {sekolah.name}</p>)
                                        }</td>
                                        <td className="border border-black p-1 text-start">{ptk.nisn}</td>
                                        <td className="border border-black p-1 text-start">{
                                            ptk.riwayatsekolahsiswa.map((sekolah,ii)=><p key={ii}>{sekolah.pivot.nis}</p>)
                                        }</td>
                                        <td className="border border-black p-1 text-start">{ptk.profile?.user?.email}</td>
                                        
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </PrintAreaWithToolbarDefault>
            </FiturTemplate>
    )
}