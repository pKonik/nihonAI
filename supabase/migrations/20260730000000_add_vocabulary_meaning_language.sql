alter table public.vocabulary_entries
add column meaning_language text not null default 'es'
check (meaning_language in ('es', 'en'));
