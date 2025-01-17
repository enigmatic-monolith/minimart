CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (user_id, role)
  VALUES (NEW.id, 'resident');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE trigger on_auth_user_created
AFTER INSERT ON auth.users
FOR each ROW EXECUTE PROCEDURE public.handle_new_user();