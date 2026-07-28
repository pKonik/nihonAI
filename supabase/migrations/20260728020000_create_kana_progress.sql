create table public.kana_progress (
  user_id uuid not null
    references auth.users (id) on delete cascade,
  character_key text not null,
  learned_at timestamptz not null default now(),
  primary key (user_id, character_key),
  constraint kana_progress_character_key_valid
    check (
      character_key ~ '^(hiragana|katakana):(a|i|u|e|o|ka|ki|ku|ke|ko|sa|shi|su|se|so|ta|chi|tsu|te|to|na|ni|nu|ne|no|ha|hi|fu|he|ho|ma|mi|mu|me|mo|ya|yu|yo|ra|ri|ru|re|ro|wa|wo|n)$'
    )
);

alter table public.kana_progress enable row level security;

revoke all on table public.kana_progress from anon, authenticated;
grant select, insert, update, delete on table public.kana_progress
to authenticated;

create policy "Users can view their own kana progress"
on public.kana_progress
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create their own kana progress"
on public.kana_progress
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their own kana progress"
on public.kana_progress
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own kana progress"
on public.kana_progress
for delete
to authenticated
using ((select auth.uid()) = user_id);
