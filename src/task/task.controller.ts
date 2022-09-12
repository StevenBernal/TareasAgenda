/* Importación de los tipos Request, Response y NextFunction del módulo express. */
import { Request, Response, NextFunction } from "express";
/* Importar la clase de la tarea desde el archivo task.ts. */
import task from "../Entity/task";
/* Importar la interfaz DatabaseRepository desde el archivo declarations.ts. */
import { DatabaseRepository } from "./declarations";

/* La clase TaskController es una clase controladora que maneja las operaciones CRUD para el modelo Task. */
export class TaskController {
    /**
     * Una función constructora que toma un parámetro de tipo DatabaseRepository.
     * @param repositorio - DatabaseRepository<task>
     */
    constructor(private repository: DatabaseRepository<task>){} 
    

    /**
     * 
     * @swagger
     * /Task:
     *    post:
     *      tags:
     *        - tasks
     *      summary: "Crear tarea"
     *      description: "Esta funcion crea una nueva tarea y la devuelve"
     *      requestBody:
     *          content:
     *            application/json:
     *              schema:
     *                $ref: "#/components/schemas/task"
     *      responses:
     *        '200':
     *          description: Retorna el objeto insertado en la coleccion.
     *        '400':
     *          description: Error de validacion.   
     *      security:
     *       - bearerAuth: []                   
     *          
     */
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          /* Obtención del cuerpo de la solicitud. */
            const body = req.body;
            /* Crear una nueva tarea y devolverla. */
            const task = await this.repository.create(body)
            res.status(200).json(task)
        } catch (error) {
            next(error)
        }
    }


    /**
     * 
     * @swagger
     * /Task:
     *    get:
     *      tags:
     *        - tasks
     *      summary: "Lista de tareas"
     *      description: "Esta funcion devuelve todas las tareas"
     *      responses:
     *        '200':
     *          description: Retorna el objeto insertado en la coleccion.
     *        '400':
     *          description: Error de validacion.   
     *      security:
     *       - bearerAuth: []                   
     *          
     */
    async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            /* Llamada a la función de lista en el repositorio. */
            const tasks = await this.repository.list()
            res.status(200).json(tasks)
        } catch (error) {
            next(error)
        }
    }


    /**
     * 
     * @swagger
     * /Task/{id}:
     *    get:
     *      tags:
     *        - tasks
     *      summary: "Tarea especifica"
     *      description: "Esta funcion devuelve una tarea en especifico"
     *      parameters:
     *          - in: path
     *            name: id
     *            required: true
     *            description: "Id de la tarea requerida:"
     *            schema:
     *              type: number
     *      responses:
     *        '200':
     *          description: Retorna el objeto insertado en la coleccion.
     *        '400':
     *          description: Error de validacion.   
     *      security:
     *       - bearerAuth: []                   
     *          
     */
    async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            /* Desestructuración del taskId a partir de los parámetros de la solicitud. */
            const {taskId} = req.params
            /* Llamando a la función get en el repositorio y pasando el taskId como parámetro. */
            const task = await this.repository.get(taskId)
            res.status(200).json(task) 
            
        } catch (error) {
            next(error)
        }   
        
        
    }


    /**
     * 
     * @swagger
     * /Task/{id}:
     *    put:
     *      tags:
     *        - tasks
     *      summary: "Actualiza una tarea"
     *      description: "Esta funcion actualiza una tarea y la devuelve"
     *      parameters:
     *          - in: path
     *            name: id
     *            required: true
     *            description: "Id de la tarea requerida:"
     *            schema:
     *              type: number
     *      requestBody:
     *          content:
     *            application/json:
     *              schema:
     *                $ref: "#/components/schemas/task"
     *      responses:
     *        '200':
     *          description: Retorna el objeto insertado en la coleccion.
     *          content:
     *            application/json:
     *              schema:
     *                $ref: "#/components/schemas/task"
     *        '400':
     *          description: Error de validacion.   
     *      security:
     *       - bearerAuth: []                   
     *          
     */
    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            /* Desestructuración del taskId a partir de los parámetros de la solicitud y del cuerpo de la misma. */
            const {taskId} = req.params
            const body = req.body

            /* Llama a la función de actualización en el repositorio y pasar el taskId y el cuerpo como
            como parámetros. */
            const  task = await this.repository.update(taskId, body)
            res.status(200).json(task)
        } catch (error) {
            next(error)
        }
    }


    /**
     * 
     * @swagger
     * /Task/{id}:
     *    delete:
     *      tags:
     *        - tasks
     *      summary: "Eliminar tarea"
     *      description: "Esta funcion elimina una tarea en especifico"
     *      parameters:
     *          - in: path
     *            name: id
     *            required: true
     *            description: "Id de la tarea requerida:"
     *            schema:
     *              type: number
     *      responses:
     *        '200':
     *          description: Retorna el objeto insertado en la coleccion.
     *        '400':
     *          description: Error de validacion.   
     *      security:
     *       - bearerAuth: []                   
     *          
     */
    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            /* Desestructuración del taskId a partir de los parámetros de la solicitud. */
            const {taskId} = req.params

            /* Llamando a la función de borrado en el repositorio y pasando el taskId como parámetro. */
            const task = await this.repository.delete(taskId)
            res.status(200).json(task)
        } catch (error) {
            next(error)
        }
    }
}
