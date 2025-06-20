
/**
 * @info Ini adalah komponen yang digunakan untuk menangkap props dari file tsx yang ada
 * di directory page
 * Props berupa props yang ada di komponen (children, className, ...props) maupun jenis data yang lain.
 * Conotohnya, di Page/aplikasi menyediakan props 'title' yang digunakan untuk dirender di header yang melayang
 * @returns JSX Component
 * return mengambil component dari 'my-workplace' yang ada di directory '/components/my-ui/my-workplace.tsx
 */

import { MyWorkplace, MyContentWorkplace } from "../my-ui/my-workplace";
import { WorkplaceControlPrintarea } from "./workplace-control-printarea";
import WorkplaceHeader from "./workplace-header";
import WorkplaceSidebar from './workplace-sidebar';
import WorkplaceSticky from "./workplace-sticky";

interface shellPropsAplikasi {
    title: string,
    children?:React.ReactNode
}
export default function WorkplaceShell({title, children}:shellPropsAplikasi){
    return(
        <MyWorkplace>
            <WorkplaceHeader/>
            <MyContentWorkplace className="shadow-lg bg-gray-50/50 backdrop-blur-[70px]/50 min-h-full">
                <WorkplaceSticky title={title}/>
                {/* <div className="flex">
                    <WorkplaceSidebar/>
                    <WorkplaceControlPrintarea>
                        {children}
                    </WorkplaceControlPrintarea>
                </div> */}
                {children}
            </MyContentWorkplace>
        </MyWorkplace>
    )
}
