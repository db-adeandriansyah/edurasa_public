import { groupContent, ModalCustomInterface } from "../type"
import { CardGroupContent, CardGroupContentOnly } from "./card-group-content"
import { ResolveFieldByType, ResolveFieldByTypeOnly } from "./resolve-field"

export function GroupContentOnly({
        currentData,
        mode,
        setCurrentData,
        onAdd,
        onUpdate,
        onDelete,
        messageDelete,
        groupContent, 
        contentFields,
        contentTabHeadersOnly
    }: Partial<ModalCustomInterface> & {
        groupContent?: groupContent[], 
        
    }){
    
    
    return (
        <div className="flex px-2 justify-between gap-2  overflow-hidden">
            {
                groupContent && groupContent?.map((content, index)=>
                    <div key={index} className="w-full mx-auto">
                        {
                            content.isCard ?
                                <CardGroupContentOnly 
                                    label={content.label}
                                    fieldGroupKey={content.fieldGroupKey}
                                    dataField={contentFields}
                                    currentData={currentData}
                                    setCurrentData={setCurrentData}
                                    contentTabHeadersOnly={contentTabHeadersOnly}
                                    />
                                : contentFields && contentFields.filter(s=>content.fieldGroupKey.includes(s.key)).map((field, index)=> <ResolveFieldByTypeOnly contentTabHeadersOnly={contentTabHeadersOnly} key={index} type={field} currentData={currentData} setCurrentData={setCurrentData}/> )
                        }
                    </div>
                )
            }
        </div>
    )
}

export function GroupContent({
        currentData,
        mode,
        setCurrentData,
        onAdd,
        onUpdate,
        onDelete,
        messageDelete,
    groupContent, 
    contentFields
    }: Partial<ModalCustomInterface> & {
        groupContent?: groupContent[], 
        
    }){
    
    
    return (
        <div className="flex px-2 justify-between gap-2  overflow-hidden">
            {
                groupContent && groupContent?.map((content, index)=>
                    <div key={index} className="w-full mx-auto">
                        {
                            content.isCard ?
                                <CardGroupContent 
                                    label={content.label}
                                    fieldGroupKey={content.fieldGroupKey}
                                    dataField={contentFields}
                                    currentData={currentData}
                                    setCurrentData={setCurrentData}

                                    />
                                : 
                                    contentFields && contentFields.filter(s=>content.fieldGroupKey.includes(s.key)).map((field, index)=>{
                                            return (
                                                    <ResolveFieldByType key={index} type={field} currentData={currentData} setCurrentData={setCurrentData}/>
                                                )
                                        })
                        }
                    </div>
                )
            }
        </div>
    )
}