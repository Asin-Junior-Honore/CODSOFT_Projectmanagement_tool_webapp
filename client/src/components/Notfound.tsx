import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaRegQuestionCircle } from 'react-icons/fa';

const NotFoundPage: React.FC = () => {
    return (
        <div className="text-center  mt-12 p-6">
            {/* 404 Header with Warning Icon */}
            <div className="flex justify-center items-center">
                <FaExclamationTriangle className="text-5xl text-red-500 mr-4" />
                <h1 className="text-4xl font-bold text-gray-800">404 Not Found</h1>
            </div>

            {/* Playful Message */}
            <p className="text-gray-600 mt-4">
                Hey, sorry! I'm still thinking of content, styles, and other cool things to add to pages like this.
            </p>

            {/* Contact Information */}
            <p className="text-gray-600 mt-4">
                If you have any ideas or suggestions for content, I'd love to hear from you!
            </p>
            <p className="text-gray-600 mt-2">
                You can reach me at <a href="mailto:asinhonore823@gmail.com" className="text-blue-500 underline">asinhonore823@gmail.com</a>.
                Use "TaskAsin" as the subject for a quick response ✉️.
            </p>

            {/* Link to Home with a Home Icon */}
            <Link to="/" className="mt-6  bg-blue-500 text-white font-bold py-2 px-6 rounded w-max mx-auto hover:bg-blue-600 flex items-center justify-center ">
                <FaRegQuestionCircle className="mr-2" />
                Go to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
