# Deployment Guide: Portfolio Website

This guide walks you through deploying your portfolio website to Hostinger using GitHub Actions.

## Prerequisites

1.  **Hostinger Account**: Ensure you have an active hosting plan on Hostinger.
2.  **GitHub Account**: You need a GitHub account to host your code.
3.  **Domain**: The domain you want to link (e.g., `arnonfriedman.com`).

---

## Step 1: Create a GitHub Repository

1.  Go to [GitHub](https://github.com/new) and create a new repository.
2.  Name it `portfolio-website` (or similar).
3.  Do **not** initialize with README/license (keep it empty).
4.  Run the following commands in your project terminal to push existing code:

    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
    git push -u origin main
    ```

## Step 2: Get FTP Credentials from Hostinger

1.  Log in to [Hostinger hPanel](https://hpanel.hostinger.com/).
2.  Go to **Websites** -> **Dashboard** for your domain.
3.  Find **Files** -> **FTP Accounts**.
4.  Note down the following details:
    *   **FTP Host**: (e.g., `ftp.yourdomain.com` or an IP address)
    *   **FTP Username**: (e.g., `u123456789`)
    *   **FTP Password**: (If you don't know it, change it here)

## Step 3: Configure GitHub Secrets

1.  Go to your GitHub repository -> **Settings** -> **Secrets and variables** -> **Actions**.
2.  Click **New repository secret**.
3.  Add the following secrets:
    *   `FTP_SERVER`: Your FTP Host from Hostinger.
    *   `FTP_USERNAME`: Your FTP Username.
    *   `FTP_PASSWORD`: Your FTP Password.

## Step 4: Trigger Deployment

1.  Once secrets are added, push any change to the `main` branch.
2.  Go to the **Actions** tab in your GitHub repository to confirm the workflow is running.
3.  If successful, your site files (from `dist`) should now be in `public_html` on Hostinger.

## Step 5: Link Domain

1.  In Hostinger hPanel, search for **Domain** or go to **Domains**.
2.  Ensure your domain (`arnonfriedman.com`) is pointing to Hostinger's nameservers (`ns1.dns-parking.com`, `ns2.dns-parking.com`).
3.  If newly registered, it may take up to 24 hours to propagate.
4.  Under **Website** -> **Manage**, ensure the domain is associated with the hosting plan.

## Step 6: Verify

Visit your domain in the browser. You should seeing your portfolio!

---

**Troubleshooting:**
*   **403 Forbidden**: Ensure `server-dir` in `.github/workflows/deploy.yml` is correct (usually `./public_html/`).
*   **Blank Page**: Open DevTools Console. If you see simple MIME type errors, check `<base>` tag in `index.html` or vite config base path.
