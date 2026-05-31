# Sumit Sarkar — AI Voice Twin
### Deployment Guide (No coding required)

---

## What this is
A voice-enabled interview bot that answers questions exactly as Sumit Sarkar would.
Anyone can open the link and start asking questions — no login, no setup, no API key needed by the user.

---

## Step 1 — Get your OpenAI API key
1. Go to https://platform.openai.com/api-keys
2. Click **"Create new secret key"**
3. Copy and save it somewhere safe (you won't see it again)
4. Make sure your account has billing set up at https://platform.openai.com/settings/organization/billing

---

## Step 2 — Put the project on GitHub
1. Go to https://github.com and sign in (create a free account if needed)
2. Click the **"+"** icon → **"New repository"**
3. Name it `sumit-voice-twin`, set it to **Public**, click **"Create repository"**
4. Click **"uploading an existing file"**
5. Upload these files maintaining the folder structure:
   ```
   api/chat.js
   public/index.html
   package.json
   vercel.json
   ```
6. Click **"Commit changes"**

---

## Step 3 — Deploy on Vercel
1. Go to https://vercel.com and sign in with your GitHub account
2. Click **"Add New Project"**
3. Find and select your `sumit-voice-twin` repository → click **"Import"**
4. Under **"Root Directory"**, leave it as `.` (default)
5. Click **"Environment Variables"** and add:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** paste your key from Step 1
6. Click **"Deploy"**
7. Wait ~30 seconds — Vercel gives you a live URL like `sumit-voice-twin.vercel.app`

---

## Step 4 — Test it
Open your Vercel URL. You should see the Voice Twin immediately — no login, no key entry.
Click any question in the sidebar or type your own.

Toggle **🔈 voice** in the top right to hear Sumit's responses spoken aloud.

---

## The 5 interview questions — quick access
| Question | Sidebar button |
|---|---|
| What should we know about your life story? | 📖 Life story |
| What's your #1 superpower? | ⚡ #1 Superpower |
| What are the top 3 areas you'd like to grow in? | 🌱 Top 3 growth areas |
| What misconception do coworkers have about you? | 🤔 Coworker misconceptions |
| How do you push your boundaries and limits? | 🚀 Pushing boundaries |

---

## How the API key stays secret
```
User's browser  →  /api/chat (Vercel serverless function)  →  OpenAI API
```
The key lives only in Vercel's secure environment variables.
It is never visible in the browser, never in the HTML, never exposed to users.

---

## Troubleshooting
| Problem | Fix |
|---|---|
| "exceeded quota" error | Add billing at platform.openai.com/settings/organization/billing |
| Page not loading | Check Vercel dashboard → Deployments for error logs |
| Voice not working | Click the 🔈 button; voice requires browser permission |
| Blank page | Make sure all 4 files were uploaded with correct folder structure |
