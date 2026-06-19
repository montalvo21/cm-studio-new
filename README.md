# CM Studio — Official Website

**cmstudio.digital** · Web & Software Solutions

A premium, bilingual (EN/ES), SEO-optimized, fully responsive website built with Next.js 14, Tailwind CSS, and Framer Motion.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| next-intl | EN/ES i18n |
| Google Sheets API | Contact form storage |
| Vercel | Deployment |

---

## Project Structure

```
cm-studio/
├── messages/
│   ├── en.json          # English translations
│   └── es.json          # Spanish translations
├── public/
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx     # Locale layout
│   │   │   └── page.tsx       # Main page
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts   # Google Sheets API route
│   │   ├── globals.css
│   │   ├── layout.tsx         # Root layout + fonts + metadata
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TrustBar.tsx
│   │   │   ├── WhySection.tsx
│   │   │   ├── SolutionsSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── ProcessSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   └── ContactSection.tsx
│   │   └── shared/
│   │       ├── AvailabilityBadge.tsx
│   │       ├── HeroCanvas.tsx
│   │       ├── SectionHeader.tsx
│   │       ├── StructuredData.tsx
│   │       └── WhatsAppButton.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── i18n.ts
│   └── middleware.ts
├── .env.example
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Then fill in the values in `.env.local` (see the Google Sheets setup section below).

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Google Sheets Integration Setup

The contact form saves submissions to a Google Sheet. To enable this:

1. **Create a Google Cloud project** at [console.cloud.google.com](https://console.cloud.google.com)
2. **Enable the Google Sheets API** in the project
3. Go to **IAM & Admin → Service Accounts** → Create a new service account
4. Create a **JSON key** for the service account and download it
5. **Create a Google Sheet** with these column headers in row 1:
   ```
   Date | Name | Company | Email | Phone | Service | Budget | Message | Language | Source
   ```
6. **Share the sheet** with the service account email (from the JSON key) as **Editor**
7. Copy the **Sheet ID** from the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
8. Add to your `.env.local`:
   ```
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-sa@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEET_ID=your_sheet_id
   ```

> **Note:** If credentials are not set, submissions are logged to the console in development mode and silently succeed in production. No data is lost — add credentials when ready.

---

## Language Switching

- English is the default route: `cmstudio.digital/`
- Spanish is at: `cmstudio.digital/es`
- The `EN | ES` switcher in the navbar handles routing automatically
- All content lives in `messages/en.json` and `messages/es.json`

---

## Availability Badge

To toggle the availability state (hero + about section), edit one line in `src/app/[locale]/page.tsx`:

```ts
// 'available' → green badge "Available for New Projects"
// 'booking'   → amber badge "Booking Ahead"
const AVAILABILITY_STATE: 'available' | 'booking' = 'available';
```

---

## Updating Content

All site content (services, projects, process steps, testimonials, blog posts) is managed in:

- `messages/en.json` — English content
- `messages/es.json` — Spanish content

No code changes needed to update text, prices, or add new blog posts.

---

## Adding Real Project Images

Replace the placeholder gradient backgrounds in `ProjectsSection.tsx`:

1. Add images to `public/images/projects/`
2. Use Next.js `<Image>` component in the project card thumbnail area
3. Recommended size: `800×450px` (16:9), WebP format

---

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option B — GitHub Integration (recommended)

1. Push the project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Vercel auto-detects Next.js — no config needed
4. Add your environment variables in **Project Settings → Environment Variables**:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEET_ID`
   - `NEXT_PUBLIC_SITE_URL`
5. Click **Deploy**

### After deployment

- Set your custom domain `cmstudio.digital` in Vercel project settings
- Vercel handles SSL automatically
- Re-deployments happen automatically on every `git push` to `main`

---

## SEO Checklist

- [x] Title & meta description (EN + ES)
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Canonical URLs
- [x] hreflang tags (en / es-SV)
- [x] robots.txt
- [x] sitemap.xml (auto-generated)
- [x] JSON-LD structured data (Organization + WebSite)
- [x] Semantic HTML with proper heading hierarchy
- [x] ARIA labels on interactive elements
- [x] Keyboard navigation support
- [x] Reduced motion support
- [ ] Add `alt` text to real project images when added
- [ ] Add Google Analytics / Vercel Analytics ID

---

## Customization Checklist

Before going live, replace these placeholders:

| Item | Location |
|------|---------|
| WhatsApp number | `WhatsAppButton.tsx`, `Footer.tsx`, `ContactSection.tsx` |
| Google Calendar booking link | `ContactSection.tsx` → `YOUR_CALENDAR_LINK` |
| Social media URLs | `Footer.tsx` → `SOCIAL_LINKS` |
| CV PDF file | Add `carlos-montalvo-cv.pdf` to `/public/` |
| OG image | Add `og-image.png` (1200×630px) to `/public/` |
| Logo image | Optionally replace text logo in `Navbar.tsx` and `Footer.tsx` |
| Real testimonials | `messages/en.json` + `messages/es.json` → `testimonials.items` |
| Project live URLs | `messages/en.json` → `projects.items[].live_url` |

---

## License

Private — CM Studio © 2026. All rights reserved.
