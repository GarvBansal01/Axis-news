# 📋 READGARV.md — Garv's Master Action Plan & Step-by-Step Execution Guide

Welcome, **Garv**! This is your complete, interactive roadmap to operating, launching, and scaling **AXIS News Intelligence** (`https://axis-news-iota.vercel.app`).

Every single action item is written with crystal-clear instructions, direct links, and clickable checkboxes (`- [ ]`) so you can follow along, mark tasks off (`- [x]`), and take AXIS from a deployed web app to a live Google Play Store application used by students across universities and colleges.

---

## ⚡ Quick Dashboard Links
- **Live Production Web App**: [https://axis-news-iota.vercel.app](https://axis-news-iota.vercel.app)
- **GitHub Repository**: [https://github.com/GarvBansal01/Axis-news](https://github.com/GarvBansal01/Axis-news) (branch: `main`)
- **Vercel Project Dashboard**: [https://vercel.com/mangalentslg-9113s-projects/axis-news](https://vercel.com/mangalentslg-9113s-projects/axis-news)
- **PWABuilder (Free Play Store Packager)**: [https://pwabuilder.com](https://pwabuilder.com)
- **Google Play Developer Console**: [https://play.google.com/console](https://play.google.com/console)
- **Formspree (Email Form Forwarder)**: [https://formspree.io](https://formspree.io)

---

## 🕒 How the 24-Hour Rolling News & Auto-Purge Engine Works

You pointed out that news must **strictly reflect Today and Yesterday, auto-purge anything older than 24 hours, and keep rolling forward every single day (today, tomorrow, the day after, and so on)**.

Here is exactly how the newly updated news engine operates:

1. **Real-Clock Calendar Day Boundaries**:
   - The engine checks midnight (`00:00:00`) of the current local calendar day.
   - Any dispatch published since midnight is marked as **`Today, [Time]`** (e.g. `Today, 02:45 PM IST` or `25m ago (Today)`).
   - Any dispatch published before midnight but within the last 24 hours is marked as **`Yesterday, [Time]`** (e.g. `Yesterday, 10:15 PM IST` or `18h ago (Yesterday)`).
2. **Automated 24-Hour Purge Filter (`App.tsx`)**:
   - The news engine compares every article timestamp against `Date.now()`.
   - Any news item where `(now - timestamp) > 24 * 60 * 60 * 1000` is **automatically deleted/purged** from the live stream. It will never clutter the feed.
3. **Continuous Rolling Forward (Tomorrow & The Day After)**:
   - When tomorrow comes, today's news automatically becomes labeled as `Yesterday`.
   - The older news from yesterday passes the 24-hour mark and is automatically pruned.
   - Fresh incoming dispatches from the 1-Minute Radar become `Today`.
   - This ensures the feed never goes stale, even if the app runs for months!
4. **All Old Static Dates Eradicated**:
   - All historical static references (e.g., "October 25", "Sept 2023", "2 days ago") in timelines and notes have been replaced with relative, live markers (`Earlier Today`, `Yesterday Evening`, `Latest Milestone`, `Current Phase`).
5. **Exact Incident Timing & "What Is It" Breakdown**:
   - Every single article in the Stream, Top Spotlight, Deep Dive, and 30s Flashcard deck now features an explicit **`📅 Incident Date & Time`** badge (e.g. `Today, 02:26 PM IST` / `Yesterday, 10:15 PM IST`).
   - Every story includes a dedicated blue callout box: **`⚡ What Is The Incident?`**, explaining clearly and objectively what occurred and what the event is.

---

## 🎯 STEP 1: WHAT TO DO RIGHT NOW (Immediate 15 Minutes)

Complete these 3 tasks right now to verify the live app, connect your email, and enable traffic analytics.

### Task 1.1: Test Your Live App on Laptop and Phone
- [ ] Open [https://axis-news-iota.vercel.app](https://axis-news-iota.vercel.app) on your laptop browser.
  - [ ] Look at the top bar: verify the clean **Active Desk** and the green **`🕒 Strictly Today & Yesterday (24H Auto-Purge)`** badge.
  - [ ] Check the top spotlight: verify **"What's Important Right Now"** carousel (Captain assault story, Russia-Ukraine war, Cyclone alert, AI leak).
  - [ ] Look at the new **"What Is The Incident?"** card displaying the exact date & time when the incident took place.
  - [ ] Read the highlighted **"What is Really the Problem? (Root Cause & Reality Check)"** callout.
  - [ ] Click **"Know More"** to inspect the full deep dive with timeline and verified sources.
  - [ ] Notice the **Volume Mute/Unmute toggle** (`🔊` / `🔇`) next to the 1-Minute Radar badge. Click it to test the gentle WhatsApp-style chime or mute it as desired.
- [ ] Open [https://axis-news-iota.vercel.app](https://axis-news-iota.vercel.app) on your mobile phone (Android Chrome or iOS Safari).
  - [ ] Check the smooth horizontal channel category scroll strip.
  - [ ] Test the **⚡ 30s Preview** mode to flip through quick cards.
  - [ ] Verify that all timestamps say **Today** or **Yesterday**.

---

### Task 1.2: Connect the Contact Form to Your Email (3 Minutes)
Right now, messages submitted in the Contact modal are saved in browser storage. To receive student feedback, partnership inquiries, and news tips directly to your email (`mangalent.slg@gmail.com`):

- [ ] Go to [https://formspree.io](https://formspree.io) and click **Get Started Free**.
- [ ] Sign up using your email: `mangalent.slg@gmail.com`.
- [ ] In Formspree, click **"+ New Form"**:
  - Name: `AXIS News Feedback & Tips`
  - Send emails to: `mangalent.slg@gmail.com`
- [ ] Formspree will display your endpoint URL (e.g. `https://formspree.io/f/mqkvrxyz`). Copy your Form ID (e.g. `mqkvrxyz`).
- [ ] Open [src/components/ContactModal.tsx](file:///Users/lavnishbansal/Desktop/Axis-news/src/components/ContactModal.tsx) in your editor.
- [ ] Inside the `handleSubmit` function around line 60, add this simple `fetch` snippet:
  ```ts
  await fetch("https://formspree.io/f/YOUR_FORM_ID", {
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
- [ ] Push to GitHub, and any message sent on the website will instantly ping your Gmail inbox!

---

### Task 1.3: Enable Free Vercel Web Analytics (1 Minute)
To track how many students visit AXIS daily, which colleges they visit from, and what devices they use:

- [ ] Open your [Vercel Project Dashboard](https://vercel.com/mangalentslg-9113s-projects/axis-news).
- [ ] Click the **Analytics** tab at the top.
- [ ] Click **"Enable Web Analytics"** (100% Free on Hobby plan).
- [ ] Done! Real-time visitor counts will now begin streaming to your dashboard.

---

## 🌐 STEP 2: HOW TO PROCEED — CUSTOM DOMAIN (Days 2 - 3)

Right now, your URL is `https://axis-news-iota.vercel.app`. Adding a custom domain like `axisnews.in` elevates AXIS into an authoritative news publication.

### Step-by-Step Domain Connection:
- [ ] **Choose and Buy a Domain**:
  - Visit [GoDaddy.in](https://godaddy.in), [Namecheap.com](https://namecheap.com), or [Hostinger.in].
  - Search for `axisnews.in` (typically ₹399–₹599/yr) or `axisnews.app`.
  - Complete purchase.
- [ ] **Add Domain in Vercel**:
  - Open [Vercel Project Settings → Domains](https://vercel.com/mangalentslg-9113s-projects/axis-news/settings/domains).
  - Type `axisnews.in` and click **Add**.
- [ ] **Configure DNS at Your Registrar**:
  - Add an **A Record**:
    - Host: `@`
    - Value / Points to: `76.76.21.21`
  - Add a **CNAME Record**:
    - Host: `www`
    - Value / Points to: `cname.vercel-dns.com`
- [ ] **Verify SSL**:
  - Within 10 minutes, Vercel will verify the DNS records and issue a free SSL certificate (`https://`).
  - Your app will be live globally at `https://axisnews.in`!

---

## 📱 STEP 3: HOW TO PUT AXIS ON THE GOOGLE PLAY STORE

You do **not** need to rewrite AXIS in Kotlin, Java, or Flutter. Google officially supports **Trusted Web Activity (TWA)**, allowing high-performance React web apps to run as full native Android apps in the Play Store.

### Step 3.1: Create a Google Play Developer Account
- [ ] Go to [play.google.com/console](https://play.google.com/console).
- [ ] Sign in with your Google account.
- [ ] Pay the one-time registration fee of **$25** (lifetime validity; zero recurring fees).
- [ ] Complete identity verification with your ID (takes 24–48 hours for Google to verify).

### Step 3.2: Generate the Android `.aab` Package via PWABuilder (100% Free)
- [ ] Go to [https://pwabuilder.com](https://pwabuilder.com) (built and maintained by Microsoft).
- [ ] Paste your live app URL: `https://axis-news-iota.vercel.app` (or your custom domain `https://axisnews.in`).
- [ ] Click **Start**. PWABuilder will scan the app.
- [ ] Click **"Package for Stores"** → select **Android (Google Play)**.
- [ ] Fill in the package settings:
  - **Package ID**: `com.garvbansal.axisnews`
  - **App Name**: `AXIS News`
  - **Launcher Name**: `AXIS`
  - **Theme Color**: `#09090b` (Dark)
  - **Nav Bar Color**: `#09090b`
  - **Upload App Icon**: 512x512 PNG transparent background icon.
  - **Signing Key**: Select *"Generate a new key"* (PWABuilder will generate and sign your bundle automatically).
- [ ] Click **Generate Package**.
- [ ] Download the `.zip` file. Extract it on your computer — inside you will find your signed **`app-release.aab`** file!

> ⚡ **The Superpower of TWA**: Every single time you push code updates or bug fixes to GitHub (`GarvBansal01/Axis-news`) and Vercel deploys, **your Google Play Store app updates instantly in real time on all users' phones** without requiring Play Store re-review!

### Step 3.3: Submit App in Google Play Console
- [ ] Log in to [Google Play Console](https://play.google.com/console) and click **"Create App"**:
  - App Name: `AXIS — 24H News Radar for Students`
  - Default Language: English (India)
  - App or Game: **App**
  - Free or Paid: **Free**
- [ ] **Set Up Store Listing**:
  - **Short Description (80 chars)**: *Zero-clutter 30-second synthesized news radar for students and Gen-Z.*
  - **Full Description**: Explain the verified sources (The Hindu, BBC, Reuters), 1-minute live radar, root-cause analysis ("What is Really the Problem"), and Siliguri/World student news.
  - **App Icon**: Upload 512x512 PNG.
  - **Feature Graphic**: Upload 1024x500 PNG banner.
  - **Screenshots**: Take 3–4 screenshots on your phone (Feed, What's Important hero, 30s card preview deck, Shloka reflection) and upload them.
- [ ] **Complete Content Rating**:
  - Fill out the free IARC questionnaire (News apps receive an "Everyone / 3+" rating).
- [ ] **Upload `.aab` Bundle**:
  - In the left sidebar, go to **Release** → **Production** → **Create New Release**.
  - Drag and drop your **`app-release.aab`** file.
  - Release Name: `1.0.0 (Initial Launch)`.
  - Click **Review Release** → **Start Rollout to Production**!
- [ ] Google reviews and approves the release (usually 2–4 business days). Once approved, students can install AXIS directly from Google Play!

---

## 🎓 STEP 4: EDUCATE YOURSELF — HOW AN APP DIFFERS FROM A WEBSITE

Understanding this distinction helps you explain AXIS to investors, colleges, and fellow students:

| Feature | Traditional Website | Web App (What AXIS Is) | Progressive Web App (PWA) | Native Mobile App |
| :--- | :--- | :--- | :--- | :--- |
| **Technology Stack** | Static HTML & CSS | React + Vite + TypeScript | React + `manifest.json` + Service Worker | Kotlin/Java (Android) or Swift (iOS) |
| **Page Navigation** | Slow full page reload on every click | Instant zero-reload Single Page App (SPA) | Instant zero-reload, full-screen viewport | Native Android Activity transitions |
| **Installation** | Cannot be installed | Browser bookmark | "Install App" prompt on Chrome & Safari | Installed via Google Play Store |
| **Offline Support** | None (shows dinosaur error) | LocalStorage (Saved bookmarks preserved) | Full asset caching | Local SQLite/Room database |
| **Live Dynamic Clocks** | None | Real-time 60-Second Radar interval & chime | Real-time interval & chime | Background Android WorkManager |
| **Updates & Deploys** | Manual FTP upload | Push to GitHub → Vercel auto-builds in 8s | Push to GitHub → Vercel auto-builds | Recompile binary & wait 3 days for Google review |
| **Publishing Cost** | ₹0 | ₹0 (Free on Vercel) | ₹0 (Free on Vercel) | $25 one-time fee to Google Play |

---

## 📢 STEP 5: STUDENT COMMUNITY & LAUNCH PLAYBOOK (Week 2)

How to get your first 500 active student readers across colleges in Siliguri, West Bengal, and nationwide:

### 1. WhatsApp & Telegram Broadcast Template
Copy and send this message to your college batches (NBU, SIT Siliguri, Jalpaiguri, Delhi/Kolkata student groups):

> *"Hey guys! 👋 I built an ad-free 24-hour news intelligence app specifically for students: **AXIS**.*  
> *• Every story is summarized in **30-second bullet takeaways** with a 'What is Really the Problem' root-cause reality check.*  
> *• Covers India National, Russia-Ukraine frontline, Disaster alerts, verified AI leaks from X, and Siliguri/World updates.*  
> *• Old news is automatically purged every 24 hours so you strictly get today's and yesterday's updates.*  
> *• ⚡ Check it out: https://axis-news-iota.vercel.app (you can even tap 'Add to Home Screen' to use it like an app!)*  
> *Drop your feedback using the Connect button inside the app!"*

### 2. Instagram Daily News Carousels (`@axisnews_in`)
Set up an Instagram page and publish 3 daily carousels using content straight from the app:
- **08:30 AM (Morning Edition)**: *What's Important Right Now* (e.g. Captain assault emergency landing, Cyclone telemetry).
- **02:00 PM (Afternoon Tech Radar)**: *AI Leaks & Frontier Tech* (open-source models, GPU compute grants).
- **09:00 PM (Night Reflection)**: *Daily Wisdom & Sloka* (Bhagavad Gita sloka and student takeaways).

---

## 📋 MASTER TO-DO CHECKLIST (Check Off as You Complete!)

Use this comprehensive checklist to track your progress step-by-step:

### Phase 1: Immediate Setup (Today)
- [ ] Visit [https://axis-news-iota.vercel.app](https://axis-news-iota.vercel.app) on laptop and phone
- [ ] Verify that all articles are dated **Today** or **Yesterday**
- [ ] Test the WhatsApp-style notification chime and volume mute toggle (`🔊`/`🔇`)
- [ ] Test the **"What's Important Right Now"** carousel and click **"Know More"**
- [ ] Sign up for free Formspree account at [formspree.io](https://formspree.io)
- [ ] Insert Formspree Form ID in `src/components/ContactModal.tsx`
- [ ] Enable free Web Analytics in your Vercel Dashboard

### Phase 2: Domain & Brand Identity (This Week)
- [ ] Purchase custom domain (e.g. `axisnews.in` or `axisnews.app`)
- [ ] Add domain to Vercel Settings → Domains
- [ ] Add DNS A Record (`76.76.21.21`) and CNAME (`cname.vercel-dns.com`) at your domain provider
- [ ] Verify SSL certificate is active on `https://axisnews.in`

### Phase 3: Google Play Store Release (Next 1–2 Weeks)
- [ ] Register Google Play Developer account ($25 at `play.google.com/console`)
- [ ] Prepare 512x512 transparent PNG app logo
- [ ] Run `https://axis-news-iota.vercel.app` through [PWABuilder.com](https://pwabuilder.com)
- [ ] Download signed `app-release.aab` bundle
- [ ] Capture 3–4 mobile screenshots of AXIS
- [ ] Fill out Google Play Store listing and upload `.aab`
- [ ] Submit for Google review and rollout to production!

### Phase 4: Campus Launch & Feedback
- [ ] Send WhatsApp broadcast message to 3 college/batch groups
- [ ] Check Gmail (`mangalent.slg@gmail.com`) for incoming student feedback submissions
- [ ] Share with 5 professors and student council leads for testimonials
- [ ] Create `@axisnews_in` on Instagram and post first news summary carousel

---

*Master Execution Guide created for Garv Bansal · AXIS News Intelligence Platform*
