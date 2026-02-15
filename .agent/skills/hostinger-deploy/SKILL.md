---
name: hostinger-deploy
description: comprehensive guide for deploying Vite/React apps to Hostinger via GitHub Actions
---

# Hostinger Deployment Skill

This skill guides you through deploying a Vite/React application to Hostinger using GitHub Actions and FTP.

## Prerequisites
- A Hostinger hosting plan.
- A GitHub repository with your project code.
- Access to Hostinger's hPanel (presumed to be available).

## 1. Get FTP Credentials
1.  Log in to [Hostinger hPanel](https://hpanel.hostinger.com/).
2.  Select your website (`arnonfriedman.com` or similar).
3.  Navigate to **Files > FTP Accounts**.
4.  Note down:
    -   **FTP IP** (Hostname)
    -   **FTP Username**
    -   **FTP Port** (usually 21)
5.  If you don't know the password, click **Change Password** to set a new one.

## 2. Configure GitHub Secrets
1.  Go to your GitHub repo > **Settings** > **Secrets and variables** > **Actions**.
2.  Add the following repository secrets:
    -   `FTP_SERVER`: The FTP IP from step 1.
    -   `FTP_USERNAME`: The FTP Username from step 1.
    -   `FTP_PASSWORD`: The FTP Password from step 1.
    -   `GEMINI_API_KEY`: Required for AI features (if applicable).

## 3. Deployment Workflow (`.github/workflows/deploy.yml`)
Create or update this file in your repository:

```yaml
name: Deploy to Hostinger 🚀

on:
  push:
    branches:
      - main

jobs:
  web-deploy:
    name: 🎉 Deploy
    runs-on: ubuntu-latest
    steps:
      - name: 🚚 Get latest code
        uses: actions/checkout@v4

      - name: ⚡️ Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: 📦 Install dependencies
        run: npm ci

      - name: 🏗️ Build Project
        run: npm run build
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }} # If using env vars

      - name: 📂 Sync files (Deploy)
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          server-dir: ./public_html/
          local-dir: ./dist/
```

## 4. Verification
-   Push changes to `main`.
-   Go to the **Actions** tab in GitHub to monitor the deployment.
-   Fix any errors (common issues: wrong secrets, wrong `server-dir`).
-   Visit the live URL.
