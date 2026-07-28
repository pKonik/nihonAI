begin;

create extension if not exists pgtap with schema extensions;

set search_path = public, extensions;

select plan(5);

grant usage on schema extensions to authenticated;

alter table public.kana_progress
drop constraint kana_progress_user_id_fkey;

select set_config(
  'request.jwt.claims',
  json_build_object(
    'sub',
    '11111111-1111-1111-1111-111111111111',
    'role',
    'authenticated'
  )::text,
  true
);

set local role authenticated;

insert into public.kana_progress (user_id, character_key)
values (
  '11111111-1111-1111-1111-111111111111',
  'hiragana:a'
);

select results_eq(
  $$
    select character_key
    from public.kana_progress
    where character_key = 'hiragana:a'
  $$,
  $$ values ('hiragana:a'::text) $$,
  'owner can create and view progress'
);

select set_config(
  'request.jwt.claims',
  json_build_object(
    'sub',
    '00000000-0000-0000-0000-000000000000',
    'role',
    'authenticated'
  )::text,
  true
);

select results_eq(
  $$ select count(*)::bigint from public.kana_progress $$,
  $$ values (0::bigint) $$,
  'another user cannot view progress'
);

select results_eq(
  $$
    with changed as (
      update public.kana_progress
      set learned_at = now()
      where character_key = 'hiragana:a'
      returning character_key
    )
    select count(*)::bigint from changed
  $$,
  $$ values (0::bigint) $$,
  'another user cannot update progress'
);

select results_eq(
  $$
    with removed as (
      delete from public.kana_progress
      where character_key = 'hiragana:a'
      returning character_key
    )
    select count(*)::bigint from removed
  $$,
  $$ values (0::bigint) $$,
  'another user cannot delete progress'
);

select set_config(
  'request.jwt.claims',
  json_build_object(
    'sub',
    '11111111-1111-1111-1111-111111111111',
    'role',
    'authenticated'
  )::text,
  true
);

select results_eq(
  $$
    with removed as (
      delete from public.kana_progress
      where character_key = 'hiragana:a'
      returning character_key
    )
    select count(*)::bigint from removed
  $$,
  $$ values (1::bigint) $$,
  'owner can delete progress'
);

reset role;

select * from finish();

rollback;
