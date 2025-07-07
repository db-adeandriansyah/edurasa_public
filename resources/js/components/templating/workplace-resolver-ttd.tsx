import { KelasAmpuType, SchoolType, User } from "@/types";
import { useWorkplace } from "../my-ui/my-workplace";
import React from "react";


type personTtd = 'saya'|'walas'|'kepsek'|'ortu'|undefined;

interface variantTtdProps {
    type: string
    start?: personTtd
    middle?: personTtd 
    last?: personTtd
}

function getTipeTtd(type: string): variantTtdProps | undefined {
    const spliting = type.split('_');
    if (spliting.length === 1 && spliting[0] !== 'none') {
        return {
            type: type,
            last: spliting[0] as personTtd,
        };
    }else if (spliting.length === 2 ) {
        return {
            type: type,
            start: spliting[0] as personTtd,
            last: spliting[1]as personTtd,
        };
    }else if (spliting.length === 3) {
        return { 
            type: type,
            start: spliting[0] as personTtd,
            middle: spliting[1] as personTtd,
            last: spliting[2] as personTtd,
        }
    }
    return undefined;
}
function getNamePersonTtd( personTtd: personTtd,
    selPosition: 'start' | 'middle' | 'last',
    
    
): React.ReactNode {
    const {kelasAmpuSelected,sekolah,peran,user} = useWorkplace();

    if(personTtd === 'kepsek' && selPosition === 'start'){
        return(
            <>
                <p>Mengetahui,</p>
                <p>Kepala {sekolah?.use_uptd?'UPTD':''} {sekolah?.name}</p>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <p className="font-bold underline">{sekolah?.kepsek_name}</p>
                <p className="leading-normal mx-auto">{sekolah?.kepsek_nip?'NIP. '+sekolah?.kepsek_nip : '-'}</p>
            </>
        )
    }else if(personTtd === 'kepsek' && selPosition === 'last'){
        return (
            <>
                <>
                <p>{sekolah?.kota_status} {sekolah?.kota_name}, {new Date().toLocaleString('id-ID',{dateStyle:'long'})}</p>
                <p>Kepala {sekolah?.use_uptd?'UPTD':''} {sekolah?.name}</p>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <p className="font-bold underline">{sekolah?.kepsek_name}</p>
                <p className="leading-normal mx-auto">{sekolah?.kepsek_nip?'NIP. ' + sekolah?.kepsek_nip : '-'}</p>
            </>
            </>
        )
    }else if(personTtd === 'walas' && selPosition === 'last'){
        return (
            <>
                <>
                <p>{sekolah?.kota_status} {sekolah?.kota_name}, {new Date().toLocaleString('id-ID',{dateStyle:'long'})}</p>
                <p>Wali Kelas {kelasAmpuSelected?.name}</p>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <p className="font-bold underline">{kelasAmpuSelected?.walas_name}</p>
                <p className="leading-normal mx-auto">{kelasAmpuSelected?.walas_nip?'NIP. '+kelasAmpuSelected?.walas_nip : '-'}</p>
            </>
            </>
        )
    }else if(personTtd === 'walas' && selPosition === 'start'){
        return (
            <>
                <>
                <p>Wali Kelas {kelasAmpuSelected?.name}</p>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <p className="font-bold underline">{kelasAmpuSelected?.walas_name}</p>
                <p className="leading-normal mx-auto">{kelasAmpuSelected?.walas_nip?'NIP. '+kelasAmpuSelected?.walas_nip : '-'}</p>
            </>
            </>
        )
    }else if(personTtd === 'saya' && selPosition === 'last'){
        return (
            <>
                <>
                <p>{sekolah?.kota_status} {sekolah?.kota_name}, {new Date().toLocaleString('id-ID',{dateStyle:'long'})}</p>
                <p>{peran}</p>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <p className="font-bold underline">{user.name}</p>
                <p className="leading-normal mx-auto">{user?.ptk?.nip?'NIP. '+user?.ptk?.nip : '-'}</p>
            </>
            </>
        )
    }else if(personTtd === 'saya' && selPosition === 'start'){
        return (
            <>
                <>
                <p>{peran}</p>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <p className="font-bold underline">{user.name}</p>
                <p className="leading-normal mx-auto">{user?.ptk?.nip?'NIP. '+ user?.ptk?.nip : '-'}</p>
            </>
            </>
        )
    }else if(personTtd === 'ortu'){
        return(
            <>
                <p>Orang Tua/Wali Peserta Didik</p>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <p className="border-b-1 w-auto mx-5 border-black" dangerouslySetInnerHTML={{ __html: ' ' }} ></p>
            </>
        )
    }

    return null
}
function SelStart({
    personTtd
    }:{
    personTtd?: personTtd,
    
    }){

    return (
        <td className="border-0 w-1/3 outline-0 h-48 align-middle text-center">
            {getNamePersonTtd(personTtd, 'start')}
        </td>
    )
}

function SelMiddle({personTtd}: {personTtd?: personTtd}){
    return (
        <td className="border-0 outline-0  align-middle text-center">
            {getNamePersonTtd(personTtd, 'middle')}
        </td>
    )
}

function SelLast({personTtd}: {personTtd?: personTtd}){
    return (
        <td className="border-0 w-1/3 outline-0  align-middle text-center">

              {getNamePersonTtd(personTtd, 'last')}
        </td>
    )
}

// function WorkplaceResolverTtd({ type }: { type: string }) {
function WorkplaceResolverTtd( type: string ) {
    const tipeTtd = getTipeTtd(type);
    
    // jika tipe-nya 'none' atau tidak ada yang direndering;
    if (!tipeTtd) { 
        return null;
    }


    return (
        <table className="w-full border-0 outline-0 mt-16 text-sm">
            <tbody>
                <tr>
                    <SelStart personTtd={tipeTtd.start}/>
                    <SelMiddle  personTtd={tipeTtd.middle}/>
                    <SelLast  personTtd={tipeTtd.last}/>
                </tr>
            </tbody>
        </table>
    )
}   

export {
    getTipeTtd,
    WorkplaceResolverTtd
}