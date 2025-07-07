import { DropdownExport, MySidebarTrigger, MyStickyWorkplace } from "../my-ui/my-workplace";
import { WorkplaceControlRoom } from "./workplace-control-room";

export default function WorkplaceSticky({
    title,
    isShowRoom,
    isShowPrintable,
    typeRoom
}:{
    title?: string
    isShowRoom?: boolean
    isShowPrintable?: boolean
    typeRoom?: 'rombel' | 'jenjang' }){


    return (
        <MyStickyWorkplace>
            <div className="flex gap-2 items-center justify-end">
                <MySidebarTrigger/>
                
                    <span className="rounded-e-4xl border-b-2 pe-3 truncate font-extrabold">
                        {title}
                    </span>
            </div>
            <div className="flex flex-row items-center gap-2 font-extrabold">

                {isShowRoom && (<WorkplaceControlRoom type={typeRoom}/>)}
                {isShowPrintable && ( <DropdownExport/> )}
            </div>
        </MyStickyWorkplace>
    )
}
