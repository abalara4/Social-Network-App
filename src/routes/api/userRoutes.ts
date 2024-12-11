// userRoutes.ts
import { Router } from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} from '../../controllers/userController';

const router = Router();

// Correctly defined GET route for all users
router.get('/', getUsers);  // This maps to GET /api/users
router.get('/:id', getUserById);  // This maps to GET /api/users/:id
router.post('/', createUser);  // This maps to POST /api/users
router.put('/:id', updateUser);  // This maps to PUT /api/users/:id
router.delete('/:id', deleteUser);  // This maps to DELETE /api/users/:id
router.post('/:userId/friends/:friendId', addFriend);  // This maps to POST /api/users/:userId/friends/:friendId
router.delete('/:userId/friends/:friendId', removeFriend);  // This maps to DELETE /api/users/:userId/friends/:friendId


export default router;


