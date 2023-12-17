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

 // All folowing routes start with /api/users/...

// GET - get users or POST - register users 
router.route('/').get(getUsers).post(registerUser); 
// POST - logout user
router.post('/logout', logoutUser);
// POST - login user
router.post('/login', authUser);
// GET - get user profile or PUT - update user profile 
router.route('/profile').get(getUserProfile).put(updateUserProfile);
// DELETE - delete user profile or GET - get users or PUT - update user 
router.route('/:id').delete(deleteUser).put(updateUser).get(getUserById);  

export default router;