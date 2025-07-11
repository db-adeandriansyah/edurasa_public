
import { ModalCustomInterface } from "../type"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GroupContent, GroupContentOnly } from "./group-content"

export function ContentFieldTabsForm({
        contentFields,
        currentData,
        mode,
        setCurrentData,
        onAdd,
        onUpdate,
        onDelete,
        messageDelete,
        contentTabHeaders,
        // handleInputChange
    }:Partial<ModalCustomInterface> ){

    if(mode === 'delete'){
        return messageDelete
    }
    return (
        <Tabs defaultValue={contentTabHeaders?.[0].value} className="gap-0">
            <TabsList className="bg-sky-400 dark:bg-sky-700  rounded-b-none pb-0">
            {
                contentTabHeaders?.map((tab,index)=>
                    <TabsTrigger key={index} value={tab.value} className="rounded-b-none hover:bg-gray-200 duration-700 transition-colors dark:hover:text-black border-b-0 data-[state=active]:bg-sky-300 dark:data-[state=active]:bg-sky-600 dark:data-[state=active]:border-sky-400 dark:data-[state=active]:text-white">
                        {tab.label}
                    </TabsTrigger>
                )
            }
            </TabsList>
            {
                contentTabHeaders?.map((tabContent, index)=>
                    <TabsContent key={index} value={tabContent.value} className="border-t-2 rounded-3xl rounded-s-none pt-2 dark:border-sky-700">
                        <GroupContent groupContent={tabContent?.groupContents} contentFields={contentFields} currentData={currentData} setCurrentData={setCurrentData}/>
                    </TabsContent>
                )
            }

        </Tabs>
    )
}

export function ContentFieldTabsFormOnly({
        contentFields,
        currentData,
        mode,
        setCurrentData,
        onAdd,
        onUpdate,
        onDelete,
        messageDelete,
        contentTabHeaders,
        contentTabHeadersOnly,
        // handleInputChange
    }:Partial<ModalCustomInterface> ){

    if(mode === 'delete'){
        return messageDelete
    }
    return (
        <Tabs defaultValue={contentTabHeaders?.[0].value} className="gap-0">
            <TabsList className="bg-sky-400 dark:bg-sky-700  rounded-b-none pb-0">
            {
                contentTabHeaders?.map((tab,index)=>
                    <TabsTrigger key={index} value={tab.value} className="rounded-b-none hover:bg-gray-200 duration-700 transition-colors dark:hover:text-black border-b-0 data-[state=active]:bg-sky-300 dark:data-[state=active]:bg-sky-600 dark:data-[state=active]:border-sky-400 dark:data-[state=active]:text-white">
                        {tab.label}
                    </TabsTrigger>
                )
            }
            </TabsList>
            {
                contentTabHeaders?.map((tabContent, index)=>
                    <TabsContent key={index} value={tabContent.value} className="border-t-2 rounded-3xl rounded-s-none pt-2 dark:border-sky-700">
                        <GroupContentOnly contentTabHeadersOnly={contentTabHeadersOnly} groupContent={tabContent?.groupContents} contentFields={contentFields} currentData={currentData} setCurrentData={setCurrentData}/>
                    </TabsContent>
                )
            }

        </Tabs>
    )
}
