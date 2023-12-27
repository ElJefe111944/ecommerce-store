import express from "express";
const router = express.Router();
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
 } from "../controllers/userController.js";
 import { protect, admin } from "../middleware/authMiddleware.js"

 // All folowing routes start with /api/users/...

// GET - get users or POST - register users 
router.route('/').get(protect, admin, getUsers).post(registerUser); 
// POST - logout user
router.post('/logout', logoutUser);
// POST - login user
router.post('/auth', authUser);
// GET - get user profile or PUT - update user profile -- PROTECTED
router.route('/profile').get(protect, getUserProfile).put(protect,updateUserProfile);
// DELETE - delete user profile or GET - get users or PUT - update user 
router.route('/:id').delete(protect, admin,deleteUser).put(protect, admin,updateUser).get(protect, admin,getUserById);  

export default router;