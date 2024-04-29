import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

dotenv.config(); // Load environment variables

const app = express();

// CORS configuration
const corsOptions = {
    origin: ['http://localhost:5173', 'https://asinhonore-projectmanagement-web-app.netlify.app'], // Allow multiple origins
    credentials: true, // Allow credentials for secure interactions
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS for preflight handling
    optionsSuccessStatus: 204, // HTTP status for successful preflight requests
};

// Apply middleware
app.use(cors(corsOptions)); // Apply CORS middleware
app.use(express.json()); // Enable JSON parsing
app.use(cookieParser()); // Enable cookie parsing

// Explicitly handle preflight requests (important for CORS with credentials)
app.options('*', cors(corsOptions));

// Define routes
app.use('/v2/auth', authRoutes);

// MongoDB connection
const mongoURI = process.env.MONGO_URI; // Fetch MongoDB connection string from .env
const port = process.env.PORT || 5050; // Define port for server

if (!mongoURI) {
    throw new Error('MongoDB connection string is not defined. Check your .env file.');
}

mongoose
    .connect(mongoURI, {
    }) // Ensure MongoDB uses recommended options
    .then(() => {
        console.log('Connected to MongoDB successfully 👍');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
        // Optional: Implement a retry mechanism or other error handling logic
    });
