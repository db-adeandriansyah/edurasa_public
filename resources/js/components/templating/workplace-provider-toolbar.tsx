import * as React from "react"
import { CompPrintArea, WorkplaceToolbar, WorkplaceYourContent } from "./workplace-control-printarea"
import { useWorkplace } from "../my-ui/my-workplace"
import {type User } from '../../types/index';
import { dataKop, propsKop, WorkplaceResolverKop } from "./workplace-resolver-kop";


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
    const [stateTtd, setStateTtd] = React.useState('');
    //sediakan data user;
    const {user} = useWorkplace()

    const onHandleStateKop = React.useCallback(
        (value:string)=>{
            setStateKop(value);
        },
        [stateKop,setStateKop]

    );

    const onHandleStateTtd = React.useCallback((value:string)=>{
        setStateTtd(value);
        },
        [stateTtd, setStateTtd]
            )
            console.log('state di provider', stateKop);
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
    console.log('toolbarDefault', stateKop)
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

function handleTypeKop({tipe,data}:{tipe:string, data:dataKop}){
    switch (tipe){
        case 'tipe_1':
            return WorkplaceResolverKop({type:'dua',data});
            break
        case 'tipe_2':
            return WorkplaceResolverKop({type:'tiga',data});
        case 'tipe_3':
            return WorkplaceResolverKop({type:'tiga',data});
        default:
            return;
    }
}

function PrintAreaWithToolbarDefault({children}:React.PropsWithChildren){
    const {stateKop, stateTtd,user} = useDefaultToolbarContext();


console.log(user.name)
    return (
        <CompPrintArea>
            {stateKop}

            {children}

            {stateTtd}
        </CompPrintArea>
    )
}
export {
    useDefaultToolbarContext,
    ToolbarDefaultProvider,
    ToolbarDefault,
    PrintAreaWithToolbarDefault,
}
