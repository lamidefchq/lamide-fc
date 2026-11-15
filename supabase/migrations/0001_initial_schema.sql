-- LAMIDE FC initial Supabase schema
create extension if not exists pgcrypto;

create type public.member_role as enum ('member', 'admin');
create type public.post_status as enum ('published', 'hidden', 'removed');
create type public.article_status as enum ('draft', 'published');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null check (char_length(username) between 3 and 24),
  full_name text not null default '',
  bio text not null default '',
  avatar_url text,
  favourite_club text,
  role public.member_role not null default 'member',
  reputation integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  category text not null default 'Premier League',
  body text not null check (char_length(body) between 1 and 3000),
  image_url text,
  status public.post_status not null default 'published',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  parent_id uuid references public.comments(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 1500),
  created_at timestamptz not null default now()
);

create table public.post_likes (
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create table public.follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  title text not null,
  slug text unique not null,
  excerpt text not null default '',
  body text not null default '',
  image_url text,
  category text not null default 'News',
  verification_label text not null default 'Opinion',
  status public.article_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.polls (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  options jsonb not null,
  closes_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.poll_votes (
  poll_id uuid not null references public.polls(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  option_index integer not null,
  created_at timestamptz not null default now(),
  primary key (poll_id, user_id)
);

create table public.predictions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  fixture_id text not null,
  home_team text not null,
  away_team text not null,
  predicted_home integer not null check (predicted_home between 0 and 20),
  predicted_away integer not null check (predicted_away between 0 and 20),
  points_awarded integer not null default 0,
  created_at timestamptz not null default now(),
  unique (user_id, fixture_id)
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  kind text not null,
  message text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  post_id uuid references public.posts(id) on delete cascade,
  comment_id uuid references public.comments(id) on delete cascade,
  reason text not null,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  check (post_id is not null or comment_id is not null)
);

create index posts_created_at_idx on public.posts(created_at desc) where status = 'published';
create index articles_published_idx on public.articles(published_at desc) where status = 'published';
create index comments_post_idx on public.comments(post_id, created_at);
create index notifications_user_idx on public.notifications(user_id, created_at desc);

-- Profile creation from Supabase Auth metadata. Role is always member by default.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, username, full_name, favourite_club)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'username',''), 'fan_' || substr(new.id::text,1,8)),
    coalesce(new.raw_user_meta_data->>'full_name',''),
    new.raw_user_meta_data->>'favourite_club'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- RLS: public can read published community content; writes require authenticated ownership.
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.post_likes enable row level security;
alter table public.follows enable row level security;
alter table public.articles enable row level security;
alter table public.polls enable row level security;
alter table public.poll_votes enable row level security;
alter table public.predictions enable row level security;
alter table public.notifications enable row level security;
alter table public.reports enable row level security;

create policy "profiles are publicly readable" on public.profiles for select using (true);
create policy "members update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "posts readable when published" on public.posts for select using (status = 'published' or author_id = auth.uid());
create policy "members create own posts" on public.posts for insert with check (auth.uid() = author_id);
create policy "authors update own posts" on public.posts for update using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "authors delete own posts" on public.posts for delete using (auth.uid() = author_id);
create policy "comments readable" on public.comments for select using (true);
create policy "members comment as self" on public.comments for insert with check (auth.uid() = author_id);
create policy "authors edit own comments" on public.comments for update using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "authors delete own comments" on public.comments for delete using (auth.uid() = author_id);
create policy "likes readable" on public.post_likes for select using (true);
create policy "members like as self" on public.post_likes for insert with check (auth.uid() = user_id);
create policy "members remove own likes" on public.post_likes for delete using (auth.uid() = user_id);
create policy "follows readable" on public.follows for select using (true);
create policy "members follow as self" on public.follows for insert with check (auth.uid() = follower_id);
create policy "members unfollow as self" on public.follows for delete using (auth.uid() = follower_id);
create policy "published articles readable" on public.articles for select using (status = 'published');
create policy "polls readable" on public.polls for select using (true);
create policy "members vote as self" on public.poll_votes for insert with check (auth.uid() = user_id);
create policy "votes readable" on public.poll_votes for select using (true);
create policy "members read own predictions" on public.predictions for select using (auth.uid() = user_id);
create policy "members create own predictions" on public.predictions for insert with check (auth.uid() = user_id);
create policy "members read own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "members update own notifications" on public.notifications for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "members create own reports" on public.reports for insert with check (auth.uid() = reporter_id);
create policy "members read own reports" on public.reports for select using (auth.uid() = reporter_id);

-- IMPORTANT ADMIN SETUP:
-- After creating your own account, run this in Supabase SQL Editor with your actual auth user UUID:
-- update public.profiles set role = 'admin' where id = 'YOUR_AUTH_USER_UUID';
-- Never expose the Supabase service-role key in browser code.
