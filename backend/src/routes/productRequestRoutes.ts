import express from "express";
import { authorizeRole } from "../middleware/authorization";
import { getAllProductRequests, updateProductRequestStatus } from "../controller/productRequestController";

const router = express.Router();

router.get("/", getAllProductRequests);

router.put("/:id/approve", authorizeRole(["admin"]), updateProductRequestStatus("approved"));

router.put("/:id/reject", authorizeRole(["admin"]), updateProductRequestStatus("rejected"));

export default router;
