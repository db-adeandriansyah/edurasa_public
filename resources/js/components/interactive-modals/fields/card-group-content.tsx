import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {ModalCustomInterface } from "../interfaces/type";
import { ResolveFieldByType, ResolveFieldByTypeOnly} from "./resolve-field";
import { contentField } from "../interfaces/type-fields";


export function CardGroupContent({
        currentData,
        mode,
        setCurrentData,
        onAdd,
        onUpdate,
        onDelete,
        messageDelete,
        label,
        fieldGroupKey, 
        dataField
    }:  Partial<ModalCustomInterface> &{
        label: string,
        fieldGroupKey:string[],
        dataField?:contentField[]
    }){


    return (
        <Card className="flex flex-col gap-0 pt-0 pb-0 overflow-hidden rounded-t-2xl min-h-64  dark:bg-gray-400">
            <CardHeader className="bg-gray-300 dark:bg-gray-500 min-h-8">
                <CardTitle className="my-auto">
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {
                    dataField?.filter(s=>fieldGroupKey.includes(s.key)).map((field, key)=> 
                        <ResolveFieldByType key={key} type={field} currentData={currentData} setCurrentData={setCurrentData}/>
                    )   
                }
            </CardContent>
        </Card>
    );
}

export function CardGroupContentOnly({
        currentData,
        mode,
        setCurrentData,
        onAdd,
        onUpdate,
        onDelete,
        messageDelete,
        label,
        fieldGroupKey, 
        dataField,
        layoutingTabsOnly
    }:  Partial<ModalCustomInterface> &{
        label: string,
        fieldGroupKey:string[],
        dataField?:contentField[]
    }){


    return (
        <Card className="flex flex-col gap-0 pt-0 pb-0 overflow-hidden rounded-t-2xl min-h-64 dark:bg-gray-400">
            <CardHeader className="bg-gray-300 dark:bg-gray-500 min-h-8">
                <CardTitle className="my-auto">
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {
                    dataField?.filter(s=>fieldGroupKey.includes(s.key)).map((field, key)=> 
                        <ResolveFieldByTypeOnly layoutingTabsOnly={layoutingTabsOnly} key={key} type={field} currentData={currentData} setCurrentData={setCurrentData}/>
                    )   
                }
            </CardContent>
        </Card>
    );
}
