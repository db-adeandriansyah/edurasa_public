# Manajemen Approval

Manajemen Approval merupakan fitur aplikasi untuk memproses registrasi user baru. Setiap user akan dilakukan pengecekan data realnya oleh user lain agar tervalidasi kebenaranya.

Pada dasarnya, aplikasi ini dikhususkan untuk Pendidik dan Tenaga Kependidikan (PTK). User lain seperti siswa akan didaftarkan oleh PTK sendiri melalaui beberapa tahapan setelah proses approval terjadi. Mengapa demikian? 

Alasan kami adalah agar masing-masing peran di satuan pendidikan memiliki ruangnya masing-masing. Di dunia pendidikan, seorang guru mempunyai peran untuk menilai siswa melalaui serangkaian test. Misalnya test tertulis (yang sebagian besar kami sediakan di aplikasi). Konten tes ini tentunya bersifat rahasia dan tidak boleh terpublikasi sebelum pelaksanaan tes itu dilakukan oleh guru.

Edurasa menyediakan ribuan materi soal yang dapat digunakan oleh user, terutama guru, untuk mendesaian naskah-naskah soal (paket soal). Paket soal ini memiliki properti yang mampu menggenerate ke serangkaian laporan administrasi. Seperti kisi-kisi paket soal, kunci jawaban, paket soal yang dibuat, dan lain-lain. 

Oleh karena itu, kami membatasi seorang user apabila ia ternyata adalah seorang siswa, tentu fitur materi soal ini harus dibatasi aksesnya. Sebab mereka berperan sebagai siswa saja.

## Hak akses
Fitur/halaman ini hanya bisa diakses oleh user dengan ketentuan:
- memiliki Roles (Spatie), sebagai: Super Admin, admin
- atau permission: view Approval;


## Alur Registrasi User Baru
Saat pertama kali mengunjung web aplikasi ini, maka User akan diarahkan ke laman:
- Formulir Sign-up/ sign-in via Gmail.com / akun belajar.id (opsional pengembangan)
- Pengisian Data PTK, termasuk sekolah, kelas yang diampu, mapel, dll.
- laman tunggu konfirmasi

### Laman: Formulir Sign in/ Register
 laman ini berisi form sign-in seperti pada umumnya. Pengisian email dan password oleh calon pengguna baru. Di laman ini juga terdapat pilihan sign-in denga akun Gmail/belajar.id. Khusus PTK yang masuk via akun email guru.belajar.id, aplikasi akan meloloskan User tanpa harus kami konfirmasi/validasi. Kami menganggap user yang login dengan akun guru.belajar.id adalah benar-benar seorang guru.

 ### Laman: Proses Pengisian Data PTK
 laman ini hadir untuk meminta data pengguna terkait data-data yang diperlukan. Data-data tersebut akan digunakan di berbagai fitur aplikasi. Misalnya, ketika pengguna mengakses halaman fitur yang memerlukan kepala surat, aplikasi akan menyediakan format KOP Surat sesuai dengan data yang diberikan di laman ini.

 ### Laman: Tunggu konfirmasi
 Laman ini mungkin akan muncul setelah pengguna mengisikan informasi registrasinya. Sebagaimana yang sebelumnya kami jelaskan, pengguna yang meregistrasikan dengan akun guru.belajar.id tidak akan melewati laman ini dan dapat mengakses fitur-fitur aplikasi.