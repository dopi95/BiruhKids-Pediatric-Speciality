# 🌐 Domain Setup Guide for BiruhKids

## 📋 Current Status
- **Domain**: biruhkidsclinic.com
- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Render
- **Status**: Ready for domain connection

## 🔧 Steps to Connect Domain to Vercel

### 1. Add Domain to Vercel
1. Go to your Vercel dashboard
2. Select your BiruhKids project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `biruhkidsclinic.com`
6. Also add: `www.biruhkidsclinic.com`

### 2. Configure DNS Records
In your domain registrar (where you bought biruhkidsclinic.com):

**A Record:**
```
Type: A
Name: @
Value: 76.76.19.61
TTL: 3600
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 3. Wait for Propagation
- DNS changes can take 24-48 hours
- Check status in Vercel dashboard

## 🔍 Google Search Console Setup

### 1. Add Property
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **Add Property**
3. Choose **URL prefix**
4. Enter: `https://biruhkidsclinic.com`

### 2. Verify Ownership
**Method 1: HTML File Upload**
1. Download verification file from Google
2. Upload to Vercel public folder
3. Deploy and verify

**Method 2: HTML Meta Tag**
1. Copy meta tag from Google
2. Add to your index.html `<head>` section:
```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

### 3. Submit Sitemap
1. After verification, go to **Sitemaps**
2. Submit: `https://biruhkidsclinic.com/sitemap.xml`

## 📊 Google Analytics Setup

### 1. Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com)
2. Create new property for `biruhkidsclinic.com`
3. Get tracking ID (G-XXXXXXXXXX)

### 2. Update Code
Replace in `src/utils/analytics.js`:
```javascript
export const GA_TRACKING_ID = 'G-YOUR-ACTUAL-ID';
```

## 🏥 Google My Business

### 1. Create/Claim Listing
1. Go to [Google My Business](https://business.google.com)
2. Search for "BiruhKids Pediatric Specialty Clinic"
3. If exists, claim it. If not, create new listing

### 2. Business Information
```
Business Name: BiruhKids Pediatric Specialty Clinic
Category: Pediatrician, Medical Clinic
Address: Torhayloch 100 meters from augusta bridge, Addis Ababa, Ethiopia
Phone: +251963555552
Website: https://biruhkidsclinic.com
Hours: [Your clinic hours]
```

## 🔐 SSL Certificate
Vercel automatically provides SSL certificates for custom domains. Once DNS propagates, your site will be available at:
- `https://biruhkidsclinic.com`
- `https://www.biruhkidsclinic.com`

## ✅ Verification Checklist

### Domain Connection
- [ ] Domain added to Vercel
- [ ] DNS records configured
- [ ] SSL certificate active
- [ ] Site accessible at biruhkidsclinic.com

### Google Services
- [ ] Google Search Console verified
- [ ] Sitemap submitted
- [ ] Google Analytics configured
- [ ] Google My Business claimed/created

### SEO Verification
- [ ] Meta tags showing correct domain
- [ ] Structured data using correct URLs
- [ ] Social media links working
- [ ] All internal links updated

## 🚀 Post-Launch Tasks

### 1. Monitor Performance
- Check Google Search Console for indexing
- Monitor Google Analytics for traffic
- Verify all pages load correctly

### 2. Social Media Updates
Update all social media profiles with new domain:
- Facebook: Update website URL
- Instagram: Update bio link
- YouTube: Update channel description
- TikTok: Update bio link

### 3. Email Signatures
Update email signatures to use new domain

## 📞 Support
If you encounter issues:
1. Check Vercel deployment logs
2. Verify DNS propagation using tools like `dig` or online DNS checkers
3. Contact domain registrar support if DNS issues persist

## 🎯 Expected Timeline
- **Domain connection**: 1-2 hours after DNS setup
- **Google verification**: Immediate after setup
- **Search indexing**: 1-7 days
- **Full SEO impact**: 2-4 weeks

Your BiruhKids website is now ready to dominate pediatric searches in Ethiopia! 🏆