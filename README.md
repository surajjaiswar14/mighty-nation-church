# Mighty Nation Church — Official Website

> **Location:** Rajeev Gandhi Nagar, Salt Pan Road, Azad Mohalla, East Wadala, Mumbai, Maharashtra – 400037  
> **Tagline:** *"Worship • Grow in Faith • Be Transformed"*  
> **Scripture:** *"I can do all things through Christ who strengthens me."* — Philippians 4:13

A modern, professional Christian ministry website built with **React**, **TypeScript**, **Tailwind CSS**, and **React Router**, featuring an integrated **Admin Management Dashboard**, **Online Prayer & Meeting Gateway**, **Confidential Prayer Request System**, and **Local SEO & Google Maps optimization for Wadala, Mumbai**.

---

## 🌟 Key Features

1. **Brand & Visual Identity:**
   - Royal blue, light sky blue, clean white, and warm gold accents.
   - Cross & Crown emblem custom SVG logo (`ChurchLogo`).
   - Mobile-first responsive navigation with drawer and top announcement bar.

2. **Complete Set of Church Pages:**
   - **Home (`/`):** Full-width hero with spiritual lighting, service timings highlight, Philippians 4:13 banner, welcome message, worship previews, upcoming events, and photo gallery.
   - **About Us (`/about`):** Who we are in Wadala Mumbai, Vision, Mission, and Core Beliefs (proposed website copy, fully editable).
   - **Our Church History (`/history`):** Faithful timeline honoring historical booklet milestones:
     - *1985:* Friendship Centre India ministry began in Mumbai (Founders: Pastor John & Priscilla Gladstone).
     - *1991:* Priscilla Children's Home established for children and community support.
     - *2013:* Mighty Nation Bible College established for biblical education and leadership development.
   - **Church Leadership (`/leadership`):** Profile cards for Pastor John Gladstone, Priscilla Gladstone, Pastor Mukesh, and Sister Sangeeta Aunty.
   - **Ministries & Worship Team (`/ministries`):** Dedicated "United in Worship" section with worship team photo placeholder and ministry areas.
   - **Weekly Services (`/services`):**
     - **Sunday Worship:** 12:00 PM – 2:00 PM (Praise & Worship, Bible Teaching, Fellowship).
     - **Friday Fasting Prayer:** 8:30 PM – 9:30 PM (Intercession, Corporate Prayer).
     - *"Everyone is Welcome"* community greeting.
   - **Daily Online Prayer (`/online-prayer`):**
     - Dynamic prayer schedule and meeting platform display.
     - Safe fallback: *"Contact us to receive the daily online prayer meeting details."* (No fake links created).
   - **Prayer Request System (`/prayer-request`):**
     - Confidential submission form with honeypot spam protection.
     - Instant feedback: *"Thank you for sharing your prayer request. Our ministry team will connect with you."*
     - Requests stored in encrypted browser state and auto-synced to Supabase when connected.
   - **Photo Gallery (`/gallery`):** 8 category filters with responsive grid, hover effects, and interactive lightbox.
   - **Sermons & Bible Teaching (`/sermons`):** Sermon browser with topics, search, and embedded YouTube player modal.
   - **Events & Announcements (`/events`):** Upcoming celebrations and prayer vigils with direct contact CTAs.
   - **Contact Us & Directions (`/contact`):** Real address in Wadala East, interactive Google Map embed, directions link, WhatsApp chat, and contact form.
   - **Admin Portal (`/admin`):** Secure dashboard to edit service times, update pastor photos, configure online prayer links, review private prayer requests, mark prayers as completed, export prayer logs to JSON, and read contact messages.

---

## 🚀 Quick Start

### 1. Installation
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🔐 Church Admin Portal

- **URL:** Navigate to `/admin` or click "Admin Portal" in the top bar or footer.
- **Default Passcode:** `mighty2024` or `churchadmin123` *(can be changed inside the dashboard)*.
- **Capabilities:**
  - Update Sunday and Friday service timings instantly.
  - Update Online Prayer time and meeting room URL.
  - Review and archive confidential prayer requests.
  - Download all prayer requests as JSON for church records.
  - Update pastor photos, leadership designations, and biographies.
  - Add or modify gallery photos and events.

---

## 🗄️ Backend Integration (Supabase / Firebase)

The website works **100% out of the box in Local Storage mode**, so you do not need any database setup to run and use the full website immediately.

### Connecting Supabase (Optional)
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Enter your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
3. Run the SQL script from `supabase_schema.sql` in your Supabase SQL Editor.

---

## 📍 Local SEO & Google Business Profile

- **Structured Data:** Built-in `Schema.org/Church` JSON-LD schema with coordinates for Salt Pan Road, East Wadala, Mumbai 400037.
- **Meta Tags:** Targeted keywords for:
  - *Mighty Nation Church*
  - *Mighty Nation Church Wadala*
  - *Church in Wadala Mumbai*
  - *Church near Wadala*
  - *Christian Church in Wadala*
  - *Sunday Worship in Wadala*
  - *Prayer Meeting in Wadala*
- **Sitemap & Robots:** Located at `/sitemap.xml` and `/robots.txt`.

---

## 🎨 Central Configuration File

All texts, phone numbers, emails, addresses, leadership profiles, and sermon lists are located in:
```
src/config/churchConfig.ts
```
Simply edit this file to replace stock photos with actual church photographs and update phone numbers or emails whenever ready!
