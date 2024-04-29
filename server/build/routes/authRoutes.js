"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const taskController_ts_1 = require("../controllers/taskController.ts"); // Add new controller
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validateTaskcreation_1 = require("../middlewares/validateTaskcreation");
const router = express_1.default.Router();
// Authentication routes
router.post('/register', validationMiddleware_1.validateRegister, authController_1.register);
router.post('/login', validationMiddleware_1.validateLogin, authController_1.login);
router.post('/logout', authMiddleware_1.authenticateJWT, authController_1.logout);
// Profile route
router.get('/profile', authMiddleware_1.authenticateJWT, userController_1.fetchUserProfile);
// Task routes
router.post('/createtask', validateTaskcreation_1.validateCreateTask, authMiddleware_1.authenticateJWT, taskController_ts_1.createTask);
router.get('/dashboard', authMiddleware_1.authenticateJWT, taskController_ts_1.fetchAssignedTasksList);
router.get('/assigned-tasks', authMiddleware_1.authenticateJWT, taskController_ts_1.fetchAssignedTasks);
router.patch('/tasks/:taskId/status', authMiddleware_1.authenticateJWT, taskController_ts_1.updateTaskStatus);
router.delete('/tasks/:taskId', authMiddleware_1.authenticateJWT, taskController_ts_1.deleteTask);
exports.default = router;
