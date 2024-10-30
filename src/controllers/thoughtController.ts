import { Request, Response } from 'express';
import Thought from '../models/Thoughts';
import User from '../models/User';

// GET all thoughts
export const getAllThoughts = async (req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find().populate('reactions');
        res.json(thoughts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching thoughts', error });
    }
};

// GET a single thought by ID
export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.id).populate('reactions');
        if (!thought) return res.status(404).json({ message: 'Thought not found' });
        res.json(thought);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching thought', error });
    }
};

// POST to create a new thought
export const createThought = async (req: Request, res: Response) => {
    const { thoughtText, username, userId } = req.body;

    try {
        const thought = new Thought({ thoughtText, username });
        await thought.save();

        await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });
        res.status(201).json(thought);
    } catch (error) {
        res.status(400).json({ message: 'Error creating thought', error });
    }
};

// PUT to update a thought
export const updateThought = async (req: Request, res: Response) => {
    const { thoughtText } = req.body;

    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, { thoughtText }, { new: true });
        if (!thought) return res.status(404).json({ message: 'Thought not found' });
        res.json(thought);
    } catch (error) {
        res.status(400).json({ message: 'Error updating thought', error });
    }
};

// DELETE a thought
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought) return res.status(404).json({ message: 'Thought not found' });

        await User.findByIdAndUpdate(thought.username, { $pull: { thoughts: thought._id } });
        res.json({ message: 'Thought deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting thought', error });
    }
};

// POST to create a reaction
export const createReaction = async (req: Request, res: Response) => {
    const { reactionBody, username } = req.body;

    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: { reactionBody, username } } },
            { new: true }
        );
        if (!thought) return res.status(404).json({ message: 'Thought not found' });
        res.json(thought);
    } catch (error) {
        res.status(500).json({ message: 'Error creating reaction', error });
    }
};

// DELETE a reaction
export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        if (!thought) return res.status(404).json({ message: 'Thought not found' });
        res.json(thought);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting reaction', error });
    }
};

