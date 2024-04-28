import { Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Task from '../models/Tasks';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

// Controller to create a new task
export const createTask = async (req: AuthenticatedRequest, res: Response) => {
    const { name, description, assignedTo, assigneeEmail } = req.body;
    try {
        const user = req.user;
        if (!user || typeof user === 'string' || !('userId' in user)) {
            return res.status(401).json({ error: 'Unauthorized. Please log in.' });
        }

        const userId = (user as jwt.JwtPayload).userId;
        const newTask = new Task({
            name,
            description,
            assignedTo,
            assigneeEmail: assignedTo === 'others' ? assigneeEmail : undefined,
            assignedBy: userId,
        });

        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};


// Controller to fetch tasks assigned to a user's email or personal tasks created by the user
export const fetchAssignedTasks = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user || typeof req.user === 'string' || !('email' in req.user)) {
            return res.status(401).json({ error: 'Unauthorized. Please log in.' });
        }

        const userEmail = req.user.email;
        const userId = req.user.userId; // user's ID

        // Fetch tasks assigned to the user's email or personal tasks created by the user, and populate 'assignedBy' with the 'email' field from the 'User' model
        const tasks = await Task.find({
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
        const tasksWithDetails = tasks.map((task) => ({
            _id: task._id,
            name: task.name,
            description: task.description,
            assignedTo: task.assignedTo,
            assigneeEmail: task.assigneeEmail,
            status: task.status,
            createdAt: task.createdAt,
            assignedByEmail: (task.assignedBy as any)?.email || 'Unknown', // Safely access 'email' after population
        }));

        return res.status(200).json({ tasks: tasksWithDetails });
    } catch (error) {
        console.error('Error fetching assigned tasks:', error);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};


// Controller to update the status of a task
export const updateTaskStatus = async (req: AuthenticatedRequest, res: Response) => {
    const taskId = req.params.taskId;
    const { status } = req.body;

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        task.status = status;
        await task.save();

        return res.status(200).json({ message: 'Task status updated successfully.', task });
    } catch (error) {
        console.error('Error updating task status:', error);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

// Controller to delete a task by its ID
export const deleteTask = async (req: AuthenticatedRequest, res: Response) => {
    const taskId = req.params.taskId; // Get task ID from the URL parameter

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found.' }); // Return 404 if task doesn't exist
        }

        // Ensure the user deleting the task is the one who created it
        if (!req.user || typeof req.user === 'string' || req.user.userId !== task.assignedBy.toString()) {
            return res.status(403).json({ error: 'You are not authorized to delete this task.' }); // Return if unauthorized
        }

        await Task.findByIdAndDelete(taskId);

        return res.status(200).json({ message: 'Task deleted successfully.' }); // Return success message
    } catch (error) {
        console.error('Error deleting task:', error); // Log error for debugging
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

// Controller to fetch tasks/count assigned to a user's email or personal tasks created by the/another user
export const fetchAssignedTasksList = async (req: AuthenticatedRequest, res: Response) => {
    try {
        // Check if the user is authenticated
        if (!req.user || typeof req.user === 'string' || !('email' in req.user)) {
            return res.status(401).json({ error: 'Unauthorized. Please log in.' });
        }

        const userEmail = req.user.email; // User's email
        const userId = req.user.userId; // User's ID

        // Fetch user details to get the full name
        const user = await User.findById(userId).select('fullName'); // Fetch user's full name
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Fetch personal tasks and tasks assigned to the user's email
        const personalTasksCount = await Task.countDocuments({
            assignedTo: 'personal',
            assignedBy: userId,
        }); // Count of personal tasks

        const assignedTasksCount = await Task.countDocuments({
            assigneeEmail: userEmail,
        }); // Count of tasks assigned to the user's email

        // Return the user's full name and the counts of personal and assigned tasks
        return res.status(200).json({
            fullName: user.fullName,
            personalTasksCount,
            assignedTasksCount,
        });
    } catch (error) {
        console.error('Error fetching task information:', error); // Log error for debugging
        return res.status(500).json({ error: 'Internal server error. Please try again later.' }); // Return 500 for unexpected errors
    }
};