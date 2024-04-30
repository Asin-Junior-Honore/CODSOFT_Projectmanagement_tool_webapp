import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChevronRight, FaChevronLeft, FaTrash, FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// Interface for task data
interface Task {
    _id: string;
    name: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    assignedTo: 'personal' | 'others';
    assigneeEmail?: string;
    assignedByEmail: string; // Email of the user who assigned the task
    createdAt: string; // Date when the task was created
}

const Projects: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [cookies] = useCookies(['UserToken']);

    //logic to fetch tasks both personal or asssigned
    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://codsoft-projectmanagement-tool-webapp.onrender.com/v2/auth/assigned-tasks', {

                headers: {
                    Authorization: `Bearer ${cookies.UserToken}`,
                },

            });

            const tasksData = response.data.tasks || [];
            setTasks(tasksData);
            if (tasksData.length === 0) {
                toast.info('No tasks available at the momnt.');
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
            toast.error('Failed to fetch tasks. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    //logic to update task status       
    const toggleTaskStatusForward = async (task: Task) => {
        const newStatus = task.status === 'pending' ? 'in-progress' : 'completed';
        try {
            await axios.patch(
                `https://codsoft-projectmanagement-tool-webapp.onrender.com/v2/auth/tasks/${task._id}/status`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${cookies.UserToken}`,
                    },
                }
            );
            setTasks(tasks.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t)));
        } catch (error) {
            console.error('Error updating task status:', error);
            toast.error('Failed to update task status. Please try again later.');
        }
    };

    //logic to reverse task status
    const toggleTaskStatusBackward = async (task: Task) => {
        const newStatus =
            task.status === 'in-progress' ? 'pending' :
                task.status === 'completed' ? 'in-progress' :
                    task.status;

        try {
            await axios.patch(
                `https://codsoft-projectmanagement-tool-webapp.onrender.com/v2/auth/tasks/${task._id}/status`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${cookies.UserToken}`,
                    },
                }
            );

            setTasks(tasks.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t)));
        } catch (error) {
            console.error('Error updating task status:', error);
            toast.error('Failed to update task status. Please try again later.');
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            await axios.delete(`https://codsoft-projectmanagement-tool-webapp.onrender.com/v2/auth/tasks/${taskId}`, {

                headers: {
                    Authorization: `Bearer ${cookies.UserToken}`,
                },

            });

            setTasks(tasks.filter((t) => t._id !== taskId));
            toast.success('Task deleted successfully.');
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('Failed to delete task. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <ToastContainer />
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mt-6 text-center sm:text-left">Projects 📋</h1>

            {loading ? (
                <div className="flex justify-center items-center mt-10">
                    <FaSpinner className="animate-spin text-blue-500 text-3xl" />
                </div>
            ) : tasks.length === 0 ? (
                <div className="text-center text-blue-600 text-xl sm:text-2xl mt-6">
                    <h3>You have no tasks available at the moment.</h3>
                    <Link
                        to="/protected/tasks"
                        className="mt-4 sm:mt-6 inline-block bg-blue-500 text-white font-bold py-2 px-4 sm:px-6 rounded hover:bg-blue-600"
                    >
                        Create one or assign tasks now
                    </Link>
                </div>
            ) : (
                <div className="space-y-4 sm:space-y-6 mt-6">
                    {tasks.map((task) => (
                        <div
                            key={task._id}
                            className={clsx(
                                'p-4 sm:p-6 rounded-lg shadow-lg transition-colors space-y-1',
                                task.status === 'completed'
                                    ? 'bg-green-100'
                                    : task.status === 'in-progress'
                                        ? 'bg-yellow-100'
                                        : 'bg-white'
                            )}
                        >
                            <h2 className="text-lg sm:text-xl font-semibold text-blue-900">{task.name}</h2>
                            <p className="text-teal-700 font-medium sm:text-lg">{task.description}</p>
                            <p className="text-gray-600 font-bold sm:text-base">Assigned by: {task.assignedByEmail}</p>
                            <p className="text-gray-600 sm:text-base">Created at: {dayjs(task.createdAt).format('MM/DD/YYYY')}</p>
                            <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                                <div className="flex my-3 lg:mt-3 space-x-2">
                                    {task.status !== 'pending' && (
                                        <button
                                            onClick={() => toggleTaskStatusBackward(task)}
                                            className="text-gray-600 hover:text-gray-800 text-xl"
                                        >
                                            <FaChevronLeft />
                                        </button>
                                    )}
                                    {task.status !== 'completed' && (
                                        <button
                                            onClick={() => toggleTaskStatusForward(task)}
                                            className="ml-2 sm:ml-4 text-gray-600 text-xl hover:text-gray-800"
                                        >
                                            <FaChevronRight />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteTask(task._id)}
                                        className="ml-2 sm:ml-4 text-red-700 text-xl hover:text-gray-800"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                                <span className="text-blue-800 text-lg">Status: <strong>{task.status}</strong></span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Projects