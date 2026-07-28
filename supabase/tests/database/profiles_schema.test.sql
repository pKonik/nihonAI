begin;

create extension if not exists pgtap with schema extensions;

set search_path = public, extensions;

select plan(12);

select has_table('public', 'profiles', 'profiles exists');
select col_is_pk('public', 'profiles', 'user_id', 'user_id is primary key');
select col_is_fk(
  'public',
  'profiles',
  'user_id',
  'user_id references an authenticated user'
);
select ok(
  (
    select relrowsecurity
    from pg_class
    where oid = 'public.profiles'::regclass
  ),
  'RLS is enabled'
);
select policies_are(
  'public',
  'profiles',
  array[
    'Users can view their own profile',
    'Users can update their own profile'
  ],
  'only the expected profile policies exist'
);
select policy_roles_are(
  'public',
  'profiles',
  'Users can view their own profile',
  array['authenticated'],
  'profile select is limited to authenticated'
);
select policy_roles_are(
  'public',
  'profiles',
  'Users can update their own profile',
  array['authenticated'],
  'profile update is limited to authenticated'
);
select is(
  (
    select array_agg(privilege_type order by privilege_type)
    from information_schema.role_table_grants
    where table_schema = 'public'
      and table_name = 'profiles'
      and grantee = 'authenticated'
  ),
  array['SELECT', 'UPDATE']::text[],
  'authenticated has only select and update privileges'
);
select is(
  (
    select count(*)
    from information_schema.role_table_grants
    where table_schema = 'public'
      and table_name = 'profiles'
      and grantee = 'anon'
  ),
  0::bigint,
  'anon has no profile privileges'
);
select results_eq(
  $$
    select public
    from storage.buckets
    where id = 'avatars'
  $$,
  $$ values (false) $$,
  'avatars bucket is private'
);
select results_eq(
  $$
    select file_size_limit
    from storage.buckets
    where id = 'avatars'
  $$,
  $$ values (2097152::bigint) $$,
  'avatars are limited to 2 MB'
);
select results_eq(
  $$
    select allowed_mime_types
    from storage.buckets
    where id = 'avatars'
  $$,
  $$ values (array['image/jpeg', 'image/png', 'image/webp']::text[]) $$,
  'avatars only accept supported image types'
);

select * from finish();

rollback;
