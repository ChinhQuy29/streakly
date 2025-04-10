import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDB = async () => {
    try {
        // Check if MongoDB URI is defined
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env.local file');
        }
        
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

export default connectToDB;
