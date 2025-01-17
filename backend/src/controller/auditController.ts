import { Response } from "express";
import { supabaseClient } from "../services/supabaseClient";
import { AuthRequest } from "../middleware/authentication";
import { Tables } from "../database.types";

export type AuditLogs = Tables<"audit_logs">;
const auditLogsTbl = "audit_logs";

export const getAllAuditLogs = async (req: AuthRequest, res: Response) => {
  const supabase = supabaseClient(req.accessToken ?? "");

  const { data, error } = await supabase
    .from(auditLogsTbl)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(data);

  return;
};
