alter table "public"."user_tasks" add column "last_updated_by" uuid default auth.uid();

alter table "public"."user_tasks" add constraint "user_tasks_last_updated_by_fkey" FOREIGN KEY (last_updated_by) REFERENCES auth.users(id) not valid;

alter table "public"."user_tasks" validate constraint "user_tasks_last_updated_by_fkey";