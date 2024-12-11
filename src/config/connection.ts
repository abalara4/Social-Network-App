import mongoose from 'mongoose';

const db = async (): Promise<typeof mongoose.connection> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB');
        return mongoose.connection;
    } catch (error) {
        console.log('MongoDB connection failed', error);
        return mongoose.connection;
    }
};

