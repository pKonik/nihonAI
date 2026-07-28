begin;

create extension if not exists pgtap with schema extensions;

set search_path = public, extensions;

select plan(11);

select has_table(
  'public',
  'kana_quiz_attempts',
  'kana_quiz_attempts exists'
);
select col_is_pk('public', 'kana_quiz_attempts', 'id', 'id is primary key');
select col_is_fk(
  'public',
  'kana_quiz_attempts',
  'user_id',
  'user_id references an authenticated user'
);
select col_not_null(
  'public',
  'kana_quiz_attempts',
  'character_key',
  'character key is required'
);
select col_not_null(
  'public',
  'kana_quiz_attempts',
  'is_correct',
  'answer result is required'
);
select col_not_null(
  'public',
  'kana_quiz_attempts',
  'answered_at',
  'answer timestamp is required'
);
select col_not_null(
  'public',
  'kana_quiz_attempts',
  'study_date',
  'study date is required'
);
select ok(
  (
    select relrowsecurity
    from pg_class
    where oid = 'public.kana_quiz_attempts'::regclass
  ),
  'RLS is enabled'
);
select policies_are(
  'public',
  'kana_quiz_attempts',
  array[
    'Users can view their own kana quiz attempts',
    'Users can create their own kana quiz attempts'
  ],
  'only the expected policies exist'
);
select is(
  (
    select array_agg(privilege_type order by privilege_type)
    from information_schema.role_table_grants
    where table_schema = 'public'
      and table_name = 'kana_quiz_attempts'
      and grantee = 'authenticated'
  ),
  array['INSERT', 'SELECT']::text[],
  'authenticated can only create and read attempts'
);

alter table public.kana_quiz_attempts
drop constraint kana_quiz_attempts_user_id_fkey;

select throws_ok(
  $$
    insert into public.kana_quiz_attempts (
      user_id,
      character_key,
      is_correct
    )
    values (
      '11111111-1111-1111-1111-111111111111',
      'hiragana:invalid',
      false
    )
  $$,
  '23514',
  null,
  'invalid character keys are rejected'
);

select * from finish();

rollback;
