
import  { MyHeaderFitur } from "@/components/my-components/my-header";

export default function LayoutAplikasi({children}:{children:React.ReactNode}){
    return (<>
        <div className="bg-edurasa bg-fixed bg-no-repeat bg-cover bg-[50%]">
            <MyHeaderFitur />
            <div className="min-h-screen md:max-w-6xl md:mx-auto backdrop-blur-lg drop-shadow-lg  dark:bg-sky-800/50">
                {children}
            </div>

        </div>
    </>)
}
