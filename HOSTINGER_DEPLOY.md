# Hostinger Deployment Guide - Frontend & Backend

## Configuration Complete

Your frontend and backend are now configured to work together on Hostinger:

- **Frontend URL**: https://darkgray-flamingo-203110.hostingersite.com
- **Backend URL**: https://lavender-monkey-429786.hostingersite.com
- **API Endpoint**: https://lavender-monkey-429786.hostingersite.com/api/...

### Files Updated:
1. **frontend/utils/api.js** - Changed to use Hostinger backend URL
2. **All frontend API files** - Updated to connect to Hostinger backend
3. **backend/server.js** - Updated CORS to allow both Hostinger domains

---

## Backend Deployment (Hostinger Node.js)

### Step 1: Upload Backend to Hostinger

1. Go to Hostinger Panel: https://panel.hostinger.com
2. Navigate to **Websites > your domain > Node.js**
3. Click **Upload Files** or use FTP
4. Upload the following files/folders from `backend/`:
   - All folders (config, controllers, middleware, models, public, routes)
   - package.json
   - package-lock.json
   - server.js

### Step 2: Configure Environment Variables in Hostinger

In Hostinger Node.js settings, add these environment variables:
```
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASS=your_mysql_password
DB_NAME=your_database_name
PORT=8080
NODE_ENV=production
```

### Step 3: Install Dependencies

In Hostinger Node.js panel, run:
```
npm install
```

### Step 4: Start Backend

In Hostinger Node.js panel, set:
- Entry point: `server.js`
- Run command: `npm start`

---

## Frontend Deployment (Hostinger Static Hosting)

### Step 1: Build Frontend on Your Computer

Open Command Prompt (CMD) and run:
```
cd c:\xampp\htdocs\hospital\frontend
npm run build
```

After this completes, a folder called "out" will be created in `frontend/out`

### Step 2: Upload to Hostinger

1. Go to Hostinger Panel: https://panel.hostinger.com
2. Click **Files > File Manager**
3. Open the public_html folder for your frontend domain
4. Delete all existing files (keep the folder)
5. Click Upload button
6. Select ALL files from your `frontend/out` folder
7. Upload everything to public_html

### Step 3: Done!

Visit: https://darkgray-flamingo-203110.hostingersite.com

---

## Troubleshooting

### If Backend Fails:
- Check environment variables are set correctly in Hostinger
- Verify MySQL database credentials
- Check Node.js error logs in Hostinger panel

### If Frontend API Calls Fail:
- Test backend API: https://lavender-monkey-429786.hostingersite.com/api/contact
- Check browser console for CORS errors
- Ensure backend CORS includes your frontend domain

### Test Your Backend:
Open in browser:
```
https://lavender-monkey-429786.hostingersite.com/api/contact
```
Should return JSON data if backend is working.

### Run Database Migration:
```
https://lavender-monkey-429786.hostingersite.com/api/migrate
```

