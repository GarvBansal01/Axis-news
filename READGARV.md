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

## 📋 Garv's Prioritized Checklist

### ✅ Today (15 Minutes)
- [ ] Visit [https://axis-news-iota.vercel.app](https://axis-news-iota.vercel.app) on both your laptop and phone to test the new layout.
- [ ] Create a free Formspree account at [formspree.io](https://formspree.io) and plug your Form ID into [src/components/ContactModal.tsx](file:///Users/lavnishbansal/Desktop/Axis-news/src/components/ContactModal.tsx).
- [ ] Enable Vercel Analytics with 1 click in your Vercel Dashboard.

### 📅 This Week
- [ ] Buy a custom domain (`axisnews.in` or similar) and link it in Vercel Settings.
- [ ] Share AXIS with 25 college friends and ask them to test the ⚡ 30s Card Preview mode and 1-Minute Radar.
- [ ] Review their feedback in the app's feedback drawer or your email.

### 🚀 Next Month
- [ ] Connect a live RSS parser backend (Node.js/Python serverless function on Vercel) to auto-fetch RSS items from The Hindu, BBC, and IMD.
- [ ] Set up a weekly Sunday digest newsletter using [Resend.com](https://resend.com) (free 3,000 emails/month).

---

*Document created for Garv Bansal · AXIS News Intelligence Platform*
