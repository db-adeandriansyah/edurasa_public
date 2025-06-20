import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SharedData, User } from "@/types";
import { usePage } from "@inertiajs/react";
import { Button } from "../ui/button";
import { AlignJustifyIcon, ChevronsLeftRight, ChevronsLeftRightEllipsis, ChevronsRightLeft, FileStack } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { useReactToPrint } from "react-to-print";

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type typeWorkplace ={
    user:User;
    isMobile:boolean;
    state: "expanded" | "collapsed"
    open: boolean
    setOpen: (open: boolean) => void
    openMobile: boolean
    setOpenMobile: (open: boolean) => void
    toggelWorkplace: () => void
    printArea:React.RefObject<HTMLDivElement|null>

}

const WorkplaceContext = React.createContext<typeWorkplace|null>(null);

function useWorkplace(){
    const context = React.useContext(WorkplaceContext);
    if(!context){
        throw new Error('Harus dibungkus komponen Workplace');
    };
    return context;
}

function MyWorkplace({
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    children,
    style,
    ...props
    }:React.ComponentProps<'div'> &
        {
            defaultOpen?: boolean,
            open?: boolean,
            onOpenChange?: (open:boolean)=>void
        }
    ){
        const user = usePage<SharedData>().props.auth.user;
        const isMobile = useIsMobile();
        console.log(usePage().props.data)
        // state open di desktop berbeda dengan di mobile. Jika di desktop awalnya open, maka di mobile
        // awalnya adalah close,
        const [openMobile,setOpenMobile] = React.useState(false);

        /**
         * kode ini diambil dari sidebar untuk dimodifikasi;
         * - di component 'sidebar' menyediakan props 'open' dan 'setOpen' untuk digunakan di komponen ketika
         *   developer ingin membuat fungsi/logic sendiri
         * - sebenarnya, kita tidak membutuhkan itu. Karena kita tidak akan menyediakan fungsi ketika
         *   menggunakan komponent ini nantinya.
         * - Namun, kita ikuti caranya. Karena kita tidak tahu efek dari kode lain nantinya
         */


        //_open dan _setOpen state internal di kompenen ini;
        const [_open , _setOpen] = React.useState(defaultOpen);
        // karena komponen ini menyediakan prop 'open' kita samakan persepsi;
        // jika 'open' props ada, maka gunakan 'open' yang diteruskan di kompenen,
        // jika tidak ada, kita pake state yang ada di internal ini
        const open = openProp ?? _open;

        // setOpen ini milik internal (_setOpen):
        const setOpen = React.useCallback(
            (value:boolean | ((value:boolean)=>boolean))=>{
             const openState = typeof value === "function" ? value(open) : value
                if (setOpenProp) {
                    setOpenProp(openState)
                } else {
                    _setOpen(openState)
                }

                }

                ,[setOpenProp, open]
            )

        const toggelWorkplace = React.useCallback(() => {
            return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
          }, [isMobile, setOpen, setOpenMobile])

        const state = open ? "expanded" : "collapsed";

        //Buat Refrensi Elemen
        const printArea = React.useRef<HTMLDivElement>(null);

        React.useEffect(() => {
            if (printArea.current) {
                const styles = window.getComputedStyle(printArea.current);
                console.log(styles.backgroundColor); // Example: Accessing background-color
                console.log(styles.getPropertyValue('padding')); // Example: Accessing font-size
            }
        }, []);

        const workplaceProviderContext = React.useMemo<typeWorkplace>(
            () => ({
                    user,
                    isMobile,
                    state,
                    open,
                    setOpen,
                    openMobile,
                    setOpenMobile,
                    toggelWorkplace,
                    printArea
            }),
            [user, isMobile, state, open, setOpen, openMobile, setOpenMobile, toggelWorkplace,printArea]
        );

        return (
            <WorkplaceContext.Provider value={workplaceProviderContext}>
                <div
                    data-slot="background"
                    className="bg-edurasa bg-fixed bg-no-repeat bg-cover bg-[50%] dark:bg-edurasa-dark"
                    style={
                                {
                                  "--sidebar-width": SIDEBAR_WIDTH,
                                  "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                                  ...style,
                                } as React.CSSProperties
                              }
                    {...props}
                    >
                        {children}
                </div>
            </WorkplaceContext.Provider>
        );

}

