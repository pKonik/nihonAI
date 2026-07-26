create table public.vocabulary_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  word text not null,
  reading text not null,
  meaning text not null,
  part_of_speech text not null default 'Sustantivo',
  jlpt_level text not null default 'N5',
  example text,
  source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint vocabulary_entries_word_not_blank
    check (btrim(word) <> ''),
  constraint vocabulary_entries_reading_not_blank
    check (btrim(reading) <> ''),
  constraint vocabulary_entries_meaning_not_blank
    check (btrim(meaning) <> ''),
  constraint vocabulary_entries_part_of_speech_valid
    check (
      part_of_speech in (
        'Sustantivo',
        'Verbo',
        'Adjetivo',
        'Adverbio',
        'Expresión',
        'Otro'
      )
    ),
  constraint vocabulary_entries_jlpt_level_valid
    check (
      jlpt_level in (
        'N5',
        'N4',
        'N3',
        'N2',
        'N1',
        'Sin clasificar'
      )
    ),
  constraint vocabulary_entries_example_not_blank
    check (example is null or btrim(example) <> ''),
  constraint vocabulary_entries_source_not_blank
    check (source is null or btrim(source) <> '')
);

create index vocabulary_entries_user_id_idx
  on public.vocabulary_entries (user_id);

create function public.update_vocabulary_entries_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger update_vocabulary_entries_updated_at
before update on public.vocabulary_entries
for each row
execute function public.update_vocabulary_entries_updated_at();

alter table public.vocabulary_entries enable row level security;

revoke all on table public.vocabulary_entries from anon, authenticated;
grant select, insert, update, delete
  on table public.vocabulary_entries
  to authenticated;

create policy "Users can view their own vocabulary entries"
on public.vocabulary_entries
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create their own vocabulary entries"
on public.vocabulary_entries
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their own vocabulary entries"
on public.vocabulary_entries
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own vocabulary entries"
on public.vocabulary_entries
for delete
to authenticated
using ((select auth.uid()) = user_id);
