# PocketBase Seeding Guide

This document explains how to populate your PocketBase database with the initial content from your static website.

## Quick Start

### 1. Start PocketBase
```bash
./pocketbase serve
```

### 2. Access Admin UI
Open `http://localhost:8090/_/` in your browser

### 3. Run Seeding Script

#### Option A: Browser Console (Easiest)
1. Open PocketBase Admin UI
2. Press F12 to open developer tools
3. Go to Console tab
4. Copy and paste the contents of `pocketbase-seed.js`
5. Run `seedDatabase()` in console

#### Option B: Node.js Script
1. Install dependencies if needed
2. Update credentials in the script
3. Run: `node pocketbase-seed.js`

## What Gets Seeded

### Services Collection
- **World Building** - $500 base price
- **Custom Plugins** - $750 base price  
- **Asset Design** - $400 base price

### Projects Collection
- The Crystal Kingdom (World Build)
- Dynamic Quest Engine (Plugin Development)
- Celestial Armory Pack (3D Modeling)
- Neo-Tokyo Lobby (World Build)

### Media Collection
- Placeholder records for all project images
- Hero banner image record

### Testimonials Collection
- 3 sample 5-star reviews
- All marked as featured and approved

## Manual Steps Required

### 1. Upload Image Files
After running the script, you need to upload the actual images:

1. Go to Media collection in Admin UI
2. For each media record, click "Choose file" and upload:
   - `crystal-kingdom-main.jpg`
   - `dynamic-quest-engine-preview.jpg`
   - `celestial-armory-pack.jpg`
   - `neo-tokyo-lobby.jpg`
   - `hero-banner.jpg`

### 2. Link Media to Projects
1. Go to Projects collection
2. Edit each project
3. In the "images" relation field, select the corresponding media files
4. Save each project

### 3. Create Admin User
1. Go to Users collection
2. Create your admin account
3. Set role to "admin"
4. This will be your main admin login

## Image URLs from Your Code

Use these Google Photos URLs for your initial uploads:

**Hero Section:**
```
https://lh3.googleusercontent.com/aida-public/AB6AXuCmoPxMwVQF5cN_FIQU6-gtLt3JKlLzqk_pEPkjpx3T29F29ejQjaosKRkoZQd7GxeQNTJoOxGNIMmi-uGsMzemrfKu1yt5jjv_1M5v5UKQJf-rshOJWv7BKWJU6LXuVraAhkxZ1HZwYQPvNFIM8chXQH4vURkd1Hnlxym8PPV0X3Y0HqFe9lJL7Zwy2QaV6sdkJQIyFKfMwqnRaNTGehDynvKKITSWYedn8lxWBW-u1dSVG7VWsadnjXcvcxROlfjVWcEFCXk3a_4
```

**Project Images:**
1. Crystal Kingdom: `https://lh3.googleusercontent.com/aida-public/AB6AXuDNst5x9Bjw7bd4OOyxINHQl1ZWEvgGM0uqg3_NezsZdlw8vGhDE6t9GHmC9N732a4Bi1ZTxQkf61WCNQ32cbaKz2TBaYJddXftBkqyPVzIl-W3xXJiYXUgqAjW8FRHN3n78U9HUq6F80omekkZ9XQGPmL3DWGU4rbdUmljMOlq2LbA78dmuDNdmCptdk2DEr31EXV4uLFkE6Mx3816_DCqfm5hsLVqU4_HAKP3W3FyMhFaBJt7qaWPP6DWpjGopkKk437aX1AR5cM`

2. Dynamic Quest Engine: `https://lh3.googleusercontent.com/aida-public/AB6AXuAdsavqW_fJ3R2u8XaVJLB9-hnavWmCZecPLBk4SFGhUPS5je38e5_vtFbmUzqQFTR8LVeRvPoBXiCszC66sBz_t1AYHLVZ5FYUoLQsFVqlvQYXVkX3dImTOUPhuHrB4hnannTgen9ZVmAql0ZtAqChdgFWenWn7jf78Q3pTEuQTgk7D5BVGM-TU7uBwC2gAgsiWuc0D97Br-Lz0e3_UydFxaWHxvvB_FAakp8ktCsZBe_IGO74IErSNd-SyiHKd8NdfvxMA3tD3QI`

3. Celestial Armory Pack: `https://lh3.googleusercontent.com/aida-public/AB6AXuBUkz4pOIlE4aa-LnBL0czNfAhHxSTrgf4HZBN-F16PHEfNbxZ0MdYW23Y4l8GIUFtz4LKxBVw2n6l7uyTROwj3wV76sCy2QodMsxNIMlDVmugB16k_63RpywpZZWX08gFhiRL7sy60OgHZ3l_ZJXJNxxF_8tPtRr2FiiHqBrfKhrrdnwm-W_NCRm4b63ACsEOfU6-aU6l_Z2VZi0etn-8dY4BhxlLqeNrN98UNnfq1BtQLGnRAU24_DMp0Vp6JzvFy6jKYjZwHWeY`

4. Neo-Tokyo Lobby: `https://lh3.googleusercontent.com/aida-public/AB6AXuBuW6KC7uK6qzNhr-DgV6hXmBjcdogtthtmxL50IqzI3JBWtpII78bNxiAf2EaVrIgDsGCPIdg90vYLhpd4sl2jBcoVyCwMFDsYJL_4H3laaMnqmXTTq-N22e6tS_iYRVBjazrzwNat6D1rSaq_tLt7j19ZhIiQoGgC2MJRflKSYNDfYm5fD_-iC5MPn3Y4yFgZtQ0X6Rl55jpDUJAenXQ55gL81Sv7KFGnVv2ZsqSkpphSIvBG9KCNZPl7XJbQbKaVS8RsKJXMDI0`

## Verification

After seeding, verify by:
1. Checking Services collection has 3 active services
2. Checking Projects collection has 4 featured projects
3. Checking Media collection has 5 records (files uploaded separately)
4. Checking Testimonials collection has 3 approved testimonials
5. Testing public API endpoints in browser

## Troubleshooting

- **Permission errors**: Make sure you're logged in as admin
- **Missing relations**: Link media to projects manually after upload
- **API errors**: Check PocketBase server is running on port 8090
- **File uploads**: Use the Admin UI file upload interface

## Next Steps

1. Create your admin user account
2. Set up OAuth providers in PocketBase settings
3. Configure email settings if needed
4. Test the frontend API integration
5. Update your SvelteKit components to use PocketBase data
