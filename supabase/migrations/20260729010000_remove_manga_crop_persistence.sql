drop policy if exists "Users can view their own manga crop files"
on storage.objects;

drop policy if exists "Users can upload their own manga crop files"
on storage.objects;

drop policy if exists "Users can delete their own manga crop files"
on storage.objects;

drop table if exists public.manga_crops;
