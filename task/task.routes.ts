/** Importa la clase Router del módulo express. */
import { Router } from "express";
/** Importa la clase TaskController del archivo task.controller.ts. */
import { TaskController } from "./task.controller";
/** Importa la clase TaskRepository del archivo task.repository.ts. */
import {TaskRepository } from "./task.repository";


/** Creación de una nueva instancia de la clase Router. */
const router = Router();

/** Crear una nueva instancia de la clase TaskController y pasa una nueva instancia de la clase
TaskRepository. */
const controller = new TaskController(
    new TaskRepository ()
);
    


/** El código está creando una nueva tarea. */
router.post('/task',controller.create.bind(controller))

/** Obtención de la lista de tareas. */
router.get('/task',controller.list.bind(controller))

/** Obtención de la lista de tareas especificas. */
router.get('/task/:taskId',controller.get.bind(controller))

/** Actualización de la tarea. */
router.put('/task/:taskId',controller.update.bind(controller))

/** Borrar la tarea. */
router.delete('/task/:taskId', controller.delete.bind(controller))


/** Exportación del objeto router. */
export default router