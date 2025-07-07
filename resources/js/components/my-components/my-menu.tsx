import ItemMenuDashboard, {type  typeKoleksiMenu } from "../my-ui/item-menu-dashboard";
import datasiswa from '../../../images/bg/data-siswa.webp';
import approval from '../../../images/bg/sosial.png';
import absensisiswa from '../../../images/bg/absensi-siswa.webp';
import kbm from '../../../images/bg/kbm.webp';
import { permission } from '@/pages/menu';

const koleksiMenu:typeKoleksiMenu[]=[
        {
            title:'Approval',
            description: 'Anda dapat mengecek dan memvalidasi user yang mendaftar ke aplikasi',
            routeName:'approval',
            urlIcon:approval
        },
        {
            title:'Data Siswa',
            description: 'Pengolahan database siswa Anda',
            routeName: 'dbsiswa',
            urlIcon: datasiswa
        },
        {
            title:'Absensi Siswa',
            description: 'Administrasi kehadiran siswa Anda',
            routeName: 'menu',
            urlIcon: absensisiswa
        },
        {
            title:'KBM',
            description: 'Seluruh Kegiatan KBM yang Anda jalankan, termasuk paket ujian yang dilaksanakan',
            routeName: 'menu',
            urlIcon: kbm
        }
    ];

export default function MyMenu(koleksi:{koleksi:permission[]}){
    console.log('koleksi',koleksi);
    const filterShow = koleksiMenu.filter(s=> koleksi.koleksi.includes('view '+ s.title));
    return (
        <ItemMenuDashboard menus={filterShow}/>
    )
}
