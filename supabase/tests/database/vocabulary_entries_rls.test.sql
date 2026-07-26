begin;

create extension if not exists pgtap with schema extensions;

set search_path = public, extensions;

select plan(6);

grant usage on schema extensions to authenticated;

alter table public.vocabulary_entries
drop constraint vocabulary_entries_user_id_fkey;

select set_config(
  'nihonai.test_user_id',
  '11111111-1111-1111-1111-111111111111',
  true
);

select set_config(
  'request.jwt.claims',
  json_build_object(
    'sub',
    current_setting('nihonai.test_user_id'),
    'role',
    'authenticated'
  )::text,
  true
);

set local role authenticated;

with inserted_entry as (
  insert into public.vocabulary_entries (
    word,
    reading,
    meaning,
    part_of_speech,
    jlpt_level
  )
  values (
    '勉強',
    'べんきょう',
    'estudio',
    'Sustantivo',
    'N5'
  )
  returning id
)
select set_config(
  'nihonai.test_entry_id',
  id::text,
  true
)
from inserted_entry;

select results_eq(
  $$
    select count(*)::bigint
    from public.vocabulary_entries
    where id = current_setting('nihonai.test_entry_id')::uuid
  $$,
  $$ values (1::bigint) $$,
  'owner can view the inserted entry'
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
    from public.vocabulary_entries
    where id = current_setting('nihonai.test_entry_id')::uuid
  $$,
  $$ values (0::bigint) $$,
  'another user cannot view the entry'
);

select results_eq(
  $$
    with updated_entry as (
      update public.vocabulary_entries
      set meaning = 'cambio no autorizado'
      where id = current_setting('nihonai.test_entry_id')::uuid
      returning id
    )
    select count(*)::bigint from updated_entry
  $$,
  $$ values (0::bigint) $$,
  'another user cannot update the entry'
);

select results_eq(
  $$
    with deleted_entry as (
      delete from public.vocabulary_entries
      where id = current_setting('nihonai.test_entry_id')::uuid
      returning id
    )
    select count(*)::bigint from deleted_entry
  $$,
  $$ values (0::bigint) $$,
  'another user cannot delete the entry'
);

select set_config(
  'request.jwt.claims',
  json_build_object(
    'sub',
    current_setting('nihonai.test_user_id'),
    'role',
    'authenticated'
  )::text,
  true
);

select results_eq(
  $$
    with updated_entry as (
      update public.vocabulary_entries
      set meaning = 'aprendizaje'
      where id = current_setting('nihonai.test_entry_id')::uuid
      returning id
    )
    select count(*)::bigint from updated_entry
  $$,
  $$ values (1::bigint) $$,
  'owner can update the entry'
);

select results_eq(
  $$
    with deleted_entry as (
      delete from public.vocabulary_entries
      where id = current_setting('nihonai.test_entry_id')::uuid
      returning id
    )
    select count(*)::bigint from deleted_entry
  $$,
  $$ values (1::bigint) $$,
  'owner can delete the entry'
);

reset role;

select * from finish();

rollback;
