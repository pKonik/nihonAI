create table public.profiles (
  user_id uuid primary key
    references auth.users (id) on delete cascade,
  display_name text,
  avatar_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_display_name_not_blank
    check (display_name is null or btrim(display_name) <> ''),
  constraint profiles_display_name_length
    check (display_name is null or char_length(display_name) <= 50),
  constraint profiles_avatar_path_valid
    check (
      avatar_path is null
      or avatar_path = user_id::text || '/avatar'
    )
);

create function public.update_profiles_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger update_profiles_updated_at
before update on public.profiles
for each row
execute function public.update_profiles_updated_at();

create function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

create trigger create_profile_after_user_signup
after insert on auth.users
for each row
execute function public.create_profile_for_new_user();

insert into public.profiles (user_id)
select id
from auth.users
on conflict (user_id) do nothing;

alter table public.profiles enable row level security;

revoke all on table public.profiles from anon, authenticated;
grant select, update on table public.profiles to authenticated;

create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'avatars',
  'avatars',
  false,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Users can view their own avatar"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "Users can upload their own avatar"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and name = (select auth.uid())::text || '/avatar'
);

create policy "Users can update their own avatar"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'avatars'
  and name = (select auth.uid())::text || '/avatar'
)
with check (
  bucket_id = 'avatars'
  and name = (select auth.uid())::text || '/avatar'
);

create policy "Users can delete their own avatar"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'avatars'
  and name = (select auth.uid())::text || '/avatar'
);
