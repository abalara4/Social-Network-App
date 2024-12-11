import { Request, Response } from 'express';
import Thought from '../models/Thought'; // Import the Thought model

// Get all thoughts
export const getThoughts = async (req: Request, res: Response): Promise<void> => {
    try {
        const thoughts = await Thought.find(); // Fetch all thoughts
        res.status(200).json(thoughts); // Send the thoughts as a response
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving thoughts', error });
    }
};

// Get a single thought by ID
export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findById(req.params.id); // Find thought by ID
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return; // Exit the function if thought is not found
        }
        res.status(200).json(thought); // Send the thought as a response
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving thought', error });
    }
};

// Create a new thought
export const createThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.create(req.body); // Create a new thought
        res.status(201).json(thought); // Send the new thought as a response
    } catch (error) {
        res.status(500).json({ message: 'Error creating thought', error });
    }
};

// Update a thought by ID
export const updateThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const thoughtId = req.params.id; // Get the thought ID from the URL parameters
        const updatedData = req.body; // Get the updated data from the request body

        const thought = await Thought.findByIdAndUpdate(thoughtId, updatedData, { new: true });

        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return; // Exit the function if thought is not found
        }

        res.status(200).json(thought); // Send the updated thought as a response
    } catch (error) {
        res.status(500).json({ message: 'Error updating thought', error });
    }
};

// Delete a thought by ID
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const thoughtId = req.params.id; // Get the thought ID from the URL parameters

        const thought = await Thought.findByIdAndDelete(thoughtId);

        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return; // Exit the function if thought is not found
        }

        res.status(200).json({ message: 'Thought deleted successfully' }); // Send success message
    } catch (error) {
        res.status(500).json({ message: 'Error deleting thought', error });
    }
};