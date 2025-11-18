# Next Best Offer Recommendation System for Telco Services

**Capstone Project — Asah led by Dicoding in association with Accenture**  
**Team ID: A25-CS028 · Use Case: AC-01**

---

## 1. Overview

Dalam industri telekomunikasi, pelanggan memiliki berbagai pilihan paket (data, SMS, telepon, hingga layanan digital). Tanpa sistem rekomendasi yang baik, pelanggan sering bingung memilih produk yang tepat, sementara perusahaan justru membuang banyak sumber daya untuk promosi yang tidak tepat sasaran.

Proyek ini mengembangkan **Next Best Offer Recommendation System** berbasis **Machine Learning** yang mempelajari perilaku pelanggan (*user behavior*) untuk memberikan rekomendasi produk telco secara otomatis, personal, dan akurat.

Target utama:

- Akurasi model rekomendasi **≥ 90%**
- Tersedia **prototype sistem** (model ML + API backend + dashboard frontend)

---

## 2. Features

- Rekomendasi produk telco berbasis perilaku pelanggan  
- Eksplorasi data pelanggan (EDA) untuk memahami pola konsumsi  
- Beberapa model Machine Learning: Random Forest, XGBoost, dan pendekatan berbasis rekomendasi (mis. Collaborative Filtering)  
- API backend untuk menyajikan rekomendasi secara *real-time*  
- Dashboard web sederhana untuk visualisasi dan demonstrasi  
- Dokumentasi lengkap: arsitektur sistem, pipeline ML, dan hasil evaluasi

---

## 3. Research Question

> **Apakah algoritma Machine Learning berbasis perilaku pelanggan (user behavior) dapat memberikan rekomendasi produk telco dengan akurasi minimal 90% serta meningkatkan potensi konversi penawaran dibandingkan pendekatan promosi massal tradisional?**

---

## 4. Dataset

Dataset yang digunakan merepresentasikan perilaku pelanggan telco, seperti jenis paket, intensitas penggunaan, dan pola transaksi.

Contoh skema kolom:

| Column             | Description                                                        |
| ------------------ | ------------------------------------------------------------------ |
| `customer_id`      | ID unik pelanggan                                                 |
| `plan_type`        | Jenis paket (mis. Prepaid / Postpaid)                            |
| `device_brand`     | Merek perangkat yang digunakan                                   |
| `avg_data_usage_gb`| Rata-rata penggunaan data per bulan (GB)                         |
| `pct_video_usage`  | Persentase penggunaan data untuk konten video                    |
| `avg_call_duration`| Rata-rata durasi panggilan                                       |
| `sms_freq`         | Frekuensi SMS per bulan                                          |
| `monthly_spend`    | Pengeluaran bulanan pelanggan                                    |
| `topup_freq`       | Frekuensi top-up / isi ulang                                     |
| `travel_score`     | Indikator mobilitas pelanggan (mis. sering berpindah lokasi)     |
| `complaint_count`  | Jumlah komplain yang pernah diajukan                             |
| `target_offer`     | Kelas / label produk rekomendasi (Next Best Offer)               |

Dataset dapat berupa data publik (misalnya dari Kaggle) maupun data simulasi yang dikonstruksi menyerupai pola perilaku pelanggan telco.

---

## 5. Tech Stack

### 5.1 Machine Learning

- **Bahasa**: Python  
- **Library utama**:
  - `pandas`, `numpy` – manipulasi dan analisis data
  - `scikit-learn` – training & evaluasi model (Random Forest, XGBoost wrapper via `xgboost` jika digunakan)
  - `matplotlib`, `seaborn` – visualisasi EDA dan performa model

### 5.2 Backend

- **Framework**: Flask atau FastAPI (disesuaikan dengan implementasi di repo)
- **Fungsi utama**:
  - Memuat model Machine Learning terlatih
  - Menerima input fitur pelanggan (via JSON)
  - Mengembalikan rekomendasi `target_offer` dan skor kepercayaan

### 5.3 Frontend

- **Framework**: Next.js (React)  
- **Fungsi utama**:
  - Menampilkan dashboard rekomendasi produk
  - Menampilkan visualisasi seperti distribusi pelanggan, performa model, dll.
  - Mengkonsumsi API backend untuk menampilkan Next Best Offer

### 5.4 Kolaborasi & Infrastruktur

- Google Colab / Kaggle Notebook untuk eksperimen ML  
- GitHub untuk version control  
- (Opsional) Vercel / Netlify untuk hosting frontend demo  
- Tools komunikasi: WhatsApp, Google Drive, dsb.

---

## 6. System Architecture (High-Level)

```text
+---------------------+        +----------------------+        +-----------------------+
|      Frontend       | <----> |      Backend API     | <----> |    ML Model Engine    |
|   (Next.js React)   |        | (Flask / FastAPI)    |        | (scikit-learn / etc.) |
+---------------------+        +----------------------+        +-----------------------+
                                           |
                                           v
                                   Telco Behavior Dataset
```

---

## 7. Project Timeline

