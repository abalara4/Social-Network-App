import User from '../models/User'; // Adjust the path as needed
import Thought from '../models/Thought'; // Adjust the path as needed

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Thought.deleteMany({});

        // Insert sample users
        const users = await User.insertMany([
            { username: 'user1', email: 'user1@example.com' },
            { username: 'user2', email: 'user2@example.com' },
        ]);

        // Insert sample thoughts
        const thoughts = await Thought.insertMany([
            { thoughtText: 'This is the first thought!', username: 'user1' },
            { thoughtText: 'This is the second thought!', username: 'user2' },
        ]);

        console.log('Seeding completed successfully:', { users, thoughts });
    } catch (error) {
        console.error('Error during seeding:', error);
    }
};

export default seedData;