# Hunter Exam

Sebuah repository sederhana untuk menguji kemampuan peserta calon tim IT SMA Yos SUdarso Karawang.

## Penjelasan Website

Pak Bambang sedang membuat web sebagai berikut;

- Sebuah web yang terdiri dari 3 komponen utama, `homepage`, `user`, dan `login`.
- User dapat melakukan login berdasarkan data yang sudah disimpan di database.
- Ketika user login, website akan mencatat waktu terjadinya hit dan `header` dari request user dalam sebuah `Object`.
- Ketika user berhasil login, user akan melihat history kunjungannya.

## Masalah

Ketika user login, sesi yang mencatat data user terhapus secara otomatis, yang membuat user tak dapat login meskipun username dan passwordnya sudah benar.

## Goal

- Memperbaiki bug tersebut.