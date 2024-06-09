import React, { useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { toast, ToastContainer, ToastContentProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

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
    name: "",
    description: "",
    assignedTo: "personal",
  });
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["UserToken"]);

  //logic to create task
  const handleCreateTask = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://codsoft-projectmanagement-tool-webapp.vercel.app/v2/auth/createtask",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${cookies.UserToken}`,
          },
        }
      );
      console.log(response.data.message);
      setNewTask({
        name: "",
        description: "",
        assignedTo: "personal",
        assigneeEmail: "",
      });

      // Display success message
      toast.success("Task created successfully!", {
        autoClose: 2000,
      });
    } catch (error) {
      //display direct messages  from  backend if  any erros
      console.error("Error creating task:", error);
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        if (data.errors && Array.isArray(data.errors)) {
          // Display each validation error as a toast message
          data.errors.forEach(
            (err: {
              msg:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | ((props: ToastContentProps<unknown>) => React.ReactNode)
                | null
                | undefined;
            }) => {
              if (typeof err === "object" && "msg" in err) {
                toast.error(err.msg, {
                  autoClose: 5000,
                });
              }
            }
          );
        } else {
          // If no specific validation error
          toast.error("Failed to create task. Please try again later.", {
            autoClose: 5000,
          });
        }
      } else {
        // Generic error message if the error is not Axios-related
        toast.error("An unexpected error occurred. Please try again later.", {
          autoClose: 5000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <ToastContainer />
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-6 text-center sm:text-left">
        Create New Task 📝
      </h1>

      {/* Task creation form */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg mt-6">
        {/* Task Name */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-gray-700 font-semibold">
            Task Name:
          </label>
          <input
            type="text"
            placeholder="Enter task name"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded focus:outline-none"
          />
        </div>

        {/* Task Description */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-gray-700 font-semibold">
            Task Description:
          </label>
          <textarea
            placeholder="Enter task description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="w-full p-2 sm:p-3 h-36 sm:h-48 border border-gray-300 rounded focus:outline-none resize-none"
          />
        </div>

        {/* Assignment Type */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-gray-700 font-semibold">
            Assign To:
          </label>
          <select
            value={newTask.assignedTo}
            onChange={(e) =>
              setNewTask({ ...newTask, assignedTo: e.target.value })
            }
            className="w-full p-2 sm:p-3 border border-gray-300 rounded focus:outline-none"
          >
            <option value="personal">Personal</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Email Input for "Others" Assignment */}
        {newTask.assignedTo === "others" && (
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-700 font-semibold">
              Assignee's Email:
            </label>
            <input
              type="email"
              placeholder="Enter email of the assignee"
              value={newTask.assigneeEmail || ""}
              onChange={(e) =>
                setNewTask({ ...newTask, assigneeEmail: e.target.value })
              }
              className="w-full p-2 sm:p-3 border border-gray-300 rounded focus:outline-none"
            />
          </div>
        )}

        {/* Create Task Button */}
        <button
          onClick={handleCreateTask}
          className={`mt-6 bg-blue-500 text-white w-full py-2 sm:py-3 px-4 sm:px-6 rounded hover:bg-blue-600 ${
            loading ? "opacity-50" : ""
          }`}
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
