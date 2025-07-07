
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { OptionAddKopSurat, OptionAddTandaTangan, WorkplaceToolbarPure, WrapperToolbar } from "./workplace-control-printarea"
import { useDefaultToolbarContext } from "./workplace-provider-toolbar"

interface tabsControl{
    title : string 
    content : React.ReactNode
}

type propsTabsToolbar = {
    tabs: tabsControl[],
    defaultValue: string
    useKopTtd?: boolean
}

function WorkplaceTabsToolbar({tabs, defaultValue, useKopTtd = false}:propsTabsToolbar){
    const {stateKop, onHandleStateKop, stateTtd, onHandleStateTtd} = useDefaultToolbarContext();
    return(
        <WorkplaceToolbarPure className="min-h-36">
            <Tabs defaultValue={defaultValue} className="mt-2 text-sm">
                <TabsList>
                    {
                        tabs.map((tab,index)=>{
                            return (
                                <TabsTrigger key={index} value={tab.title} className="text-xs">{tab.content}</TabsTrigger>
                            )
                        })
                    }
                    {useKopTtd && (
                        <TabsTrigger value="kopttd" className="text-xs">Kop dan Tanda Tangan</TabsTrigger>
                    )}
                </TabsList>
                {
                        tabs.map((tab,index)=>{
                            return (
                                <TabsContent key={index} value={tab.title} className="shadow-lg p-2">{tab.title}</TabsContent>
                            )
                        })
                    }
                    {useKopTtd && (
                        <TabsContent value="kopttd" className="shadow-lg p-2">
                            <div className="flex gap-2 mx-3">
                                <OptionAddKopSurat value={stateKop} onValueChange={onHandleStateKop}/>
                                <OptionAddTandaTangan ttd={stateTtd} onTtdChange={onHandleStateTtd}/>
                            </div>
                        </TabsContent>
                    )}
            </Tabs>
        </WorkplaceToolbarPure>
    )
}

export{
    WorkplaceTabsToolbar,
    type tabsControl,
    type propsTabsToolbar
}