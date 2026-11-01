# 📋 READGARV.md — Garv's Action Plan & Setup Guide

Welcome, **Garv**! This document is your personalized master checklist and reference manual for operating, expanding, and managing **AXIS News Intelligence** (`https://axis-news-iota.vercel.app`).

Everything you need to configure—from contact forms to custom domains and automated feeds—is broken down into actionable steps below.

---

## ⚡ Quick Status Summary
- **Live Vercel URL**: [https://axis-news-iota.vercel.app](https://axis-news-iota.vercel.app)
- **GitHub Repository**: [GarvBansal01/Axis-news](https://github.com/GarvBansal01/Axis-news) (branch: `main`)
- **Vercel Account**: `garv1304` (`mangalentslg-9113s-projects`)
- **Key Features Active**: 
  - 1-Minute Live Radar auto-refresh stream with audio chime alerts
  - Top "What's Important Right Now" briefing spotlight with "What is Really the Problem?" root-cause analysis
  - "Know More" deep-dive modals with official sources, timelines, and student impacts
  - ⚡ 30-Second Flashcard preview deck with Web Speech TTS audio
  - Siliguri & North Bengal regional coverage alongside World, Geopolitics, Disasters, and AI Leaks

---

## 🛠️ Step 1: Where Should Your Forms & Contact Requests Go?

Currently, the **Contact Us** modal saves inquiries into the browser's `localStorage` and logs them. To have messages and news leads sent **directly to your personal email inbox** (`mangalent.slg@gmail.com`), use **Formspree** (100% Free, takes 2 minutes):

### How to Set Up Formspree (Recommended):
1. Go to [https://formspree.io](https://formspree.io) and sign up with `mangalent.slg@gmail.com`.
2. Click **"+ New Form"** and name it **"AXIS News Contact & Tips"**.
3. Formspree will give you an endpoint URL like:
   ```
   https://formspree.io/f/mqkvrxyz
   ```
4. Open [src/components/ContactModal.tsx](file:///Users/lavnishbansal/Desktop/Axis-news/src/components/ContactModal.tsx).
5. In the `handleSubmit` function, simply post the form data to your Formspree endpoint:
   ```ts
   const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       name,
       phone,
       email,
       collegeOrCity,
       reason,
       message,
     }),
   });
   ```
6. **Result**: Whenever a student or reader submits feedback or a news tip from Siliguri or anywhere in the world, an instant email lands directly in your Gmail inbox!

> **Alternative Free Form Options**:
> - **Web3Forms** ([web3forms.com](https://web3forms.com)): Zero account needed; gives you an Access Key via email in 30 seconds.
> - **Google Forms**: If you prefer Google Sheets, create a Google Form and embed it or link directly in the Contact modal.

---

## 🌐 Step 2: Connect a Custom Domain on Vercel

Right now your app is on `https://axis-news-iota.vercel.app`. Connecting a professional domain like `axisnews.in` or `axisnews.app` makes the app look like an elite news organization.

### How to Connect Your Domain:
1. Buy a domain on **Namecheap**, **GoDaddy**, **Hostinger**, or **Cloudflare** (e.g., `axisnews.in` typically costs ₹399/year).
2. Open your [Vercel Dashboard](https://vercel.com/mangalentslg-9113s-projects/axis-news).
3. Navigate to **Settings** → **Domains**.
4. Type your domain name (e.g. `axisnews.in`) and click **Add**.
5. Vercel will show you the exact DNS records to add:
   - **Type A**: `76.76.21.21` (for `axisnews.in`)
   - **Type CNAME**: `cname.vercel-dns.com` (for `www.axisnews.in`)
6. Log into your domain registrar, add those 2 records in your DNS manager.
7. Vercel will automatically generate a free SSL certificate (HTTPS) within 5–15 minutes!

---

## 📊 Step 3: Analytics & Visitor Tracking (Free)

To see how many students are visiting AXIS, which news categories they read the most, and how much time they spend on the app:

### Option A: Vercel Web Analytics (Easiest - 1 Click)
1. Go to your [Vercel Project Dashboard](https://vercel.com/mangalentslg-9113s-projects/axis-news).
2. Click on the **Analytics** tab at the top.
3. Click **Enable Analytics** (Free on Hobby plan).
4. You will instantly get real-time visitor counts, top countries, device types (iPhone/Android/Laptop), and page views with zero code needed!

### Option B: Google Analytics (GA4)
1. Go to [analytics.google.com](https://analytics.google.com) and create a free property.
2. Get your Measurement ID (e.g., `G-XXXXXXXXXX`).
3. Add the tracking script to [index.html](file:///Users/lavnishbansal/Desktop/Axis-news/index.html).

---

## 🤖 Step 4: Automating News Ingestion (Live APIs & RSS)

Currently, the app features 20 verified high-signal dispatches and an active 1-minute live simulation radar. When you want to pull completely automated live news:

### 1. Free RSS Feeds (No API Key Required)
You can fetch accredited RSS feeds using a simple serverless function or proxy:
- **The Hindu National**: `https://www.thehindu.com/news/national/feeder/default.rss`
- **Indian Express**: `https://indianexpress.com/section/india/feed/`
- **BBC World News**: `http://feeds.bbci.co.uk/news/world/rss.xml`
- **PIB (Press Information Bureau India)**: `https://pib.gov.in/RssMain.aspx`
- **IMD Cyclone / Weather Bulletins**: `https://mausam.imd.gov.in`

### 2. Live News APIs (Free Tiers)
- **NewsAPI.org**: 100 free requests/day for headline scraping.
- **GNews.io**: 100 free requests/day for keyword alerts (Russia, Ukraine, AI, Disasters).
- **OpenWeatherMap / AQICN API**: To pull live real-time AQI and temperature for Siliguri (`https://api.waqi.info/feed/siliguri`).

### 3. X / Twitter Developer API
- Apply for a free developer account at [developer.x.com](https://developer.x.com).
- Track tech researcher accounts (e.g., `@sama`, `@ylecun`, `@DrJimFan`, `@huggingface`) to catch viral frontier reasoning model leaks before traditional media writes about them.

---

## 📢 Step 5: Student Community & Growth Playbook

To make AXIS the daily newspaper for students and Gen-Z:

1. **Campus WhatsApp & Telegram Groups**:
   - Share the 30-Second Card Preview link in your college batches (NBU, SIT Siliguri, Jalpaiguri, Delhi University, IITs).
   - Pitch: *"Save 45 mins of Instagram doomscrolling every morning. Get verified 30-second bullet news with zero ads."*
2. **Instagram & X Handles**:
   - Create `@axisnews_in` on Instagram and X.
   - Post 3 daily carousels:
     1. Morning: **What's Important Right Now** (e.g. the Pilot incident / Russia-Ukraine frontline)
     2. Afternoon: **AI & Tech Leaks**
     3. Evening: **Daily Reflection & Shloka** (Bhagavad Gita)
3. **Campus Ambassador Program**:
   - Appoint 1-2 student leads in North Bengal University, SIT Siliguri, and local colleges to submit local campus event tips via the Contact form.

---

## 🎓 Step 6: Education Guide — How an App Differs from a Website & How to Put AXIS on the Google Play Store

As you grow AXIS, understanding the technical differences between websites, web applications, progressive web apps, and native mobile apps is essential. Here is your complete educational breakdown:

---

### 1. The Core Differences (Plain English)

| Type | What It Is | How It Works | Examples | Store Fee |
| :--- | :--- | :--- | :--- | :--- |
| **Traditional Website** | Static pages of HTML and CSS. | Every time you click a link, the entire browser reloads from the server. No real-time memory or offline features. | Personal blogs, Wikipedia, older news sites. | None |
| **Web Application (SPA)** | Dynamic interactive software running in the browser. | **This is what AXIS currently is!** Built with React + TypeScript + Vite. It loads once, then updates instantly without page reloads, stores offline bookmarks, plays audio, and runs 60-second real-time timers. | Google Docs, Spotify Web, Twitter/X Web, AXIS. | None |
| **Progressive Web App (PWA)** | A web app that users can "install" directly onto their mobile phone home screen. | Uses a `manifest.json` file. When opened on mobile Chrome or Safari, it offers an **"Install App"** prompt. It opens full-screen without a browser URL bar, has an app icon, and feels 100% like a native app. | Twitter Lite, Pinterest PWA, Starbucks PWA. | $0 (Free) |
| **Native Mobile App** | An `.aab` or `.apk` package compiled specifically for Android, or `.ipa` for Apple iOS. | Downloaded from the Google Play Store or Apple App Store. Has direct access to device hardware (Bluetooth, camera, native background threads). | WhatsApp, Instagram, Swiggy. | $25 one-time (Google Play) / $99/year (Apple) |

---

### 2. How to Put AXIS on the Google Play Store (3 Main Pathways)

You do **not** need to rewrite AXIS from scratch in Java or Kotlin to publish it on the Google Play Store. Here are the three industry-standard ways to turn AXIS into a Play Store app:

#### 🏆 Pathway A (Recommended & Fastest): Google Trusted Web Activity (TWA) via Microsoft PWABuilder
Google created the **Trusted Web Activity (TWA)** standard specifically so high-performance modern web apps (like AXIS) can be wrapped into Google Play Store `.aab` packages. Twitter/X Lite and Forbes use this exact architecture.

- **Why this is the best for AXIS**:
  1. **Instant Updates**: Any time you push a bug fix or news update to GitHub, Vercel deploys it, and **your Android Play Store app automatically updates for all users in real time**! You never have to wait days for Google to review app updates.
  2. **Zero Code Changes**: Uses your existing React codebase on `https://axis-news-iota.vercel.app`.
  3. **Takes 15 Minutes**: Automated tools generate the signed package for you.

**Step-by-Step TWA Deployment**:
1. Go to [https://pwabuilder.com](https://pwabuilder.com) (created by Microsoft for developers).
2. Enter your live Vercel URL: `https://axis-news-iota.vercel.app` and click **Start**.
3. PWABuilder checks your PWA requirements (Manifest, Service Worker, App Icons).
4. Click **"Package for Stores"** → select **Android (Google Play)**.
5. Enter your Package ID (e.g., `com.garvbansal.axisnews`), upload your 512x512 logo, and click **Generate Package**.
6. Download the resulting `.aab` (Android App Bundle) file. This is the exact file you upload to the Google Play Console!

---

#### 🛠️ Pathway B: Capacitor (By Ionic)
If you want to add native Android plugins (like device vibrations or native push notifications):
1. In your local Axis-news folder, run:
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npx cap init "AXIS News" "com.garvbansal.axisnews" --web-dir dist
   npm run build
   npx cap add android
   npx cap open android
   ```
2. This automatically generates a full Android Studio project.
3. Open it in Android Studio, click **Build** → **Generate Signed Bundle / APK**, and upload the generated `.aab` file to Google Play Console.

---

#### 📱 Pathway C: Native Cross-Platform Rebuild (Flutter / React Native)
- Used when an app requires heavy background processing or 3D graphics. For a text/audio news intelligence platform, this is unnecessary and requires maintaining two separate codebases.

---

### 3. Step-by-Step Roadmap to Publish on Google Play Store

Once you have your `.aab` bundle from PWABuilder or Capacitor:

1. **Create a Google Play Developer Account**:
   - Go to [play.google.com/console](https://play.google.com/console).
   - Pay the one-time $25 registration fee with a credit/debit card.
2. **Create New App Listing**:
   - App Name: `AXIS — Real-Time News Intelligence for Students`
   - Default language: English (India)
   - Free or Paid: **Free**
3. **Fill Out Store Presence**:
   - **Short Description (80 chars)**: *Zero-clutter 30-second synthesized news radar for students and Gen-Z.*
   - **Full Description**: Explain the 1-minute live radar, verified sources (The Hindu, BBC, Reuters), root-cause analysis, and Siliguri/World coverage.
   - **Screenshots**: Take 3–4 screenshots of the app on your phone (Stream feed, What's Important hero, 30s Card preview mode, Shloka reflection).
   - **App Icon**: 512x512 PNG.
   - **Feature Graphic**: 1024x500 PNG banner.
4. **App Content Rating & Privacy Policy**:
   - Complete the free IARC content questionnaire (News apps get a clean "Everyone" rating).
   - Paste a link to your privacy policy (you can host a simple `privacy.html` in your `public/` folder).
5. **Upload Your `.aab` File**:
   - In Google Play Console, go to **Production** → **Create New Release**.
   - Upload your `.aab` file from PWABuilder.
   - Click **Save** → **Review Release** → **Start Rollout to Production**!
6. Google typically approves new developer accounts and apps within 2 to 5 business days. Once approved, millions of students can download AXIS directly from the Play Store!

---

### 4. Deploying to Other Platforms (iOS, Desktop & Web)

1. **Apple App Store (iOS)**:
   - Requires an Apple Developer Account ($99/year).
   - Can be built using Capacitor (`npx cap add ios`) and Xcode on a Mac.
2. **Desktop Apps (Mac / Windows)**:
   - Using **Tauri** (`tauri.app`) or **Electron**, you can package AXIS into a native `.dmg` for macOS or `.exe` for Windows with zero extra code!
3. **Direct PWA Install (Zero Store Approval Needed)**:
   - Any student who opens `https://axis-news-iota.vercel.app` on their Android phone will see the browser prompt: *"Add AXIS to Home Screen"*. Tapping it installs AXIS immediately with no download size, no Google Play needed, and zero friction!

---

## 📋 Garv's Prioritized Checklist

### ✅ Today (15 Minutes)
- [ ] Visit [https://axis-news-iota.vercel.app](https://axis-news-iota.vercel.app) on both your laptop and phone to test the new layout.
- [ ] Hear the new gentle WhatsApp-style notification chime when the 1-minute radar triggers (or toggle it using the new volume button).
- [ ] Create a free Formspree account at [formspree.io](https://formspree.io) and plug your Form ID into [src/components/ContactModal.tsx](file:///Users/lavnishbansal/Desktop/Axis-news/src/components/ContactModal.tsx).
- [ ] Enable Vercel Analytics with 1 click in your Vercel Dashboard.

### 📅 This Week
- [ ] Buy a custom domain (`axisnews.in` or similar) and link it in Vercel Settings.
- [ ] Share AXIS with 25 college friends and ask them to test the ⚡ 30s Card Preview mode and 1-Minute Radar.
- [ ] Test [PWABuilder.com](https://pwabuilder.com) with your Vercel URL to preview your Android APK/AAB package.

### 🚀 Next Month
- [ ] Register your Google Play Developer Account ($25 at `play.google.com/console`) and upload your first release!
- [ ] Connect a live RSS parser backend (Node.js/Python serverless function on Vercel) to auto-fetch RSS items from The Hindu, BBC, and IMD.
- [ ] Set up a weekly Sunday digest newsletter using [Resend.com](https://resend.com) (free 3,000 emails/month).

---

*Document created for Garv Bansal · AXIS News Intelligence Platform*
