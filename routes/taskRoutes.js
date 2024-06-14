import express from 'express';
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../controller/taskController';

const router = express.Router();

router.get('/', getTasks)
router.get('/:id', getTaskById)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router;