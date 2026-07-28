create table public.kana_quiz_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null
    references auth.users (id) on delete cascade,
  character_key text not null,
  is_correct boolean not null,
  answered_at timestamptz not null default now(),
  study_date date not null default current_date,
  constraint kana_quiz_attempts_character_key_valid
    check (
      character_key ~ '^(hiragana|katakana):(a|i|u|e|o|ka|ki|ku|ke|ko|sa|shi|su|se|so|ta|chi|tsu|te|to|na|ni|nu|ne|no|ha|hi|fu|he|ho|ma|mi|mu|me|mo|ya|yu|yo|ra|ri|ru|re|ro|wa|wo|n|ga|gi|gu|ge|go|za|ji|zu|ze|zo|da|di|du|de|do|ba|bi|bu|be|bo|pa|pi|pu|pe|po)$'
    )
);

create index kana_quiz_attempts_user_date_idx
on public.kana_quiz_attempts (user_id, study_date desc);

alter table public.kana_quiz_attempts enable row level security;

revoke all on table public.kana_quiz_attempts from anon, authenticated;
grant select, insert on table public.kana_quiz_attempts to authenticated;
grant usage, select on sequence public.kana_quiz_attempts_id_seq
to authenticated;

create policy "Users can view their own kana quiz attempts"
on public.kana_quiz_attempts
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create their own kana quiz attempts"
on public.kana_quiz_attempts
for insert
to authenticated
with check ((select auth.uid()) = user_id);
