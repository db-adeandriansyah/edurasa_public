import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import  { PeranType, PermissionType, SharedData, User } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { ComponentProps, createContext, useContext, useEffect, useState } from "react";
import { MyHeading, MyHeadingBoundary, MyHeadingContent } from "./my-heading";
import MyLogo from "../my-components/my-logo";
import { currentTapel } from "../my-components/current-tapel";
import { UserInfo } from "../user-info";
import { UserMenuContent } from "../user-menu-content";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,DropdownMenuGroup, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { AlignJustifyIcon, AtSignIcon, FileStack, LogIn } from "lucide-react";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipProvider,TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Slot } from "@radix-ui/react-slot";


//buat type context
type typePageContext = {
    user:User;
    isMobile: boolean;
    peran: PeranType[]
    permission: PermissionType[];
    //fungsi ini digunakan untuk mengubah data User. Terutama ketika mengedit profil
    // setUser: (user:User)=>void
}

// buat context-nya
const PageWrapperContext = createContext<typePageContext|null>(null);

//function useContext
function useMainData(){
    const context = useContext(PageWrapperContext);
    if(!context){
        throw new Error('Harus pake PageFitur sebagai pembungkus halaman/component-nya');
    }
    return context;
}

/**
 * @info PageFitur digunakan untuk User yang telah ter-autentikasi. Jika tidak, maka akan error
 * @param
 * @returns
 */
function PageFitur({
    children,
    className,
    ...props
}:ComponentProps<'div'>){
    const isMobile = useIsMobile();
    const user : User  = usePage<SharedData>().props.auth.user;
    const roles : PeranType[] = user.roles  ;
    const permission : PermissionType[] = roles[0].permissions;
    const contextValue  = {
        user : user,
        isMobile: isMobile,
        peran: roles,
        permission: permission,
    };

    return(
        <PageWrapperContext.Provider value={contextValue}>
            <TooltipProvider delayDuration={0}>
                <div
                    data-slot = "wrapper-page"
                    className={cn(
                        "bg-fixed bg-no-repeat bg-cover bg-[50%] bg-edurasa ",
                        className
                        )
                    }
                    {...props}
                    >
                    {children}
                </div>
            </TooltipProvider>
        </PageWrapperContext.Provider>
    )
}

function PageContent({children}:ComponentProps<'div'>){
    return (
        <div className="min-h-screen md:max-w-6xl md:mx-auto backdrop-blur-lg drop-shadow-lg  dark:bg-sky-800/50">
                {children}
        </div>
    )
}

function AuthenticatedDropdownUser(){
    const { user } = useMainData();
    return(
        <>
            {!user?(
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
                </>

                )}
        </>
    )
}

function PageHeader({title}:{title?:string|null}){
    const { user,isMobile } = useMainData();
    const [ hiddenLeft, setHiddenLeft ] = useState(false);
    useEffect(()=>{
        if(user.name.length > 15 ) {
            setHiddenLeft((open) => !open)
        };

    },[])

    return(
        <MyHeading>
                <MyHeadingBoundary className="md:max-w-5xl">
                    <MyLogo/>
                    <MyHeadingContent>
                        <div className="ms-[54px] md:ms-0 max-w-2x opacity-100 translate-x-0 transition-all duration-1000 starting:opacity-0 starting:translate-x-100 flex items-center">
                            {(hiddenLeft && isMobile) || (
                                (title)??(<>
                                    <span className="hidden md:block">
                                        {currentTapel({variant:'long'})}
                                    </span>
                                    <span className="md:hidden">
                                        {currentTapel({variant:'short'})}
                                    </span>
                                </>)
                            )}
                        </div>
                        <div className="max-w-2x  hover:bg-sky-700/10 hover:ps-2 rounded-4xl cursor-pointer opacity-100 -translate-x-0 transition-all duration-1000 starting:opacity-0 starting:-translate-x-100">
                            <AuthenticatedDropdownUser/>
                        </div>
                    </MyHeadingContent>
                </MyHeadingBoundary>
            </MyHeading>
    )
}

