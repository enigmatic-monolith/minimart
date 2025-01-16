alter table "public"."products" drop column "updated_at";

alter table "public"."products" add column "created_by" uuid not null;

alter table "public"."products" add column "last_updated_at" timestamp with time zone not null default now();

alter table "public"."products" add column "last_updated_by" uuid;

alter table "public"."products" add constraint "products_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."products" validate constraint "products_created_by_fkey";

alter table "public"."products" add constraint "products_updated_by_fkey" FOREIGN KEY (last_updated_by) REFERENCES auth.users(id) not valid;

alter table "public"."products" validate constraint "products_updated_by_fkey";

alter table "public"."tasks" drop column "updated_at";

alter table "public"."tasks" add column "last_updated_at" timestamp with time zone not null default now();

alter table "public"."user_tasks" drop column "updated_at";

alter table "public"."user_tasks" add column "last_updated_at" timestamp with time zone not null default now();

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
