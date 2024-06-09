import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaTransgenderAlt,
  FaSpinner,
  FaInfoCircle,
} from "react-icons/fa";
import { useCookies } from "react-cookie";

// Interface for user profile data
interface UserProfile {
  fullName: string;
  username: string;
  gender: string;
  email: string;
}

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cookies] = useCookies(["UserToken"]);

  //userffect to fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get<UserProfile>(
          "https://codsoft-projectmanagement-tool-webapp.vercel.app/v2/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${cookies.UserToken}`,
            },
          }
        );

        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to fetch user profile. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [cookies]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="text-4xl animate-spin text-blue-500" />
        <span className="ml-4 text-gray-700">Loading user profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50 text-red-600">
        <FaInfoCircle className="text-2xl" />
        <span className="ml-4">{error}</span>
      </div>
    );
  }

  if (userData) {
    return (
      <div className="max-w-2xl mx-auto py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center">
          User Profile
        </h1>

        <div className="mt-8 bg-white p-6 sm:p-8 rounded-lg shadow-xl border border-gray-200">
          {/* Full Name */}
          <div className="flex flex-col sm:flex-row items-center mb-6">
            <FaUser className="text-2xl sm:text-3xl text-blue-500" />
            <h2 className="mt-2 sm:mt-0 sm:ml-4 text-xl sm:text-2xl font-semibold">
              {userData.fullName}
            </h2>
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row items-center mb-6">
            <FaEnvelope className="text-2xl sm:text-3xl text-blue-500" />
            <span className="mt-2 sm:mt-0 sm:ml-4 text-lg sm:text-xl text-gray-700">
              {userData.email}
            </span>
          </div>

          {/* Gender */}
          <div className="flex flex-col sm:flex-row items-center mb-6">
            <FaTransgenderAlt className="text-2xl sm:text-3xl text-blue-500" />
            <span className="mt-2 sm:mt-0 sm:ml-4 text-lg sm:text-xl text-gray-700">
              {userData.gender}
            </span>
          </div>

          {/* Username */}
          <div className="flex flex-col sm:flex-row items-center mb-6">
            <FaUser className="text-2xl sm:text-3xl text-blue-500" />
            <span className="mt-2 sm:mt-0 sm:ml-4 text-lg sm:text-xl text-gray-700">
              Username: {userData.username}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null; // If no user data, return nothing
};

export default UserProfile;
