import mongooseConnection from '../config/connection';
import { Thought, User } from '../models';

const cleanDB = async () => {
    try {
        mongooseConnection; // Ensure connection is established
        console.log('Database connection ready');

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