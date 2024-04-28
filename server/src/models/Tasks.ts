import mongoose, { Schema, Document } from 'mongoose';

// Task interface
export interface ITask extends Document {
    name: string;
    description: string;
    assignedTo: 'personal' | 'others';
    assigneeEmail?: string;
    createdAt: Date;
    status: 'pending' | 'in-progress' | 'completed';
    assignedBy: mongoose.Types.ObjectId; // User who created/assigned the task
}

// Task schema definition
const taskSchema = new Schema<ITask>({
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
            validator: function (this: ITask, email: string): boolean {
                return this.assignedTo === 'others'
                    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) // Validate email format for 'others'
                    : true; // No validation needed for 'personal'
            },
            message: 'Invalid email format.',
        },
        required: function () {
            return (this as ITask).assignedTo === 'others'; // Required only for 'others'
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
        type: mongoose.Schema.Types.ObjectId, // Reference to the 'User' model
        ref: 'User', // Specify which model is referenced
        required: true, // Task must be created by a user
    },
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
