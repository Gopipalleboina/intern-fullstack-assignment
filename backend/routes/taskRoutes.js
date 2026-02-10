import express from 'express';
import {
    gettasks,
    createtask,
    updatetask,
    deletetask
} from '../controllers/taskController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const taskrouter=express.Router();
taskrouter.use(authMiddleware);
taskrouter.get('/',gettasks);
taskrouter.post('/',createtask);
taskrouter.put('/:id',updatetask);
taskrouter.delete('/:id',deletetask);

export default taskrouter;