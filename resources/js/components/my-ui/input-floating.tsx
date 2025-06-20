import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export function InputFloatingStandar({type='text',id,labelName}:{type?:string,id:string, labelName:string}){
    return (
            <div className="relative">
                <input type={type} id={id} className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={labelName} />
                <label htmlFor={id} className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{labelName}</label>
            </div>

    )
}

export function InputFloatingOutline({type='text',id,labelName,className,...props}:React.ComponentProps<'input'> & {labelName:string}){
    return (
            <div className="relative my-3">
                <input
                    type={type}
                    id={id}
                    className={cn("block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white dark:bg-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 shadow-lg peer focus:placeholder:opacity-100 placeholder:opacity-0",className)} placeholder={labelName +' di sini'}
                    {...props}
                />
                <label htmlFor={id} className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{labelName}</label>
            </div>

    )
}

export default function InputFloating({id,labelName,type='text'}:PropsWithChildren<{id:string,labelName:string,type?:string}>){
    return (
        <div className="relative">
            <input
                type={type}
                id={id}
                className={cn(
                    "block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
               )}
                placeholder={labelName}
                />
                    <label htmlFor={id} className={cn(
                        "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",

                        )}>{labelName}
                </label>
        </div>
    )
}
