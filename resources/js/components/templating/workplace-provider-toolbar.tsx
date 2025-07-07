import * as React from "react"
import { CompPrintArea, WorkplaceToolbar, WorkplaceYourContent } from "./workplace-control-printarea"
import { useWorkplace } from "../my-ui/my-workplace"
import {type User } from '../../types/index';
import { dataKop, handleTypeKop } from "./workplace-resolver-kop";
import { WorkplaceResolverTtd } from "./workplace-resolver-ttd";


type typeContextValueToolbar ={
    stateKop            : string
    onHandleStateKop    :(value:string)=>void
    stateTtd            : string
    onHandleStateTtd    : (value:string) =>void;
    user                : User
}

const DefaultToolbarContext = React.createContext<typeContextValueToolbar|null>(null);

function useDefaultToolbarContext(){
    const context = React.useContext(DefaultToolbarContext);
    if(!context){
        throw new Error('Wajib pake default Toolbar geess');
    }
    return context;
}

function ToolbarDefaultProvider({
    children
}:React.PropsWithChildren<{

}>){
    const [stateKop, setStateKop] = React.useState('');
    const [stateTtd, setStateTtd] = React.useState('none');
    //sediakan data user;
    const {user} = useWorkplace()

    const onHandleStateKop = React.useCallback(
        (value:string)=>{
            setStateKop(value);
        },
        [stateKop,setStateKop]
    );

    const onHandleStateTtd = React.useCallback(
        (value:string)=> {
            setStateTtd(value);
            }, 
        [stateTtd, setStateTtd]
    );

        
    const contextToolbarValue  = React.useMemo<typeContextValueToolbar>(
        ()=>(
            {
                stateKop,
                onHandleStateKop,
                stateTtd,
                onHandleStateTtd,
                user
            }
        ),
        [stateKop, onHandleStateKop, stateTtd, onHandleStateTtd,user]
    )

    return(
        <DefaultToolbarContext.Provider value={contextToolbarValue}>
            <WorkplaceYourContent>
                {children}
            </WorkplaceYourContent>
        </DefaultToolbarContext.Provider>
    )
}

function ToolbarDefault({children}:React.PropsWithChildren){
    const {stateKop, onHandleStateKop, stateTtd, onHandleStateTtd} = useDefaultToolbarContext();
    
    return (
        <WorkplaceToolbar
            
            value={stateKop}
            onValueChange={onHandleStateKop}
            valueTtd = {stateTtd}
            onValueTtdChange={onHandleStateTtd}
            >
                {children}
        </WorkplaceToolbar>
    )
}

function PrintAreaWithToolbarDefault({children}:React.PropsWithChildren){
    const {stateKop, stateTtd} = useDefaultToolbarContext();
    const {sekolah,kop_custom} = useWorkplace();
    const CompKop = handleTypeKop(stateKop, {
                    sekolah:sekolah,
                    kop_surat:kop_custom 
                } as dataKop
            );
    const CompTtd = WorkplaceResolverTtd(stateTtd);
    return (
        <CompPrintArea>
            {CompKop}
            

            {children}

            {CompTtd}
        </CompPrintArea>
    )
}


export {
    useDefaultToolbarContext,
    ToolbarDefaultProvider,
    ToolbarDefault,
    PrintAreaWithToolbarDefault,
}
