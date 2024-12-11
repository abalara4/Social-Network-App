import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/api/userRoutes';  // Import routes
import thoughtRoutes from './routes/api/thoughtRoutes';  // Import thought routes

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialNetworkDB', {
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse form data

// Apply routes
app.use('/api/users', userRoutes);  // Apply user routes to '/api/users'
app.use('/api/thoughts', thoughtRoutes);  // Apply thought routes to '/api/thoughts'

// Start the server
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
