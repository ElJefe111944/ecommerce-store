import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../models/orderModel.js";

// description: Create new order
// route: POST /api/orders
// access: private

const addOrderItems = asyncHandler(async (req, res) => {
    res.send('addOrderItems');
});