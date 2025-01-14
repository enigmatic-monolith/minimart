import express from 'express';
import { getAllUsers } from '../controller/userManagementController';
import { authorizeRole } from '../middleware/authorization';

const router = express.Router();

router.get("/", authorizeRole(['admin']), getAllUsers);

export default router;
