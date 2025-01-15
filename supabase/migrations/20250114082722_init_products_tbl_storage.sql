alter table "public"."products" add column "created_at" timestamp with time zone not null default now();

alter table "public"."products" add column "image_url" text;

alter table "public"."products" add column "price" bigint not null;

alter table "public"."products" add column "quantity" bigint not null;

alter table "public"."products" add column "updated_at" timestamp with time zone not null default now();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

insert into storage.buckets
  (id, name)
values
  ('productImages', 'productImages');
