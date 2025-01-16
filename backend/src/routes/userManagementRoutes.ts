import express from 'express';
import { banUser, getAllUsers, getUserById, resetPassword, setPassword, unbanUser } from '../controller/userManagementController';
import { authorizeRole } from '../middleware/authorization';

const router = express.Router();

router.get("/", authorizeRole(['admin']), getAllUsers);

router.get("/:id", getUserById);

router.post("/ban", authorizeRole(['admin']), banUser);

router.put("/ban", authorizeRole(['admin']), unbanUser);

router.post("/reset-password", authorizeRole(['admin']), resetPassword);

router.post("/set-password", setPassword);

export default router;
