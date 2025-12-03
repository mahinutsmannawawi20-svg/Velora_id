# Deployment Guide

This guide explains how to deploy the Velora ID website to Vercel and GitHub.

## Prerequisites

1.  **GitHub Account:** [Sign up here](https://github.com/join)
2.  **Vercel Account:** [Sign up here](https://vercel.com/signup)
3.  **Git Installed:** (Optional if uploading manually)

## Step 1: Upload to GitHub

You can upload your code to GitHub using Git commands (recommended) OR by manually uploading files.

### Option A: Manual Upload (Drag & Drop) - EASIEST

If you don't have Git installed, follow this checklist to ensure you upload the correct files.

**1. Create Repository:**

- Go to [GitHub.com](https://github.com) -> New Repository.
- Name: `velora-website`.
- **Do not** check "Initialize with README".

**2. Upload Files:**

- Click **"uploading an existing file"**.
- **PENTING (Agar Folder Tidak Hilang):**
  - Buka File Explorer di komputer Anda.
  - **Drag & Drop (Tarik)** folder `admin`, `backend`, `css`, `images`, `js`, `pages` **SECARA LANGSUNG** (icon foldernya) ke halaman GitHub.
  - **JANGAN** klik tombol "Choose your files" lalu masuk ke dalam folder dan memilih isinya. Itu salah.
  - Jika benar, di GitHub akan muncul nama seperti `css/style.css`.
- **Drag & Drop File Root:**
  - Tarik file `index.html`, `package.json`, `package-lock.json`, `vercel.json`, `README.md`, `.gitignore`.

**Alternatif (Jika Drag & Drop Gagal):**

1.  Klik **Create new file**.
2.  Ketik nama folder diikuti garis miring, lalu nama file. Contoh: `css/style.css`.
3.  Copy-paste isi file `style.css` Anda ke situ.
4.  Klik **Commit changes**.
    (Ulangi untuk setiap file penting jika cara drag & drop terus gagal).

**3. Commit:**

- Click **"Commit changes"**.

### Option B: Using Git Terminal

If you have Git installed:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/velora-website.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Select **"Import"** next to your GitHub repository (`velora-website`).
4.  **Configure Project:**
    - **Framework Preset:** Other
    - **Root Directory:** `./` (default)
    - **Environment Variables:** Add your `.env` variables here (e.g., `ADMIN_PASSWORD`).
5.  Click **"Deploy"**.

## Step 3: Verify Deployment

1.  Vercel will give you a URL (e.g., `https://velora-website.vercel.app`).
2.  Check the website to ensure styles and images load correctly.

## Troubleshooting

- **Styles/Images Missing:** Likely incorrect upload structure. Ensure `css` and `images` are **folders** in GitHub, not just loose files.
- **Backend Error:** Check "Logs" in Vercel. Ensure `vercel.json` is present.
