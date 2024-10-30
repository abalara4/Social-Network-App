import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} from '../controllers/userController';

const router = Router();

// Define routes for users
router.route('/')
    .get(getAllUsers)        // GET all users
    .post(createUser);       // Create a new user

router.route('/:id')
    .get(getUserById)       // GET user by ID
    .put(updateUser)        // Update user by ID
    .delete(deleteUser);    // Delete user by ID

// Define routes for adding/removing friends
router.route('/:userId/friends/:friendId')
    .post(addFriend)        // Add a friend
    .delete(removeFriend);  // Remove a friend

export default router;


