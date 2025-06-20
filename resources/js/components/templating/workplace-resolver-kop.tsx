
type typeKolomKop = 'dua'|'tiga';

interface dataKop{
    srcLogoKota : string
    srcLogoSekolah : string
    namaKota : string
    namaSekolah : string
    alamat1 : string
    alamat2? : string
}
interface propsKop{
    type : typeKolomKop
    data : dataKop
}

function WorkplaceResolverKop({type, data}:propsKop){
    return (
        <TableKop>
            {type==='dua'?(
                <DuaKolom data={data}/>
            ):(
                <TigaKolom data={data}/>
            )}
        </TableKop>
    )
}

function DuaKolom({data}:Omit<propsKop,'type'>){
    return(
        <tr>
            <td style={{
                textAlign : 'center',
                verticalAlign : 'middle',
                borderTop:0,
                borderLeft:0,
                borderRight:0,
                borderBottom:'10px double #000'
            }}>
                Logo Kota
            </td>
            <IsiKop data={data}/>
        </tr>
    )
}
function TigaKolom({data}:Omit<propsKop,'type'>){
    return(
        <tr>
            <td style={{
                textAlign : 'center',
                verticalAlign : 'middle',
                borderTop:0,
                borderLeft:0,
                borderRight:0,
                borderBottom:'10px double #000',
            }}>
                <div className="size-36 border-1 rounded flex justify-center items-center">logo kota/provinsi</div>
            </td>
            <IsiKop data={data}/>

            <td style={{
                textAlign : 'center',
                verticalAlign : 'middle',
                borderTop:0,
                borderLeft:0,
                borderRight:0,
                borderBottom:'10px double #000'
            }}>
                <div className="size-36 border-1 rounded flex justify-center items-center">logo Sekolah</div>

            </td>
        </tr>
    )
}
function IsiKop({data}:Omit<propsKop,'type'>){
    return (
        <td style={{
                textAlign : 'center',
                verticalAlign : 'middle',
                borderTop:0,
                borderLeft:0,
                borderRight:0,
                borderBottom:'10px double #000',
                width:'80%'
        }}>{data.namaSekolah}</td>
    )
}
function TableKop({...props}:React.ComponentProps<'table'>){
    return (
        <table id="naskah_kop" style={{
            borderCollapse:'collapse',
            borderSpacing:0,
            width:'100%',
            fontFamily:'timesNewRoman',
            marginTop:'2rem'
        }}
        {...props}
        />
    )
}

export {
    type typeKolomKop,
    type dataKop,
    type propsKop,
    WorkplaceResolverKop



}
