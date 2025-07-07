import { ComponentProps, PropsWithChildren, useState, type ReactNode } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectProps, SelectValue } from "@radix-ui/react-select";
import { cn } from '@/lib/utils';
import { useWorkplace } from '../my-ui/my-workplace';
import { Grip } from 'lucide-react';

type typeWrapperToolbar={
    title : string
    children?:ReactNode
}

function WrapperToolbar({className, title, children}:ComponentProps<'div'> & typeWrapperToolbar){
    return (
        <div className={cn("dark:border-1 dark:border-green-500 shadow-lg  mt-2 mb-0 pt-2 px-1 pb-1 bg-zinc-300 dark:bg-zinc-500 rounded-t-xl relative text-xs w-1/2 mx-auto",
            className
        )}>
            <div className="absolute top-0 left-0 border-b-1 border-zinc-300 dark:border-zinc-500 mb-1 px-2 -translate-y-1/2 bg-zinc-300 dark:bg-zinc-500 dark:text-white rounded-e-2xl">
            {title}
            </div>
            {children}
        </div>
    )
}

function WorkplaceToolbar({
    children,
    value,
    onValueChange,
    valueTtd,
    onValueTtdChange
}:PropsWithChildren <{
    value:string,
    onValueChange:(value:string)=>void,
    valueTtd:string,
    onValueTtdChange: (ttdValue:string)=>void
}>){

    return(
        <>
        <div className="shadow-lg mx-2 mt-2 mb-0 p-2 bg-zinc-400 dark:bg-zinc-600 rounded-t-xl relative text-sm">
            <div className="absolute top-0 left-0 px-2 -translate-y-1/2 bg-zinc-400 dark:bg-zinc-600 font-semibold rounded-e-2xl">
            Toolbar
            </div>
                {children}

                <WrapperToolbar title="Tambah Keterangan ini:">
                    <div className="flex gap-2 mx-3">
                        <OptionAddKopSurat value={value} onValueChange={onValueChange}/>
                        <OptionAddTandaTangan ttd={valueTtd} onTtdChange={onValueTtdChange}/>
                    </div>

                </WrapperToolbar>
        </div>
        </>
    )
}

function WorkplaceToolbarPure({children,className}:ComponentProps<'div'>){
    return(
        <div className={cn("shadow-lg mx-2 mt-2 mb-0 p-2 bg-zinc-300 dark:bg-black rounded-t-xl relative text-sm",
            className
        )}>
            <div className="absolute top-0 left-0 px-2 -translate-y-1/2 bg-zinc-300 dark:bg-black rounded-e-2xl">
            <Grip className='size-4'/>
            </div>
                {children}

        </div>
    )
}

