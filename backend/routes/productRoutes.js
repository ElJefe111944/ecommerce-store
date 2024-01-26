import express from "express";
const router = express.Router();
import {
    getProducts,
    getProductById,
    createProduct,
    updateProducts,
    deleteProduct,
    createProductReview,
    getTopProducts
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

// All Products API
router.route('/').get(getProducts).post(protect, admin, createProduct);
// Top rated products
router.get('/top', getTopProducts);
// Single Products API
router.route('/:id').get(checkObjectId, getProductById).put(protect, admin, checkObjectId, updateProducts).delete(protect, admin, checkObjectId, deleteProduct);
// reviews
router.route('/:id/reviews').post(protect,checkObjectId, createProductReview);
export default router;