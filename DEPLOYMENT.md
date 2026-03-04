# RoofKAP Website Deployment Guide

## Current Status ✅

The website has been fully implemented and is ready for deployment!

### Completed:
- ✅ All 4 HTML pages created (Home, About, Services, Contact)
- ✅ Dark premium theme with responsive CSS
- ✅ Mobile navigation with hamburger menu
- ✅ Logo converted from HEIC and optimized
- ✅ Favicon created
- ✅ Contact form structure in place
- ✅ CNAME file configured for roofkaputah.com
- ✅ Git repository initialized with initial commit
- ✅ Local testing server available

### Pending:
- ⚠️ Hero image needed (luxury home with mountains)
- ⚠️ Formspree form configuration
- ⚠️ GitHub repository creation and push
- ⚠️ GitHub Pages deployment setup
- ⚠️ DNS configuration for custom domain

## Local Testing

The site is currently running at: **http://localhost:8000**

Open your browser and test:
1. Navigation between all pages
2. Mobile responsive design (resize browser)
3. Phone number links (should open phone dialer on mobile)
4. Contact form validation (try submitting empty fields)

## Step-by-Step Deployment

### Step 1: Add Hero Image (Optional but Recommended)

1. Download a high-quality image of a luxury home with mountains:
   - Source: [Unsplash](https://unsplash.com/s/photos/luxury-home-mountains)
   - Recommended size: 1920x1080 or larger
   - Look for nighttime or dusk shots for premium feel

2. Optimize the image:
   - Visit [TinyPNG](https://tinypng.com/)
   - Compress to < 500KB
   - Save as `images/hero/hero-home.jpg`

3. If no hero image is added, the site will show a gradient background (looks professional)

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com/) and sign in as `smootar`

2. Create a new repository:
   - Name: `roofkap`
   - Description: "RoofKAP - Utah's Premier Roofing Specialists"
   - Public repository
   - Do NOT initialize with README, .gitignore, or license

3. Copy the repository URL (should be: `https://github.com/smootar/roofkap.git`)

### Step 3: Push to GitHub

Run these commands in the terminal:

```bash
cd /Users/SmootAR/GitHub/roofkap

# Add remote origin
git remote add origin https://github.com/smootar/roofkap.git

# Push to GitHub
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/smootar/roofkap`

2. Click **Settings** (top right)

3. Scroll down to **Pages** section (left sidebar)

4. Under "Source":
   - Branch: `main`
   - Folder: `/ (root)`
   - Click **Save**

5. Wait 1-2 minutes for deployment

6. Your site will be live at: `https://smootar.github.io/roofkap/`

### Step 5: Configure Formspree

1. Go to [Formspree.io](https://formspree.io/) and sign up (free tier)

2. Create a new form:
   - Name: "RoofKAP Contact Form"
   - You'll get a form endpoint: `https://formspree.io/f/YOUR_FORM_ID`

3. Configure notification email (where submissions will be sent)

4. Edit `contact.html` line 109:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   Replace `YOUR_FORM_ID` with your actual form ID

5. Commit and push the change:
   ```bash
   git add contact.html
   git commit -m "Configure Formspree contact form"
   git push
   ```

### Step 6: Configure Custom Domain DNS

**At your domain registrar** (where you purchased roofkaputah.com):

1. Log into your domain registrar account

2. Find DNS settings for roofkaputah.com

3. Add these **A records**:
   ```
   Type: A
   Host: @
   Value: 185.199.108.153
   TTL: 3600 (or automatic)

   Type: A
   Host: @
   Value: 185.199.109.153
   TTL: 3600

   Type: A
   Host: @
   Value: 185.199.110.153
   TTL: 3600

   Type: A
   Host: @
   Value: 185.199.111.153
   TTL: 3600
   ```

4. Add a **CNAME record** for www:
   ```
   Type: CNAME
   Host: www
   Value: smootar.github.io.
   TTL: 3600
   ```

5. Save DNS changes

6. Wait 15-60 minutes for DNS propagation (can take up to 24 hours)

### Step 7: Enable Custom Domain on GitHub Pages

1. Go back to GitHub repository Settings > Pages

2. Under "Custom domain":
   - Enter: `roofkaputah.com`
   - Click **Save**

3. GitHub will verify DNS configuration (may take a few minutes)

4. Once verified, check "Enforce HTTPS"

5. Wait up to 24 hours for SSL certificate to be provisioned

### Step 8: Verify Deployment

1. Check `https://roofkaputah.com` loads correctly

2. Check `https://www.roofkaputah.com` redirects to non-www

3. Test all pages:
   - Home: https://roofkaputah.com/
   - About: https://roofkaputah.com/about.html
   - Services: https://roofkaputah.com/services.html
   - Contact: https://roofkaputah.com/contact.html

4. Test on mobile devices (iOS Safari, Chrome Android)

5. Test contact form submission

6. Test phone number links on mobile

## Troubleshooting

### DNS Not Resolving

Check DNS propagation:
```bash
dig roofkaputah.com +short
```

Should return the GitHub Pages IP addresses. If not, wait longer or check DNS configuration.

### HTTPS Not Working

- SSL certificate can take up to 24 hours
- Site will work on HTTP initially
- Check "Enforce HTTPS" is enabled in GitHub Pages settings

### Form Not Submitting

- Verify Formspree form ID is correct in contact.html
- Check Formspree dashboard for submissions
- Test with actual email (not using browser autofill)

### Images Not Loading

- Check image file paths are correct (case-sensitive)
- Verify images are committed and pushed to GitHub
- Check browser console for 404 errors

## Quick Commands Reference

```bash
# Check current directory
pwd

# View git status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# View recent commits
git log --oneline -5

# Start local server
python3 -m http.server 8000

# Stop local server
# Press Ctrl+C or find process: lsof -ti:8000 | xargs kill
```

## Post-Deployment Tasks

After the site is live:

1. **Set up email forwarding** for tayton@roofkaputah.com
2. **Add Google Analytics** for traffic tracking
3. **Submit to Google Search Console**
4. **Create Google My Business** listing
5. **Set up social media** accounts (Facebook, Instagram)
6. **Add real project photos** to replace placeholders
7. **Update content** with actual company details
8. **Get customer testimonials** (with permission)

## Updating the Website

To make changes after deployment:

1. Edit files locally
2. Test locally: `python3 -m http.server 8000`
3. Commit changes: `git add . && git commit -m "Description"`
4. Push to GitHub: `git push`
5. Changes will automatically deploy in 1-2 minutes

## Support

For issues or questions:
- GitHub Pages docs: https://docs.github.com/en/pages
- Formspree docs: https://help.formspree.io/
- Custom domain setup: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## Website URLs

- **Production**: https://roofkaputah.com
- **GitHub Pages**: https://smootar.github.io/roofkap/
- **Repository**: https://github.com/smootar/roofkap
- **Local**: http://localhost:8000
