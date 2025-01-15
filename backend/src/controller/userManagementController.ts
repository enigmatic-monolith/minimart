import { Response } from "express";
import { AuthRequest } from "../middleware/authentication";
import { supabaseAuthClient, supabaseClient } from "../services/supabaseClient";
import { plainToInstance } from 'class-transformer';
import nodemailer from 'nodemailer';
import { SetPasswordInfo, UserInfo } from "../validator/userManagementValidator";
import { validate } from "class-validator";

export const getAllUsers = async (req: AuthRequest, res: Response) => {
    const supabaseAuth = supabaseAuthClient();
    const supabase = supabaseClient(req.accessToken ?? '');

    const { data: { users }, error } = await supabaseAuth.auth.admin.listUsers();
    const { data: bannedUsers, error: bannedUsersError } = await supabase
        .from('banned_users')
        .select('user_id');

    if (bannedUsersError) {
        res.status(500).json({ error: bannedUsersError.message });
        return;
    }

    const usersWithBanStatus = users.map((user: any) => {
        return {
            ...user,
            is_banned: bannedUsers.some((bannedUser: any) => bannedUser.user_id === user.id),
        };
    });

    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }

    res.json(usersWithBanStatus);

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

export const setPassword = async (req: AuthRequest, res: Response) => {
    const info = plainToInstance(SetPasswordInfo, [req.body])[0];
    const errors = await validate(info);
    if (errors.length > 0) {
        res.status(400).json(errors);
        return;
    }

    const supabase = supabaseClient(process.env.SUPABASE_SERVICE_ROLE_KEY as string);

    const { data, error } = await supabase
        .from('reset_password_tokens')
        .select('*')
        .eq('user_id', info.id);
    if (error) {
        res.status(400).json(error);
        return;
    }
    if (!data || data.length === 0) {
        res.status(400).json({ error: "Invalid user id" });
        return;
    }

    // 5 minutes
    const validityDuration = 5 * 60 * 1000;

    const encodedToken = new TextEncoder().encode(info.token);
    const hash = await crypto.subtle.digest('SHA-256', encodedToken);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    let isVerified = false;
    for (const item of data) {
        if (item.token === hashHex) {
            isVerified = new Date().getTime() < new Date(item.created_at).getTime() + validityDuration;
            break;
        }
    }
    if (!isVerified) {
        res.status(400).json({ error: "Invalid token" });
        return;
    }

    const { data: user, error: updateError } = await supabase.auth.admin.updateUserById(
        info.id,
        { password: info.newPassword },
    );

    await supabase.from('reset_password_tokens').delete().eq('user_id', info.id);

    if (updateError) {
        res.status(400).json(updateError);
        return;
    }

    res.status(200).json(user);
};
