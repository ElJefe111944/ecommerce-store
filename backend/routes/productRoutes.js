import express from "express";
const router = express.Router();
import { getProducts, getProductById } from "../controllers/productController.js";

// All Products API
router.route('/').get(getProducts);
// Single Products API
router.route('/:id').get(getProductById);

export default router;