"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Task schema definition
const taskSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: String,
        required: true,
    },
    assigneeEmail: {
        type: String,
        validate: {
            validator: function (email) {
                return this.assignedTo === 'others'
                    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) // Validate email format for 'others'
                    : true; // No validation needed for 'personal'
            },
            message: 'Invalid email format.',
        },
        required: function () {
            return this.assignedTo === 'others'; // Required only for 'others'
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'], // Predefined status values
        default: 'pending',
    },
    assignedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId, // Reference to the 'User' model
        ref: 'User', // Specify which model is referenced
        required: true, // Task must be created by a user
    },
});
const Task = mongoose_1.default.model('Task', taskSchema);
exports.default = Task;
