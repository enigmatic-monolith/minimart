create table "public"."product" (
    "id" text not null,
    "name" text not null,
    "desc" text
);


alter table "public"."product" enable row level security;

CREATE UNIQUE INDEX product_name_key ON public.product USING btree (name);

CREATE UNIQUE INDEX product_pkey ON public.product USING btree (id);

alter table "public"."product" add constraint "product_pkey" PRIMARY KEY using index "product_pkey";

alter table "public"."product" add constraint "product_name_key" UNIQUE using index "product_name_key";

grant delete on table "public"."product" to "anon";

grant insert on table "public"."product" to "anon";

grant references on table "public"."product" to "anon";

grant select on table "public"."product" to "anon";

grant trigger on table "public"."product" to "anon";

grant truncate on table "public"."product" to "anon";

grant update on table "public"."product" to "anon";

grant delete on table "public"."product" to "authenticated";

grant insert on table "public"."product" to "authenticated";

grant references on table "public"."product" to "authenticated";

grant select on table "public"."product" to "authenticated";

grant trigger on table "public"."product" to "authenticated";

grant truncate on table "public"."product" to "authenticated";

grant update on table "public"."product" to "authenticated";

grant delete on table "public"."product" to "service_role";

grant insert on table "public"."product" to "service_role";

grant references on table "public"."product" to "service_role";

grant select on table "public"."product" to "service_role";

grant trigger on table "public"."product" to "service_role";

grant truncate on table "public"."product" to "service_role";

grant update on table "public"."product" to "service_role";


