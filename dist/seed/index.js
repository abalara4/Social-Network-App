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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Thoughts_1 = __importDefault(require("../models/Thoughts"));
const User_1 = __importDefault(require("../models/User"));
const seedThoughts_1 = __importDefault(require("./seedThoughts"));
const seedUsers_1 = __importDefault(require("./seedUsers"));
dotenv_1.default.config();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetwork');
        console.log('Database connected.');
    }
    catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
});
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    // Clear existing data
    yield Thoughts_1.default.deleteMany({});
    yield User_1.default.deleteMany({});
    // Insert users
    const users = yield User_1.default.insertMany(seedUsers_1.default);
    console.log('Users seeded:', users);
    // Insert thoughts with references to users
    const thoughts = seedThoughts_1.default.map((thought) => (Object.assign(Object.assign({}, thought), { userId: users[Math.floor(Math.random() * users.length)]._id // Assign a random user
     })));
    const seededThoughts = yield Thoughts_1.default.insertMany(thoughts);
    console.log('Thoughts seeded:', seededThoughts);
    // Close the database connection
    mongoose_1.default.connection.close();
});
// Run the seeding process
seedDatabase()
    .then(() => console.log('Seeding complete.'))
    .catch((error) => console.error('Seeding error:', error));
