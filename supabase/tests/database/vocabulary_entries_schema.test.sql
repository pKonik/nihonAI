begin;

create extension if not exists pgtap with schema extensions;

set search_path = public, extensions;

select plan(16);

select has_table(
  'public',
  'vocabulary_entries',
  'vocabulary_entries exists'
);

select col_is_pk(
  'public',
  'vocabulary_entries',
  'id',
  'id is the primary key'
);

select col_is_fk(
  'public',
  'vocabulary_entries',
  'user_id',
  'user_id references an authenticated user'
);

select has_index(
  'public',
  'vocabulary_entries',
  'vocabulary_entries_user_id_idx',
  'user_id has an index'
);

select ok(
  (
    select relrowsecurity
    from pg_class
    where oid = 'public.vocabulary_entries'::regclass
  ),
  'RLS is enabled'
);

select policies_are(
  'public',
  'vocabulary_entries',
  array[
    'Users can view their own vocabulary entries',
    'Users can create their own vocabulary entries',
    'Users can update their own vocabulary entries',
    'Users can delete their own vocabulary entries'
  ],
  'only the expected policies exist'
);

select policy_roles_are(
  'public',
  'vocabulary_entries',
  'Users can view their own vocabulary entries',
  array['authenticated'],
  'select policy is limited to authenticated'
);

select policy_roles_are(
  'public',
  'vocabulary_entries',
  'Users can create their own vocabulary entries',
  array['authenticated'],
  'insert policy is limited to authenticated'
);

select policy_roles_are(
  'public',
  'vocabulary_entries',
  'Users can update their own vocabulary entries',
  array['authenticated'],
  'update policy is limited to authenticated'
);

select policy_roles_are(
  'public',
  'vocabulary_entries',
  'Users can delete their own vocabulary entries',
  array['authenticated'],
  'delete policy is limited to authenticated'
);

select policy_cmd_is(
  'public',
  'vocabulary_entries',
  'Users can view their own vocabulary entries',
  'SELECT',
  'view policy applies to SELECT'
);

select policy_cmd_is(
  'public',
  'vocabulary_entries',
  'Users can create their own vocabulary entries',
  'INSERT',
  'create policy applies to INSERT'
);

select policy_cmd_is(
  'public',
  'vocabulary_entries',
  'Users can update their own vocabulary entries',
  'UPDATE',
  'update policy applies to UPDATE'
);

select policy_cmd_is(
  'public',
  'vocabulary_entries',
  'Users can delete their own vocabulary entries',
  'DELETE',
  'delete policy applies to DELETE'
);

select is(
  (
    select array_agg(privilege_type order by privilege_type)
    from information_schema.role_table_grants
    where table_schema = 'public'
      and table_name = 'vocabulary_entries'
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
      and table_name = 'vocabulary_entries'
      and grantee = 'anon'
  ),
  0::bigint,
  'anon has no table privileges'
);

select * from finish();

rollback;
