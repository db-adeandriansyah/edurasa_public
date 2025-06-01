import { Link, usePage } from "@inertiajs/react";
import { UserInfo } from "../user-info";
import { type SharedData } from '../../types/index';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { UserMenuContent } from "../user-menu-content";
import { Separator } from "../ui/separator";


export default function ItemHeaderRight(){
    const { auth } = usePage<SharedData>().props;
    return (
        <>
            {!auth.user?(
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="focus-visible:ring-0">
                                Gabung yuk!
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                    <Link className="block w-full" href={route('login')} as="button" prefetch>
                                        Login
                                    </Link>
                                </DropdownMenuItem>
                                <Separator/>
                                <DropdownMenuItem asChild>
                                    <Link className="block w-full focus-visible:ring-0" href={route('register')} as="button" prefetch>
                                        Daftar
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
