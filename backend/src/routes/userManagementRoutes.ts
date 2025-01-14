import express from 'express';
import { banUser, getAllUsers, resetPassword, unbanUser } from '../controller/userManagementController';
import { authorizeRole } from '../middleware/authorization';

const router = express.Router();

router.get("/", authorizeRole(['admin']), getAllUsers);

router.post("/ban", authorizeRole(['admin']), banUser);

router.put("/ban", authorizeRole(['admin']), unbanUser);

router.post("/reset-password", authorizeRole(['admin']), resetPassword);

export default router;
