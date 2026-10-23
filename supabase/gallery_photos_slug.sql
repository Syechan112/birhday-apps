-- Jalankan file ini di Supabase Dashboard > SQL Editor.
-- Membuat slug otomatis dari title, tetap UNIQUE.

alter table public.gallery_photos
  add column if not exists slug text;

create or replace function public.make_gallery_photo_slug(value text)
returns text
language sql
immutable
as $$
  select trim(both '-' from regexp_replace(
    regexp_replace(lower(coalesce(value, 'foto')), '[^a-z0-9]+', '-', 'g'),
    '(^-|-$)', '', 'g'
  ));
$$;

update public.gallery_photos
set slug = public.make_gallery_photo_slug(title) || '-' || left(replace(id::text, '-', ''), 8)
where slug is null or slug = '';

alter table public.gallery_photos
  alter column slug set not null;

create unique index if not exists gallery_photos_slug_idx
  on public.gallery_photos (slug);

create or replace function public.upsert_gallery_photo_slug()
returns trigger
language plpgsql
as $$
declare
  candidate text;
  counter int := 1;
begin
  if new.slug is null or new.slug = '' then
    new.slug := public.make_gallery_photo_slug(new.title) || '-' || left(replace(gen_random_uuid()::text, '-', ''), 8);
  end if;

  if not exists (select 1 from public.gallery_photos where slug = new.slug and id <> new.id) then
    return new;
  end if;

  candidate := new.slug || '-' || counter;
  while exists (select 1 from public.gallery_photos where slug = candidate) loop
    counter := counter + 1;
    candidate := new.slug || '-' || counter;
  end loop;

  new.slug := candidate;
  return new;
end;
$$;

drop trigger if exists upsert_gallery_photo_slug on public.gallery_photos;
create trigger upsert_gallery_photo_slug
before insert or update of title on public.gallery_photos
for each row
execute function public.upsert_gallery_photo_slug();