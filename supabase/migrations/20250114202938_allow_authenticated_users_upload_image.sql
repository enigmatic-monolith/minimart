create policy "Allow authenticated users to upload images cel5c7_0"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'productImages'::text));


create policy "Allow authenticated users to upload images cel5c7_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check ((bucket_id = 'productImages'::text));


create policy "Allow authenticated users to upload images cel5c7_2"
on "storage"."objects"
as permissive
for update
to authenticated
using ((bucket_id = 'productImages'::text));



