import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Thought from '../models/Thoughts';
import User from '../models/User';
import thoughtsData from './seedThoughts';
import usersData from './seedUsers';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetwork');
    console.log('Database connected.');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  await connectDB();

  // Clear existing data
  await Thought.deleteMany({});
  await User.deleteMany({});

  // Insert users
  const users = await User.insertMany(usersData);
  console.log('Users seeded:', users);

  // Insert thoughts with references to users
  const thoughts = thoughtsData.map((thought) => ({
    ...thought,
    userId: users[Math.floor(Math.random() * users.length)]._id // Assign a random user
  }));

  const seededThoughts = await Thought.insertMany(thoughts);
  console.log('Thoughts seeded:', seededThoughts);

  // Close the database connection
  mongoose.connection.close();
};

// Run the seeding process
seedDatabase()
  .then(() => console.log('Seeding complete.'))
  .catch((error) => console.error('Seeding error:', error));

