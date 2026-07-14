# Environment Variables Setup - MappedSkills Marketing

**Status:** Pre-production setup guide  
**Website:** https://mappedskills.com  

---

## 1. Environment Variables Overview

Environment variables configure the website for production without hardcoding sensitive data.

### Variables Required vs Optional

| Variable | Required | Purpose |
|----------|----------|---------|
| NEXT_PUBLIC_SITE_URL | Yes | Site domain |
| NEXT_PUBLIC_GTM_ID | Yes | Google Tag Manager |
| NEXT_PUBLIC_GA4_ID | Yes | Google Analytics 4 |
| NEXT_PUBLIC_META_PIXEL_ID | No | Facebook Pixel (optional) |
| NEXT_PUBLIC_CALENDLY_URL | Yes | Calendly booking |
| NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION | No | GSC verification |
| NEXT_PUBLIC_LINKEDIN_URL | No | Social link |
| NEXT_PUBLIC_FACEBOOK_URL | No | Social link |
| NEXT_PUBLIC_INSTAGRAM_URL | No | Social link |
| CONTACT_NOTIFICATION_EMAIL | Yes | Form submissions |

---

## 2. Where to Set Variables

### Development (.env.local)

Create `.env.local` file in project root:

```bash
# .env.local (DO NOT COMMIT TO GIT)

NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/username
CONTACT_NOTIFICATION_EMAIL=your-email@example.com
```

**Important:** Never commit .env.local to Git

### Production (Vercel)

1. Go to: Vercel Dashboard → Projects → mappedskills
2. Click: Settings → Environment Variables
3. Add each variable
4. Vercel automatically redeploys when variables change

---

## 3. Each Variable Explained

### NEXT_PUBLIC_SITE_URL

**Purpose:** Full website domain  
**Required:** Yes  
**Development:** `http://localhost:3000`  
**Production:** `https://mappedskills.com`  
**Usage:** Meta tags, canonical URLs, tracking

```
NEXT_PUBLIC_SITE_URL=https://mappedskills.com
```

### NEXT_PUBLIC_GTM_ID

**Purpose:** Google Tag Manager container ID  
**Required:** Yes (for analytics to work)  
**Format:** GTM-XXXXXXXX (always starts with GTM-)  
**Where to find:** GTM Dashboard → Container Settings → Container ID  
**Usage:** Initializes GTM script, enables all tags

```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXXX
```

### NEXT_PUBLIC_GA4_ID

**Purpose:** Google Analytics 4 measurement ID  
**Required:** Yes (for GA4 tracking to work)  
**Format:** G-XXXXXXXXXX (always starts with G-)  
**Where to find:** GA4 property → Data Streams → select web stream → Measurement ID  
**Usage:** Sends page views and events to GA4

