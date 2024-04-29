import React, { useState } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { toast, ToastContainer, ToastContentProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Interface for new task data
interface NewTask {
    name: string;
    description: string;
    assignedTo: string;
    assigneeEmail?: string;
}

const TaskCreation: React.FC = () => {
    //state of new task
    const [newTask, setNewTask] = useState<NewTask>({
        name: '',
        description: '',
        assignedTo: 'personal',
    });
    const [loading, setLoading] = useState(false);



    //logic to create task
    const handleCreateTask = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:5050/v2/auth/createtask',
                newTask,
                { withCredentials: true }
            );
            console.log(response)
            setNewTask({
                name: '',
                description: '',
                assignedTo: 'personal',
                assigneeEmail: '',
            });

            // Display success message
            toast.success('Task created successfully!', {
                autoClose: 2000,
            });
        } catch (error) {
            //display direct messages  from  backend if  any erros
            console.error('Error creating task:', error);
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                if (data.errors && Array.isArray(data.errors)) {
                    // Display each validation error as a toast message
                    data.errors.forEach((err: { msg: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | ((props: ToastContentProps<unknown>) => React.ReactNode) | null | undefined; }) => {
                        if (typeof err === 'object' && 'msg' in err) {
                            toast.error(err.msg, {
                                autoClose: 5000,
                            });
                        }
                    });
                } else {
                    // If no specific validation error
                    toast.error('Failed to create task. Please try again later.', {
                        autoClose: 5000,
                    });
                }
            } else {
                // Generic error message if the error is not Axios-related
                toast.error('An unexpected error occurred. Please try again later.', {
                    autoClose: 5000,
                });
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="mx-auto px-8 sm:px-12 lg:px-4">
            <ToastContainer />
            <h1 className="text-4xl font-bold text-gray-800">Create New Task 📝</h1>

            {/* Task creation form */}
            <div className="bg-white p-8 rounded-lg shadow-lg mt-6">
                {/* Task Name */}
                <label className="block text-gray-700 font-semibold mb-2">Task Name:</label>
                <input
                    type="text"
                    placeholder="Enter task name"
                    value={newTask.name}
                    onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none"
                />

                {/* Task Description */}
                <label className="block text-gray-700 font-semibold mt-4 mb-2">Task Description:</label>
                <textarea
                    placeholder="Enter task description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full p-3  border h-48 resize-none border-gray-300 rounded focus:outline-none"
                />

                {/* Assignment Type */}
                <label className="block text-gray-700 font-semibold mt-4 mb-2">Assign To:</label>
                <select
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none"
                >
                    <option value="personal">Personal</option>
                    <option value="others">Others</option>
                </select>

                {/* Email Input for "Others" Assignment */}
                {newTask.assignedTo === 'others' && (
                    <div className="mt-4">
                        <label className="block text-gray-700 font-semibold">Assignee's Email:</label>
                        <input
                            type="email"
                            placeholder="Enter email of the assignee"
                            value={newTask.assigneeEmail || ''}
                            onChange={(e) => setNewTask({ ...newTask, assigneeEmail: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none"
                        />
                    </div>
                )}

                {/* Create Task Button */}
                <button
                    onClick={handleCreateTask}
                    className={`mt-6 bg-blue-500 text-white w-full py-3 px-6 rounded hover:bg-blue-600 ${loading ? 'opacity-50' : ''}`}
                    disabled={loading}
                >
                    <FaPlus className="inline mr-2" /> Create Task
                </button>

                {/* Loading Indicator */}
                {loading && (
                    <div className="flex justify-center items-center mt-4">
                        <span>Creating task...</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCreation;
