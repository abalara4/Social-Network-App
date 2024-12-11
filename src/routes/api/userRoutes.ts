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

router.route('/')
    .get(getUsers)          // This maps to GET /api/users
    .post(createUser);      // This maps to POST /api/users

// /api/users/:id
router.route('/:id')
    .get(getUserById)      // This maps to GET /api/users/:id
    .put(updateUser)       // This maps to PUT /api/users/:id
    .delete(deleteUser);    // This maps to DELETE /api/users/:id

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)       // This maps to POST /api/users/:userId/friends/:friendId
    .delete(removeFriend);  // This maps to DELETE /api/users/:userId/friends/:friendId



export default router;


