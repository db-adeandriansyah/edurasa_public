    import { Link } from "@inertiajs/react";

    export interface typeKoleksiMenu {
        title : string;
        description:string;
        routeName:string;
        urlIcon:string;
    }

    export default function ItemMenuDashboard({menus}:{menus:typeKoleksiMenu[]}){
        return (
            <nav className="grid grid-cols-3 md:grid-cols-6 gap-4 place-content-center">
                {menus.map((item,index)=>{
                    return(
                        <div key={index} className="relative flex justify-center items-center overflow-hidden group">
                            <Link href={route(item.routeName)} as="button">
                                <img src={item.urlIcon} className="rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-sky-500 to-90% bg-cover  size-20 overflow-visible"/>

                            </Link>
                            <div className="rounded-full bg-green-500 h-3 w-3 text-center text-small absolute top-0 right-0"></div>
                            {item.title.split(' ')[1] && (
                                <div className="absolute bg-linear-65 from-purple-500 to-pink-500 text-small text-white p-0 mb-1 leading-3 rotate-x-15 -rotate-y-30 text-center bottom-0 left-0 md:-left-30 text-[12px] -translate-y-1 rounded-4xl w-full  md:group-hover:left-0 transition-all duration-500 ease-linear">{item.title.split(' ')[1]}</div>

                            )}
                            <div className="absolute bg-linear-65 from-purple-500 to-pink-500 text-small text-white p-1 leading-2 rotate-x-15 -rotate-y-30 text-start bottom-0 left-0  -translate-y-4 translate-x-0 md:translate-x-50 md:group-hover:translate-x-0 transition-all duration-500 ease-linear rounded-4xl">{item.title.split(' ')[0]}</div>
                        </div>
                    )
                })}
            </nav>
        )
    }
