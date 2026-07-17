-- Roteiro by Via Vinho — one-time Supabase setup for concierge leads.
-- Same project as the wedding dashboard: Supabase → SQL Editor → New query → paste ALL → Run.

create table if not exists public.planner_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null default '',
  email text not null default '',
  travel_month text not null default '',
  notes text not null default '',
  region text not null default '',
  days int,
  group_size text not null default '',
  itinerary jsonb,
  source text not null default 'roteiro-app'
);

alter table public.planner_leads enable row level security;

-- Public visitors may CREATE leads, never read them.
drop policy if exists "public insert leads" on public.planner_leads;
create policy "public insert leads" on public.planner_leads
  for insert with check (true);

-- No select/update/delete policies on purpose: leads stay private.
-- Read them in Supabase → Table Editor, or wire them into the Via Vinho CRM later.
