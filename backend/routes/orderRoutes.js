import express from "express";
const router = express.Router();
import { 
    addOrderItems,
    getAllOrders,
    getMyOrders,
    getOrderById,
    updateToDelivered,
    updateOrderToPaid,
 } from "../controllers/orderController.js";

 import { protect, admin } from "../middleware/authMiddleware.js"

 // All folowing routes start with /api/orders/...

// GET - get all orders (admin) or POST - add order items (registered/admin)
router.route('/').get(protect, admin, getAllOrders).post(protect, addOrderItems); 
// GET - get my orders - registered users
router.route('/myorders').get(protect, getMyOrders);
// GET - order by ID - Admin users 
router.route('/:id').get(protect, admin, getOrderById);
// PUT - update to paid - admin/registered
router.route('/:id/pay').put(protect, updateOrderToPaid);
// PUT - update to delivered - admin/registered
router.route('/:id/deliver').put(protect, updateToDelivered);


export default router;