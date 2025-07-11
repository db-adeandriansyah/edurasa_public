import { ResolveFieldByType } from "./resolve-field"
import { ModalCustomInterface } from "../type"

export function ContentFieldForm({
        contentFields,
        currentData,
        mode,
        setCurrentData,
        onAdd,
        onUpdate,
        onDelete,
        messageDelete,
        // handleInputChange
    }:Partial<ModalCustomInterface> ){

    return ( <div className="p-2 self-stretch">
                    { 
                        mode === 'delete'?(
                            <p>{messageDelete}</p>
                        ):(
                            contentFields && contentFields.map((field, index)=>{
                            return (
                                    <ResolveFieldByType key={index} type={field} currentData={currentData} setCurrentData={setCurrentData}/>
                                        // {/* {ResolveFieldByType(field,currentData as Record<string|number, any>,setCurrentData as React.Dispatch<SetStateAction<Record<string, any>>>)} */}
                                    
                                    )
                                }
                            )
                        )
                    }

                {
                    onAdd && (<button onClick={onAdd} type='button' className="border-1 rounded-4xl px-2 py-0 w-fit mx-auto bg-green-400/80 ">Tambah</button>)
                }
            </div>
        )
}
