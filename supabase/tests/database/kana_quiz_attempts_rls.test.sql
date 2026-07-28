begin;

create extension if not exists pgtap with schema extensions;

set search_path = public, extensions;

select plan(3);

grant usage on schema extensions to authenticated;

alter table public.kana_quiz_attempts
drop constraint kana_quiz_attempts_user_id_fkey;

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

insert into public.kana_quiz_attempts (
  user_id,
  character_key,
  is_correct
)
values (
  '11111111-1111-1111-1111-111111111111',
  'hiragana:a',
  true
);

select results_eq(
  $$ select count(*)::bigint from public.kana_quiz_attempts $$,
  $$ values (1::bigint) $$,
  'owner can create and view an attempt'
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
  $$ select count(*)::bigint from public.kana_quiz_attempts $$,
  $$ values (0::bigint) $$,
  'another user cannot view attempts'
);

select throws_ok(
  $$
    insert into public.kana_quiz_attempts (
      user_id,
      character_key,
      is_correct
    )
    values (
      '11111111-1111-1111-1111-111111111111',
      'katakana:a',
      false
    )
  $$,
  '42501',
  null,
  'another user cannot create attempts for the owner'
);

reset role;

select * from finish();

rollback;
