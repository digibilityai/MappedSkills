# cPanel deploy (Next.js + Passenger)

## Recommended: build locally (this host)

Shared hosting on hosting.com often cannot finish `next build` (process/thread limits: `pthread_create: Resource temporarily unavailable`). Prefer:

1. On your PC: `npm run pack:cpanel` (builds + creates `mappedskills-cpanel-*.zip`)
2. Upload that zip into the app root (`ms.mappedskills.com`), extract so you see **both** `app/` and `components/` at the same level
3. On the server: `npm install` then restart the Node app — **do not** run `npm run build`
4. Startup file: **`server.cjs`** (not `app.js`)
5. Mode: Production, `NODE_ENV=production`

### Critical: `Can't resolve '@/components/Hero'`

This is **not** a code bug. It means the server tree is incomplete (usually `app/` uploaded without `components/`).

On the server, before building or starting, run:

```bash
ls components/Hero.tsx components/Section.tsx components/Container.tsx
pwd
ls
```

You must see `app`, `components`, `lib`, `package.json`, `server.cjs` together in the same directory. If `components/` is missing, re-upload the full zip.

Do **not** run `npm run build` on the server unless that `ls` check passes **and** LVE limits allow it.

## Why CSS returns 400 on `/_next/static/css/...`

Next.js shows **400** (not 404) when a hashed CSS/JS file from the HTML **does not exist** in `.next/static/` on the server. Common causes:

1. **Build mismatch** — HTML from one `npm run build`, `.next/static` from another (or only `app/` uploaded without `components/`).
2. **Incomplete `.next`** — old static files deleted but app not fully rebuilt.
3. **`NODE_ENV` not production** — dev/prod asset paths differ.

## What to upload

Upload the **full project root**, not a subset:

| Required |
|----------|
| `package.json`, `package-lock.json` |
| `server.cjs`, `next.config.mjs`, `postcss.config.mjs`, `tsconfig.json` |
| `app/`, `components/`, `lib/`, `hooks/`, `styles/`, `public/` |
| Fresh `.next/` from the same local build you tested |
| `.htaccess` (keep the block cPanel/Passenger generated) |

Missing `components/` causes errors like `Can't resolve '@/components/Hero'`.

## Env vars (cPanel Node.js App)

Set at least:

- `NODE_ENV=production`
- `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_ENVIRONMENT`
- `NEXT_PUBLIC_SITE_URL=https://ms.mappedskills.com` (or your live URL)

## Verify after deploy

```bash
ls .next/static/css/
test -f .next/BUILD_ID && cat .next/BUILD_ID
```

Open the site, View Source, find `/_next/static/css/XXXX.css`, confirm that file exists under `.next/static/css/`.

## If you still build on the server

```bash
# stop leftover Node processes first
pkill -u "$USER" -f "next build" || true

# pnpm-lock.yaml makes Next try `pnpm` (often EACCES on cPanel) — remove it
rm -f pnpm-lock.yaml

# ensure TypeScript packages exist (Next mid-build auto-install fails on shared hosts)
npm install typescript@5.7.3 @types/node@22 @types/react@19 @types/react-dom@19 --save

npm run build
# only if RAM is low and limits allow:
# npm run build:cpanel
```

Also remove any stray root `page.tsx` (should only live at `app/page.tsx`):

```bash
rm -f page.tsx
```

Then restart the app in Setup Node.js App.

## 403 Forbidden on the domain

Build succeeding does **not** mean the site is serving. A **403** usually means Apache is serving the folder (no index) because Passenger/Node is not attached or not running.

### Checklist (cPanel → Setup Node.js App)

1. Application status: **Running** (Stop then Start / Restart)
2. Application root: `/home/mappeds1/ms.mappedskills.com` (same folder as `package.json` + `server.cjs`)
3. Application URL: `ms.mappedskills.com` (or the subdomain you use)
4. Application startup file: **`server.cjs`** or **`app.js`** (both start Next — `app.js` only re-exports `server.cjs`)
5. Application mode: **Production**
6. Env vars:
   - `NODE_ENV=production`
   - Contentful keys if needed

### `.htaccess` must exist in the app/web root

```bash
cd ~/ms.mappedskills.com
ls -la .htaccess
cat .htaccess
```

You should see a **CloudLinux Passenger** block with `PassengerStartupFile` pointing at `server.cjs` or `app.js`.

If `.htaccess` is missing, open Setup Node.js App → save/restart the app (cPanel recreates it), or stop and recreate the Node app for that domain.

### Restart Passenger from SSH

```bash
cd ~/ms.mappedskills.com
mkdir -p tmp
touch tmp/restart.txt
```

### Diagnose

```bash
# Is Node listening?
ps aux | grep -E 'node|passenger' | grep -v grep

# Confirm production build exists
test -f .next/BUILD_ID && echo "build ok"

# Confirm startup files
ls -la server.cjs app.js
```

In cPanel, open the Node app **stderr / error log** after Restart — a crash on boot (wrong startup file, missing modules) often surfaces as HTTP 403 on the domain.
