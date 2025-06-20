import { Link, usePage } from "@inertiajs/react";
import { UserInfo } from "../user-info";
import { type SharedData } from '../../types/index';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { UserMenuContent } from "../user-menu-content";
import { Separator } from "../ui/separator";
import { AtSignIcon, LogIn } from "lucide-react";


export default function ItemHeaderRight(){
    const { auth } = usePage<SharedData>().props;
    return (
        <>
            {!auth.user?(
                <>
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
                </>
            ):(<>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex flex-row-reverse gap-2 align-content-center justify-center focus-visible:ring-0">
                            <UserInfo user={auth.user} showEmail={false}/>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        side='bottom'
                    >
                        <UserMenuContent user={auth.user} />
                    </DropdownMenuContent>


                </DropdownMenu>
            </>

            )}
        </>
    )
}
