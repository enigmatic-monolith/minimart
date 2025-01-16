CREATE OR REPLACE FUNCTION log_product_requests_action()
RETURNS TRIGGER AS $$
DECLARE
  action_msg TEXT;
BEGIN
  IF TG_OP = 'UPDATE' AND NEW IS NOT DISTINCT FROM OLD THEN
    RETURN NEW;
  END IF;

  -- Log approval and rejection
  IF TG_OP = 'UPDATE' AND NEW.status = 'approved' THEN
    action_msg := 'approved';
  ELSIF TG_OP = 'UPDATE' AND NEW.status = 'rejected' THEN
    action_msg := 'rejected';
  END IF;

  IF action_msg IS NOT NULL THEN
    INSERT INTO public.audit_logs (table_name, record_id, action, performed_by)
    VALUES ('product_requests', NEW.id, action_msg, NEW.reviewed_by);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_product_requests_audit
AFTER INSERT OR UPDATE OR DELETE ON public.product_requests
FOR EACH ROW EXECUTE FUNCTION log_product_requests_action();

CREATE OR REPLACE FUNCTION log_user_tasks_action()
RETURNS TRIGGER AS $$
DECLARE
  action_msg TEXT;
BEGIN
  IF TG_OP = 'UPDATE' AND NEW IS NOT DISTINCT FROM OLD THEN
    RETURN NEW;
  END IF;

  -- Log approval and rejection
  IF TG_OP = 'UPDATE' AND NEW.status = 'approved' THEN
    action_msg := 'approved';
  ELSIF TG_OP = 'UPDATE' AND NEW.status = 'rejected' THEN
    action_msg := 'rejected';
  END IF;

  IF action_msg IS NOT NULL THEN
    INSERT INTO public.audit_logs (table_name, record_id, action, performed_by)
    VALUES ('user_tasks', NEW.id, action_msg, NEW.reviewed_by);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_user_tasks_audit
AFTER INSERT OR UPDATE OR DELETE ON public.user_tasks
FOR EACH ROW EXECUTE FUNCTION log_user_tasks_action();
