import express from "express";
import { authorizeRole } from "../middleware/authorization";
import { getAllOrdersForUser, getOrderDetailsById, placeOrder } from "../controller/orderController";

const router = express.Router();

router.get("/", authorizeRole(['resident']), getAllOrdersForUser);

router.get("/:id", authorizeRole(['resident']), getOrderDetailsById);

router.post("/", authorizeRole(['resident']), placeOrder);

export default router;
