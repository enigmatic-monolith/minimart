import express from "express";
import { getAllAuditLogs } from "../controller/auditController";
import { authorizeRole } from "../middleware/authorization";

const router = express.Router();

router.get("/", authorizeRole(['admin']), getAllAuditLogs);

export default router;
