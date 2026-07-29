begin;

create extension if not exists pgtap with schema extensions;

set search_path = public, extensions;

select plan(3);

select hasnt_table(
  'public',
  'manga_crops',
  'standalone manga crops are not persisted'
);

select results_eq(
  $$
    select count(*)::bigint
    from storage.buckets
    where id = 'manga-crops'
  $$,
  $$ values (0::bigint) $$,
  'the manga crop bucket does not exist'
);

select results_eq(
  $$
    select count(*)::bigint
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname like '%manga crop files'
  $$,
  $$ values (0::bigint) $$,
  'standalone manga crop storage policies do not exist'
);

select * from finish();

rollback;
