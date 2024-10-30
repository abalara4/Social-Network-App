"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReaction = exports.addReaction = exports.deleteThoughtById = exports.updateThoughtById = exports.getThoughtById = exports.createThought = exports.getAllThoughts = void 0;
const Thoughts_1 = __importDefault(require("../models/Thoughts"));
const User_1 = __importDefault(require("../models/User"));
// Get all thoughts
const getAllThoughts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield Thoughts_1.default.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching thoughts', error });
    }
});
exports.getAllThoughts = getAllThoughts;
// Create a new thought
const createThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thoughtText, username, userId } = req.body;
    try {
        const thought = new Thoughts_1.default({ thoughtText, username });
        yield thought.save();
        // Add thought to user's list
        yield User_1.default.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });
        res.status(201).json(thought);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating thought', error });
    }
});
exports.createThought = createThought;
// Get thought by ID
const getThoughtById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thoughts_1.default.findById(req.params.id);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.json(thought);
    }
    catch (error) {
        next(error); // Pass the error to the next middleware
    }
});
exports.getThoughtById = getThoughtById;
// Update thought by ID
const updateThoughtById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { thoughtText } = req.body;
    try {
        const thought = yield Thoughts_1.default.findByIdAndUpdate(req.params.id, { thoughtText }, { new: true, runValidators: true } // Ensure validators are run
        );
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.json(thought);
    }
    catch (error) {
        next(error); // Pass the error to the next middleware
    }
});
exports.updateThoughtById = updateThoughtById;
// Delete thought by ID
const deleteThoughtById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thoughts_1.default.findByIdAndDelete(req.params.id);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        res.json({ message: 'Thought deleted' });
    }
    catch (error) {
        next(error); // Pass the error to the next middleware
    }
});
exports.deleteThoughtById = deleteThoughtById;
// Add reaction to thought
const addReaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { reactionBody, username } = req.body;
    try {
        const thought = yield Thoughts_1.default.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: { reactionBody, username, createdAt: new Date() } } }, { new: true, runValidators: true } // Ensure validators are run
        );
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.json(thought);
    }
    catch (error) {
        next(error); // Pass the error to the next middleware
    }
});
exports.addReaction = addReaction;
// Delete reaction from thought
const deleteReaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thoughts_1.default.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { _id: req.params.reactionId } } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    }
    catch (error) {
        next(error); // Pass the error to the next middleware
    }
});
exports.deleteReaction = deleteReaction;
