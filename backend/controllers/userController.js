import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js";

// description: auth user & get token
// route: POST /api/users/login
// access: public
const authUser = asyncHandler(async (req, res) => {
    res.send('Auth Users');
});

// description: register user
// route: GET /api/users
// access: public
const registerUser = asyncHandler(async (req, res) => {
    res.send('Register User');
});

// description: logout user / clear cookie
// route: POST /api/users/logout
// access: private
const logoutUser = asyncHandler(async (req, res) => {
    res.send('Logout user');
});

// description: get user profile
// route: GET /api/users/profile
// access: private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('Get User profile');
});

// description: update user profile
// route: PUT /api/users/profile
// access: private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('Update User profile');
});

// description: get users 
// route: GET /api/users
// access: private/admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('Get Users');
});

// description: delete users 
// route: DELETE /api/users/:id
// access: private/admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('Delete User');
});