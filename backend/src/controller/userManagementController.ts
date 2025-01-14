import { Response } from "express";
import { Tables } from "../database.types";
import { AuthRequest } from "../middleware/authentication";
import { supabaseAuthClient } from "../services/supabaseClient";

export const getAllUsers = async (req: AuthRequest, res: Response) => {
    const supabase = supabaseAuthClient();

    const { data, error } = await supabase.auth.admin.listUsers();


    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }

    res.json(data);

    return;
};
