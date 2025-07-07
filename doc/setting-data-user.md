# Setting Data User
Halaman ini berisikan form-form pengisian yang harus dilengkapi oleh User (pengguna terdaftar/mampu authentikasi). Form berisikan data utama untuk keperluan fitur lainnya di aplikasi.

## Data yang diperlukan
 Data Sekolah, meliputi:
 - [x] nama
 - [x] npsn
 - [x] type_school: SD|SMP|SMA|MI|MTS|MA|SMK (sesuai pengembangan)
 - [x] status: Negeri|Swasta
 - [x] logo: default(logo tut wuri handayani)
 - [ ] nss (nomor statistik sekolah)
 - [ ] akreditasi
 - [x] alamat
 - [x] kelurahan_name
 - [x] kelurahan_status: kelurahan|desa
 - [x] kecamatan_name
 - [x] kota_name
 - [x] kota_status: kota|kabupaten|kotamadya|kepulauan|distrik
 - [x] provinsi_name

 ## Tabel/model
 - School: schools
    - id
    - name
    - npsn
    - type_school
    - status: enum(negeri|swasta)
    - logo:


 