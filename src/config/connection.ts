import mongoose from 'mongoose';

const connectionString = 'mongodb://127.0.0.1:27017/socialAppDB';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log('Mongoose is connected to ' + connectionString);
    } catch (err) {
        console.error('Mongoose connection error: ' + err);
        process.exit(1); // Exit process if connection fails
    }
};

export default connectToDatabase;