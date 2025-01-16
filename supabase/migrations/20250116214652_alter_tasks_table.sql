alter table "public"."tasks" add column "created_by" uuid default auth.uid() not null;

alter table "public"."products" alter column "created_by" set default auth.uid();

alter table "public"."products" alter column "last_updated_by" set default auth.uid();

alter table "public"."tasks" add column "last_updated_by" uuid default auth.uid();

alter table "public"."tasks" add constraint "tasks_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."tasks" validate constraint "tasks_created_by_fkey";

alter table "public"."tasks" add constraint "tasks_last_updated_by_fkey" FOREIGN KEY (last_updated_by) REFERENCES auth.users(id) not valid;

alter table "public"."tasks" validate constraint "tasks_last_updated_by_fkey";

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated_at = NOW();
    NEW.last_updated_by = auth.uid();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
