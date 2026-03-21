[README.md](https://github.com/user-attachments/files/26162372/README.md)
# Teneeka Barnett — Personal Site

## What This Is
Teneeka's personal/professional site with an AI-powered chat feature (powered by Claude).

## Deployment to Vercel (Recommended — Free)

### Step 1: Push to GitHub
1. Create a new GitHub repo (e.g., `teneeka-site`)
2. Push this entire folder to it:
   ```bash
   cd teneeka-site
   git init
   git add .
   git commit -m "Initial site"
   git remote add origin https://github.com/YOUR-USERNAME/teneeka-site.git
   git push -u origin main
   ```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Import the `teneeka-site` repo
4. Vercel will auto-detect it as a Vite project
5. Before deploying, add the environment variable:
   - Go to "Environment Variables"
   - Key: `ANTHROPIC_API_KEY`
   - Value: your API key from https://console.anthropic.com
6. Click "Deploy"
7. Done — site is live at `your-project.vercel.app`

### Step 3: Custom Domain (Optional)
1. In Vercel dashboard → your project → Settings → Domains
2. Add your domain (e.g., teneekabarnett.com)
3. Vercel will give you DNS records to add in GoDaddy
4. In GoDaddy: DNS → add the records Vercel gives you
5. Wait 5–10 minutes for propagation

## Getting the Anthropic API Key
1. Go to https://console.anthropic.com
2. Create an account
3. Go to API Keys → Create Key
4. Add $5 credit (Settings → Billing)
5. Copy the key into Vercel's environment variables

## Local Development
```bash
npm install
npm run dev
```
Note: For local dev, create a `.env` file with your API key (copy from `.env.example`).

## File Structure
```
teneeka-site/
├── api/
│   └── chat.js          ← Serverless function (keeps API key secret)
├── src/
│   ├── App.jsx          ← The site
│   └── main.jsx         ← Entry point
├── index.html           ← HTML shell
├── package.json
├── vercel.json          ← Routing config
├── vite.config.js
└── .env.example         ← Environment variable template
```

## Cost
- Vercel hosting: Free
- Domain (if using custom): ~$10-15/year
- Anthropic API for chat: ~$1-5/month at normal usage
