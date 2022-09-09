import { Router } from "express";
import { TaskController } from "./task.controller";
import {TaskRepository } from "./task.repository";


const router = Router();

const controller = new TaskController(
    new TaskRepository ()
);
    

router.post('/task',controller.create.bind(controller))

router.get('/task',controller.list.bind(controller))

router.get('/task/:taskId',controller.get.bind(controller))

router.put('/task/:taskId',controller.update.bind(controller))

router.delete('/task/:taskId', controller.delete.bind(controller))


export default router