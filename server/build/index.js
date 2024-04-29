"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: ['http://localhost:5173', 'https://asinhonore-projectmanagement-web-app.netlify.app'], // Allow multiple origins
    credentials: true, // Allow credentials for secure interactions
    allowedHeaders: ['Content-Type', 'Authorization'], // Include headers typically used with authenticated requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    preflightContinue: false, // Stop preflight requests from proceeding to the next middleware
    optionsSuccessStatus: 204, // HTTP status for successful OPTIONS preflight response
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/v2/auth', authRoutes_1.default);
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 5050;
if (!mongoURI) {
    throw new Error('MongoDB connection string is not defined. Check your .env file.');
}
mongoose_1.default
    .connect(mongoURI)
    .then(() => {
    console.log('Connected to MongoDB successfully 👍');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
});
