import { Response } from "express";
import { AuthRequest } from "../middleware/authentication";
import { supabaseAuthClient, supabaseClient } from "../services/supabaseClient";
import { plainToInstance } from 'class-transformer';
import nodemailer from 'nodemailer';
import { UserInfo } from "../validator/userManagementValidator";
import { validate } from "class-validator";

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
    const supabase = supabaseClient(req.accessToken ?? '');

    const userInfo = plainToInstance(UserInfo, [req.body])[0];
    const errors = await validate(userInfo);
    if (errors.length > 0) {
        res.status(400).json(errors);
        return;
    }
    const id = userInfo.id;

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
    const supabase = supabaseClient(req.accessToken ?? '');

    const userInfo = plainToInstance(UserInfo, [req.body])[0];
    const errors = await validate(userInfo);
    if (errors.length > 0) {
        res.status(400).json(errors);
        return;
    }
    const id = userInfo.id;

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

export const resetPassword = async (req: AuthRequest, res: Response) => {
    const userInfo = plainToInstance(UserInfo, [req.body])[0];
    const errors = await validate(userInfo);
    if (errors.length > 0) {
        res.status(400).json(errors);
        return;
    }

    const supabaseAuth = supabaseAuthClient();
    const { data: { user }, error } = await supabaseAuth.auth.admin.getUserById(userInfo.id);
    if (error) {
        res.status(500).json(error);
        return;
    }
    const email = user!.email;
    if (!email) {
        res.status(500).json({"error": "User has no email"});
        return;
    }

    const token = crypto.randomUUID();
    const data = new TextEncoder().encode(token);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const supabase = supabaseClient(req.accessToken ?? '');
    const { error: updateError } = await supabase
        .from('reset_password_tokens')
        .insert([{ user_id: userInfo.id, token: hashHex }]);
    if (updateError) {
        res.status(500).json(updateError);
        return;
    }

    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.zoho.com",
            auth: {
                user: 'admin@minimart.nknguyenhc.net',
                pass: process.env.EMAIL_PASSWORD,
            },
        secure: true,
    });
    const mailData = {
        from: 'admin@minimart.nknguyenhc.net',
        to: email,
        subject: 'Testing email with nodejs',
        html: `Hello! Quack quack ${token}`,
    };
    transporter.sendMail(mailData, function (err, info) {
        if (err)
            console.error(err);
        else
            console.log(info);
    });
    res.status(201).json({ success: true })
};
