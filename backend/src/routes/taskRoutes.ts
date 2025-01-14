import express from 'express';
import { archiveTask, createTask, getAllTasks, getTaskById, restoreTask, updateTask, updateUserTaskStatus } from '../controller/taskController';
import { authorizeRole } from '../middleware/authorization';

const router = express.Router();

router.get("/", getAllTasks);

router.post('/', authorizeRole(['admin']), createTask);

router.get("/:id", getTaskById);

router.put('/:id', authorizeRole(['admin']), updateTask);

router.put("/:id/archive", authorizeRole(['admin']), archiveTask);

router.put("/:id/restore", authorizeRole(['admin']), restoreTask);

router.put("/:userId/:taskId/approve", authorizeRole(['admin']), updateUserTaskStatus("approved"));

router.put("/:userId/:taskId/reject", authorizeRole(['admin']), updateUserTaskStatus("rejected"));

export default router;