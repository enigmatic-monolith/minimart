CREATE OR REPLACE FUNCTION log_products_action()
RETURNS TRIGGER AS $$
DECLARE
  action_msg TEXT;
  performed_by UUID;
BEGIN
  IF TG_OP = 'INSERT' THEN
    action_msg := 'created';
    performed_by := NEW.created_by;
  ELSIF TG_OP = 'UPDATE' AND NEW IS DISTINCT FROM OLD THEN
    action_msg := 'edited';
    performed_by := NEW.last_updated_by;
  END IF;

  IF action_msg IS NOT NULL THEN
    INSERT INTO public.audit_logs (table_name, record_id, action, performed_by)
    VALUES ('products', NEW.id, action_msg, performed_by);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS trigger_products_audit ON public.products;
CREATE TRIGGER trigger_products_audit
AFTER INSERT OR UPDATE OR DELETE ON public.products
FOR EACH ROW EXECUTE FUNCTION log_products_action();