# 📡 Next Best Offer Recommendation System for Telco Services

**Capstone Project --- Asah led by Dicoding in association with
Accenture**\
**Team ID: A25-CS028 \| Use Case: AC-01**

## 📌 Overview

Dalam industri telekomunikasi, pelanggan memiliki berbagai pilihan paket
(data, SMS, telepon, hingga layanan digital). Tanpa sistem rekomendasi
yang baik, pelanggan sering bingung memilih produk yang tepat, sementara
perusahaan justru membuang banyak sumber daya untuk promosi yang tidak
tepat sasaran.

Proyek ini mengembangkan **Next Best Offer Recommendation System**
berbasis **Machine Learning** yang mempelajari perilaku pelanggan (user
behavior) untuk memberikan rekomendasi produk telco secara otomatis,
personal, dan akurat.

🎯 **Target akurasi model: ≥90%**\
🎯 **Deliverables: Model ML, API Prototype, Dashboard sederhana**

## 🚀 Features

-   Prediksi rekomendasi produk berdasarkan perilaku pelanggan\
-   Model Machine Learning (Random Forest, XGBoost, Collaborative
    Filtering)\
-   Exploratory Data Analysis (EDA)\
-   API Backend untuk *serve* rekomendasi\
-   Dashboard sederhana\
-   Dokumentasi lengkap

## 🧠 Research Question

**Bisakah algoritma ML berbasis perilaku pelanggan memberikan
rekomendasi produk telco dengan akurasi ≥90%?**

## 📂 Dataset

Dataset public/sintetis untuk perilaku pelanggan telco.

Contoh schema:

  Column              Description
  ------------------- ---------------------------
  customer_id         ID unik pelanggan
  plan_type           Prepaid/Postpaid
  device_brand        Merk HP
  avg_data_usage_gb   Pemakaian data
  pct_video_usage     Persentase konsumsi video
  avg_call_duration   Durasi telepon
  sms_freq            Jumlah SMS
  monthly_spend       Pengeluaran
  topup_freq          Frekuensi top-up
  travel_score        Mobilitas
  complaint_count     Jumlah komplain
  target_offer        Label paket

## 🛠️ Tech Stack

### Machine Learning

-   Python\
-   Scikit-learn\
-   Pandas, NumPy\
-   Matplotlib, Seaborn

### Backend

-   Flask / FastAPI

### Frontend

-   Next.js

## 🧩 System Architecture

    Frontend (Next.js) <--> Backend API (FastAPI/Flask) <--> ML Model Engine (sklearn)

## 📈 Project Timeline

  Week   Activity                     Output
  ------ ---------------------------- --------------
  1      Kick-off, dataset cleaning   Dataset siap
  2      EDA, feature engineering     Laporan EDA
  3      Model RF/XGBoost/CF          Akurasi ≥85%
  4      Tuning hingga ≥90%           Model & API
  5      Testing, dokumentasi         Finalisasi

## 👥 Team Members

  ------------------------------------------------------------------------
  Name            Role            Responsibility
  --------------- --------------- ----------------------------------------
  Muhammad Rizky  ML Lead         Model ML
  Ardiansyah                      

  Salwa Salsabila ML Support      EDA & visualisasi
  Meyriva                         

  Imam Mahmud     FEBE            Frontend & koordinasi
  Dalil Fauzan                    

  Rafi Winno      BE              API backend

  Muhammad Risyad Integration &   Integrasi sistem & dokumentasi
  Himawan Putra   Docs            
  ------------------------------------------------------------------------

## ⚙️ Installation

### Clone

    git clone <repo>

### Backend

    uvicorn api.main:app --reload

### Frontend

    npm install
    npm run dev

## 📘 Documentation

Tersedia di folder `/docs`.

## 🧩 Recommended Structure

    ml_model/
    backend/
    frontend/
    docs/
    dataset/
    README.md

## 🤝 Acknowledgement

Proyek ini bagian dari **Capstone Asah Dicoding x Accenture**.

## ⭐ License

MIT License
