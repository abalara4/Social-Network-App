import { Request, Response } from "express";
import { Thought, User } from "../models";

export const getThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
  try {
      const thought = await Thought.findById(req.params.id).populate('reactions');
      if (!thought) {
          res.status(404).json({ message: 'Thought not found' });
          return; // Ensure to return after sending a response
      }
      res.json(thought);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching thought', error });
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    // Add the thought ID to the associated user's thoughts array
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { thoughts: thought._id },
    });
    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateThought = async (req: Request, res: Response): Promise<void> => {
  const { thoughtText } = req.body;

  try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, { thoughtText }, { new: true });
      if (!thought) {
          res.status(404).json({ message: 'Thought not found' });
          return; // Ensure to return after sending a response
      }
      res.json(thought);
  } catch (error) {
      res.status(400).json({ message: 'Error updating thought', error });
  }
};

export const deleteThought = async (req: Request, res: Response): Promise<void> => {
  try {
      const thought = await Thought.findByIdAndDelete(req.params.id);
      if (!thought) {
          res.status(404).json({ message: 'Thought not found' });
          return; // Ensure to return after sending a response
      }

      await User.findByIdAndUpdate(thought.username, { $pull: { thoughts: thought._id } });
      res.json({ message: 'Thought deleted' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting thought', error });
  }
};

export const createReaction = async (req: Request, res: Response): Promise<void> => {
  const { reactionBody, username } = req.body;

  try {
      const thought = await Thought.findByIdAndUpdate(
          req.params.thoughtId,
          { $push: { reactions: { reactionBody, username } } },
          { new: true }
      );
      if (!thought) {
          res.status(404).json({ message: 'Thought not found' });
          return; // Ensure to return after sending a response
      }
      res.json(thought);
  } catch (error) {
      res.status(500).json({ message: 'Error creating reaction', error });
  }
};

export const deleteReaction = async (req: Request, res: Response): Promise<void> => {
  try {
      const thought = await Thought.findByIdAndUpdate(
          req.params.thoughtId,
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { new: true }
      );
      if (!thought) {
          res.status(404).json({ message: 'Thought not found' });
          return; // Ensure to return after sending a response
      }
      res.json(thought);
  } catch (error) {
      res.status(500).json({ message: 'Error deleting reaction', error });
  }
};