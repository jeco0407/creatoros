-- Creator OS core schema: profiles, tasks, projects, ideas
-- Every table is scoped to auth.uid() via RLS so users only ever see their own data.

create extension if not exists "pgcrypto";

-- ---------- profiles ----------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '創作者',
  plan text not null default 'Pro 方案',
  storage_used_gb numeric not null default 0,
  storage_limit_gb numeric not null default 100,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles are self-readable" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles are self-updatable" on public.profiles
  for update using (auth.uid() = id);

-- ---------- tasks (今日待辦) ----------
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  title text not null,
  task_time text,
  tag text,
  icon text default 'fileText',
  done boolean not null default false,
  urgent boolean not null default false,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.tasks enable row level security;

create policy "tasks are owner-scoped select" on public.tasks
  for select using (auth.uid() = user_id);
create policy "tasks are owner-scoped insert" on public.tasks
  for insert with check (auth.uid() = user_id);
create policy "tasks are owner-scoped update" on public.tasks
  for update using (auth.uid() = user_id);
create policy "tasks are owner-scoped delete" on public.tasks
  for delete using (auth.uid() = user_id);

-- ---------- projects (進行中的專案) ----------
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  title text not null,
  subtitle text,
  progress integer not null default 0 check (progress between 0 and 100),
  hue text not null default 'from-indigo-500 to-brand-500',
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "projects are owner-scoped select" on public.projects
  for select using (auth.uid() = user_id);
create policy "projects are owner-scoped insert" on public.projects
  for insert with check (auth.uid() = user_id);
create policy "projects are owner-scoped update" on public.projects
  for update using (auth.uid() = user_id);
create policy "projects are owner-scoped delete" on public.projects
  for delete using (auth.uid() = user_id);

-- ---------- ideas (靈感速覽) ----------
create table public.ideas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  title text not null,
  source text,
  tag text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.ideas enable row level security;

create policy "ideas are owner-scoped select" on public.ideas
  for select using (auth.uid() = user_id);
create policy "ideas are owner-scoped insert" on public.ideas
  for insert with check (auth.uid() = user_id);
create policy "ideas are owner-scoped update" on public.ideas
  for update using (auth.uid() = user_id);
create policy "ideas are owner-scoped delete" on public.ideas
  for delete using (auth.uid() = user_id);

-- ---------- new user bootstrap ----------
-- On signup: create a profile row + a small set of starter tasks/projects/ideas
-- so the dashboard isn't empty on first login.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', '創作者'));

  insert into public.tasks (user_id, title, task_time, tag, icon, urgent, position) values
    (new.id, '發布 IG 貼文', '12:00', '發布', 'image', true, 0),
    (new.id, 'Threads 草稿撰寫', '14:30', '創作', 'fileText', false, 1),
    (new.id, '回覆客戶訊息', '今天', '客戶', 'users', false, 2);

  insert into public.projects (user_id, title, subtitle, progress, hue, position) values
    (new.id, '我的第一個內容系列', 'YouTube', 10, 'from-indigo-500 to-brand-500', 0);

  insert into public.ideas (user_id, title, source, tag, position) values
    (new.id, '歡迎使用 Creator OS！點擊快速收集開始蒐集靈感', 'Creator OS', '開始', 0);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
