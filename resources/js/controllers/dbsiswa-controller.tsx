import { PrintAreaWithToolbarDefault, ToolbarDefault } from "@/components/templating/workplace-provider-toolbar";
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
    const [valueKlik, setValueKlik] = useState('');
    const handleClickMe = useCallback(
        ()=> {
        setValueKlik(()=>valueKlik===""?'Klik Me Show':"")
    }
        ,[valueKlik]);
    return(
        <>
            <ToolbarDefault>
                <button onClick={handleClickMe} className="border-1 border-amber-300 rounded-3xl">Klik Me</button>
            </ToolbarDefault>
            <PrintAreaWithToolbarDefault>
                {valueKlik}
                <hr/>
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
