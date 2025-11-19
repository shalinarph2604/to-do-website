**📝 README: Task Management App (Next.js & Supabase)
Aplikasi manajemen tugas sederhana yang dibangun menggunakan Next.js untuk frontend dan API routes, serta Supabase sebagai database otentikasi dan penyimpanan data.**


**🚀 1. Cara Instalasi Project**

Langkah-langkah berikut akan membantu Anda menyiapkan proyek di lingkungan lokal Anda.

**Prasyarat**

- Node.js (Versi 18 atau lebih tinggi direkomendasikan)

- npm atau Yarn

- Akun Supabase

**Langkah Instalasi**
1. Clone Repository
```bash
git clone [URL_REPOSITORI_ANDA]
cd task-management-app
```
2. Instal Dependensi
```bash
npm install
# atau
yarn install
```
3. Konfigurasi Environment Variables

Buat file .env.local di root project dan isi dengan kredensial Supabase dan NextAuth Anda:
```bash
# NextAuth Configuration
NEXTAUTH_SECRET="your_nextauth_secret_key"
NEXTAUTH_URL="http://localhost:3000"

# Supabase Configuration
SUPABASE_URL="https://[PROJECT_REF].supabase.co"
SUPABASE_ANON_KEY="your_anon_key"

# Service Role Key (Opsional, hanya jika diperlukan untuk API internal)
SUPABASE_SERVICE_KEY="your_service_role_key"
```
(Ganti placeholder dengan nilai yang sebenarnya dari dashboard Supabase Anda)


**⚙️ 2. Cara Menjalankan Frontend & Backend**

Proyek ini menggunakan Next.js, sehingga Frontend dan Backend (API Routes) dijalankan secara bersamaan.

1. Persiapan Database (Supabase)
   
Karena proyek ini menggunakan approach manual untuk skema database, Anda harus membuat tabel tasks dan mengaktifkan Otentikasi/RLS secara manual di dashboard Supabase Anda.

1.1. Setup Tabel tasks

Buat tabel bernama tasks dengan kolom-kolom berikut:

Nama Kolom: 1) id; 2) user_id; 3) title; 4) status; 5) created_at

Tipe Data: 1) uuid; 2) uuid; 3) text; 4) text; 5) timestamptz

Properti: 1) Primary Key Default gen_random_uuid(); 2) Foreign Key ke auth.users; 3) NOT NULL; 4) NOT NULL; 5) Default now()

Deskripsi: 1) ID unik tugas; 2) ID pengguna yang membuat tugas. Penting untuk RLS; 3) Judul tugas; 4) Status tugas (e.g., 'pending', 'on-going', 'done'); 5) Waktu pembuatan.

1.2. Konfigurasi Row Level Security (RLS)

Pastikan RLS diaktifkan untuk tabel tasks, dan buat policy yang sesuai (misalnya, pengguna hanya dapat melihat, membuat, mengedit, dan menghapus tugas yang user_id-nya cocok dengan ID pengguna yang sedang login).

2. Menjalankan Project

Jalankan perintah berikut di terminal Anda:

```bash
npm run dev
# atau
yarn dev
```
Aplikasi akan berjalan di http://localhost:3000.


**🗺️ 3. Daftar Endpoint API**

1. /api/tasks (GET)

Mengambil daftar semua tugas yang dimiliki oleh pengguna saat ini.

2. /api/task (POST)

Membuat tugas baru.

3. /api/tasks/[taskId] (GET)

Mengambil detail satu tugas berdasarkan ID.

4. /api/tasks/[taskId] (PATCH)

Memperbarui detail tugas (misalnya, hanya status atau title).

5. /api/tasks/[taskId] (DELETE)

Menghapus tugas berdasarkan ID.

6. /api/auth/[...nextauth] (POST)

NextAuth handler untuk login/session management.


**📂 4. Struktur Folder**

Berikut adalah struktur direktori utama proyek ini:

```bash
.
├── components/           # Komponen UI yang dapat digunakan kembali (Button, Modal, Input)
│   ├── modals/           # Komponen Modal (LoginModal, RegisterModal, EditModal, NewTaskModal)
│   ├── task/             # Komponen spesifik tugas (TasksFeed, CardTask, StatusTask, TaskActionMenu)
├── hooks/                # Custom React Hooks (useCurrentUser, useLoginModal, useTasks, useTask, useRegisterModal, useEditModal, useNewTaskModal)
├── pages/                # Halaman Utama Aplikasi dan API Routes
│   ├── api/              # Backend API Routes
│   │   ├── auth/         # NextAuth Catch-all Route
│   │   ├── tasks/        # Task API Routes
│   │   │   ├── [taskId].ts   # Handler GET, PATCH, DELETE untuk 1 tugas
│   │   │   └── index.ts      # Handler GET, POST untuk daftar tugas
│   │   ├── register.ts   # POST pengguna baru yang baru register
│   │   └── user.ts       # Endpoint untuk mendapatkan user sesi
│   ├── _app.tsx          # Konfigurasi aplikasi global (Providers, Layout)
│   ├── index.tsx         # Halaman utama (Daftar Tasks)
│   └── login.tsx         # Halaman Login
├── lib/                  # Fungsi atau utilitas umum (misalnya fetcher.ts, serverAuth.ts, supabase.ts, supabaseAdmin.ts)
└── .env.local            # Environment variables (Wajib)
```
