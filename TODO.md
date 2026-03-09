# TODO: Navbar Premium Animation Redesign

## Task: Redesign responsive menu bar with latest premium animation without changing the menu icon. Customise only navbar.js

### Information Gathered:
- Current Navbar.js has:
  - Top bar with hotline and language switch (lg screens)
  - Main navigation with logo and desktop menu
  - Custom mobile menu icon (circular scan SVG design - must keep unchanged)
  - Mobile drawer with gradient header and submenu support
  - Language switching (EN/BN)

### Plan:

**1. Navbar Entrance Animation:**
- Add smooth slide-down animation on page load
- Staggered fade-in for menu items

**2. Desktop Menu Enhancements:**
- Add hover scale and glow effects on NavButton
- Add animated underline on hover for menu items
- Improve submenu with smooth fade + slide animation
- Add backdrop blur to submenu dropdowns

**3. Mobile Menu Premium Animations:**
- Add spring/bounce effect to drawer open/close
- Enhance backdrop with blur and fade animation
- Add staggered slide-in animation for menu items
- Smooth accordion animation for submenus with rotation
- Add ripple effect on menu item tap

**4. Scroll Effects:**
- Add navbar shadow enhancement on scroll
- Add subtle background color transition on scroll

**5. Language Button Animations:**
- Add smooth toggle animation
- Add pulse effect on active language

### Dependent Files to be edited:
- `frontend/components/Navbar.js` - Main file to customize

### Followup Steps:
- Test responsive behavior on different screen sizes
- Verify menu icon remains unchanged
- Test all animations work smoothly

