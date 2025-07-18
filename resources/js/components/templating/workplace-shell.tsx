
/**
 * @info Ini adalah komponen yang digunakan untuk menangkap props dari file tsx yang ada
 * di directory page
 * Props berupa props yang ada di komponen (children, className, ...props) maupun jenis data yang lain.
 * Conotohnya, di Page/aplikasi menyediakan props 'title' yang digunakan untuk dirender di header yang melayang
 * @returns JSX Component
 * return mengambil component dari 'my-workplace' yang ada di directory '/components/my-ui/my-workplace.tsx
 */

import { usePage } from "@inertiajs/react";
import { MyWorkplace, MyContentWorkplace } from "../my-ui/my-workplace";
import { WorkplaceControlPrintarea } from "./workplace-control-printarea";
import WorkplaceHeader from "./workplace-header";
import WorkplaceSidebar from './workplace-sidebar';
import WorkplaceSticky from "./workplace-sticky";
import { SharedData } from "@/types";

type typeRoom = 'rombel' | 'jenjang' ;
interface shellPropsAplikasi {
    title: string,
    children?:React.ReactNode,
    showRoom?:boolean,
    showPrintable?:boolean,
    typeRoom?:typeRoom
}
export default function WorkplaceShell({title, children,showRoom,showPrintable,typeRoom='rombel'}:shellPropsAplikasi){
    const isOpen = usePage<SharedData>().props.sidebarOpen;
    return(
        <MyWorkplace defaultOpen={isOpen}>
            <WorkplaceHeader/>
            <MyContentWorkplace className="shadow-lg bg-gray-50/50 backdrop-blur-[70px]/50 ">
                <WorkplaceSticky 
                    title = {title} 
                    isShowRoom= {showRoom} 
                    isShowPrintable= {showPrintable}
                    typeRoom= {typeRoom}
                />

                {children}
            
            </MyContentWorkplace>
        </MyWorkplace>
    )
}
