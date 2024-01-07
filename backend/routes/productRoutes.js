import express from "express";
const router = express.Router();
import {
    getProducts,
    getProductById,
    createProduct,
    updateProducts,
    deleteProduct,
    createProductReview
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// All Products API
router.route('/').get(getProducts).post(protect, admin, createProduct);
// Single Products API
router.route('/:id').get(getProductById).put(protect, admin, updateProducts).delete(protect, admin, deleteProduct);
// reviews
router.route('/:id/reviews').post(protect, createProductReview);
export default router;