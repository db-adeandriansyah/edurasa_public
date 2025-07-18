import { groupContent, ModalCustomInterface } from "../interfaces/type"
import { CardGroupContent, CardGroupContentOnly} from "./card-group-content"
import { ResolveFieldByType } from "./resolve-field"

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
        <div className="grid grid-cols-1 md:grid-cols-2 px-2 justify-between gap-2 overflow-hidden">
            {
                groupContent && groupContent?.map((content, index)=>
                    <div key={index} className="w-full mx-auto flex-auto">
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
    layoutingTabsOnly
    }: Partial<ModalCustomInterface> & {
        groupContent?: groupContent[], 
        
    }){
    
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 px-2 justify-between gap-2 overflow-hidden">
            {
                groupContent && groupContent?.map((content, index)=>
                    <div key={index} className="w-full mx-auto flex-auto">
                        {
                            content.isCard ?
                                <CardGroupContentOnly 
                                    label={content.label}
                                    fieldGroupKey={content.fieldGroupKey}
                                    dataField={contentFields}
                                    currentData={currentData}
                                    setCurrentData={setCurrentData}
                                    layoutingTabsOnly={layoutingTabsOnly}
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