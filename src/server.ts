import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes'; // Adjust the import path accordingly
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use('/api/users', userRoutes); // Set the base route for user-related operations

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkDB')
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });




