import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { supabaseClient } from '../services/supabaseClient';

dotenv.config();

export interface AuthRequest extends Request {
  user?: any;
  accessToken?: string;
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const secret = process.env.SUPABASE_JWT_SECRET as string;
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Attach user data to the request
    req.accessToken = token;
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }

  if (req.user) {
    const userId = req.user.sub;
    const supabase = supabaseClient(req.accessToken ?? '');
    const { data, error } = await supabase
      .from('banned_users')
      .select('*')
      .eq('user_id', userId);
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    if (data.length > 0) {
      res.status(403).json({ message: 'User is banned' });
      return;
    }
  }

  next();
};
