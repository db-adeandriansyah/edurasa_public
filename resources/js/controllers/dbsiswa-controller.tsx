import { PrintAreaWithToolbarDefault, ToolbarDefault } from "@/components/templating/workplace-provider-toolbar";
import { WorkplaceTabsToolbar } from "@/components/templating/workplace-tabs-toolbar";
import { usePage } from "@inertiajs/react";
import { useCallback, useState } from "react";

const TestData = [
    {
        id:1,
        name:'Nama',
        nis:'1234567890'
    },
    {
        id:2,
        name:'Nama ke-2',
        nis:'2345678901'
    },
    {
        id:3,
        name:'Nama ke-3',
        nis:'3456789012'
    },
]
function DbsiswaController(){
    
    return(
        <>
            {/* <ToolbarDefault/> */}
            <WorkplaceTabsToolbar useKopTtd={true} tabs={[
                {
                    title:'hello',
                    content:<p>Hello World</p>
                }
            ]} defaultValue="kopttd"/>
                
            <PrintAreaWithToolbarDefault>
                
                <ul>
                    {TestData.map((item, key)=>{
                        return (<li key={key}>{item.id} = {item.name}</li>)
                    })}

                </ul>
            </PrintAreaWithToolbarDefault>
        </>
    )
}

export {
    DbsiswaController
}
