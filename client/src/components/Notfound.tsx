import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaRegQuestionCircle } from 'react-icons/fa';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            {/* 404 Header with Warning Icon */}
            <div className="flex flex-col items-center">
                <FaExclamationTriangle className="text-6xl sm:text-7xl text-red-500" />
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mt-4">404 Not Found</h1>
            </div>

            {/* Playful Message */}
            <p className="text-gray-700 sm:text-lg md:text-xl lg:text-2xl mt-6">
                Oops! This page is still under development. I am thinking of new content and cool things to add.
            </p>

            {/* Contact Information */}
            <div className="text-gray-700 mt-6 space-y-2 sm:space-y-3 lg:space-y-4">
                <p>If you have any ideas or suggestions, feel free to reach out!</p>
                <p>
                    Contact me at <a href="mailto:asinhonore823@gmail.com" className="text-blue-500 underline">asinhonore823@gmail.com</a> with the subject "TaskAsin" for a quick response ✉️.
                </p>
            </div>

            {/* Link to Home with a Home Icon */}
            <Link
                to="/"
                className="mt-8 sm:mt-10 bg-blue-500 text-white font-bold py-2 px-4 sm:px-6 rounded hover:bg-blue-600 flex items-center"
            >
                <FaRegQuestionCircle className="mr-2" />
                Go to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
