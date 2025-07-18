import { ModalCustomInterface } from "../interfaces/type"
import { ResolveFieldByType } from "./resolve-field";

export function ContentFieldForm({
        contentFields,
        currentData,
        mode,
        setCurrentData,
        onAdd,
        onUpdate,
        onDelete,
        messageDelete,
    }: Partial<ModalCustomInterface>){
        if(mode === 'delete'){
            return messageDelete;
        }

        return (
            contentFields?.map((field,index)=>
                <ResolveFieldByType key={index} type={field} currentData={currentData} setCurrentData={setCurrentData}/>
            )
        )
}

export function ContentFieldFormOnly({
        contentFields,
        currentData,
        mode,
        setCurrentData,
        // onAdd,
        // onUpdate,
        // onDelete,
        messageDelete,
    }: Partial<ModalCustomInterface>){
        if(mode === 'delete'){
            return messageDelete;
        }

        return (
            contentFields?.map((field,index)=>
                <ResolveFieldByType key={index} type={field} currentData={currentData} setCurrentData={setCurrentData}/>
            )
        )
}
