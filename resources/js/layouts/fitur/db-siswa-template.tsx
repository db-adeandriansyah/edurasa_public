import { CompPrintArea, WorkplaceControlPrintarea, WorkplaceToolbar, WorkplaceToolbarPure, WorkplaceWithControlFirstLastComp } from "@/components/templating/workplace-control-printarea";
import { PrintAreaWithToolbarDefault, ToolbarDefault, ToolbarDefaultProvider } from "@/components/templating/workplace-provider-toolbar";
import WorkplaceShell from "@/components/templating/workplace-shell";
import WorkplaceSidebar, { WorkplaceSidebarSample } from "@/components/templating/workplace-sidebar";
import { NavItem } from "@/types";
import { BadgeInfo, LayoutGrid, UserCheck } from "lucide-react";

const subfitur:NavItem[] =[
    {
        title: 'Daftar Siswa',
        href: '/db-siswa',
        icon: LayoutGrid,
    },
    {
        title: 'Data Per Jenjang',
        href: '/db-siswa2',
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
export default function DbSiswaTemplate({children, title}:{children:React.ReactNode, title:string}){
    
    return (
        <WorkplaceShell title={title} showRoom={true} showPrintable={true} typeRoom={'rombel'}>
            <div className="flex">
                <WorkplaceSidebar mainSubfitur={subfitur} optionalSubfitur={otherfitur}/>
                <ToolbarDefaultProvider>
                    {children}
                </ToolbarDefaultProvider>
            </div>
        </WorkplaceShell>
    )
}
