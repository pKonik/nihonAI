begin;

create extension if not exists pgtap with schema extensions;

set search_path = public, extensions;

select plan(4);

grant usage on schema extensions to authenticated;

alter table public.profiles
drop constraint profiles_user_id_fkey;

insert into public.profiles (user_id, display_name)
values (
  '11111111-1111-1111-1111-111111111111',
  'Hana'
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

set local role authenticated;

select results_eq(
  $$
    select display_name
    from public.profiles
    where user_id = '11111111-1111-1111-1111-111111111111'
  $$,
  $$ values ('Hana'::text) $$,
  'owner can view their profile'
);

update public.profiles
set display_name = 'Hana Mori'
where user_id = '11111111-1111-1111-1111-111111111111';

select results_eq(
  $$
    select display_name
    from public.profiles
    where user_id = '11111111-1111-1111-1111-111111111111'
  $$,
  $$ values ('Hana Mori'::text) $$,
  'owner can update their profile'
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
  $$
    select count(*)::bigint
    from public.profiles
    where user_id = '11111111-1111-1111-1111-111111111111'
  $$,
  $$ values (0::bigint) $$,
  'another user cannot view the profile'
);

select results_eq(
  $$
    with updated_profile as (
      update public.profiles
      set display_name = 'Intruso'
      where user_id = '11111111-1111-1111-1111-111111111111'
      returning user_id
    )
    select count(*)::bigint from updated_profile
  $$,
  $$ values (0::bigint) $$,
  'another user cannot update the profile'
);

reset role;

select * from finish();

rollback;
