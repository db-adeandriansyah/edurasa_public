import type {KopSurType, SchoolType } from "@/types";
import { currentTapel } from "../my-components/current-tapel";

type typeKolomKop = 'dua'|'tiga'|'soal';

interface dataKop{
   sekolah: SchoolType;
   kop_surat?: KopSurType[]
}
interface propsKop{
    type : typeKolomKop
    data : dataKop
}

function WorkplaceResolverKop({type, data}:propsKop){
    return (
        <TableKop>
            {type==='dua'?(
                <DuaKolom type={type} data={data}/>
            ):(
                <TigaKolom type={type} data={data}/>
            )}
        </TableKop>
    )
}

function DuaKolom({type,data}:propsKop){
    return(
        <tr>
            <td style={{
                textAlign : 'center',
                verticalAlign : 'middle',
                borderTop:0,
                borderLeft:0,
                borderRight:0,
                borderBottom:'5pt double #000',
                width:'20%'
            }}> 
            {data.sekolah.type_school === 'SMA' ? (

                <LogoKotaProvinsi urlimage={data.sekolah.provinsi_logo as string}/>
            ):
                <LogoKotaProvinsi urlimage={data.sekolah.kota_logo as string}/>

            }
            </td>
            <IsiKop type={type} data={data}/>
        </tr>
    )
}
function LogoSekolah({urlimage}:{urlimage?:string}){
    return (
        <img src={urlimage} alt="logo sekolah" className="mx-auto mb-2 h-28 md:h-32"/>
    )
}
function LogoKotaProvinsi({urlimage}:{urlimage?:string}){
    return (
        <img src={urlimage} alt="logo pemerintahan" className="mx-auto mb-2 h-28 md:h-32"/>
    )
}
function TigaKolom({type,data}:propsKop){
    return(
        <tr>
            <td style={{
                textAlign : 'center',
                verticalAlign : 'middle',
                borderTop:0,
                borderLeft:0,
                borderRight:0,
                borderBottom:'5pt double #000',
                width:'18%'
            }}>
                 {data.sekolah.type_school === 'SMA' ? (

                        <LogoKotaProvinsi urlimage={data.sekolah.provinsi_logo as string}/>
                    ):
                        <LogoKotaProvinsi urlimage={data.sekolah.kota_logo as string}/>

                    }
            </td>
            <IsiKop type={type} data={data}/>

            <td style={{
                textAlign : 'center',
                verticalAlign : 'middle',
                borderTop:0,
                borderLeft:0,
                borderRight:0,
                borderBottom:'5pt double #000',
                width:'18%'
            }}>
                <LogoSekolah urlimage={data.sekolah.logo as string}/>
                
            </td>
        </tr>
    )
}
function IsiKop({type,data}:propsKop){
    const datasekolah = data.sekolah as SchoolType;
    
    return (
        <td style={{
                textAlign : 'center',
                verticalAlign : 'middle',
                borderTop:0,
                borderLeft:0,
                borderRight:0,
                borderBottom:'5pt double #000',
                width:'auto',
        }} 
        >
            {datasekolah.type_school === 'SMA'
                ? (
                    type==='soal'?(
                        <>
                            <p className="uppercase font-extrabold text-lg md:text-3xl leading-none"  contentEditable={true} suppressContentEditableWarning={true}>NASKAH SOAL</p>
                            <p className={`uppercase font-extrabold ${datasekolah.name.length>20?'text-xl md:text-2xl':'text-2xl md:text-3xl'} leading-none`}>{datasekolah.name}</p>
                            <p  className="uppercase font-extrabold text-lg md:text-2xl leading-none">{datasekolah.kota_status} {datasekolah.kota_name}</p>
                            <p className="uppercase font-extrabold text-lg md:text-2xl leading-none">
                                {currentTapel({variant:'full'})}
                            </p>
                        </>
                    ):(
                        <>
                            <p className="uppercase font-extrabold text-lg md:text-2xl leading-none">PEMERINTAH PROVINSI {datasekolah.provinsi_name}</p>
                            <p className={`uppercase font-extrabold ${datasekolah.name.length>20?'text-xl md:text-2xl':'text-2xl md:text-4xl'} leading-none`}>{datasekolah.name}</p>
                            <p className="uppercase font-extrabold text-lg md:text-2xl leading-none">{datasekolah.kota_status} {datasekolah.kota_name}</p>
                            <p className="leading-none italic text-sm">Alamat: {datasekolah.alamat}, {datasekolah.kelurahan_status} {datasekolah.kelurahan_name}, Kec. {datasekolah.kecamatan_name}  </p>
                            <p className="leading-none italic text-sm">
                                { (datasekolah.nss) ? 'NSS: ' + datasekolah.nss :null}
                                { (datasekolah.npsn) ? ' | NPSN: ' + datasekolah.npsn : null}
                                { (datasekolah.email) ? '| Email: ' + datasekolah.email : null}
                                { (datasekolah.kode_pos) ? ' | Kode Pos: ' + datasekolah.kode_pos : null}
                            </p>
                        </>

                    )
                )
                : (
                    type==='soal'?(
                        <>
                            <p className="uppercase font-extrabold text-lg md:text-3xl leading-none"  contentEditable={true} suppressContentEditableWarning={true}>NASKAH SOAL</p>
                            <p className={`uppercase font-extrabold ${datasekolah.name.length>20?'text-xl md:text-2xl':'text-2xl md:text-3xl'} leading-none`}>{datasekolah.use_uptd && 'UPTD'} {datasekolah.name}</p>
                            <p  className="uppercase font-extrabold text-lg md:text-2xl leading-none">Kecamatan {datasekolah.kecamatan_name}</p>
                            <p className="uppercase font-extrabold text-lg md:text-2xl leading-none">
                                {currentTapel({variant:'full'})}
                            </p>
                        </>
                
                    ):(
                        <>
                            <p className="uppercase font-extrabold text-lg md:text-2xl leading-none">PEMERINTAH DAERAH {datasekolah.kota_status} {datasekolah.kota_name}</p>
                            <p className="uppercase font-extrabold text-lg md:text-2xl leading-none" contentEditable={true} suppressContentEditableWarning={true}>DINAS PENDIDIKAN</p>
                            <KontenKop datasekolah={datasekolah} />
                        </>
                    )
                )
            }
        </td>
    )
}
function KontenKop({datasekolah}:{datasekolah:SchoolType}){
    
    return (
        <>
        <p className={`uppercase font-extrabold ${datasekolah.name.length>20?'text-xl md:text-2xl':'text-2xl md:text-4xl'} leading-none`}>{datasekolah.use_uptd && 'UPTD'} {datasekolah.name}</p>
                <p className="leading-none italic text-sm">Alamat: {datasekolah.alamat}, {datasekolah.kelurahan_status} {datasekolah.kelurahan_name}, Kec. {datasekolah.kecamatan_name}  </p>
                <p className="leading-none italic text-sm">
                    { (datasekolah.nss) ? 'NSS: ' + datasekolah.nss :null}
                    { (datasekolah.npsn) ? ' | NPSN: ' + datasekolah.npsn : null}
                    { (datasekolah.email) ? '| Email: ' + datasekolah.email : null}
                    { (datasekolah.kode_pos) ? ' | Kode Pos: ' + datasekolah.kode_pos : null}
                </p>
        </>
    )
}
function TableKop({children,...props}:React.ComponentProps<'table'>){
    return (
        <table id="naskah_kop" style={{
            borderCollapse:'collapse',
            borderSpacing:0,
            width:'100%',
            fontFamily:'timesNewRoman',
            marginTop:'1rem',
            marginBottom:'2rem'
        }}
        {...props}
        >
            <tbody>
                {children}
            </tbody>
        </table>
    )
}

function handleTypeKop(tipe:string, data:dataKop){
    if(tipe.indexOf('custom_type')>-1){
        return data.kop_surat?.find(item=>item.type_kop === tipe )?.konten;
    }else{

        switch (tipe){
            case 'tipe_1':
                return WorkplaceResolverKop({type:'dua',data});
            case 'tipe_2':
                return WorkplaceResolverKop({type:'tiga',data});
            case 'tipe_3':
                return WorkplaceResolverKop({type:'soal',data});
            default:
                return;
        }
    }
}

export {
    type typeKolomKop,
    type dataKop,
    type propsKop,
    WorkplaceResolverKop,
    handleTypeKop



}
