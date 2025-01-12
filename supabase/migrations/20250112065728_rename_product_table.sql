revoke delete on table "public"."product" from "anon";

revoke insert on table "public"."product" from "anon";

revoke references on table "public"."product" from "anon";

revoke select on table "public"."product" from "anon";

revoke trigger on table "public"."product" from "anon";

revoke truncate on table "public"."product" from "anon";

revoke update on table "public"."product" from "anon";

revoke delete on table "public"."product" from "authenticated";

revoke insert on table "public"."product" from "authenticated";

revoke references on table "public"."product" from "authenticated";

revoke select on table "public"."product" from "authenticated";

revoke trigger on table "public"."product" from "authenticated";

revoke truncate on table "public"."product" from "authenticated";

revoke update on table "public"."product" from "authenticated";

revoke delete on table "public"."product" from "service_role";

revoke insert on table "public"."product" from "service_role";

revoke references on table "public"."product" from "service_role";

revoke select on table "public"."product" from "service_role";

revoke trigger on table "public"."product" from "service_role";

revoke truncate on table "public"."product" from "service_role";

revoke update on table "public"."product" from "service_role";

alter table "public"."product" drop constraint "product_name_key";

alter table "public"."product" drop constraint "product_pkey";

drop index if exists "public"."product_name_key";

drop index if exists "public"."product_pkey";

drop table "public"."product";

create table "public"."products" (
    "id" text not null,
    "name" text not null,
    "desc" text
);


alter table "public"."products" enable row level security;

CREATE UNIQUE INDEX product_name_key ON public.products USING btree (name);

CREATE UNIQUE INDEX product_pkey ON public.products USING btree (id);

alter table "public"."products" add constraint "product_pkey" PRIMARY KEY using index "product_pkey";

alter table "public"."products" add constraint "product_name_key" UNIQUE using index "product_name_key";

grant delete on table "public"."products" to "anon";

grant insert on table "public"."products" to "anon";

grant references on table "public"."products" to "anon";

grant select on table "public"."products" to "anon";

grant trigger on table "public"."products" to "anon";

grant truncate on table "public"."products" to "anon";

grant update on table "public"."products" to "anon";

grant delete on table "public"."products" to "authenticated";

grant insert on table "public"."products" to "authenticated";

grant references on table "public"."products" to "authenticated";

grant select on table "public"."products" to "authenticated";

grant trigger on table "public"."products" to "authenticated";

grant truncate on table "public"."products" to "authenticated";

grant update on table "public"."products" to "authenticated";

grant delete on table "public"."products" to "service_role";

grant insert on table "public"."products" to "service_role";

grant references on table "public"."products" to "service_role";

grant select on table "public"."products" to "service_role";

grant trigger on table "public"."products" to "service_role";

grant truncate on table "public"."products" to "service_role";

grant update on table "public"."products" to "service_role";


