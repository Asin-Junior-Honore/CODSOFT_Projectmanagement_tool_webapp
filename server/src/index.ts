import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

dotenv.config();
const app = express();

// CORS options
const corsOptions = {
    origin: ['https://asinhonore-projectmanagement-web-app.netlify.app', 'http://localhost:5173'],
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/v2/auth', authRoutes);

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 5050;

if (!mongoURI) {
    throw new Error('MongoDB connection string is not defined. Check your .env file.');
}

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB successfully 👍')
        // Server listening
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });

// Route to send "Hello, world!"
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
