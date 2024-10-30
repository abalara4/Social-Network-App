"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    friends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    thoughts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Thought' }]
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
