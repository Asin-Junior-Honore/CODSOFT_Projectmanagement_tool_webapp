import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBook, FaBullhorn, FaSpinner } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Dashboard: React.FC = () => {
    const [fullName, setFullName] = useState<string>('');
    const [personalTasksCount, setPersonalTasksCount] = useState<number>(0);
    const [assignedTasksCount, setAssignedTasksCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [cookies] = useCookies(['UserToken']);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get('https://codsoft-projectmanagement-tool-webapp.onrender.com/v2/auth/dashboard', {
                    headers: {
                        Authorization: `Bearer ${cookies.UserToken}`,
                    },

                });

                const data = response.data;
                setFullName(data.fullName);
                setPersonalTasksCount(data.personalTasksCount);
                setAssignedTasksCount(data.assignedTasksCount);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                toast.error('Failed to load dashboard data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 min-h-screen">
            <ToastContainer />

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center py-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 text-center sm:text-left">Dashboard 📋</h1>
                {loading ? (
                    <FaSpinner className="animate-spin text-blue-500 text-3xl sm:text-4xl" />
                ) : (
                    <h2 className="text-lg sm:text-2xl text-gray-800 mt-4 sm:mt-0">
                        Welcome back, {fullName}! 😊
                    </h2>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center items-center mt-10">
                    <FaSpinner className="animate-spin text-blue-500 text-3xl sm:text-4xl" />
                </div>
            ) : (
                <div className="space-y-6 sm:space-y-8">

                    {/* Personal Tasks */}
                    <div className="bg-blue-50 shadow-lg rounded-lg p-4 sm:p-6">
                        <h2 className="text-2xl sm:text-3xl text-blue-900">Your Personal Tasks</h2>
                        <p className="text-sm sm:text-xl text-gray-700 mt-2 sm:mt-4">
                            You have {personalTasksCount} personal tasks.
                        </p>
                    </div>

                    {/* Assigned Tasks */}
                    <div className="bg-green-50 shadow-lg rounded-lg p-4 sm:p-6">
                        <h2 className="text-2xl sm:text-3xl text-green-800">Assigned Tasks</h2>
                        <p className="text-sm sm:text-xl text-gray-700 mt-2 sm:mt-4">
                            You have {assignedTasksCount} tasks assigned to you.
                        </p>
                    </div>

                    {/* Recent Activities */}
                    <div className="bg-yellow-50 shadow-lg rounded-lg p-4 sm:p-6">
                        <h2 className="text-2xl sm:text-3xl text-yellow-800">Recent Activities</h2>
                        <p className="text-sm sm:text-xl text-gray-700 mt-2 sm:mt-4">
                            Check your latest activities to stay on track.
                        </p>
                    </div>

                    {/* Upcoming Deadlines */}
                    <div className="bg-orange-50 shadow-lg rounded-lg p-4 sm:p-6">
                        <h2 className="text-2xl sm:text-3xl text-orange-800">Upcoming Deadlines</h2>
                        <p className="text-sm sm:text-xl text-gray-700 mt-2 sm:mt-4">
                            Keep an eye on your upcoming deadlines to stay organized. 🗓️
                        </p>
                    </div>

                    {/* Announcements */}
                    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                        <h2 className="text-2xl sm:text-3xl text-gray-800">
                            Announcements <FaBullhorn className="inline-block ml-2" />
                        </h2>
                        <p className="text-sm sm:text-lg text-gray-600 mt-2 sm:mt-4">
                            Stay tuned for the latest updates and news.
                        </p>
                    </div>

                    {/* Productivity Tips */}
                    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                        <h2 className="text-2xl sm:text-3xl text-gray-800">
                            Productivity Tips <FaBook className="inline-block ml-2" />
                        </h2>
                        <p className="text-sm sm:text-lg text-gray-600 mt-2 sm:mt-4">
                            Stay organized and keep your tasks updated. 💪
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
