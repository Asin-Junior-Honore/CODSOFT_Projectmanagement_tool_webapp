import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard: React.FC = () => {
    const [fullName, setFullName] = useState<string>('');
    const [personalTasksCount, setPersonalTasksCount] = useState<number>(0);
    const [assignedTasksCount, setAssignedTasksCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [_] = useCookies(['Usertoken']); // Cookie management

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get('http://localhost:5050/v2/auth/dashboard', {
                    withCredentials: true,
                });

                const data = response.data;
                setFullName(data.fullName);
                setPersonalTasksCount(data.personalTasksCount);
                setAssignedTasksCount(data.assignedTasksCount);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                toast.error('Failed to load dashboard data. Please try again later.');
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchDashboardData(); // Fetch data when the component mounts
    }, []);

    return (
        <div className="container mx-auto px-8 sm:px-12 lg:px-16 min-h-screen">
            <ToastContainer /> {/* Required for displaying toast notifications */}
            <div className="flex justify-between items-center py-6">
                <h1 className="text-4xl font-bold text-blue-900">Dashboard 📋</h1>
                {loading ? (
                    <FaSpinner className="animate-spin text-blue-500 text-3xl" />
                ) : (
                    <h2 className="text-2xl text-gray-800">Welcome back, {fullName}! 😊</h2>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center items-center mt-10">
                    <FaSpinner className="animate-spin text-blue-500 text-3xl" />
                </div>
            ) : (
                <div className="space-y-8"> {/* Add spacing between boxes */}
                    {/* Box for personal tasks */}
                    <div className="bg-blue-50 shadow-lg rounded-lg p-6"> {/* Light blue background */}
                        <h2 className="text-3xl text-blue-900">Your Personal Tasks</h2>
                        <p className="text-xl text-gray-700 mt-4">
                            You have {personalTasksCount} personal tasks.
                        </p>
                    </div>

                    {/* Box for assigned tasks */}
                    <div className="bg-green-50 shadow-lg rounded-lg p-6"> {/* Light green background */}
                        <h2 className="text-3xl text-green-800">Assigned Tasks</h2>
                        <p className="text-xl text-gray-700 mt-4">
                            You have {assignedTasksCount} tasks assigned to you.
                        </p>
                    </div>

                    {/* Additional content, like tips or announcements */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <p className="text-lg text-gray-600">Stay organized and keep your tasks updated. 💪</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;