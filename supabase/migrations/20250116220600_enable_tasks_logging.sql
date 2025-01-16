CREATE OR REPLACE FUNCTION log_tasks_action()
RETURNS TRIGGER AS $$
DECLARE
  action_msg TEXT;
  performed_by UUID;
BEGIN
  IF TG_OP = 'INSERT' THEN
    action_msg := 'created';
    performed_by := NEW.created_by;
  ELSIF TG_OP = 'UPDATE' AND OLD.archived_at is NULL AND NEW.archived_at IS NOT NULL THEN
    action_msg := 'archived';
    performed_by := NEW.last_updated_by;
  ELSIF TG_OP = 'UPDATE' AND OLD.archived_at is NOT NULL AND NEW.archived_at IS NULL THEN
    action_msg := 'restored';
    performed_by := NEW.last_updated_by;  
  ELSIF TG_OP = 'UPDATE' AND NEW IS DISTINCT FROM OLD THEN
    action_msg := 'edited';
    performed_by := NEW.last_updated_by;
  END IF;

  IF action_msg IS NOT NULL THEN
    INSERT INTO public.audit_logs (table_name, record_id, action, performed_by)
    VALUES ('tasks', NEW.id, action_msg, performed_by);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS trigger_tasks_audit ON public.tasks;
CREATE TRIGGER trigger_tasks_audit
AFTER INSERT OR UPDATE OR DELETE ON public.tasks
FOR EACH ROW EXECUTE FUNCTION log_tasks_action();