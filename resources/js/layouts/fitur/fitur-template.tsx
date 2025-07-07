
import { ToolbarDefaultProvider } from "@/components/templating/workplace-provider-toolbar";
import WorkplaceShell from "@/components/templating/workplace-shell";
import WorkplaceSidebar from "@/components/templating/workplace-sidebar";
import { NavItem } from "@/types";
import { BadgeInfo, LayoutGrid, UserCheck } from "lucide-react";

const subfitur:NavItem[] =[
    {
        title: 'Daftar Ptk',
        href: '/approval',
        icon: LayoutGrid,
    },
    {
        title: 'Daftar Akun',
        href: '/approval-akun',
        icon: UserCheck,
    },
    {
        title: 'Ptk dan Sekolah',
        href: '/ptk-tiap-sekolah',
        icon: UserCheck,
    },
    {
        title: 'Siswa dan Sekolah',
        href: '/siswa-tiap-sekolah',
        icon: UserCheck,
    }
]
const otherfitur:NavItem[] =[
    {
        title: 'Petunjuk Penggunaan',
        href: '/menu',
        icon: BadgeInfo,
    },
]

export default function FiturTemplate({
        children, 
        title,
        showRoom = false, 
        showPrintable = false
    }:{
        children:React.ReactNode, 
        title:string,
        showRoom?: boolean,
        showPrintable?: boolean
    }){
    return (
        <WorkplaceShell title={title} showRoom={showRoom} showPrintable={showPrintable} typeRoom={'rombel'}>
            <div className="flex">
                <WorkplaceSidebar mainSubfitur={subfitur} optionalSubfitur={otherfitur}/>
                <ToolbarDefaultProvider>
                    {children}
                </ToolbarDefaultProvider>
            </div>
        </WorkplaceShell>
    )
}
