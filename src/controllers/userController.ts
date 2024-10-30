import { Request, Response } from 'express';
import User from '../models/User';

// GET all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().populate('thoughts friends');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// GET a single user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).populate('thoughts friends');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

// POST a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
};

// PUT to update a user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
    }
};

// DELETE a user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

// POST to add a friend
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error adding friend', error });
    }
};

// DELETE to remove a friend
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error removing friend', error });
    }
};



