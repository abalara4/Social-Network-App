// userController.ts
import { Request, Response } from 'express';
import User from '../models/User';


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();  // Fetch all users
        res.status(200).json(users);  // Send the users as a response
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);  // Find user by ID
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);  // Send the user as a response
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);  // Create a new user
        res.status(201).json(user);  // Send the new user as a response
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id; // Get the user ID from the URL parameters
        const updatedData = req.body; // Get the updated data from the request body

        // Update the user in the database
        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return; // Exit the function if user is not found
        }

        res.status(200).json(user); // Send the updated user as a response
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id; // Get the user ID from the URL parameters

        // Attempt to delete the user from the database
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return; // Exit the function if user is not found
        }

        res.status(200).json({ message: 'User deleted successfully' }); // Send success message
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

export const addFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id; // Get the user ID from the URL parameters
        const friendId = req.body.friendId; // Get the friend ID from the request body

        // Validate that friendId is provided
        if (!friendId) {
            res.status(400).json({ message: 'Friend ID is required' });
            return; // Exit the function if friendId is not provided
        }

        // Find the user and add the friend
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } }, // Use $addToSet to avoid duplicates
            { new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return; // Exit the function if user is not found
        }

        res.status(200).json(user); // Send the updated user with the new friend
    } catch (error) {
        res.status(500).json({ message: 'Error adding friend', error });
    }
};

export const removeFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id; // Get the user ID from the URL parameters
        const friendId = req.body.friendId; // Get the friend ID from the request body

        // Validate that friendId is provided
        if (!friendId) {
            res.status(400).json({ message: 'Friend ID is required' });
            return; // Exit the function if friendId is not provided
        }

        // Find the user and remove the friend
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } }, // Use $pull to remove the friend
            { new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return; // Exit the function if user is not found
        }

        res.status(200).json(user); // Send the updated user with the friend removed
    } catch (error) {
        res.status(500).json({ message: 'Error removing friend', error });
    }
}
