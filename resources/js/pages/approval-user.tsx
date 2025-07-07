import { PrintAreaWithToolbarDefault } from "@/components/templating/workplace-provider-toolbar";
import FiturTemplate from "@/layouts/fitur/fitur-template";
import { Head, usePage } from "@inertiajs/react";

export default function Approval(){
    const ptk = usePage().props.ptk as Record<string|number,string>[];
    const user = usePage().props.user as Record<string|number,string>[];
    console.log(ptk);
    console.log(user);
    return (
        <FiturTemplate title="Approval">
            <Head title="Database Siswa"/>
            <PrintAreaWithToolbarDefault>
                <h1 className="text-center font-bold mb-2">Daftar USER yang Punya NIP</h1>
                <table className="border-1 w-full text-xs">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama User</th>
                            <th>NIP</th>
                            <th>NUPTK</th>
                            <th>Peran di Profil</th>
                            <th>Spatie (Roles)</th>
                            <th>Akun Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((data,key)=>{
                                return <tr key={data.id}>
                                        <td className="border p-1 text-center">{key+1}</td>
                                        <td className="border p-1 text-start">{data.name}</td>
                                        <td className="border p-1 text-center">{data.profile?.profilable?.nip}</td>
                                        <td className="border p-1 text-center">{data.profile?.profilable?.nuptk}</td>
                                        <td className="border p-1 text-center">{data.profile && data.profile?.peran}</td>
                                        <td className="border p-1 text-center">{data?.roles.map((item,key)=><p key={key}>{item.name}</p>)}
                                        </td>
                                        <td className="border p-1 text-center">{data.email}</td>
                                    </tr>
                                
                            })
                        }
                    </tbody>
                </table>
                
            </PrintAreaWithToolbarDefault>
        </FiturTemplate>
    )
};
