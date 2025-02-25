import express from "express";
import {
  createProduct,
  getAllProductLog,
  getAllProducts,
  updateProduct,
  uploadProductImage,
} from "../controller/productController";
import { upload } from "../services/multer";
import { authorizeRole } from "../middleware/authorization";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/log", authorizeRole(['admin']), getAllProductLog);

router.post("/", authorizeRole(["admin"]), createProduct);

router.put("/:id", authorizeRole(["admin"]), updateProduct);

router.post(
  "/image",
  authorizeRole(["admin"]),
  upload.single("file"),
  uploadProductImage
);

export default router;