function OptionAddKopSurat({value,onValueChange}:SelectProps){
    const {kop_custom} = useWorkplace();
    return(
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className='text-xs py-0 border-1 border-amber-200 mt-2'>
                <SelectValue placeholder="Sertakan Kop Surat" ></SelectValue>
            </SelectTrigger>
            <SelectContent className="text-xs">
                <SelectItem className='text-xs py-1' value="tipe_0">Tidak Disertakan</SelectItem>
                <SelectItem className='text-xs py-1 flex justify-between w-full' value="tipe_1"><span>2 Kolom</span><span> (default)</span></SelectItem>
                <SelectItem className='text-xs py-1 flex justify-between w-full' value="tipe_2"><span>3 Kolom</span><span> (default)</span></SelectItem>
                <SelectItem className='text-xs py-1 flex justify-between w-full' value="tipe_3"><span>Kop Soal</span><span> (default:editable)</span></SelectItem>
                {kop_custom && kop_custom.map((item, key) => (
                    <SelectItem className='text-xs py-1 flex justify-between w-full' key={key} value={item.type_kop}>
                        <span>{item.label_name}</span>
                        <span className="text-xs text-gray-500"> (Custom)</span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
function OptionAddTandaTangan({ttd, onTtdChange}:{ttd:string, onTtdChange:(ttd:string)=>void}){
    return(
        <Select value={ttd} onValueChange={onTtdChange}>
            <SelectTrigger className='text-xs py-0 border-1 border-amber-200 mt-2'>
                <SelectValue placeholder="Sertakan Tanda Tangan"></SelectValue>
            </SelectTrigger>
            <SelectContent className="text-xs">
                <SelectItem className='text-xs py-1' value="none">Tidak Disertakan</SelectItem>
                <SelectItem className='text-xs py-1' value="saya">Saya</SelectItem>
                <SelectItem className='text-xs py-1' value="walas">Wali Kelas (Walas)</SelectItem>
                <SelectItem className='text-xs py-1' value="kepsek">Kepala Sekolah (Kepsek)</SelectItem>
                <SelectItem className='text-xs py-1' value="ortu">Orang Tua (Ortu)</SelectItem>
                <SelectItem className='text-xs py-1' value="kepsek_saya">Saya + Kepsek</SelectItem>
                <SelectItem className='text-xs py-1' value="saya_walas">Saya + Walas</SelectItem>
                <SelectItem className='text-xs py-1' value="ortu_saya">Saya + Ortu</SelectItem>
                <SelectItem className='text-xs py-1' value="kepsek_walas">Walas + Kepsek</SelectItem>
                <SelectItem className='text-xs py-1' value="ortu_walas">Walas + Ortu</SelectItem>
                <SelectItem className='text-xs py-1' value="kepsek_ortu_saya">Saya + Ortu + Kepsek</SelectItem>
                <SelectItem className='text-xs py-1' value="kepsek_ortu_walas">Walas + Ortu + Kepsek</SelectItem>
            </SelectContent>
        </Select>
    )
}

function CompPrintArea({children,...props}:ComponentProps<'div'>){
    const {printArea} = useWorkplace()
    return (
        <div ref={printArea} className="bg-white m-2 text-black p-4 min-h-svh min-w-[98%] md:max-w-3xl max-w-screen"
        {...props}
        >
                {children}
        </div>
    )
}

function  WorkplaceControlPrintarea({children}:PropsWithChildren){
    return(
        <div className="border-s-1 border-black mt-1">
            <CompPrintArea>
                {children}
            </CompPrintArea>
        </div>
    )
}


function ttdRespolve (kopSelected:string){
    switch (kopSelected){
        case 'tipe_1':
            return <p className='text-red-600 font-bold'>KOP 1</p>;
        case 'tipe_2':
            return <p className='text-green-600 font-bold'>KOP 2</p>;
        case 'tipe_3':
            return <p className='text-blue-600 font-bold'>KOP 3</p>;
        default:
            return null

    }
}
function kopResolve (kopSelected:string){
    switch (kopSelected){
        case 'tipe_1':
            return <p className='text-red-600 font-bold'>KOP 1</p>;
        case 'tipe_2':
            return <p className='text-green-600 font-bold'>KOP 2</p>;
        case 'tipe_3':
            return <p className='text-blue-600 font-bold'>KOP 3</p>;
        default:
            return null

    }
}
function WorkplaceYourContent({className,...props}:ComponentProps<'div'>){
    return (
        <div
            data-slot="workplace-your-content" 
            className={cn("flex flex-1 flex-col border-s-1 border-black mt-1",
            className
            )}
            {...props}
        />

    )

}
function WorkplaceWithControlFirstLastComp({children}:PropsWithChildren){
    const [kopSelected, setKopSelected] = useState('');
    const [ttdSelected, setTtdSelected] = useState('');

    const handleSelected = (value:string)=>{
        setKopSelected(value);
    }

    const handleTtdSelected = (value:string)=>{
        setTtdSelected(value);
    }

    return(
        <>
            <WorkplaceYourContent>
                <WorkplaceToolbar
                    value={kopSelected}
                    onValueChange={handleSelected}
                    valueTtd = {ttdSelected}
                    onValueTtdChange={handleTtdSelected}
                    >
                        <h1>menu Lain di sini</h1>
                </WorkplaceToolbar>
                <CompPrintArea>
                    {kopSelected}
                    { ttdRespolve(kopSelected)}
                    {children}
                    {kopResolve(ttdSelected)}
                </CompPrintArea>
            </WorkplaceYourContent>


        </>

    )
}
export {
    WorkplaceControlPrintarea,
    CompPrintArea,
    WorkplaceToolbar,
    WorkplaceToolbarPure,
    WorkplaceWithControlFirstLastComp,
    WorkplaceYourContent,
    OptionAddKopSurat,
    WrapperToolbar,
    OptionAddTandaTangan
}
