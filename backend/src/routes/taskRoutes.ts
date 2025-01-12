import express from 'express';
import { createTask, getAllTasks, getTaskById, updateTask } from '../controller/taskController';
import { authorizeRole } from '../middleware/authorization';

const router = express.Router();

router.get("/", getAllTasks);

router.post('/', authorizeRole(['admin']), createTask);

router.get("/:id", getTaskById);

router.put('/:id', authorizeRole(['admin']), updateTask);

export default router;