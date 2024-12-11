import connectToDatabase from '../config/connection'; // Import the database connection function
import seedData from './cleanDB'; // Import the seedData function to clean and seed the database
import mongoose from 'mongoose';

const runSeed = async () => {
    try {
        // Establish connection to the database
        await connectToDatabase();
        console.log('MongoDB connected, starting seed data...');

        // Run the seeding function to clear and populate the database
        await seedData(); 

    } catch (error) {
        console.error('Error during seed operation:', error);
    } finally {
        // Close the mongoose connection after seeding is completed
        await mongoose.connection.close(false);
        console.log('Mongoose connection closed');
    }
};

// Run the seed script
runSeed();

