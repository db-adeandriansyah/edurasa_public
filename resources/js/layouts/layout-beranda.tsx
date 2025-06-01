import AppLogo from "@/components/app-logo";
import ItemHeaderRight from "@/components/my-components/item-header-right";
import MyLogo from "@/components/my-components/my-logo";

export default function LayoutBeranda({children}:{children:React.ReactNode}){
    return (<>
        <header className="w-full bg-sky-400/50 shadow-lg" >
            <div className="relative p-1 h-[60px] md:mx-auto md:max-w-4xl overflow-hidden">
                    <MyLogo/>

                <div className="flex justify-center h-full items-center  px-2">

                    <div className="w-full flex justify-between bg-sky-100/50 rounded-3xl p-1">
                        <div className="ms-[54px] md:ms-0 max-w-2x opacity-100 translate-x-0 transition-all duration-1000 starting:opacity-0 starting:translate-x-100">

                            <div className="h-8 flex items-center gap-2 focus-visible:ring-0 text-xs">
                                <span className="font-medium md:inline-block decoration-0 after:block after:w-0 after:h-[2px] after:bg-white after:duration-100 after:transition-[width] hover:after:w-[100%]">Tentang Kami</span>
                                <span className="font-medium md:inline-block decoration-0 after:block after:w-0 after:h-[2px] after:bg-white after:duration-100 after:transition-[width] hover:after:w-[100%]">Artikel</span>
                            </div>
                        </div>
                        <div className="max-w-2x  hover:bg-sky-700/10 hover:ps-2 rounded-4xl cursor-pointer opacity-100 -translate-x-0 transition-all duration-1000 starting:opacity-0 starting:-translate-x-100">
                            <ItemHeaderRight/>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        {children}
    </>)
}
