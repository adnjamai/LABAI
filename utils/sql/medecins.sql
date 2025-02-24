create table public.medecins (
  id uuid not null default extensions.uuid_generate_v4 (),
  nom text not null,
  specialite text not null,
  email text not null,
  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  constraint medecins_pkey primary key (id),
  constraint medecins_email_key unique (email),
  constraint fk_specialite foreign KEY (specialite) references specialites (nom)
) TABLESPACE pg_default;