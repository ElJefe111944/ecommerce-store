import express from "express";
const router = express.Router();
import { getProducts, getProductById, createProduct } from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// All Products API
router.route('/').get(getProducts).post(protect, admin, createProduct);
// Single Products API
router.route('/:id').get(getProductById);

export default router;