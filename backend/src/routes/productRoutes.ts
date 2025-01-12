import express from 'express';
import { getAllProducts } from '../controller/productController';

const router = express.Router();

router.get('/', getAllProducts);

export default router;