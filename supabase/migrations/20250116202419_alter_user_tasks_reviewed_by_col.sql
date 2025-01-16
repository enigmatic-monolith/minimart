alter table "public"."user_tasks" alter column "reviewed_by" set data type uuid using "reviewed_by"::uuid;

alter table "public"."user_tasks" add constraint "user_tasks_reviewed_by_fkey" FOREIGN KEY (reviewed_by) REFERENCES auth.users(id) not valid;

alter table "public"."user_tasks" validate constraint "user_tasks_reviewed_by_fkey";


