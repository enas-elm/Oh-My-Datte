-- Composition de la commande saisie dans le formulaire (appliquée en production le 2026-11-05).
alter table public.messages add column if not exists composition jsonb;
comment on column public.messages.composition is 'Composition de la commande : {"mode": "equilibre" | "sur-mesure", "dattes": {"intrepide": n, "irresistible": n, "cool-kid": n, "sage": n}}, total = 3 x quantity';
