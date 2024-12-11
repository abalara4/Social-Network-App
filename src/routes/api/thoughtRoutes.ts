import express from 'express';
import {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} from '../../controllers/thoughtController.js';

const router = express.Router();

router.route('/')
    .get(getThoughts)          // This maps to GET /api/thoughts
    .post(createThought);      // This maps to POST /api/thoughts

// /api/thoughts/:id
router.route('/:id')
    .get(getThoughtById)      // This maps to GET /api/thoughts/:id
    .put(updateThought)       // This maps to PUT /api/thoughts/:id
    .delete(deleteThought);    // This maps to DELETE /api/thoughts/:id

export default router;
