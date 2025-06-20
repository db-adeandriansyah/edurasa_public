
import MyHeader from "@/components/my-components/my-header";
import { NavItem } from "@/types";
const itemMenu:NavItem[] = [
    {
        title:'Tentang Kami',
        href: '#'
    },
    {
        title:'Artikel',
        href: '#artikel'
    },

]
export default function LayoutBeranda({children}:{children:React.ReactNode}){
    return (<>
        <div className="bg-edurasa bg-fixed bg-no-repeat bg-cover bg-[50%]">
            <MyHeader navigationCollection={itemMenu} />
            <div className="min-h-screen md:max-w-6xl md:mx-auto backdrop-blur-lg drop-shadow-lg  dark:bg-sky-800/30">
                {children}
            </div>

        </div>
    </>)
}
