# Hostinger Deployment Guide

This guide explains how to deploy your portfolio to Hostinger using GitHub Actions.

## Prerequisites

1.  **GitHub Repository**: `https://github.com/Arnonfr/portfolio1`
2.  **Hostinger Account**: Access to hPanel.

## Step 1: Get FTP Details from Hostinger

1.  Log in to [Hostinger hPanel](https://hpanel.hostinger.com/).
2.  Go to **Websites** and click **Manage** on `arnonfriedman.com`.
3.  In the left sidebar (or search bar), look for **Files** > **FTP Accounts**.
4.  You will see your **FTP IP** (Hostname) and **FTP Username**.
5.  If you don't know your FTP password, click **Change Password** to set a new one.

## Step 2: Add Secrets to GitHub

1.  Go to your GitHub Repository: [https://github.com/Arnonfr/portfolio1](https://github.com/Arnonfr/portfolio1)
2.  Click on **Settings** > **Secrets and variables** > **Actions**.
3.  Click **New repository secret**.
4.  Add the following secrets:

    | Name | Value |
    | :--- | :--- |
    | `FTP_SERVER` | Your Hostinger FTP IP (e.g., `185.xxx.xxx.xxx`) |
    | `FTP_USERNAME` | Your Hostinger FTP Username (e.g., `u123456789`) |
    | `FTP_PASSWORD` | Your Hostinger FTP Password |
    | `GEMINI_API_KEY`| Your Google Gemini API Key (found in `.env` or Google AI Studio) |

## Step 3: Verify and Deploy

1.  Once secrets are added, go to the **Actions** tab in GitHub.
2.  Select **Deploy to Hostinger** workflow on the left.
3.  Click **Run workflow** (if available) or push a change to the `main` branch.
4.  Watch the build logs. If it's green, your site is deployed!

## Troubleshooting

-   **403 Forbidden / 404 Not Found**: Ensure `server-dir` in `deploy.yml` is correct (usually `./public_html/`).
-   **Build Failures**: Check if `GEMINI_API_KEY` is missing in secrets.
