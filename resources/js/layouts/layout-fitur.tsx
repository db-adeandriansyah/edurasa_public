import { PageContent, PageFitur, PageHeader, WrapperContent, WrapperFitur } from "@/components/my-ui/page-fitur";
import { ComponentProps } from "react";

export default function LayoutFitur({children}:ComponentProps<'div'>){
    return (
        <PageFitur>
            <PageHeader/>
            <PageContent>
                <WrapperFitur className="mb-3"/>
                <WrapperContent>
                    {children}
                </WrapperContent>
            </PageContent>
        </PageFitur>

    )
}
