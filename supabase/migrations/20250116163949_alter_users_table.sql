drop policy "Allow auth admin to read user roles" on "public"."user_roles";

revoke delete on table "public"."user_roles" from "service_role";

revoke insert on table "public"."user_roles" from "service_role";

revoke references on table "public"."user_roles" from "service_role";

revoke select on table "public"."user_roles" from "service_role";

revoke trigger on table "public"."user_roles" from "service_role";

revoke truncate on table "public"."user_roles" from "service_role";

revoke update on table "public"."user_roles" from "service_role";

revoke delete on table "public"."user_roles" from "supabase_auth_admin";

revoke insert on table "public"."user_roles" from "supabase_auth_admin";

revoke references on table "public"."user_roles" from "supabase_auth_admin";

revoke select on table "public"."user_roles" from "supabase_auth_admin";

revoke trigger on table "public"."user_roles" from "supabase_auth_admin";

revoke truncate on table "public"."user_roles" from "supabase_auth_admin";

revoke update on table "public"."user_roles" from "supabase_auth_admin";

alter table "public"."user_roles" drop constraint "user_roles_user_id_fkey";

alter table "public"."user_roles" drop constraint "user_roles_user_id_role_key";

alter table "public"."user_roles" drop constraint "user_roles_pkey";

drop index if exists "public"."user_roles_pkey";

drop index if exists "public"."user_roles_user_id_role_key";

drop table "public"."user_roles";

create table "public"."users" (
    "user_id" uuid not null,
    "role" app_role not null,
    "username" text,
    "points" bigint not null default '0'::bigint
);


CREATE UNIQUE INDEX users_pkey ON public.users USING btree (user_id);

CREATE UNIQUE INDEX user_roles_user_id_role_key ON public.users USING btree (user_id, role);

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."users" add constraint "user_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "user_roles_user_id_fkey";

alter table "public"."users" add constraint "user_roles_user_id_role_key" UNIQUE using index "user_roles_user_id_role_key";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

grant delete on table "public"."users" to "supabase_auth_admin";

grant insert on table "public"."users" to "supabase_auth_admin";

grant references on table "public"."users" to "supabase_auth_admin";

grant select on table "public"."users" to "supabase_auth_admin";

grant trigger on table "public"."users" to "supabase_auth_admin";

grant truncate on table "public"."users" to "supabase_auth_admin";

grant update on table "public"."users" to "supabase_auth_admin";

create policy "Allow auth admin to read user roles"
on "public"."users"
as permissive
for select
to supabase_auth_admin
using (true);