function MyWorkplaceHeader({className, ...props}:React.ComponentProps<'header'>){
    return(
        <header
            data-slot="workplace-header"
            className={ cn("bg-sky-400/50 shadow-lg",
                className
            )}
            {...props}
        />
    )
};

function MyContentWorkplace({className,...props}:React.ComponentProps<'div'>){
    return(
        <div

            data-slot="workplace-content"
            className={cn("md:max-w-6xl md:mx-auto drop-shadow-lg dark:bg-sky-800/50",
                className
            )}
            {...props}
            />
    )
}

function MyStickyWorkplace({className,...props}:React.ComponentProps<'div'>){
    return(
        <div
            className={cn(
                "w-full h-[48px] z-10 px-2 rounded bg-linear-to-b from-sky-200 to-sky-300 dark:bg-linear-to-b dark:from-sky-800 shadow-lg dark:to-sky-700 flex justify-between items-center",
                "sticky top-0",
                className
            )}
            {...props}
            />

    )
};

function MySidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}){
   const { isMobile, state, openMobile, setOpenMobile } = useWorkplace()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "bg-sidebar text-sidebar-foreground flex  w-(--sidebar-width) flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
        null
    )
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          "relative h-svh w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",

        )}
      />
      <div
        className={cn(
          "sticky inset-y-0  h-[calc(100vh-48px)]  w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "py-2 ps-2 pe-1 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="bg-sidebar overflow-hidden group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function MySidebarTrigger({
        className,
        onClick,
        ...props

    }:React.ComponentProps<typeof Button>){
    const { toggelWorkplace, state,open,openMobile} = useWorkplace();

    return(
        <Button
            data-slot="button-sidebar-toggle"
            variant={'outline'}
            onClick={(event) => {
                    onClick?.(event)
                    toggelWorkplace()
                }}
            className="border-1 border-gray-500 bg-transparent font-bold"
        >
            {state==='expanded'?<ChevronsRightLeft/>:<ChevronsLeftRightEllipsis/>}
            <span className="sr-only">Toggle Sidebar</span>

        </Button>
    )
}


const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function WorkplaceSidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useWorkplace()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
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
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
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
function ButtonClickPrint({type,children}:React.PropsWithChildren<{type:'protrait'|'landscape'}>){
    const {printArea} = useWorkplace() ;
    const printHandle = useReactToPrint({

                            contentRef: printArea ,
                            documentTitle: "Dokumen "+type,
                            pageStyle:`@media print {@page { size: ${type}; margin:16px}}`,
                        });

    return (
            <button onClick={printHandle}>{children}</button>
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
                className="bg-white dark:bg-sky-900 outline-2 outline-amber-200">
                <DropdownMenuLabel className="p-0 font-normal text-small">
                    Export/Cetak
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Printer</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className="me-3 after:absolute after:border-b-8 after:border-e-0 after:border-s-0 after:border-white after:dark:bg-sky-900 after:top-0 after:right-0 after:w-4 after:translate-y-3">
                                <DropdownMenuItem>
                                    <ButtonClickPrint type={'protrait'}>Portrait</ButtonClickPrint>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <ButtonClickPrint type={'landscape'}>Landscape</ButtonClickPrint>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Ms Word</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className="me-3 after:absolute after:border-b-8 after:border-e-0 after:border-s-0 after:border-white  after:dark:bg-sky-900 after:top-0 after:right-0 lg:max-lg:after:left-0 lg:ms-4 after:w-4 after:translate-y-3">
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

export {
    MyWorkplace,
    MyWorkplaceHeader,
    MyContentWorkplace,
    MyStickyWorkplace,
    MySidebar,
    MySidebarTrigger,
    DropdownExport,
    WorkplaceSidebarMenuButton,
    useWorkplace
}
