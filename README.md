# LAMIDE FC — Football Without Filters

A Next.js + TypeScript + Tailwind + Supabase starter for a premium Premier League football media and supporters' community.

## What's included

- Black and champagne-gold LAMIDE FC visual identity
- Responsive homepage and navigation
- Banter Room with interactive local demo posts, likes and comments
- Hot Takes polls
- Match Centre preview page and secure server-side football-data API route
- Transfer Room and newsroom landing pages
- Prediction interaction prototype
- About page
- Supabase email/password signup and login wiring
- Initial Supabase schema with Row Level Security policies

## Important status note

This repository is a working **starter implementation**, not a deployed production community. The discussion feed, polls and predictions currently use browser-local demo state; they are not yet persisted to Supabase. Authentication becomes active when Supabase credentials are configured. Admin content management, live scores and persistent community workflows require the next implementation pass and valid external credentials.

The fixture cards are explicitly demo/preview content. Do not treat them as live scores or a guaranteed current fixture list.

## Run locally

1. Install Node.js 20 or later.
2. Extract the project.
3. In the project directory run:

   ```bash
   npm install
   cp .env.example .env.local
   npm run dev
   ```

4. Open http://localhost:3000

Without Supabase credentials, the site displays the frontend and clearly labelled demo-mode messaging.

## Connect Supabase

1. Create a project at https://supabase.com.
2. Copy the project URL and anon/public key into `.env.local`.
3. Run `supabase/migrations/0001_initial_schema.sql` in the Supabase SQL Editor.
4. Enable email/password authentication.
5. Configure your site's allowed redirect URLs in Supabase Auth.
6. Create your own account through `/signup`.
7. In Supabase SQL Editor, find your account UUID in Authentication → Users, then run:

   ```sql
   update public.profiles
   set role = 'admin'
   where id = 'YOUR_AUTH_USER_UUID';
   ```

   Do not promote an account based on a user-editable metadata field. The SQL role update must be performed by the project owner.

## Connect football data

The `/api/football` route calls football-data.org from the server, not the browser.

Add your token to `.env.local`:

```env
FOOTBALL_DATA_API_TOKEN=your_token_here
```

Restart the development server. Provider access and competition coverage depend on your football-data.org plan.

## Deploy

1. Push the project to a private or public Git repository.
2. Import it into Vercel.
3. Add the environment variables in Vercel Project Settings.
4. Deploy.
5. Add the production URL to Supabase Auth redirect URLs.

## Before public launch

- Persist all Banter Room posts, likes and comments through authenticated server/database operations.
- Add server-side admin route protection and admin content CRUD.
- Complete profile editing, avatar storage, follows and notifications.
- Implement authoritative fixture result ingestion and a server-side prediction scoring job.
- Add moderation queues, rate limiting, spam protection and abuse reporting review.
- Add privacy policy, terms, community rules and contact details.
- Verify all RLS policies against real member and admin test accounts.
- Use licensed imagery and verify rights for all logos, badges and editorial assets.
- Add automated tests and error monitoring.

## Brand

Founder: Owoyomi Olamide Daniel  
Tagline: FOOTBALL WITHOUT FILTERS.  
Audience: Premier League supporters worldwide.
