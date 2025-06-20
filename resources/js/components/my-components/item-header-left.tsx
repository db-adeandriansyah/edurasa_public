import { AlignJustifyIcon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { NavItem } from "@/types";
import { Link } from "@inertiajs/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger ,DropdownMenuGroup, DropdownMenuItem } from "../ui/dropdown-menu";

export default function ItemHeaderLeft(){
    return (
        <>
            <Sheet>
                <SheetTrigger className="md:hidden h-full ms-1">
                    <AlignJustifyIcon/>
                </SheetTrigger>
                <SheetContent
                    side="top">
                    <SheetHeader>Hello</SheetHeader>
                    <SheetDescription>Deskripsinya</SheetDescription>
                </SheetContent>
            </Sheet>
            <div className="hidden h-8 md:flex items-center gap-2 focus-visible:ring-0 text-left text-sm leading-tight">
                <span className="font-medium md:inline-block decoration-0 after:block after:w-0 after:h-[2px] after:bg-white after:duration-100 after:transition-[width] hover:after:w-[100%]">Tentang Kami</span>
                <span className="font-medium md:inline-block decoration-0 after:block after:w-0 after:h-[2px] after:bg-white after:duration-100 after:transition-[width] hover:after:w-[100%]">Artikel</span>
            </div>

        </>
    )
}

export function ItemHeaderNavigation({ArrayMenu}:{ArrayMenu:NavItem[]}){
    const isMobile = useIsMobile();
    if(isMobile){
        return(
            <>
                <DropdownMenu>
                    <DropdownMenuTrigger >
                        <AlignJustifyIcon/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="start"
                        side="bottom"

                    >
                        <DropdownMenuGroup>

                            {ArrayMenu.map((item) => {
                                    return(
                                        <DropdownMenuItem asChild key={item.href}>
                                           <Link href={item.href} className="relative block px-3 py-1 transition hover:text-teal-500 dark:hover:text-teal-400">
                                                {item.title}
                                                </Link>
                                        </DropdownMenuItem>
                                    )
                                })
                            }
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </>
        )
    }
    return (
        <nav className="hidden md:block">
            <ul className="flex rounded-full shadow-zinc-900/5 backdrop-blur-sm">
                {ArrayMenu.map((item) => {
                        return(
                            <li key={item.href} className="flex item">
                                <Link href={item.href} className="relative block px-3 h-full transition hover:text-teal-500 dark:hover:text-teal-400">
                                {item.title}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}
