# Teneeka Barnett — Personal Site

## Deployment to Vercel

### Step 1: Push to GitHub
1. Create a new GitHub repo (e.g., `teneeka-site`)
2. Push this folder to it

### Step 2: Deploy on Vercel
1. Go to vercel.com → sign in with GitHub
2. Import the repo
3. Add environment variable: `ANTHROPIC_API_KEY` (get from console.anthropic.com, add $5 credit)
4. Click Deploy → live in 60 seconds

### Step 3: Custom Domain (Optional)
1. In Vercel → Settings → Domains → add your domain
2. Add DNS records Vercel gives you into GoDaddy
3. Wait 5-10 min

## Password
Site is password-protected. Default: `barnett2026`
To change: search for `SITE_PASSWORD` in `src/App.jsx`

## Cost
- Vercel hosting: Free
- Anthropic API: ~$1-5/month
- Custom domain: ~$10-15/year
