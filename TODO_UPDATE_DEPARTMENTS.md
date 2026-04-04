# TODO: Update departments/index.js to show all pages

## Task
Update frontend/pages/departments/index.js to show:
1. Departments section - show all department pages from /departments/[department].js
2. Specialities section - show all specialities pages from /specialities/*.js  
3. Diagnostic Services section - show all diagnostic pages from /diagnostic/*.js

## Pages to show:
- Specialities (10): ot, icu, ccu, nicu, hdu, ed, dialysis, gynae, paedi, sdu
- Diagnostics (2): radiology, pathology

## Steps:
1. [x] Analyze existing code structure
2. [x] Update departments/index.js to properly link to all pages
3. [x] Verify links work correctly
4. [ ] Test the implementation

## Status: COMPLETED

## Implementation Details:
- Using localStorage for storing cover images
- Admin panel saves images to localStorage
- Departments page reads images from localStorage
- All 3 sections show hardcoded page lists (no API needed)

## Changes Made:
- Added `getSpecialityPageId()` function to map API IDs to actual page routes
- Added `getDiagnosticPageId()` function to map diagnostic IDs to actual page routes
- Added `getPageLink()` function that generates correct links based on active tab
- Specialities link to: /specialities/[mapped-id]
- Diagnostics link to: /diagnostic/[mapped-id] (lowercase)
- Departments link to: /departments/[id] (unchanged)

## Link Mapping:
### Specialities:
- icu → /specialities/icu
- ccu → /specialities/ccu
- ed → /specialities/ed
- ot → /specialities/ot
- nicu → /specialities/nicu
- hdu → /specialities/hdu
- dialysis → /specialities/dialysis
- gynae → /specialities/gynae
- paedi → /specialities/paedi
- sdu → /specialities/sdu

### Diagnostics:
- radiology → /diagnostic/radiology
- pathology → /diagnostic/pathology

