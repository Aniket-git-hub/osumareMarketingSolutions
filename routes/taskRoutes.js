import express from 'express';
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../controller/taskController.js';
import reqInputValidation from '../middleware/reqInputValidation.js';
import { requireAuth } from '../middleware/requrieAuth.js';

const router = express.Router();


router.get('/', getTasks)
router.get('/:id', getTaskById)

const createTaskValidation = reqInputValidation([
    { name: 'title', required: true, type: 'string' },
    { name: 'description', required: true, type: 'string' },
    { name: 'isCompleted', required: true, type: 'boolean' }
])

const updateTaskValidation = reqInputValidation([
    { name: 'id', required: true, type: 'integer' },
    { name: 'title', required: false, type: 'string' },
    { name: 'description', required: false, type: 'string' },
    { name: 'isCompleted', required: false, type: 'boolean' }
])

const taskIdValidation = reqInputValidation([
    { name: 'id', required: true, type: 'integer' }
])

router.post('/', requireAuth, createTaskValidation, createTask)
router.put('/:id', requireAuth, updateTaskValidation, updateTask)
router.delete('/:id', requireAuth, taskIdValidation, deleteTask)

export default router;