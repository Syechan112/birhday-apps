-- Jalankan file ini di Supabase Dashboard > SQL Editor.
-- Image file disimpan di Cloudinary. Supabase hanya menyimpan URL dan metadata.

create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  owner_email text not null,
  public_url text not null check (public_url like 'https://%'),
  title text not null check (char_length(title) between 1 and 120),
  slug text,
  caption text not null default '' check (char_length(caption) <= 1000)
);

alter table public.gallery_photos enable row level security;

-- Guest dan user login dapat melihat semua foto.
drop policy if exists "Public can read gallery photos" on public.gallery_photos;
create policy "Public can read gallery photos"
  on public.gallery_photos
  for select
  to anon, authenticated
  using (true);

-- Hanya user login dapat membuat baris miliknya sendiri.
drop policy if exists "Authenticated users can upload own photos" on public.gallery_photos;
create policy "Authenticated users can upload own photos"
  on public.gallery_photos
  for insert
  to authenticated
  with check (owner_id = auth.uid() and owner_email = auth.jwt() ->> 'email');

-- Hanya pemilik foto dapat mengubah metadata.
drop policy if exists "Owners can update own photos" on public.gallery_photos;
create policy "Owners can update own photos"
  on public.gallery_photos
  for update
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- Hanya pemilik foto dapat menghapusnya.
drop policy if exists "Owners can delete own photos" on public.gallery_photos;
create policy "Owners can delete own photos"
  on public.gallery_photos
  for delete
  to authenticated
  using (owner_id = auth.uid());

create index if not exists gallery_photos_created_at_idx
  on public.gallery_photos (created_at desc);
