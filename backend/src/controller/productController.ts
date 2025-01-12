import { Response } from 'express';
import { AuthRequest } from '../middleware/authentication';
import { supabaseClient } from '../services/supabaseClient';

export const getAllProducts = async (req: AuthRequest, res: Response) => {
    const supabase = supabaseClient(req.accessToken ?? '');

    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }

    res.json({ profile: data });
    
    return;
};