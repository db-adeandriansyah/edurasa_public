import { WorkplaceControlPrintarea } from "@/components/templating/workplace-control-printarea";
import WorkplaceShell from "@/components/templating/workplace-shell";
import WorkplaceSidebar from "@/components/templating/workplace-sidebar";
import { PropsWithChildren } from "react";

export default function AppFiturLayout({title,children}:PropsWithChildren<{title:string}>){
    return (
            <WorkplaceShell title={title}>
                <div className="flex">
                    <WorkplaceSidebar/>
                    <WorkplaceControlPrintarea>
                        {children}
                    </WorkplaceControlPrintarea>
                </div>
            </WorkplaceShell>
    )
}
