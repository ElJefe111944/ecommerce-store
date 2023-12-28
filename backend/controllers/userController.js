import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// description: auth user & get token
// route: POST /api/users/login
// access: public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))){

        // create token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        // set jwt as http-only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('Invaild email or password');
    };
});

// description: register user
// route: GET /api/users
// access: public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists){
        // Client error
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    };
 });

// description: logout user / clear cookie
// route: POST /api/users/logout
// access: private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'Logged out successfully' });
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

// description: get user by id
// route: GET /api/users/:id
// access: private/admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('Get User by ID');
});

// description: update users 
// route: PUT /api/users/:id
// access: private/admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('Update User');
});

// description: delete users 
// route: DELETE /api/users/:id
// access: private/admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('Delete User');
});

export { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
 }