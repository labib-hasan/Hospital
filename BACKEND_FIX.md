# Fix Hostinger Backend - Database Connection

## Problem
Your backend shows "Page Not Found" - the Node.js server is not connecting to the database.

## Solution - Add Environment Variables in Hostinger

### Step 1: Add Variables in Hostinger Panel

1. Go to https://panel.hostinger.com
2. Go to Websites > Manage > Node.js
3. Scroll to Environment Variables section
4. Add each variable below:

| Variable | Value |
|----------|-------|
| PORT | 8080 |
| DB_HOST | localhost |
| DB_USER | u626975538_hospital |
| DB_PASS | Lh@654321 |
| DB_NAME | u626975538_hospital |
| FRONTEND_URL | https://lavender-monkey-429786.hostingersite.com |

5. Click Save or Add

### Step 2: Restart the App

1. In Node.js settings, find Restart or Rebuild button
2. Click it to restart the Node.js server with new variables

### Step 3: Test Backend

After restart (wait 1-2 minutes), test:
- https://lavender-monkey-429786.hostingersite.com/
- https://lavender-monkey-429786.hostingersite.com/health
- https://lavender-monkey-429786.hostingersite.com/api/doctors

If you see JSON data, the backend is working!

---

## Important: Use "localhost" Not "127.0.0.1"

For Hostinger shared hosting, the database hostname MUST be "localhost", not "127.0.0.1".

This is the #1 reason for connection failures.

---

## Common Issues

### Still Not Working?

Check the Node.js logs:
1. In Hostinger Panel > Node.js
2. Look for Logs or Console section
3. Check for error messages

### Database Not Connected

If you see "Access denied" or "Can't connect":
- Double-check DB_PASS is exactly: Lh@654321
- Make sure DB_USER and DB_NAME are both: u626975538_hospital
