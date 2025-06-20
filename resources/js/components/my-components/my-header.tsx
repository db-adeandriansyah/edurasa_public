import {type NavItem } from "@/types"
import { MyHeading, MyHeadingBoundary, MyHeadingContent } from "../my-ui/my-heading"
import { ItemHeaderNavigation } from "./item-header-left"
import ItemHeaderRight from "./item-header-right"
import MyLogo from "./my-logo";
import { currentTapel } from "./current-tapel";

export function MyHeaderFitur(){
    return(
        <>
            <MyHeading>
                <MyHeadingBoundary className="md:max-w-5xl">
                    <MyLogo/>
                    <MyHeadingContent>
                        <div className="ms-[54px] md:ms-0 max-w-2x opacity-100 translate-x-0 transition-all duration-1000 starting:opacity-0 starting:translate-x-100 flex items-center">
                            <span className="hidden md:block">
                                {currentTapel({variant:'long'})}
                            </span>
                            <span className="md:hidden">
                                {currentTapel({variant:'short'})}
                            </span>
                        </div>
                        <div className="max-w-2x  hover:bg-sky-700/10 hover:ps-2 rounded-4xl cursor-pointer opacity-100 -translate-x-0 transition-all duration-1000 starting:opacity-0 starting:-translate-x-100">
                            <ItemHeaderRight/>
                        </div>
                    </MyHeadingContent>

                </MyHeadingBoundary>
            </MyHeading>

        </>
    )
}
export default function MyHeader({navigationCollection}:{navigationCollection:NavItem[]}){
    return(
        <>
            <MyHeading>
                <MyHeadingBoundary className="md:max-w-5xl">
                    <MyLogo/>
                    <MyHeadingContent>
                        <div className="ms-[54px] md:ms-0 max-w-2x opacity-100 translate-x-0 transition-all duration-1000 starting:opacity-0 starting:translate-x-100 flex items-center">
                            <ItemHeaderNavigation ArrayMenu={navigationCollection}/>
                        </div>
                        <div className="max-w-2x  hover:bg-sky-700/10 hover:ps-2 rounded-4xl cursor-pointer opacity-100 -translate-x-0 transition-all duration-1000 starting:opacity-0 starting:-translate-x-100">
                            <ItemHeaderRight/>
                        </div>
                    </MyHeadingContent>

                </MyHeadingBoundary>
            </MyHeading>

        </>
    )
}