```
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

### NEXT_PUBLIC_META_PIXEL_ID

**Purpose:** Facebook Pixel ID for retargeting  
**Required:** No (optional, nice-to-have)  
**Format:** 15-digit number  
**Where to find:** Facebook Ads Manager → Pixels → Your Pixel → Settings  
**Usage:** Tracks conversions for Facebook ads  
**If missing:** Website works fine, just no Facebook retargeting

```
NEXT_PUBLIC_META_PIXEL_ID=000000000000000
```

### NEXT_PUBLIC_CALENDLY_URL

**Purpose:** Your Calendly booking page  
**Required:** Yes (for schedule call to work)  
**Format:** Full URL to your Calendly  
**Where to find:** Your Calendly profile → Share → Full URL  
**Usage:** Embeds booking widget on /schedule-call page  
**If missing:** Schedule call page shows fallback message

```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/mappedskills/strategy-call
```

### NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

**Purpose:** GSC ownership verification  
**Required:** No (add after creating GSC property)  
**Format:** Verification code from GSC  
**Where to find:** GSC property → Verification details → Meta tag  
**Usage:** Meta tag for domain verification  
**If missing:** Manual DNS verification still works

```
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123xyz789
```

### NEXT_PUBLIC_LINKEDIN_URL

**Purpose:** Social media link in footer  
**Required:** No (social links optional)  
**Format:** Full LinkedIn company URL  
**Usage:** Footer link to LinkedIn  
**If missing:** LinkedIn link hidden

```
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/mappedskills
```

### NEXT_PUBLIC_FACEBOOK_URL

**Purpose:** Social media link in footer  
**Required:** No (social links optional)  
**Format:** Full Facebook page URL  
**Usage:** Footer link to Facebook  
**If missing:** Facebook link hidden

```
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/mappedskills
```

### NEXT_PUBLIC_INSTAGRAM_URL

**Purpose:** Social media link in footer  
**Required:** No (social links optional)  
**Format:** Full Instagram profile URL  
**Usage:** Footer link to Instagram  
**If missing:** Instagram link hidden

```
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/mappedskills
```

### CONTACT_NOTIFICATION_EMAIL

**Purpose:** Where form submissions are sent  
**Required:** Yes (for form notifications)  
**Format:** Valid email address  
**Usage:** Email address for contact form notifications  
**If missing:** Form submissions still work, but no email notification

```
CONTACT_NOTIFICATION_EMAIL=info@mappedskills.com
```

---

## 4. Getting Required IDs

### GTM Container ID

1. Go to: Google Tag Manager
2. Select container: MappedSkills Website
3. Click: Admin → Container Settings
4. Copy: Container ID (GTM-XXXXXXXX)

### GA4 Measurement ID

1. Go to: Google Analytics 4
2. Select property: MappedSkills Website
3. Click: Admin → Data Streams
4. Select: Website data stream
5. Copy: Measurement ID (G-XXXXXXXXXX)

### Calendly URL

1. Go to: Calendly.com
2. Log in to your account
3. Click: Share
4. Copy: Full URL (https://calendly.com/username/event-name)

### Meta Pixel ID (Optional)

1. Go to: Facebook Ads Manager
2. Click: Tools → Pixels
3. Select: Your pixel
4. Copy: Pixel ID (15-digit number)

---

## 5. Setting Variables in Vercel

### Step 1: Open Environment Variables Settings

1. Go to: vercel.com/dashboard
2. Select: mappedskills project
3. Click: Settings (top right)
4. Click: Environment Variables (left sidebar)

### Step 2: Add Each Variable

For each variable:
1. Click: "+ Add New"
2. Enter: Variable name (e.g., NEXT_PUBLIC_SITE_URL)
3. Enter: Value (e.g., https://mappedskills.com)
4. Select: Production (for production environment)
5. Click: Save

### Step 3: Redeploy

After adding variables:
1. Go to: Deployments tab
2. Find latest deployment
3. Click: "Redeploy"
4. Wait for new deployment to complete

---

## 6. Testing Variables

### Check Variables Are Loaded

1. Open website in browser
2. Right-click → Inspect → Console
3. Run: `window.location.href` (should show mappedskills.com)
4. Check that GTM script loads (Network tab → GTM)
5. Check GA4 fires events (GTM DebugView)

### Test Each System

**GTM:**
- Open GTM DebugView
- Visit website
- Verify container loads

**GA4:**
- Open GA4 Real-Time
- Visit website
- Verify page view appears

**Calendly:**
- Visit /schedule-call
- Verify booking widget appears

**Forms:**
- Submit contact form
- Verify event fires in GTM/GA4

---

## 7. Environment Safety Rules

### DO:
✅ Use environment variables for all sensitive data  
✅ Verify variables are set before deploying  
✅ Keep .env.local secure (never commit)  
✅ Use different values for dev vs production  
✅ Redeploy after changing variables  
✅ Test variables work after deployment  

### DON'T:
❌ Hardcode IDs in code  
❌ Commit .env.local to Git  
❌ Share Vercel env var values  
❌ Use development IDs in production  
❌ Store sensitive data in comments  
❌ Log environment variables  

---

## 8. Troubleshooting

### Website Works But GA4 Not Firing

**Issue:** GA4 events not appearing in real-time  
**Solution:**
- Verify NEXT_PUBLIC_GA4_ID is set correctly
- Verify NEXT_PUBLIC_GTM_ID is set correctly
- Check GA4 DebugView is showing events
- Verify GTM container has GA4 tag configured

### Calendly Not Appearing

**Issue:** Schedule call page shows blank or fallback  
**Solution:**
- Verify NEXT_PUBLIC_CALENDLY_URL is set
- Verify URL is exact match (copy from Calendly share)
- Check for typos in URL
- Verify URL format: https://calendly.com/username/event

### Form Submissions Not Received

**Issue:** Contact form submits but no email notification  
**Solution:**
- Verify CONTACT_NOTIFICATION_EMAIL is set
- Verify email address is valid
- Check spam folder
- Verify email service is configured

### GTM Script Not Loading

**Issue:** GTM DebugView not showing container  
**Solution:**
- Verify NEXT_PUBLIC_GTM_ID is set (GTM-XXXXXXXX format)
- Verify format is correct (starts with GTM-)
- Verify no spaces in ID
- Redeploy after changing variable

---

## 9. Variable Checklist

Before production launch, verify:

- [ ] NEXT_PUBLIC_SITE_URL set to https://mappedskills.com
- [ ] NEXT_PUBLIC_GTM_ID set and valid (GTM-XXXXXXXX)
- [ ] NEXT_PUBLIC_GA4_ID set and valid (G-XXXXXXXXXX)
- [ ] NEXT_PUBLIC_CALENDLY_URL set to your Calendly URL
- [ ] CONTACT_NOTIFICATION_EMAIL set to info@mappedskills.com
- [ ] All variables tested in preview environment
- [ ] All systems working in preview (GTM, GA4, Calendly, forms)
- [ ] Deployment successful after adding variables
- [ ] Production website loads with all variables active
- [ ] GA4 real-time showing traffic
- [ ] Calendly embed appears on /schedule-call
- [ ] Contact form can submit

---

## Summary

Environment variables configure the website for production. Add all required variables to Vercel before deploying, test in preview environment, then redeploy for production.

**Critical:** Don't skip any required variable - they're needed for analytics, booking, and forms to work.

