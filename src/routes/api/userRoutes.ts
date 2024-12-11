import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} from '../../controllers/userController';

const router = express.Router();

// User routes
router.get('/users', getUsers); // This will be accessed at /api/users
router.get('/users/:id', getUserById); // /api/users/:id
router.post('/users', createUser); // /api/users
router.put('/users/:id', updateUser); // /api/users/:id
router.delete('/users/:id', deleteUser); // /api/users/:id
router.post('/users/:userId/friends/:friendId', addFriend); // /api/users/:userId/friends/:friendId
router.delete('/users/:userId/friends/:friendId', removeFriend); // /api/users/:userId/friends/:friendId

export default router;
