import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../models/orderModel.js";

// Note: id will be obtained from order in the cookie

// description: Create new order
// route: POST /api/orders
// access: private

const addOrderItems = asyncHandler(async (req, res) => {
    res.send('add order items');
});

// description: Get logged in users order
// route: GET /api/orders/myorders
// access: private

const getMyOrders = asyncHandler(async (req, res) => {
    res.send('get my orders');
});

// description: Get order by ID
// route: GET /api/orders/:id
// access: private

const getOrderById = asyncHandler(async (req, res) => {
    res.send('get order by ID');
});

// description: Update order to paid
// route: GET /api/orders/:id/pay
// access: private

const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('Update order to paid');
});

// description: Update order to delievered
// route: GET /api/orders/:id/deliver
// access: private/admin

const updateToDelivered = asyncHandler(async (req, res) => {
    res.send('Update to delivered');
});

// description: Get all orders
// route: GET /api/orders
// access: private/admin

const getAllOrders = asyncHandler(async (req, res) => {
    res.send('get all orders');
});

export {
    addOrderItems,
    getAllOrders,
    getMyOrders,
    getOrderById,
    updateToDelivered,
    updateOrderToPaid,
    updateToDelivered
}
