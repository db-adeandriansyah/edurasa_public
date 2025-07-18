import { cn } from "@/lib/utils";
import * as React from 'react';

function WrapperTablePagination({ className, children , ...props}:React.ComponentProps<'div'>) {
    
    return ( 
        <div className="overflow-x-auto" tabIndex={-1}
            {...props}
        >
            {children}
            
        </div>
    );
} 

function TableDefault({children, className}:React.ComponentProps<'table'>) {
    return (
        <table className={cn("w-full text-xs leading-normal", className)} tabIndex={-1}>
            {children}
        </table>
    )
}

function TheadComponent({children}:React.ComponentProps<'thead'>) {
    return (
        <thead>
            {children}
        </thead>
    )
}
function TBodyComponent({children}:React.ComponentProps<'tbody'>) {
    return (
        <tbody>
            {children}
        </tbody>
    )
}

function TrComponent({children}:React.ComponentProps<'tr'>) {
    return (
        <tr>
            {children}
        </tr>
    )   
}
function TdHeadComponent({children, ...props}:React.ComponentProps<'th'>) {
    return (
        <th className="border-1 border-black bg-gray-200 p-1 text-center align-middle"
            {...props}
        >
            {children}
        </th>
    )   
}
function TdComponent({children, className, ...props}:React.ComponentProps<'th'>) {
    return (
        <td className={cn("border-1 border-black p-1 align-top text-nowrap",className)}
            {...props}
        >
            {children}
        </td>
    )   
}
export{
    WrapperTablePagination,
    TableDefault,
    TheadComponent,
    TdHeadComponent,
    TrComponent,
    TdComponent,
    TBodyComponent
}