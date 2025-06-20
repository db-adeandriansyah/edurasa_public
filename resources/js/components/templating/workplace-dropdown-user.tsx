import { User } from "@/types";
import { useWorkplace } from "../my-ui/my-workplace";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { AtSignIcon, LogIn } from "lucide-react";
import { Separator } from "../ui/separator";
import { UserInfo } from "../user-info";
import { UserMenuContent } from "../user-menu-content";

export default function WorkplaceDropdownUser(){
    const {user} = useWorkplace();
    if(!user){
        return(
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex gap-1 focus-visible:ring-0">
                            <span className="self-center">Gabung</span>
                            <span className="rounded-full w-8 h-8 align-center p-1 -rotate-15 text-sm bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                yuk!
                            </span>

                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                            align="end"
                            side='bottom'
                        >
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link className="block w-full" href={route('login')} as="button" prefetch>
                                    <LogIn className="mr-2"/>
                                    Login
                                </Link>
                            </DropdownMenuItem>
                            <Separator/>
                            <DropdownMenuItem asChild>
                                <Link className="block w-full focus-visible:ring-0" href={route('register')} as="button" prefetch>
                                    <AtSignIcon className="mr-2"/>
                                    Register
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>

                </DropdownMenu>
        )
    }
    return(
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex flex-row-reverse gap-2 align-content-center justify-center focus-visible:ring-0">
                        <UserInfo user={user} showEmail={false}/>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    side='bottom'
                >
                    <UserMenuContent user={user} />
                </DropdownMenuContent>


            </DropdownMenu>

    )
}
