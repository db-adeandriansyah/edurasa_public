import { cn } from "@/lib/utils"
import { ComponentProps } from 'react';

function MyHeading({className,...props}:React.ComponentProps<'header'>){
    return (
        <header
            data-slot="header-wraper"
            className={ cn("bg-sky-400/50 shadow-lg",
                className
            )}
            {...props}
        />

    )
}
function MyHeadingBoundary({className,children}:React.ComponentProps<'div'>){
    return(
        <div
            data-slot="header-outline"
            className={cn("relative p-1 h-[60px] md:mx-auto md:max-w-4xl overflow-hidden",
                className
            )}
        >
            {children}
        </div>
    )
}

function MyHeadingContent({className,children}:React.ComponentProps<'div'>){
    return(
        <div
            data-slot="header-content"
            className={cn("flex justify-center h-full items-center px-2",
                className
            )}
        >
            <div className="w-full flex justify-between bg-sky-100/50  dark:bg-sky-600/50 rounded-3xl p-1">
                {children}
            </div>
        </div>
    )
}
function LeftSideHeading({children,className}:React.ComponentProps<'div'>){
    return (
        <div
            className={cn("ms-[54px] md:ms-0 max-w-2x opacity-100 translate-x-0 transition-all duration-1000 starting:opacity-0 starting:translate-x-100",
                className
        )}>
            {children}
        </div>
    )
}
function RightSideHeading({children}:React.ComponentProps<'div'>){
    return (
        <div className="max-w-2x  hover:bg-sky-700/10 hover:ps-2 rounded-4xl cursor-pointer opacity-100 -translate-x-0 transition-all duration-1000 starting:opacity-0 starting:-translate-x-100">
            {children}
        </div>
    )
}
export {
    MyHeading,
    MyHeadingBoundary,
    MyHeadingContent,
    LeftSideHeading,
    RightSideHeading
}
