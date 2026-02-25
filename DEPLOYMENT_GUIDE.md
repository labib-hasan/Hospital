# 🚀 Hospital Management System - Deployment Guide

## Architecture Overview
- **Frontend**: Next.js → Vercel
- **Backend**: Express.js → Railway  
- **Database**: MySQL → Railway
- **Image Storage**: Cloudinary

---

## Step 1: Push Code to GitHub

Create two separate repositories on GitHub:
1. `hospital-frontend` - Contains the `frontend/` folder
2. `hospital-backend` - Contains the `backend/` and `database/` folders

Or use a monorepo structure with separate folders.

---

## Step 2: Deploy Database on Railway

### 2.1 Create Railway Project
1. Go to [Railway.app](https://railway.app) and sign up
2. Click "New Project" → "Empty Project"

### 2.2 Add MySQL Database
1. Click "Add New" → "Database" → "MySQL"
2. Wait for deployment to complete
3. Click on the MySQL service → Go to "Variables" tab
4. Copy these values:
   - `MYSQLHOST`
   - `MYSQLPORT` 
   - `MYSQLDATABASE`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`

### 2.3 Import Database Schema
1. In Railway MySQL service → Click "Database" tab
2. Click "Connect" → "MySQL CLI"
3. Run the following commands:

```
bash
# Connect to database
mysql -h <YOUR_MYSQL_HOST> -u <YOUR_MYSQL_USER> -p <YOUR_MYSQL_DATABASE>

# Run schema (paste contents of database/schema.sql)
SOURCE /path/to/schema.sql;

# Optional: Run seed data
SOURCE /path/to/seed.sql;
```

---

## Step 3: Deploy Backend on Railway

### 3.1 Create Backend Service
1. In Railway dashboard → "Add New" → "GitHub Repo"
2. Select your backend repository
3. If using monorepo, set "Root Directory" to `backend`

### 3.2 Configure Environment Variables
Add these variables in Railway:

```
PORT=5000
DB_HOST=<from MySQL service>
DB_USER=<from MySQL service>
DB_PASS=<from MySQL password>
DB_NAME=<from MySQL database>
FRONTEND_URL=https://your-frontend.vercel.app

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT Secret (generate a secure random string)
JWT_SECRET=your_jwt_secret_min_32_chars_long!
```

### 3.3 Get Backend URL
1. After deployment, go to the backend service
2. Click on the domain URL (e.g., `https://hospital-backend.up.railway.app`)
3. Copy this URL for use in frontend configuration

---

## Step 4: Deploy Frontend on Vercel

### 4.1 Create Vercel Project
1. Go to [Vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your frontend GitHub repository

### 4.2 Configure Settings
- **Framework Preset**: Next.js
- **Root Directory**: `frontend` (if monorepo)

### 4.3 Add Environment Variables
Add in Vercel:

```
NEXT_PUBLIC_API_URL=https://your-backend-production-url.railway.app
```

### 4.4 Deploy
Click "Deploy" and wait for the build to complete.

---

## Step 5: Verify & Test

After deployment:

1. **Test Backend API**:
   
```
   https://your-backend.railway.app/api/doctors
   
```

2. **Test Frontend**:
   
```
   https://your-frontend.vercel.app
   
```

3. **Check for Errors**:
   - Open browser DevTools → Network tab
   - Check for failed API calls
   - Verify API URL is correct in network requests

---

## Configuration Files Modified

### Files Created:
- `backend/.env.example` - Example environment variables template
- `backend/railway.json` - Railway deployment configuration

### Files Modified:
- `backend/server.js` - Updated CORS to allow Vercel frontend
- `frontend/next.config.js` - Removed local API rewrites

---

## Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Ensure `FRONTEND_URL` is set correctly in Railway backend
   - Check that CORS origin matches your Vercel URL

2. **Database Connection Failed**:
   - Verify all DB credentials in Railway variables
   - Ensure MySQL service is running

3. **API Not Working**:
   - Check Railway logs for errors
   - Verify `NEXT_PUBLIC_API_URL` is set in Vercel

4. **Images Not Loading**:
   - Verify Cloudinary credentials are correct
   - Check Cloudinary bucket permissions

---

## Environment Variables Summary

### Backend (.env):
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=hospital
FRONTEND_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
JWT_SECRET=xxx
```

### Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## Production URLs Format

After deployment:
- **Backend**: `https://hospital-backend.railway.app`
- **Frontend**: `https://hospital-frontend.vercel.app`
- **API**: `https://hospital-backend.railway.app/api/...`

---

## Support

If you encounter issues:
1. Check Railway/Vercel dashboard logs
2. Verify all environment variables are set
3. Ensure database schema is imported
