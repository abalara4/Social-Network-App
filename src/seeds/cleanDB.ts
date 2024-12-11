import { Thought, User } from '../models';
import mongoose from 'mongoose';

const cleanDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network', {
        }); // Ensure connection is established
        await User.deleteMany({});
        await Thought.deleteMany({});
        console.log('Database cleaned');
    } catch (error) {
        console.error('Error cleaning database:', error);
    } finally {
        process.exit(0);
    }
};

export default cleanDB;