alter table "public"."user_roles" add column "email" text;

alter table "public"."user_roles" add column "username" text default 'Guest'::text;

alter table "public"."user_roles" add column "voucher_points" bigint default '0'::bigint;


