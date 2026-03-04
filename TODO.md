# Hospital CMS - Database Integration TODO

## ✅ STATUS: ALL CODE COMPLETE — BACKEND LIVE ON RAILWAY

---

## ✅ Completed

### Backend (Railway: https://hospital-production-c3b0.up.railway.app)
- [x] `backend/server.js` — All routes registered: /api/contact, /api/gallery, /api/md-message, /api/md-image, /api/news
- [x] `backend/config/db.js` — MySQL pool (Railway MYSQL_URL or local env vars)
- [x] `backend/models/Contact.js` — get/save (upsert), snake_case columns, camelCase transform
- [x] `backend/models/GalleryImage.js` — getAll/create/delete
- [x] `backend/models/MdMessage.js` — get/save (upsert)
- [x] `backend/models/MdImage.js` — get/save (upsert)
- [x] `backend/models/News.js` — getAll/getById/create/update/delete
- [x] `backend/controllers/contactController.js`
- [x] `backend/controllers/galleryController.js`
- [x] `backend/controllers/mdMessageController.js`
- [x] `backend/controllers/mdImageController.js`
- [x] `backend/controllers/newsController.js`
- [x] `backend/routes/contactRoutes.js`
- [x] `backend/routes/galleryRoutes.js`
- [x] `backend/routes/mdMessageRoutes.js`
- [x] `backend/routes/mdImageRoutes.js`
- [x] `backend/routes/newsRoutes.js`

### Database (Railway MySQL)
- [x] `database/schema.sql` — All CREATE TABLE statements added (contact, gallery_images, md_message, md_image, news)
- [x] Tables created in Railway MySQL with correct columns
- [x] Migration run via GET /api/migrate — AUTO_INCREMENT + missing columns fixed
- [x] Seed data inserted for contact, news, md_message

### Frontend API Routes (Next.js proxy → Express backend)
- [x] `frontend/pages/api/get-news.js` — proxies GET /api/news, transforms created_at→createdAt
- [x] `frontend/pages/api/save-news.js` — proxies POST/PUT /api/news
- [x] `frontend/pages/api/delete-news.js` — proxies DELETE /api/news/:id
- [x] `frontend/pages/api/get-contact.js` — proxies GET /api/contact, returns defaults if null
- [x] `frontend/pages/api/save-contact.js` — proxies POST /api/contact
- [x] `frontend/pages/api/get-gallery-images.js` — proxies GET /api/gallery, transforms snake_case→camelCase
- [x] `frontend/pages/api/upload-gallery-image.js` — Cloudinary upload + POST /api/gallery
- [x] `frontend/pages/api/delete-gallery-image.js` — proxies DELETE /api/gallery/:id
- [x] `frontend/pages/api/get-md-message.js` — proxies GET /api/md-message, returns defaults if null
- [x] `frontend/pages/api/save-md-message.js` — proxies POST /api/md-message
- [x] `frontend/pages/api/get-md-image.js` — proxies GET /api/md-image, returns {image: url} or {image: null}
- [x] `frontend/pages/api/upload-md-image.js` — Cloudinary upload + POST /api/md-image

### Frontend Pages (read from DB via API proxy)
- [x] `frontend/pages/contact.js` — fetches /api/get-contact
- [x] `frontend/pages/news.js` — fetches /api/get-news
- [x] `frontend/pages/our-clinic/photo-gallery.js` — fetches /api/get-gallery-images
- [x] `frontend/pages/our-clinic/md-message.js` — fetches /api/get-md-message + /api/get-md-image

### Admin Pages (write to DB via API proxy)
- [x] `frontend/pages/admin/contact.js` — saves via /api/save-contact
- [x] `frontend/pages/admin/news.js` — saves/deletes via /api/save-news, /api/delete-news
- [x] `frontend/pages/admin/gallery.js` — uploads via /api/upload-gallery-image, deletes via /api/delete-gallery-image
- [x] `frontend/pages/admin/md-message.js` — saves via /api/save-md-message, uploads via /api/upload-md-image

---

## 🔴 CRITICAL: Set Environment Variables in Vercel

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables** and add:

```
NEXT_PUBLIC_API_URL = https://hospital-production-c3b0.up.railway.app
CLOUDINARY_CLOUD_NAME = dd20ni4kl
CLOUDINARY_API_KEY = 614819924383186
CLOUDINARY_API_SECRET = 13F7yur_2VWTVWGifuHWejsZQdk
```

After adding, click **Redeploy** (or push a new commit) to apply.

> ⚠️ Without `NEXT_PUBLIC_API_URL`, all frontend API routes fall back to `http://localhost:5000` and will fail in production.

---

## 🔴 CRITICAL: Set Environment Variables in Railway

Go to **Railway Dashboard → Backend Service → Variables** and add:

```
FRONTEND_URL = https://your-vercel-app.vercel.app   ← replace with actual Vercel URL
PORT = 8080
```

> `MYSQL_URL` is auto-set by Railway MySQL plugin.

---

## ✅ Live Backend Endpoint Tests (Confirmed Working)

```
GET  https://hospital-production-c3b0.up.railway.app/health
     → {"success":true,"status":"healthy",...}

GET  https://hospital-production-c3b0.up.railway.app/api/contact
     → {"success":true,"contact":{"id":1,"phone":"+880222222222","emergencyPhone":"+8809610-818888",...}}

GET  https://hospital-production-c3b0.up.railway.app/api/news
     → {"success":true,"news":[{"id":1,"title":"Welcome to Medical Centre Chattagram",...}]}

GET  https://hospital-production-c3b0.up.railway.app/api/md-message
     → {"success":true,"message":{"id":1,"name":"Dr. John Smith","position":"Managing Director",...}}

GET  https://hospital-production-c3b0.up.railway.app/api/gallery
     → {"success":true,"images":[]}

GET  https://hospital-production-c3b0.up.railway.app/api/md-image
     → {"success":true,"image":null}
```

---

## Data Flow Summary

```
Admin Panel → /api/save-* (Next.js API route on Vercel)
           → Express Backend /api/* (Railway)
           → MySQL Database (Railway)

Frontend Page → /api/get-* (Next.js API route on Vercel)
             → Express Backend /api/* (Railway)
             → MySQL Database (Railway)
             → Rendered on page
```

---

## Environment Variables Reference

### Vercel (Frontend)
```
NEXT_PUBLIC_API_URL=https://hospital-production-c3b0.up.railway.app
CLOUDINARY_CLOUD_NAME=dd20ni4kl
CLOUDINARY_API_KEY=614819924383186
CLOUDINARY_API_SECRET=13F7yur_2VWTVWGifuHWejsZQdk
```

### Railway (Backend)
```
MYSQL_URL=mysql://user:pass@host:port/dbname   # auto-set by Railway MySQL plugin
FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
PORT=8080
