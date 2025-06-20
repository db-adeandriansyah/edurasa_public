# Fitur
Ada beberapa fitur yang akan disiapkan di aplikasi ini. Di antaranya:
 - Approval
 - Manajemen Siswa
 - Manajemen Kelas
 - Manajemen Sekolah
 - Manajemen Kehadiran Siswa
 - dll (menyusul)

Setiap fitur akan menjadi sekumpulan menu di route 'menu'. Setiap menu mempunyai beberapa subfitur sebagai fokus kerjaan pengguna. 

Misalnya, pada fitur Manajemen Siswa terdapat beberapa subfitur yang terdiri dari:
 - Data Siswa (Siswa yang saat ini diampu)
 - Mutasi (data mutasi berdasarkan data sekolah user)
 - Statistik (data mutasi berdasarkan data satu sekolah dengan user)

Jika dilihat pada subfitur, terdapat pengkondisian untuk dapat menampilkan data-data tersebut. Misalnya subfitur 'Data Siswa', aplikasi harus menyiapkan data siswa berdasarkan kriteria dari user yang sedang mengakses saat ini. Artinya, setiap kali mencoba menampilkan data, dari sisi server akan melakukan query terhadap data berdasarkan kriterianya masing-masing. 

Oleh karena itu, sebelum kita melihat data yang akan diberikan. Ada baiknya kita siapkan data sebagai refrensi yang akan dipilih pengguna. Data-data tersebut kemudian diteruskan pada kommponen-komponen yang ditempatkan di halaman fitur.

# HandleInertiaRequest
Bawaan laravel menyediakan data yang dibagikan antara server dan client. Salah satunya tentang data User. Oleh karena itu kita kana menyediakan data data pengontrol di sini untuk dapat dimanfaatkan oleh aplikasi. Terutama pada fitur dan subfiturnya

# Data yang dibutuhkan pengontrol
    - Data User
        - id
        - nama User
        - email
        - nip (jika dari PTK)
        - nis dan nisn (jika dari Siswa)
        - mapel ampu (jika PTK berjenis Guru Mapel)
    - Data Sekolah
        - nama sekolah
        - kepala sekolah
        - nip kepala sekolah
        - logo 
        - kurikulum yang berlaku saat ini
        - data pegawai di sekolah (jika pengguna adalah admin)
            - nama guru kelas/walikelas
            - nip
            - kelas yang diwalikan
    - Data kelas
        - kelas ampu

# format API
```
    {
        datauser : {
                    id: string|integer (merujuk tabel User),
                    name:string,
                        
                },
        profilable : {
            
                    nip?:string,
                    nis?:string,
        }
        mapel_ampu:[
                        {
                            id: string|integer (merujuk tabel Mapel)
                            name: string
                            kode_mapel: string
                            kode_kelompok_mapel: string
                        },
                        {...}
                    ]
        kelas_ampu: [
                        {
                            id:string|ingeger
                            name: string
                        }
                    ] 
        peran       : string (GK|GMP|Kepsek|Siswa|...)
        permission  : [spatie getAllPermission]
        datasekolah : {
                id : string|integer
                nama_sekolah: string
                logo : string
                npsn : string
                
        },
        kepsek : {
                nama_kepsek : string
                nip_kepsek? : string
        }

    }
```
    