| Week | Main Activities                                                                 | Output / Milestone                          |
| ---- | ------------------------------------------------------------------------------- | ------------------------------------------- |
| 1    | Kick-off, pembagian tugas, pencarian & validasi dataset, data cleaning awal    | Dataset siap pakai, peran tim terdefinisi   |
| 2    | EDA, identifikasi pola perilaku pelanggan, seleksi & pembuatan fitur           | Laporan EDA, feature set final              |
| 3    | Pembuatan model (Random Forest, XGBoost, Collaborative Filtering), baseline    | Model dengan akurasi awal ≥ 85%             |
| 4    | Tuning model hingga akurasi ≥ 90%, integrasi model ke backend/API/dashboard    | Model final + API prototype                 |
| 5    | Pengujian sistem end-to-end, dokumentasi, dan pembuatan video demo             | Proyek final siap submit                    |

---

## 8. Team Members

| Name                               | Cohort | Role                          | Responsibilities                                                                                     |
| ---------------------------------- | ------ | ----------------------------- | ---------------------------------------------------------------------------------------------------- |
| Muhammad Rizky Ardiansyah          | ML     | Machine Learning Lead         | Desain & pengembangan utama model, preprocessing, training, tuning, dan evaluasi performa model.    |
| Salwa Salsabila Meyriva            | ML     | Machine Learning Engineer     | Mendukung EDA, feature engineering, pengujian model alternatif, dan visualisasi hasil evaluasi.     |
| Imam Mahmud Dalil Fauzan           | FEBE   | Frontend Dev & Coordinator    | Mengembangkan UI dashboard dan mengoordinasikan alur kerja tim serta membantu persiapan demo.       |
| Muhammad Rafi Winno Pratama        | FEBE   | Backend Developer             | Mengembangkan API endpoint yang menghubungkan model ML dengan frontend dan mengatur struktur data.  |
| Muhammad Risyad Himawan Putra      | FEBE   | Integration & Documentation   | Integrasi frontend–backend–ML, penyusunan dokumentasi akhir, arsitektur sistem, dan panduan penggunaan.|

---

## 9. Risk Management (Summary)

| Risk Category             | Description                                                        | Potential Impact                                  | Mitigation Strategy                                                                     |
| ------------------------- | ------------------------------------------------------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Data & Model              | Dataset kurang representatif atau tidak sesuai konteks telco      | Akurasi model tidak mencapai target ≥ 90%         | Gunakan simulasi/augmentasi data, feature engineering tambahan, dan eksperimen model   |
| Integration               | Kendala integrasi antara model ML dan backend/API                 | Demo tidak berjalan dengan baik                   | Standarisasi format input/output dan integrasi dini antara tim BE dan tim ML           |
| Team Collaboration        | Perbedaan kesibukan dan jadwal antar anggota                      | Milestone tertunda, beberapa task overload        | Weekly/quick check-in, redistribusi tugas, dan dokumentasi progres yang transparan     |
| Product Quality (Frontend)| Visualisasi kurang jelas atau UI kurang informatif               | Reviewer kesulitan memahami value sistem          | Fokus pada clarity di dashboard, gunakan chart sederhana dan label yang mudah dipahami |
| Infrastructure            | Gangguan Colab/hosting, keterbatasan resource                    | Proses training dan demo terganggu                | Siapkan environment cadangan (Notebook lokal, Kaggle, dll.)                             |

---

## 10. Folder Structure (Recommended)

Struktur direktori yang direkomendasikan (bisa disesuaikan dengan implementasi aktual):

```text
.
├── ml_model/
│   ├── notebooks/
│   ├── models/
│   ├── preprocessing.py
│   └── train_model.py
├── backend/
│   ├── main.py
│   ├── routers/
│   ├── services/
│   └── requirements.txt
├── frontend/
│   ├── pages/
│   ├── components/
│   └── package.json
├── dataset/
│   └── telco_behavior.csv
├── docs/
│   ├── project-plan.pdf
│   ├── architecture-diagram.png
│   └── eda-report.pdf
└── README.md
```

---

## 11. Installation & Usage

### 11.1 Clone Repository

```bash
git clone https://github.com/<username>/<repo-name>.git
cd <repo-name>
```

### 11.2 Setup Machine Learning Environment

```bash
cd ml_model
pip install -r requirements.txt
# Jalankan notebook atau script training sesuai instruksi di folder ini
```

### 11.3 Run Backend API

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload  # atau: python main.py (sesuai framework)
```

### 11.4 Run Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Setelah itu, buka browser dan akses URL yang ditampilkan (misal `http://localhost:3000`).

---

## 12. Documentation

Dokumentasi lengkap proyek (arsitektur, EDA, desain model, dan panduan penggunaan) dapat ditemukan di folder:

```text
/docs
```

Contoh isi:

- `project-plan.pdf` – Dokumen project plan & eksekutif ringkasan  
- `eda-report.pdf` – Hasil Exploratory Data Analysis  
- `architecture-diagram.png` – Diagram arsitektur sistem  
- `final-presentation.pptx` – Slide presentasi akhir (jika disertakan)

---

## 13. Acknowledgement

Proyek ini dikembangkan sebagai bagian dari **Capstone Project – Asah led by Dicoding in association with Accenture**.  
Terima kasih kepada mentor, fasilitator, dan seluruh anggota tim atas kolaborasi dan kontribusinya.

---

## 14. License

Proyek ini dirilis dengan lisensi **MIT** (atau sesuaikan).  
Silakan gunakan dan kembangkan untuk keperluan edukasi maupun pengembangan lanjutan.
