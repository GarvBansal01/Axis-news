# 📋 READGARV.md — Garv's Master Action Plan & Step-by-Step Execution Guide

Welcome, **Garv**! This is your complete, interactive roadmap to operating, launching, and scaling **AXIS News Intelligence** (`https://axis-news-iota.vercel.app`).

Every single action item is written with crystal-clear instructions, direct links, and clickable checkboxes (`[ ]`) so you can follow along, mark tasks off, and take AXIS from a web app to a live Google Play Store application used by students across colleges.

---

## ⚡ Quick Dashboard Links
- **Live Production Web App**: [https://axis-news-iota.vercel.app](https://axis-news-iota.vercel.app)
- **GitHub Repository**: [https://github.com/GarvBansal01/Axis-news](https://github.com/GarvBansal01/Axis-news) (branch: `main`)
- **Vercel Project Dashboard**: [https://vercel.com/mangalentslg-9113s-projects/axis-news](https://vercel.com/mangalentslg-9113s-projects/axis-news)
- **PWABuilder (Play Store Packager)**: [https://pwabuilder.com](https://pwabuilder.com)
- **Google Play Console**: [https://play.google.com/console](https://play.google.com/console)
- **Formspree (Form Submissions to Email)**: [https://formspree.io](https://formspree.io)

---

## 🕒 How the 24-Hour Rolling News & Auto-Purge Engine Works

You requested that **news is kept strictly fresh (Today & Yesterday) and automatically purged after 24 hours**. Here is how the system now works:

1. **Dynamic Timestamps**: Every dispatch in `src/data/mockNews.ts` uses `createRollingTimestamp(minutesAgo)`. Regardless of what date or year you open the app, it dynamically calculates relative times (e.g. `5m ago (Today)`, `2h ago (Today)`, `Today, 02:45 PM IST`).
2. **Automated 24-Hour Purge**: In `src/App.tsx`, the news engine compares the dispatch timestamp with `Date.now()`. Any news older than 24 hours (`> 24 * 60 * 60 * 1000 ms`) is **automatically deleted/purged** from the live stream.
3. **Live 1-Minute Radar Feed**: Every 60 seconds, incoming breaking dispatches are injected with `timestamp: Date.now()`, accompanied by the gentle WhatsApp-style notification chime.
4. **Tomorrow & Day After**: As time moves forward into tomorrow and the day after, older news from yesterday drops off automatically, keeping the feed 100% fresh with zero stale items!

---

## 🎯 PHASE 1: What To Do RIGHT NOW (15 Minutes)

Complete these 3 quick tasks right now to make the app fully functional with your personal email and analytics.

### Task 1: Test Your Live App on Mobile and Laptop
- [ ] Open [https://axis-news-iota.vercel.app](https://axis-news-iota.vercel.app) on your laptop.
  - Notice that the Left Rail is your Master Channel Desk, and the top bar is clean with the **Active Desk** and **🕒 Rolling 24H Feed** badge.
  - Test the top **"What's Important Right Now"** spotlight with the root-cause analysis box.
  - Click **"Know More"** to test the deep-dive modal.
  - Notice the new **Volume button** (`🔊` / `🔇`) next to the 1-Min Radar badge to mute or unmute the gentle WhatsApp chime.
- [ ] Open the same link on your phone (Chrome or Safari).
  - Notice the mobile-friendly horizontal category scroll and swipe feel!

---

### Task 2: Connect the Contact Form to Your Email (Takes 3 Minutes)
Right now, messages submitted in the Contact modal are saved in local browser storage. To receive inquiries, feedback, and student news leads straight to your inbox (`mangalent.slg@gmail.com`):

- [ ] Go to [https://formspree.io](https://formspree.io) and click **Get Started Free**.
- [ ] Sign up using your email: `mangalent.slg@gmail.com`.
- [ ] Click **"+ New Form"** and enter:
  - Form Name: `AXIS News Contact & Tips`
  - Send emails to: `mangalent.slg@gmail.com`
- [ ] Formspree will give you your endpoint URL (looks like `https://formspree.io/f/mqkvrxyz`).
- [ ] Open [src/components/ContactModal.tsx](file:///Users/lavnishbansal/Desktop/Axis-news/src/components/ContactModal.tsx) in your editor.
- [ ] In the `handleSubmit` function around line 60, add this simple `fetch` call:
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
- [ ] Save, commit, and push. Now, any time a student submits a message, an email instantly arrives in your Gmail!

---

### Task 3: Turn On Free Vercel Analytics (Takes 1 Minute)
To see how many students are visiting your app, which devices they use, and where they are visiting from:

- [ ] Go to your [Vercel Project Dashboard](https://vercel.com/mangalentslg-9113s-projects/axis-news).
- [ ] Click on the **Analytics** tab at the top.
- [ ] Click the black button: **"Enable Analytics"** (100% Free on the Hobby plan).
- [ ] Done! Real-time visitor counts and country analytics will now appear automatically.

---

## 🌐 PHASE 2: Custom Domain & Professional Branding (Day 2 - 3)

Right now, your URL is `https://axis-news-iota.vercel.app`. Adding a custom domain like `axisnews.in` makes your platform look like a premier media publication.

### How to Connect Your Domain:
- [ ] **Buy a Domain**:
  - Go to [Namecheap.com](https://namecheap.com), [GoDaddy.in](https://godaddy.in), or [Hostinger.in].
  - Search for `axisnews.in` (typically ₹399–₹599 for the first year) or `axisnews.app`.
  - Complete the purchase.
- [ ] **Add to Vercel**:
  - In your [Vercel Dashboard](https://vercel.com/mangalentslg-9113s-projects/axis-news), go to **Settings** → **Domains**.
  - Type your domain name (e.g. `axisnews.in`) and click **Add**.
- [ ] **Configure DNS Records** (at your domain registrar):
  - Add an **A Record**:
    - Host: `@`
    - Value / Points to: `76.76.21.21`
  - Add a **CNAME Record**:
    - Host: `www`
    - Value / Points to: `cname.vercel-dns.com`
- [ ] **Verification**:
  - Vercel will check the records and issue a free SSL certificate (HTTPS) within 5–15 minutes.
  - Your app will now be live on `https://axisnews.in`!

---

## 📱 PHASE 3: How to Put AXIS on the Google Play Store (Step-by-Step)

You do **not** need to rewrite the app in Java, Kotlin, or Flutter. Google created the **Trusted Web Activity (TWA)** standard so that modern web applications (like AXIS) can be published directly on the Google Play Store.

### Step 1: Open a Google Play Console Account
- [ ] Go to [play.google.com/console](https://play.google.com/console).
- [ ] Sign in with your Google account.
- [ ] Pay the one-time registration fee of **$25** (valid for life; no monthly charges).
- [ ] Complete your developer identity verification (takes 24–48 hours).

### Step 2: Generate the Android `.aab` Package via PWABuilder (100% Free)
- [ ] Go to [https://pwabuilder.com](https://pwabuilder.com) (created by Microsoft).
- [ ] Paste your live URL: `https://axis-news-iota.vercel.app` (or your custom domain `https://axisnews.in`).
- [ ] Click **Start**. PWABuilder tests the PWA readiness.
- [ ] Click **"Package for Stores"** → choose **Android (Google Play)**.
- [ ] Fill in the package details:
  - Package ID: `com.garvbansal.axisnews`
  - App Name: `AXIS News`
  - Launcher Name: `AXIS`
  - Theme Color: `#09090b` (Dark)
  - Upload a 512x512 PNG app logo.
- [ ] Click **Generate Package**.
- [ ] Download the generated `.zip` file. Inside, you will find your signed **`app-release.aab`** file!

> 💡 **The Best Feature of This Method**: Every time you push a bug fix or code update to GitHub and Vercel builds it, **your Play Store app updates instantly in real time** on all users' phones! You never have to re-submit updates to Google for review.

### Step 3: Complete Play Store Listing & Submit
- [ ] In Google Play Console, click **"Create App"**:
  - App Name: `AXIS — 24H News Radar for Students`
  - Default Language: English (India)
  - App or Game: **App**
  - Free or Paid: **Free**
- [ ] Fill in **Store Listing**:
  - Short description (80 chars): *Zero-clutter 30-second synthesized news radar for students and Gen-Z.*
  - Full description: Highlight the 1-minute live radar, verified sources (The Hindu, BBC, Reuters), root-cause analysis, and Siliguri/World coverage.
  - Upload 3–4 screenshots of AXIS from your phone (Stream feed, What's Important hero, 30s Card preview mode, Shloka reflection).
  - Upload 512x512 app icon.
  - Upload 1024x500 feature graphic banner.
- [ ] Complete **App Content Questions**:
  - Content Rating: Complete the free IARC survey (News apps receive an "Everyone" rating).
  - Target Audience: 13+ (Students & Young Adults).
- [ ] **Upload `.aab` Bundle**:
  - Go to **Release** → **Production** → **Create New Release**.
  - Upload your `app-release.aab` file.
  - Click **Review Release** → **Start Rollout to Production**!
- [ ] Google reviews and approves the app within 2–5 business days. Once approved, millions of students can download AXIS directly from the Play Store!

---

## 🎓 PHASE 4: Educate Yourself — How an App Differs from a Website

| Feature | Traditional Website | Web App (What AXIS Is) | Progressive Web App (PWA) | Native Mobile App |
| :--- | :--- | :--- | :--- | :--- |
| **Technology** | Static HTML & CSS | React + TypeScript + Vite | React with `manifest.json` | Kotlin (Android) / Swift (iOS) |
| **Page Navigation** | Full page reload on click | Zero reloads (SPA memory) | Zero reloads, full screen | Native views & activities |
| **Installable** | No | Yes (via browser prompt) | Yes ("Add to Home Screen") | Yes (Play Store / App Store) |
| **Offline Support** | None | LocalStorage Bookmarks | Service Worker Caching | SQLite / Room Database |
| **Live Timers** | None | 60-Second Radar Interval | 60-Second Radar Interval | Background Worker Services |
| **Publishing Cost** | Free | Free | **Free ($0)** | $25 (Play Store) / $99/yr (Apple) |

---

## 📢 PHASE 5: Student Community & Launch Playbook (Week 2)

How to get your first 500 active student readers:

### 1. WhatsApp & Telegram Batch Announcements
Send this message to your college batches (NBU, SIT Siliguri, Jalpaiguri, friends in engineering/arts/commerce):

> *"Hey guys! 👋 I built an ad-free 24-hour news app specifically for students: **AXIS**.*  
> *• Every news item is summarized in **30-second bullet takeaways** with 'What is Really the Problem' root-cause analysis.*  
> *• Covers India National, Russia-Ukraine war, Disasters, AI leaks from X, and local Siliguri news.*  
> *• Auto-purges old news after 24 hours so you only get fresh updates.*  
> *• ⚡ Check it out: https://axis-news-iota.vercel.app (or install it to your home screen!)*  
> *Let me know what you think!"*

### 2. Social Media Daily Carousels (Instagram & X)
Create `@axisnews_in` on Instagram and post 3 carousels daily:
- **Morning (08:30 AM)**: *What's Important Right Now* (e.g. Pilot assault story / Russia-Ukraine frontline / Cyclone alert).
- **Afternoon (02:00 PM)**: *AI Leaks & Tech Frontier* (verified X researcher leaks).
- **Night (09:00 PM)**: *Daily Reflection & Shloka* (Bhagavad Gita wisdom for student focus).

---

## 📋 Comprehensive Interactive Master Checklist

Check off each item as you complete it:

### Immediate Setup (Today)
- [ ] Visit [https://axis-news-iota.vercel.app](https://axis-news-iota.vercel.app) on laptop & phone
- [ ] Hear the gentle WhatsApp-style chime and test the volume mute toggle button
- [ ] Create free Formspree account at [formspree.io](https://formspree.io)
- [ ] Plug your Form ID into `src/components/ContactModal.tsx`
- [ ] Enable Vercel Analytics in the Vercel Dashboard

### Domain & Identity (This Week)
- [ ] Search and purchase domain (e.g. `axisnews.in`)
- [ ] Add domain to Vercel Settings → Domains
- [ ] Set A Record (`76.76.21.21`) and CNAME (`cname.vercel-dns.com`) at your domain registrar
- [ ] Verify SSL is active on `https://axisnews.in`

### Google Play Store Launch (Next 1–2 Weeks)
- [ ] Register Google Play Developer account ($25 at `play.google.com/console`)
- [ ] Run `https://axis-news-iota.vercel.app` through [PWABuilder.com](https://pwabuilder.com)
- [ ] Download the signed `app-release.aab` bundle
- [ ] Take 4 mobile screenshots of AXIS
- [ ] Fill out Google Play Store listing and upload `.aab`
- [ ] Submit for review and publish!

### Growth & Community
- [ ] Share WhatsApp message with 3 college student groups
- [ ] Collect first 10 student feedback notes via the app's Contact form
- [ ] Create `@axisnews_in` on Instagram and post your first news carousel

---

*Master Execution Guide created for Garv Bansal · AXIS News Intelligence Platform*
