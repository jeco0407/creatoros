-- Content calendar (real dates, not a hardcoded week) + quick-capture inbox

create table public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  title text not null,
  event_date date not null,
  event_time text,
  platform text not null default 'ig',
  created_at timestamptz not null default now()
);

alter table public.calendar_events enable row level security;

create policy "calendar_events are owner-scoped select" on public.calendar_events
  for select using (auth.uid() = user_id);
create policy "calendar_events are owner-scoped insert" on public.calendar_events
  for insert with check (auth.uid() = user_id);
create policy "calendar_events are owner-scoped update" on public.calendar_events
  for update using (auth.uid() = user_id);
create policy "calendar_events are owner-scoped delete" on public.calendar_events
  for delete using (auth.uid() = user_id);

create table public.captures (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  title text not null,
  source text,
  type text not null default 'article',
  created_at timestamptz not null default now()
);

alter table public.captures enable row level security;

create policy "captures are owner-scoped select" on public.captures
  for select using (auth.uid() = user_id);
create policy "captures are owner-scoped insert" on public.captures
  for insert with check (auth.uid() = user_id);
create policy "captures are owner-scoped update" on public.captures
  for update using (auth.uid() = user_id);
create policy "captures are owner-scoped delete" on public.captures
  for delete using (auth.uid() = user_id);

-- extend new-user bootstrap with a couple of calendar demo events + a welcome capture
create or replace function public.handle_new_user()
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

  insert into public.calendar_events (user_id, title, event_date, event_time, platform) values
    (new.id, 'IG 貼文', current_date, '12:00', 'ig'),
    (new.id, 'Threads', current_date + 1, '14:30', 'threads');

  insert into public.captures (user_id, title, source, type) values
    (new.id, '歡迎使用 Creator OS！', 'Creator OS · 剛剛', 'article');

  return new;
end;
$$;
