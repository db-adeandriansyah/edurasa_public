import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { LogOut, Settings, Sidebar, SunMoon } from 'lucide-react';
import AppearanceToggleTab from './appearance-tabs';
import { DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '@radix-ui/react-dropdown-menu';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };
    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className='relative flex items-center gap-2 rounded-sm px-2 py-1.5 outline-hidden'>
                            <SunMoon className="h-4 w-4"/>
                            <span className="ml-1.5 text-sm">Mode</span>
                        </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem asChild>
                            <AppearanceToggleTab className='flex-col'/>

                        </DropdownMenuItem>

                    </DropdownMenuSubContent>
                </DropdownMenuSub>

            <DropdownMenuSeparator />
            </DropdownMenuGroup>
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link className="block w-full" href={route('profile.edit')} as="button" prefetch onClick={cleanup}>
                        <Settings className="mr-2" />
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>

                    {route().current('dashboard')?(
                        <Link className="block w-full" href={route('home')} as="button" prefetch onClick={cleanup}>
                            <Sidebar className="mr-2" />
                            Beranda
                        </Link>
                    ):(

                        <Link className="block w-full" href={route('menu')} as="button" prefetch onClick={cleanup}>
                            <Sidebar className="mr-2" />
                            Dashboard
                        </Link>
                    )}
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link className="block w-full" method="post" href={route('logout')} as="button" onClick={handleLogout}>
                    <LogOut className="mr-2" />
                    Log out
                </Link>
            </DropdownMenuItem>
        </>
    );
}
