"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAssignedTasksList = exports.deleteTask = exports.updateTaskStatus = exports.fetchAssignedTasks = exports.createTask = void 0;
const User_1 = __importDefault(require("../models/User"));
const Tasks_1 = __importDefault(require("../models/Tasks"));
// Controller to create a new task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, assignedTo, assigneeEmail } = req.body;
    try {
        const user = req.user;
        if (!user || typeof user === 'string' || !('userId' in user)) {
            return res.status(401).json({ error: 'Unauthorized. Please log in.' });
        }
        const userId = user.userId;
        const newTask = new Tasks_1.default({
            name,
            description,
            assignedTo,
            assigneeEmail: assignedTo === 'others' ? assigneeEmail : undefined,
            assignedBy: userId,
        });
        yield newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    }
    catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});
exports.createTask = createTask;
// Controller to fetch tasks assigned to a user's email or personal tasks created by the user
const fetchAssignedTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || typeof req.user === 'string' || !('email' in req.user)) {
            return res.status(401).json({ error: 'Unauthorized. Please log in.' });
        }
        const userEmail = req.user.email;
        const userId = req.user.userId; // user's ID
        // Fetch tasks assigned to the user's email or personal tasks created by the user, and populate 'assignedBy' with the 'email' field from the 'User' model
        const tasks = yield Tasks_1.default.find({
            $or: [
                { assigneeEmail: userEmail }, // Tasks assigned to this email
                { assignedTo: 'personal', assignedBy: userId }, // Personal tasks created by the user
            ],
        })
            .populate('assignedBy', 'email') // Populate the 'email' field from the 'User' model
            .exec(); // Execute the query to apply population
        if (tasks.length === 0) {
            return res.status(200).json({ message: 'No tasks assigned or created by you.' });
        }
        // Map through tasks and extract relevant information, including 'assignedByEmail'
        const tasksWithDetails = tasks.map((task) => {
            var _a;
            return ({
                _id: task._id,
                name: task.name,
                description: task.description,
                assignedTo: task.assignedTo,
                assigneeEmail: task.assigneeEmail,
                status: task.status,
                createdAt: task.createdAt,
                assignedByEmail: ((_a = task.assignedBy) === null || _a === void 0 ? void 0 : _a.email) || 'Unknown', // Safely access 'email' after population
            });
        });
        return res.status(200).json({ tasks: tasksWithDetails });
    }
    catch (error) {
        console.error('Error fetching assigned tasks:', error);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});
exports.fetchAssignedTasks = fetchAssignedTasks;
// Controller to update the status of a task
const updateTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.taskId;
    const { status } = req.body;
    try {
        const task = yield Tasks_1.default.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }
        task.status = status;
        yield task.save();
        return res.status(200).json({ message: 'Task status updated successfully.', task });
    }
    catch (error) {
        console.error('Error updating task status:', error);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});
exports.updateTaskStatus = updateTaskStatus;
// Controller to delete a task by its ID
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.taskId; // Get task ID from the URL parameter
    try {
        const task = yield Tasks_1.default.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found.' }); // Return 404 if task doesn't exist
        }
        // Ensure the user deleting the task is the one who created it
        if (!req.user || typeof req.user === 'string' || req.user.userId !== task.assignedBy.toString()) {
            return res.status(403).json({ error: 'You are not authorized to delete this task.' }); // Return if unauthorized
        }
        yield Tasks_1.default.findByIdAndDelete(taskId);
        return res.status(200).json({ message: 'Task deleted successfully.' }); // Return success message
    }
    catch (error) {
        console.error('Error deleting task:', error); // Log error for debugging
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});
exports.deleteTask = deleteTask;
// Controller to fetch tasks/count assigned to a user's email or personal tasks created by the/another user
const fetchAssignedTasksList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the user is authenticated
        if (!req.user || typeof req.user === 'string' || !('email' in req.user)) {
            return res.status(401).json({ error: 'Unauthorized. Please log in.' });
        }
        const userEmail = req.user.email; // User's email
        const userId = req.user.userId; // User's ID
        // Fetch user details to get the full name
        const user = yield User_1.default.findById(userId).select('fullName'); // Fetch user's full name
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        // Fetch personal tasks and tasks assigned to the user's email
        const personalTasksCount = yield Tasks_1.default.countDocuments({
            assignedTo: 'personal',
            assignedBy: userId,
        }); // Count of personal tasks
        const assignedTasksCount = yield Tasks_1.default.countDocuments({
            assigneeEmail: userEmail,
        }); // Count of tasks assigned to the user's email
        // Return the user's full name and the counts of personal and assigned tasks
        return res.status(200).json({
            fullName: user.fullName,
            personalTasksCount,
            assignedTasksCount,
        });
    }
    catch (error) {
        console.error('Error fetching task information:', error); // Log error for debugging
        return res.status(500).json({ error: 'Internal server error. Please try again later.' }); // Return 500 for unexpected errors
    }
});
exports.fetchAssignedTasksList = fetchAssignedTasksList;
