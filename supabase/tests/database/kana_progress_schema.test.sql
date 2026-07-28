begin;

create extension if not exists pgtap with schema extensions;

set search_path = public, extensions;

select plan(9);

select has_table('public', 'kana_progress', 'kana_progress exists');

select col_is_pk(
  'public',
  'kana_progress',
  array['user_id', 'character_key'],
  'user and character form the primary key'
);

select col_is_fk(
  'public',
  'kana_progress',
  'user_id',
  'user_id references an authenticated user'
);

select ok(
  (
    select relrowsecurity
    from pg_class
    where oid = 'public.kana_progress'::regclass
  ),
  'RLS is enabled'
);

select policies_are(
  'public',
  'kana_progress',
  array[
    'Users can view their own kana progress',
    'Users can create their own kana progress',
    'Users can update their own kana progress',
    'Users can delete their own kana progress'
  ],
  'only the expected policies exist'
);

select is(
  (
    select array_agg(privilege_type order by privilege_type)
    from information_schema.role_table_grants
    where table_schema = 'public'
      and table_name = 'kana_progress'
      and grantee = 'authenticated'
  ),
  array['DELETE', 'INSERT', 'SELECT', 'UPDATE']::text[],
  'authenticated has only CRUD privileges'
);

select is(
  (
    select count(*)
    from information_schema.role_table_grants
    where table_schema = 'public'
      and table_name = 'kana_progress'
      and grantee = 'anon'
  ),
  0::bigint,
  'anon has no table privileges'
);

alter table public.kana_progress
drop constraint kana_progress_user_id_fkey;

select throws_ok(
  $$
    insert into public.kana_progress (user_id, character_key)
    values (
      '11111111-1111-1111-1111-111111111111',
      'hiragana:invalid'
    )
  $$,
  '23514',
  null,
  'invalid character keys are rejected'
);

select col_not_null(
  'public',
  'kana_progress',
  'learned_at',
  'learned_at is required'
);

select * from finish();

rollback;
