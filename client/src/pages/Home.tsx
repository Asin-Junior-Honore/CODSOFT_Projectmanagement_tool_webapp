import { Link } from 'react-router-dom';
import { FaTasks, FaUsers, FaChartLine, FaBookOpen } from 'react-icons/fa';

const HomePage = () => {
    return (
        <div className="max-w-screen-lg mx-auto sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">Welcome to Asin ProjectManager</h1>
                <p className="text-gray-600 mt-4">
                    The ultimate tool for managing your projects, tasks, and teams efficiently.
                </p>
                <Link
                    to="/protected/tasks"
                    className="mt-6 inline-block bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-600"
                >
                    Get Started
                </Link>
            </div>

            {/* Features Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {/* Task Management */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <FaTasks className="text-4xl text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">Task Management</h3>
                    <p className="text-gray-600">
                        Organize your tasks with ease and track progress with powerful tools.
                    </p>
                </div>

                {/* Team Collaboration */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <FaUsers className="text-4xl text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">Team Collaboration</h3>
                    <p className="text-gray-600">
                        Collaborate with your team in real-time and keep everyone on the same page.
                    </p>
                </div>

                {/* Analytics and Reports */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <FaChartLine className="text-4xl text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">Analytics & Reports</h3>
                    <p className="text-gray-600">
                        Gain insights into your projects with detailed analytics and customizable reports.
                    </p>
                </div>
            </div>

            {/* Resources Section */}
            <div className="mt-12">
                <h2 className="text-3xl font-bold text-gray-800 text-center">Resources to Help You Succeed</h2>
                <div className="mt-6 text-center grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Guides */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <FaBookOpen className="text-4xl text-blue-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold">Getting Started Guide</h3>
                        <p className="text-gray-600">
                            Learn how to set up your projects, manage tasks, and collaborate with your team.
                        </p>
                        <Link to="/guides/getting-started" className="mt-4 inline-block text-blue-500 underline">
                            Read More
                        </Link>
                    </div>

                    {/* Articles */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <FaBookOpen className="text-4xl text-blue-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold">Best Practices</h3>
                        <p className="text-gray-600">
                            Discover tips and techniques to improve your project management skills.
                        </p>
                        <Link to="/articles/best-practices" className="mt-4 inline-block text-blue-500 underline">
                            Read More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
