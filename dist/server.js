"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const thoughtRoutes_1 = __importDefault(require("./routes/thoughtRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/users', userRoutes_1.default); // Mount user routes
app.use('/api/thoughts', thoughtRoutes_1.default); // Mount thought routes
// Database connection
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetwork')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Database connection error:', error));
// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
