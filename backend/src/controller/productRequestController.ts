import { Response } from "express";
import { AuthRequest } from "../middleware/authentication";
import { supabaseClient } from "../services/supabaseClient";
import { Enums, Tables } from "../database.types";

export type ProductRequest = Tables<"product_requests">;
const productRequestsTbl = "product_requests";

export const getAllProductRequests = async (req: AuthRequest, res: Response) => {
  const supabase = supabaseClient(req.accessToken ?? "");

  const { data, error } = await supabase.from(productRequestsTbl).select("*");

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(data);

  return;
};

export const updateProductRequestStatus =
  (status: Enums<"product_request_status">) => async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const supabase = supabaseClient(req.accessToken ?? "");

    const { data, error } = await supabase
      .from(productRequestsTbl)
      .update({ status: status, reviewed_at: new Date().toISOString(), reviewed_by: req.user.sub })
      .eq("id", id)

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.status(200).json(data);
  };