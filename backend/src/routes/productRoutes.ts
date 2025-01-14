import express from 'express';
import { createProduct, getAllProducts } from '../controller/productController';
import { upload } from '../services/multer';

const router = express.Router();

router.get('/', getAllProducts);

router.post('/', upload.single('file'), createProduct);

export default router;