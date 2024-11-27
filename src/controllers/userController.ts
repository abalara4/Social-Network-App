import { Request, Response } from "express";
import { User, Thought } from "../models";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate("thoughts").populate("friends");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
      const user = await User.findById(req.params.id).populate('thoughts friends');
      if (!user) {
          res.status(404).json({ message: 'User not found' });
          return; // Ensure to return after sending a response
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email } = req.body; // Adjust the fields based on your User model

  try {
      const user = await User.findByIdAndUpdate(
          req.params.id,
          { username, email }, // Update the fields as necessary
          { new: true, runValidators: true } // Ensure to return the updated document and run validators
      );
      if (!user) {
          res.status(404).json({ message: 'User not found' });
          return; // Ensure to return after sending a response
      }
      res.json(user);
  } catch (error) {
      res.status(400).json({ message: 'Error updating user', error });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
          res.status(404).json({ message: 'User not found' });
          return; // Ensure to return after sending a response
      }

      // Optionally, you can also delete associated thoughts if required
      await Thought.deleteMany({ username: user.username }); // Adjust based on your logic

      res.json({ message: 'User deleted' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
  }
};

export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
      const user = await User.findByIdAndUpdate(
          req.params.id,
          { $addToSet: { friends: req.params.friendId } }, // Use $addToSet to avoid duplicates
          { new: true }
      );
      if (!user) {
          res.status(404).json({ message: 'User not found' });
          return; // Ensure to return after sending a response
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: 'Error adding friend', error });
  }
};

export const removeFriend = async (req: Request, res: Response): Promise<void> => {
  try {
      const user = await User.findByIdAndUpdate(
          req.params.id,
          { $pull: { friends: req.params.friendId } }, // Use $pull to remove the friend
          { new: true }
      );
      if (!user) {
          res.status(404).json({ message: 'User not found' });
          return; // Ensure to return after sending a response
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: 'Error removing friend', error });
  }
};
