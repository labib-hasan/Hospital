# Hostinger Deployment Guide - Frontend Only

## Configuration Complete

Your frontend is already configured to connect to your Hostinger backend:
- **Backend URL**: https://lavender-monkey-429786.hostingersite.com
- **API Endpoint**: https://lavender-monkey-429786.hostingersite.com/api/...

### Files Already Updated:
1. frontend/utils/api.js - Uses Hostinger URL
2. frontend/pages/api/get-hero.js - Uses Hostinger URL
3. frontend/pages/api/save-hero.js - Uses Hostinger URL
4. frontend/next.config.js - Configured for static export

---

## Deploy to Hostinger - Step by Step

### Step 1: Build Frontend on Your Computer

Open Command Prompt (CMD) and run:
```
cd c:\xampp\htdocs\hospital\frontend
npm run build
```

After this completes, a folder called "out" will be created in frontend/out

### Step 2: Upload to Hostinger

1. Go to Hostinger Panel: https://panel.hostinger.com
2. Click Files > File Manager
3. Open public_html folder
4. Delete all existing files (keep the folder)
5. Click Upload button
6. Select ALL files from your frontend/out folder
7. Upload everything to public_html

### Step 3: Done!

Visit: https://lavender-monkey-429786.hostingersite.com

Your hospital website should now be live!

---

## Troubleshooting

### If Build Fails:
Run these commands one by one:
```
cd c:\xampp\htdocs\hospital\frontend
rmdir /s /q node_modules
rmdir /s /q .next
npm install
npm run build
```

### If Pages Don't Load:
- Clear browser cache
- Wait 2-3 minutes for files to propagate
- Check that ALL files from out folder were uploaded

### Test Your Backend:
Open in browser:
```
https://lavender-monkey-429786.hostingersite.com/api/doctors
```
Should return JSON data if backend is working.
