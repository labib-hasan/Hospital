# Department Covers Implementation TODO

## Status: [ ] Not Started

### Step-by-step Plan:

1. ✅ Backend Model - Created `backend/models/DepartmentCover.js`
2. ✅ SQL Migration - Table created
3. ✅ Backend Controller - `backend/controllers/departmentCoverController.js`
4. ✅ Backend Routes - `backend/routes/departmentCoverRoutes.js`
5. ✅ Backend Server - Added to server.js
6. ✅ Frontend Admin - Updated `frontend/pages/admin/departments.js`: backend covers, upload form, removed localStorage
7. ✅ Frontend Dept Page - Updated `frontend/pages/departments/[department].js`: API fetch cover, removed localStorage
8. **[ ] Fix Other Pages** - Remove localStorage from specialities/*.js, diagnostics/*.js, departments/index.js
9. **[ ] Frontend API Proxy** - Create `frontend/pages/api/departments/cover.js` (proxy if CORS)
10. **[ ] Test** - Upload → Cloudinary/DB → page display + fallback

**Completed Steps:** None yet

**Next Action:** Start with SQL table → Model → Controller → Routes

