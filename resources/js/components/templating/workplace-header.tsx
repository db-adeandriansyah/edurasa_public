import { useEffect, useState } from "react";
import { currentTapel } from "../my-components/current-tapel";
import MyLogo from "../my-components/my-logo";
import { MyHeading, MyHeadingBoundary, MyHeadingContent } from "../my-ui/my-heading";
import {  useWorkplace } from "../my-ui/my-workplace";
import WorkplaceDropdownUser from "./workplace-dropdown-user";

export default function WorkplaceHeader ({title}:{title?:string}){
    const { user,isMobile } = useWorkplace();
    const [ hiddenLeft, setHiddenLeft ] = useState(false);

    useEffect(()=>{
        if(user.name.length > 15 ) {
            setHiddenLeft((open) => !open)
        };

    },[]);

    return (
        <MyHeading>
            <MyHeadingBoundary className="md:max-w-5xl">
                <MyLogo/>
                <MyHeadingContent>
                    <div className="ms-[54px] md:ms-0 max-w-2x opacity-100 translate-x-0 transition-all duration-1000 starting:opacity-0 starting:translate-x-100 flex items-center">
                        {(hiddenLeft && isMobile) || (
                            (title)??(<>
                                <span className="hidden md:block">
                                    {currentTapel({variant:'long'})}
                                </span>
                                <span className="md:hidden">
                                    {currentTapel({variant:'short'})}
                                </span>
                            </>)
                        )}
                    </div>
                    <div className="max-w-2x  hover:bg-sky-700/10 hover:ps-2 rounded-4xl cursor-pointer opacity-100 -translate-x-0 transition-all duration-1000 starting:opacity-0 starting:-translate-x-100">
                        {/* <AuthenticatedDropdownUser/> */}
                        <WorkplaceDropdownUser/>
                    </div>
                </MyHeadingContent>
            </MyHeadingBoundary>
        </MyHeading>
    )
}
