import { KelasAmpuType } from "@/types";
import { useWorkplace, WrappingButtonWithTooltip } from "../my-ui/my-workplace"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";


function WorkplaceControlRoom ({type}:{type?: 'rombel' | 'jenjang'} = {type: 'rombel'}) {
    const {kelas_ampu, kelasAmpuSelected, handleKelasAmpuSelected} = useWorkplace();

    const teksTipe = type === 'rombel' ? 'Kelas' : 'Jenjang';
    const valueTipe = type === 'rombel' ? 'name' :'jenjang_name';
    const valueId = type === 'rombel' ? 'id' : 'jenjang_id';
    const kelasampu = type==='rombel'?kelas_ampu:kelas_ampu?.filter((obj, index, self) => index === self.findIndex((t) => t.jenjang_id === obj.jenjang_id) );;   
    const kelasAmpuSelectedId = kelasAmpuSelected ? kelasAmpuSelected[valueId] : '';
    
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {kelasampu && kelasampu?.length > 1 ?(
                    <WrappingButtonWithTooltip asChild tooltip={{ children: 'Pilih Kelas Yang Anda Ampu', side:'left' }}>
                        <div className="flex flex-row items-center">
                            <div className="rounded-s-4xl border-b-2  border-t-2 self-center pe-1 ps-2 py-0">{teksTipe}</div>
                            <div className="rounded-full border-s-2  border-e-2 h-8 min-w-8 flex justify-center items-center align-center truncate">{kelasAmpuSelected ? kelasAmpuSelected[valueTipe] : 'Pilih'}</div>
                        </div>
                    </WrappingButtonWithTooltip>
                ):(
                    <div className="flex flex-row items-center">
                        <div className="rounded-s-4xl border-b-2  border-t-2 self-center pe-1 ps-2 py-0">{teksTipe}</div>
                        <div className="rounded-full border-s-2  border-e-2 h-8 min-w-8 flex justify-center items-center align-center truncate">{kelasAmpuSelected?.name}</div>
                    </div>

                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-sm">
                <DropdownMenuLabel>Pilih {teksTipe}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={kelasAmpuSelectedId} onValueChange={(item)=>{
                        if(item){
                            const selectedKelasAmpu = kelasampu?.find(kelas => kelas.id === item);
                            if (selectedKelasAmpu) {
                                handleKelasAmpuSelected && handleKelasAmpuSelected(selectedKelasAmpu);
                            }   
                        }
                    } }>
                        {kelasampu?.map((item, key) => {
                                return (
                                    <DropdownMenuRadioItem key={key} value={item.id} className="flex flex-row items-center gap-2">
                                        <div className="flex flex-row items-center gap-2"> 
                                            <div className="truncate">
                                                {type === 'rombel' ? 'Kelas' : 'Jenjang'}
                                            </div>
                                            <span className="rounded-full border-s-2  border-e-2 h-6 max-w-6 flex justify-center items-center align-center truncate">{item[valueTipe]}</span>
                                        </div>
                                    </DropdownMenuRadioItem>
                                )   
                            })}
                    </DropdownMenuRadioGroup>
            </DropdownMenuContent>

        </DropdownMenu>
    )
}


export {
    WorkplaceControlRoom
}