function WrapperFitur({className}:ComponentProps<'div'>){

    return (
        <>
            <div className={cn("w-full h-[48px] px-2 rounded bg-linear-to-bl from-sky-100/50 to-sky-500/50 shadow-lg flex justify-between items-center",className)}>
                <div className="w-full flex gap-2">
                    <AlignJustifyIcon/>
                    <span className="rounded-e-4xl border-b-2 pe-3">
                        Nama Fitur
                    </span>
                </div>
                <div className="w-full text-right flex justify-end gap-3">
                    <OptionalRolesControl/>
                    <DropdownExport/>
                </div>
            </div>
        </>
    )
}
function FiturSidebarToogle(){
    return(
        <div className="w-full flex gap-2">
            <AlignJustifyIcon/>
            <span className="rounded-e-4xl border-b-2 pe-3">
                Nama Fitur
            </span>
        </div>
    )
}
function WrapperContent({children}:ComponentProps<'div'>){
    return(<>
        <div className="flex overflow-hidden gap-2">
            <div className="w-64 bg-gray-500/50">
                <div className="border border-black h-18">Menu Fitur</div>
            </div>
            <div className="flex-1 h-screen border-s-1 border-black bg-background">
                <div className="flex flex-col">
                    <div className="w-full border-1 border-black rounded">Toolbar</div>
                    <div className="w-full border-1 border-black rounded h-svh">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </>)
}
function WrappingButtonWithTooltip({
    asChild = true,
      isActive = false,
      tooltip,
      className,
      ...props
    }: React.ComponentProps<"button"> & {
      asChild?: boolean
      isActive?: boolean
      tooltip?: string | React.ComponentProps<typeof TooltipContent>
    }) {

    const Comp = asChild ? Slot : "button";

    const button = (
        <Comp
        // data-slot="sidebar-menu-button"
        // data-sidebar="menu-button"
        // className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
        />
    )

    if (!tooltip) {
        return button
    }

    if (typeof tooltip === "string") {
        tooltip = {
        children: tooltip,
        }
    }

    return (
        <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
            side="bottom"
            align="center"
            {...tooltip}
        />
        </Tooltip>
    )
}
function OptionalRolesControl(){
    console.log(useMainData())
    return(
         <WrappingButtonWithTooltip asChild tooltip={{ children: 'Pilih Kelas yang Anda ampu' }}>
                <div className="flex flex-row items-center">
                    <div className="rounded-s-4xl border-b-2  border-t-2 self-center pe-4 ps-2 py-0">Kelas</div>
                    <div className="rounded-full border-s-2  border-e-2 h-8 min-w-8 flex justify-center items-center align-center truncate">6B</div>
                </div>

         </WrappingButtonWithTooltip>
    )
}
function DropdownExport(){
    return(
        <DropdownMenu>
            <DropdownMenuTrigger className="focus-visible:outline-0 focus-visible:ring-0">
                <WrappingButtonWithTooltip asChild tooltip={{ children: 'Export/Cetak Laman Kerja Anda', side:'left' }}>
                <FileStack className="border p-1 rounded-2xl overflow-visible size-8" />

                </WrappingButtonWithTooltip>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                side='bottom'
                className="bg-white/15 outline-2 outline-amber-200">
                <DropdownMenuLabel className="p-0 font-normal text-small">
                    Export/Cetak
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Printer</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className="me-3 after:absolute after:border-b-8 after:border-e-0 after:border-s-0 after:border-white after:top-0 after:right-0 after:w-4 after:translate-y-3">
                                <DropdownMenuItem>Portrait</DropdownMenuItem>
                                <DropdownMenuItem>Landscape</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Ms Word</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className="me-3 after:absolute after:border-b-8 after:border-e-0 after:border-s-0 after:border-white after:top-0 after:right-0 lg:max-lg:after:left-0 lg:ms-4 after:w-4 after:translate-y-3">
                                <DropdownMenuItem>Portrait</DropdownMenuItem>
                                <DropdownMenuItem>Landscape</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuItem>
                        Ms.Excel
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export{
    PageFitur,
    PageContent,
    PageHeader,
    WrapperFitur,
    WrapperContent,
    useMainData
}

