import { Response, NextFunction } from "express";
import { AuthRequest } from "./authentication";

export const authorizeRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.user_role)) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }
    next();
  };
};
  