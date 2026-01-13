# Development Setup Guide

This guide will walk you through setting up your development environment for The Illustrated Primer project. Don't worry if you've never coded before - we'll go through everything step by step!

---

## What We're Building With (Final Tech Stack)

### Frontend
- **Next.js 14** - A React framework that handles both frontend and backend
- **TypeScript** - JavaScript with type safety (we'll learn together)
- **Tailwind CSS** - Utility-first CSS for beautiful designs
- **Vercel** - Hosting platform (free tier)

### AI Services
- **Anthropic Claude** - For story generation and tutoring (excellent at creative writing)
- **Google Gemini** - For additional AI features and potentially image generation
- **Imagen (Google)** or **Stable Diffusion** - For illustrations

### Backend & Database
- **Next.js API Routes** - Backend built into Next.js
- **Supabase** - Database and authentication (PostgreSQL under the hood)

---

## Part 1: Install Required Software

### 1.1 Install Node.js (JavaScript Runtime)

**What is Node.js?** It's the engine that runs JavaScript code on your computer (not just in a browser).

**Steps:**
1. Go to https://nodejs.org/
2. Download the **LTS version** (Long Term Support - currently 20.x)
3. Run the installer
4. Click "Next" through all the steps (default options are fine)
5. **Verify installation:**
   - Open Terminal (Mac) or Command Prompt (Windows)
   - Type: `node --version`
   - You should see something like: `v20.11.0`
   - Type: `npm --version`
   - You should see something like: `10.2.4`

**What is npm?** It's the "Node Package Manager" - think of it as an app store for code libraries.

---

### 1.2 Install Git (Already Done!)

Since you're working with this repository, you already have Git installed! ✓

To verify, open Terminal and type:
```bash
git --version
```

You should see something like: `git version 2.x.x`

---

### 1.3 Install Visual Studio Code (Code Editor)

**What is VS Code?** It's a text editor specifically designed for writing code, with helpful features like syntax highlighting and autocomplete.

**Steps:**
1. Go to https://code.visualstudio.com/
2. Download for your operating system
3. Install it (default options are fine)
4. Open VS Code

**Recommended Extensions (we'll install these later):**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- GitLens
- Error Lens

---

## Part 2: Set Up Accounts

You'll need accounts for various services. All have free tiers that will work great for this project!

### 2.1 GitHub Account (Already Done!)

You already have this since you have a repository! ✓

---

### 2.2 Vercel Account (Hosting)

**What is Vercel?** It's where your app will live on the internet so your kids can access it from any device.

**Steps:**
1. Go to https://vercel.com/
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account
5. Free tier includes:
   - Unlimited deployments
   - 100 GB bandwidth per month
   - Automatic HTTPS
   - Preview deployments for every commit

**Cost:** Free for your needs!

---

### 2.3 Supabase Account (Database)

**What is Supabase?** It's where we'll store user profiles, stories, progress, etc. Think of it as a smart filing cabinet in the cloud.

**Steps:**
1. Go to https://supabase.com/
2. Click "Start your project"
3. Sign in with GitHub
4. Create a new project:
   - **Name:** illustrated-primer
   - **Database Password:** (Create a strong password and SAVE IT!)
   - **Region:** Choose closest to you
   - Click "Create new project"
5. Wait 2-3 minutes for setup
6. Free tier includes:
   - 500 MB database space
   - 2 GB bandwidth
   - 50,000 monthly active users
   - Unlimited API requests

**Cost:** Free for your needs!

---

### 2.4 Anthropic Account (Claude API)

**What is Claude?** An AI assistant (like me!) that we'll use to generate stories and provide tutoring.

**Steps:**
1. Go to https://console.anthropic.com/
2. Click "Sign up"
3. Create an account with email
4. Verify your email
5. Go to "API Keys" in the dashboard
6. Click "Create Key"
7. **SAVE THIS KEY SAFELY** - you won't see it again!
8. Pricing:
   - Claude 3.5 Sonnet: ~$3 per million input tokens, ~$15 per million output tokens
   - A typical story might use ~2,000 tokens = $0.03
   - **Estimate:** $20-40/month for moderate use

**Cost:** Pay-as-you-go, likely $20-40/month

**Important:** Set up billing alerts in the Anthropic console to avoid surprises!

---

### 2.5 Google AI Studio Account (Gemini)

**What is Gemini?** Google's AI that we can use for additional features and potentially image generation.

**Steps:**
1. Go to https://aistudio.google.com/
2. Click "Get started"
3. Sign in with Google account
4. Accept terms of service
5. Get API key:
   - Click "Get API key" in the dashboard
   - Create new API key
   - **SAVE THIS KEY SAFELY**
6. Pricing:
   - Gemini 1.5 Flash: Free tier (15 requests/minute)
   - Gemini 1.5 Pro: Free tier (2 requests/minute)
   - Imagen: ~$0.02 per image

**Cost:** Free tier to start, very affordable paid tier if needed

---

## Part 3: Create the Project

Now let's create the actual Next.js project!

### 3.1 Clone Your Repository

Open Terminal/Command Prompt and navigate to where you want to store the project:

```bash
# Navigate to your preferred location
cd ~/Documents  # Mac
# or
cd C:\Users\YourName\Documents  # Windows

# Clone the repository
git clone <your-repo-url> Diamond-Age
cd Diamond-Age
```

---

### 3.2 Initialize Next.js Project

We'll create the Next.js app inside a subfolder to keep our documentation separate from the code:

```bash
# Make sure you're in the Diamond-Age directory
npx create-next-app@latest illustrated-primer
```

You'll be asked several questions. Here are the recommended answers:

```
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … Yes
✔ Would you like to use App Router? … Yes
✔ Would you like to customize the default import alias? … No
```

**What just happened?**
- `npx` runs a command without installing it permanently
- `create-next-app` is the official Next.js project creator
- `@latest` ensures we get the newest version
- `illustrated-primer` is the folder name

This will take a few minutes as it downloads and sets up everything.

---

### 3.3 Explore the Project Structure

Navigate into the new project:

```bash
cd illustrated-primer
```

You should see a structure like:

```
illustrated-primer/
├── node_modules/        # All the code libraries (don't touch!)
├── public/              # Static files (images, fonts, etc.)
├── src/
│   ├── app/            # Your app's pages and API routes
│   │   ├── page.tsx    # Home page
│   │   ├── layout.tsx  # Main layout wrapper
│   │   └── globals.css # Global styles
├── .gitignore          # Files Git should ignore
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

---

### 3.4 Install Additional Dependencies

We need to add libraries for AI integration:

```bash
# Install AI SDK and providers
npm install @anthropic-ai/sdk @google/generative-ai

# Install utility libraries
npm install zod          # For data validation
npm install clsx         # For conditional CSS classes
npm install lucide-react # For beautiful icons
```

**What are these?**
- `@anthropic-ai/sdk` - Claude API client
- `@google/generative-ai` - Gemini API client
- `zod` - Helps validate data to prevent errors
- `clsx` - Makes working with CSS classes easier
- `lucide-react` - Icon library

---

### 3.5 Set Up Environment Variables

Environment variables are secret values (like API keys) that shouldn't be shared publicly.

Create a file called `.env.local` in the `illustrated-primer` folder:

```bash
# Create the file (Mac/Linux)
touch .env.local

# Or on Windows, create it in VS Code
```

Open `.env.local` in VS Code and add:

```env
# Anthropic Claude API
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Google Gemini API
GOOGLE_AI_API_KEY=your_google_api_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Where to find these values:**

**Supabase values:**
1. Go to your Supabase project
2. Click "Settings" > "API"
3. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY`

**Important:**
- Replace all the `your_*_here` placeholders with actual keys
- NEVER commit this file to Git (it's already in `.gitignore`)
- Keep these keys secret!

---

### 3.6 Test the Setup

Let's make sure everything works!

```bash
# Start the development server
npm run dev
```

You should see:

```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.3s
```

Open your web browser and go to: **http://localhost:3000**

You should see the default Next.js welcome page! 🎉

To stop the server, press `Ctrl + C` in the terminal.

---

## Part 4: Configure VS Code

Let's make VS Code even better for this project!

### 4.1 Install Recommended Extensions

In VS Code:
1. Click the Extensions icon (or press `Cmd+Shift+X` on Mac, `Ctrl+Shift+X` on Windows)
2. Search for and install each of these:

**Essential:**
- **ES7+ React/Redux/React-Native snippets** - Quick code snippets
- **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
- **Prettier - Code formatter** - Automatically format your code
- **TypeScript Vue Plugin (Volar)** - Better TypeScript support

**Nice to Have:**
- **GitLens** - See Git history inline
- **Error Lens** - Highlight errors inline
- **Auto Rename Tag** - Rename matching HTML tags
- **Path Intellisense** - Autocomplete file paths

---

### 4.2 Configure Prettier

Create a file called `.prettierrc` in the `illustrated-primer` folder:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

**What does this do?** Makes your code consistently formatted automatically.

---

### 4.3 Configure VS Code Settings

In VS Code:
1. Press `Cmd+,` (Mac) or `Ctrl+,` (Windows) to open Settings
2. Search for "Format On Save"
3. Check the box ✓
4. Search for "Default Formatter"
5. Select "Prettier - Code formatter"

Now your code will automatically format when you save!

---

## Part 5: Set Up Supabase Database

Let's create the initial database structure.

### 5.1 Access Supabase SQL Editor

1. Go to your Supabase project
2. Click "SQL Editor" in the sidebar
3. Click "New query"

---

### 5.2 Create Initial Tables

Copy and paste this SQL code and click "Run":

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  age INTEGER,
  reading_level VARCHAR(20) CHECK (reading_level IN ('pre-reader', 'beginner', 'intermediate', 'advanced')),
  interests TEXT[] DEFAULT '{}',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stories table
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(200),
  content TEXT NOT NULL,
  image_url TEXT,
  style VARCHAR(50),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create progress table
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL,
  data JSONB DEFAULT '{}',
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- Create policies (temporarily allow all for development)
CREATE POLICY "Allow all operations on profiles" ON profiles FOR ALL USING (true);
CREATE POLICY "Allow all operations on stories" ON stories FOR ALL USING (true);
CREATE POLICY "Allow all operations on progress" ON progress FOR ALL USING (true);
```

**What did this do?**
- Created 3 tables: `profiles`, `stories`, `progress`
- Set up relationships (stories belong to profiles)
- Enabled security (we'll improve this later)
- Allowed temporary access for development

---

### 5.3 Verify Tables

In Supabase:
1. Click "Table Editor" in the sidebar
2. You should see your 3 tables: `profiles`, `stories`, `progress`

Success! 🎉

---

## Part 6: Project Structure Updates

Let's organize our code properly.

### 6.1 Update Repository Structure

Your repository should now look like:

```
Diamond-Age/
├── .git/
├── CLAUDE.MD
├── PROJECT_VISION.md
├── ROADMAP.md
├── TODO.md
├── DEVELOPMENT_SETUP.md (this file)
├── GETTING_STARTED.md (we'll create this)
└── illustrated-primer/      # The actual Next.js app
    ├── src/
    ├── public/
    ├── package.json
    ├── .env.local
    └── ... (all Next.js files)
```

---

### 6.2 Update .gitignore

Make sure the root `.gitignore` includes:

```gitignore
# Dependencies
node_modules/

# Next.js
.next/
out/

# Environment variables
.env*.local
.env

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

---

## Part 7: Verify Everything Works

Let's do a final check!

### 7.1 Test Development Server

```bash
cd illustrated-primer
npm run dev
```

Visit http://localhost:3000 - should work! ✓

---

### 7.2 Test TypeScript

Create a test file: `illustrated-primer/src/test.ts`

```typescript
const greeting: string = 'Hello, Illustrated Primer!';
console.log(greeting);
```

If VS Code shows no errors, TypeScript is working! ✓

You can delete this test file.

---

### 7.3 Test Supabase Connection

Create: `illustrated-primer/src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

Wait, we need to install the Supabase client first!

```bash
npm install @supabase/supabase-js
```

Now the file should work! ✓

---

## Part 8: Understanding Key Concepts

Before we start coding, let's understand some basics.

### What is React?

React is a library for building user interfaces. Think of it like LEGO blocks for websites:
- Each component is a reusable piece
- Components combine to make pages
- When data changes, React updates the display automatically

### What is Next.js?

Next.js is React + extra features:
- File-based routing (each file in `app/` is a page)
- API routes (backend code in the same project)
- Automatic optimization (makes your app fast)
- Server and client components (some code runs on server, some in browser)

### What is TypeScript?

TypeScript is JavaScript with types:
```typescript
// JavaScript (can cause bugs)
let age = 25;
age = "twenty-five";  // Oops! Changed type

// TypeScript (catches errors)
let age: number = 25;
age = "twenty-five";  // Error! Type 'string' not assignable to 'number'
```

### What is Tailwind CSS?

Tailwind is utility-first CSS:
```html
<!-- Traditional CSS -->
<div class="custom-button">Click me</div>
<style>
  .custom-button {
    background-color: blue;
    color: white;
    padding: 10px;
  }
</style>

<!-- Tailwind CSS -->
<div class="bg-blue-500 text-white p-4">Click me</div>
```

Benefits: Faster development, smaller CSS files, consistent design.

---

## Part 9: Your First Component

Let's create a simple component together to get started!

### 9.1 Create a Button Component

Create: `illustrated-primer/src/components/Button.tsx`

```typescript
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
}
```

**Let's break this down:**

1. **Interface** - Defines what props (inputs) the component accepts
2. **children** - Whatever you put between `<Button>` tags
3. **onClick** - Optional function to run when clicked
4. **variant** - Button style (defaults to 'primary')
5. **className** - Tailwind utility classes for styling

---

### 9.2 Use the Button Component

Update: `illustrated-primer/src/app/page.tsx`

```typescript
import { Button } from '@/components/Button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">The Illustrated Primer</h1>

      <div className="flex gap-4">
        <Button onClick={() => alert('Primary clicked!')}>
          Primary Button
        </Button>

        <Button variant="secondary" onClick={() => alert('Secondary clicked!')}>
          Secondary Button
        </Button>
      </div>
    </main>
  );
}
```

Save and view at http://localhost:3000 - you should see two beautiful buttons! 🎉

---

## Part 10: Next Steps

Congratulations! Your development environment is ready! 🚀

### What You've Accomplished:
✅ Installed all necessary software
✅ Created accounts for all services
✅ Set up Next.js project with TypeScript and Tailwind
✅ Configured Supabase database
✅ Created your first React component
✅ Understood key concepts

### What's Next:
1. **Read GETTING_STARTED.md** - Learn the development workflow
2. **Start Phase 1** - Build the first story generator
3. **Learn as you go** - Each step will teach new concepts
4. **Test with your kids** - Get real feedback early!

---

## Troubleshooting

### Node.js Not Found
- Restart your terminal after installing Node.js
- Verify installation: `node --version`

### npm install Fails
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

### Port 3000 Already in Use
- Kill the process using port 3000
- Or use a different port: `npm run dev -- -p 3001`

### Environment Variables Not Working
- Make sure file is named `.env.local` (note the dot)
- Restart the dev server after changing .env files
- Check for typos in variable names

### TypeScript Errors in VS Code
- Make sure TypeScript extension is installed
- Restart VS Code
- Run `npm install` to ensure all types are installed

### Supabase Connection Fails
- Double-check your API keys in `.env.local`
- Make sure Supabase project is not paused (free tier pauses after inactivity)
- Check Supabase dashboard for any errors

---

## Getting Help

If you get stuck:
1. **Check the error message** - They usually tell you what's wrong
2. **Search the error** - Copy/paste into Google
3. **Ask me (Claude)!** - I'm here to help explain and debug
4. **Next.js docs** - https://nextjs.org/docs
5. **Supabase docs** - https://supabase.com/docs

---

## Useful Commands Reference

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for code issues
npm run lint

# Install a new package
npm install package-name

# Update all packages
npm update

# Clear Next.js cache (if things break)
rm -rf .next

# Check Node.js version
node --version

# Check npm version
npm --version
```

---

**You're all set!** Take a deep breath - we're going to build something amazing together! 🌟

**Last Updated:** 2026-01-13
