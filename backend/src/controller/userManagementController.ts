import { Response } from "express";
import { AuthRequest } from "../middleware/authentication";
import { supabaseAuthClient, supabaseClient } from "../services/supabaseClient";

export const getAllUsers = async (req: AuthRequest, res: Response) => {
    const supabase = supabaseAuthClient();

    const { data: { users }, error } = await supabase.auth.admin.listUsers();


    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }

    res.json(users);

    return;
};

export const banUser = async (req: AuthRequest, res: Response) => {
    const { id } = req.body;
    const supabase = supabaseClient(req.accessToken ?? '');

    if (typeof id !== 'string') {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
    }

    const { data: bannedUser, error: bannedUserError } = await supabase
        .from('banned_users')
        .select('*')
        .eq('user_id', id);
    if (bannedUserError) {
        res.status(500).json({ error: bannedUserError.message });
        return;
    }

    if (bannedUser.length > 0) {
        res.status(400).json({ error: 'User is already banned' });
        return;
    }

    const { data, error } = await supabase
        .from('banned_users')
        .insert([{ user_id: id }]);
    
    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }

    res.status(201).json(data);
};

export const unbanUser = async (req: AuthRequest, res: Response) => {
    const { id } = req.body;
    const supabase = supabaseClient(req.accessToken ?? '');

    if (typeof id !== 'string') {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
    }

    const { data, error } = await supabase
        .from('banned_users')
        .delete()
        .eq('user_id', id);
    
    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }

    res.json(data);
};
