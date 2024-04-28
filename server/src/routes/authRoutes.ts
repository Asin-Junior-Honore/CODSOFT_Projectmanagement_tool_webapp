import express from 'express';
import { register, login, logout } from '../controllers/authController';
import { fetchUserProfile } from '../controllers/userController';
import { createTask, fetchAssignedTasks, updateTaskStatus, deleteTask, fetchAssignedTasksList } from '../controllers/taskController.ts'; // Add new controller
import { validateRegister, validateLogin } from '../middlewares/validationMiddleware';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { validateCreateTask } from '../middlewares/validateTaskcreation';

const router = express.Router();

// Authentication routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', authenticateJWT, logout);

// Profile route
router.get('/profile', authenticateJWT, fetchUserProfile);

// Task routes
router.post('/createtask', validateCreateTask, authenticateJWT, createTask);
router.get('/dashboard', authenticateJWT, fetchAssignedTasksList)
router.get('/assigned-tasks', authenticateJWT, fetchAssignedTasks);
router.patch('/tasks/:taskId/status', authenticateJWT, updateTaskStatus);
router.delete('/tasks/:taskId', authenticateJWT, deleteTask); 

export default router; 
