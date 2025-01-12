import { Response, NextFunction } from "express";
import { AuthRequest } from "./authentication";
import { Enums } from "../database.types";

export type AppRole = Enums<'app_role'>;

export const authorizeRole = (roles: AppRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.user_role)) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }
    next();
  };
};
  