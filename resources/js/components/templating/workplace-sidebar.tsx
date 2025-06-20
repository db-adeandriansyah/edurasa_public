import { Link } from "@inertiajs/react";
import { MySidebar, WorkplaceSidebarMenuButton } from "../my-ui/my-workplace";
import { SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import AppLogo from "../app-logo";
import { NavFooter } from "../nav-footer";
import { NavUser } from '../nav-user';
import { NavItem } from "@/types";
import { NavMain } from "../nav-main";
import { WorkplaceNavMain } from "./workplace-nav-main";

interface mySidebarProps{
    mainSubfitur : NavItem[],
    optionalSubfitur : NavItem[]
}

export function WorkplaceSidebarSample({children}:React.PropsWithChildren){
    return(

        <MySidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <WorkplaceSidebarMenuButton size="lg" asChild>
                            <Link href="/menu" prefetch>
                                <AppLogo />
                            </Link>
                        </WorkplaceSidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* <NavMain items={mainNavItems} /> */}
            </SidebarContent>

            <SidebarFooter>
                {/* <NavUser /> */}
            </SidebarFooter>
            {children}
        </MySidebar>
    )
}



export default function WorkplaceSidebar({mainSubfitur,optionalSubfitur}:mySidebarProps){
    return(

        <MySidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <WorkplaceSidebarMenuButton size="lg" asChild>
                            <Link href="/menu" prefetch>
                                <AppLogo />
                            </Link>
                        </WorkplaceSidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <WorkplaceNavMain items={mainSubfitur} />
            </SidebarContent>

            <SidebarFooter>
                <WorkplaceNavMain items={optionalSubfitur}/>
            </SidebarFooter>
        </MySidebar>
    )
}
