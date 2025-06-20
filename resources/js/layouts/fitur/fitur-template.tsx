import { WorkplaceControlPrintarea } from "@/components/templating/workplace-control-printarea";
import WorkplaceShell from "@/components/templating/workplace-shell";
import { WorkplaceSidebarSample } from "@/components/templating/workplace-sidebar";

export default function FiturTemplate({children, title}:{children:React.ReactNode, title:string}){
    return (
        <WorkplaceShell title={title}>
            <div className="flex">
                     <WorkplaceSidebarSample/>
                    <WorkplaceControlPrintarea>
                        {children}
                    </WorkplaceControlPrintarea>
                </div>
            {children}
        </WorkplaceShell>
    )
}
