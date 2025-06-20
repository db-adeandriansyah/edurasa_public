import MyMenu from "@/components/my-components/my-menu";
import LayoutAplikasi from "@/layouts/layout-aplikasi";
import { PermissionType } from "@/types";
import { Head, usePage } from "@inertiajs/react";


export default function MenuDashboard(){
    const permission = usePage().props.permission as PermissionType[];
    console.log(usePage().props.auth)
    return (
        <LayoutAplikasi>
            <Head title="Menu"></Head>

            <div className="border flex justify-center items-start py-4 h-svh">
                <MyMenu koleksi={permission}/>
            </div>
        </LayoutAplikasi>
    )
}
