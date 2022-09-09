/* Importación de los tipos Request, Response y NextFunction del módulo express. */
import { Request, Response, NextFunction } from "express";
/* Importar la clase de la tarea desde el archivo task.ts. */
import task from "../src/Entity/task";
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
     * Crea una nueva tarea y la devuelve.
     * @param {Request} req - Request - El objeto de solicitud.
     * @param {Response} res - Response - Este es el objeto de respuesta que se enviará de vuelta al
     * cliente.
     * @param {NextFunction} next - NextFunction - Esta es una función que será llamada si un error
     * ocurre un error.
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
    * La función de lista es una función asíncrona que toma una solicitud, una respuesta y la función next como
     * parámetros. Luego intenta obtener una lista de tareas del repositorio y devuelve un código de estado 200
     * con la lista de tareas. Si hay un error, llama a la siguiente función con el error.
     * @param {Request} req - Request - El objeto de solicitud.
     * @param {Response} res - Response - Este es el objeto de respuesta que será enviado de vuelta al cliente.
     * cliente.
     * @param {NextFunction} next - NextFunction - Esta es una función que será llamada si un error
     * se produce un error.
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
     * Esta función obtiene una tarea especifica de la base de datos y la devuelve al usuario.
     * @param {Request} req - Solicitud - Es el objeto de solicitud que contiene la
     * información.
     * @param {Response} res - Response - Este es el objeto de respuesta que será enviado de vuelta al cliente.
     * cliente.
     * @param {NextFunction} next - NextFunction - Esta es una función que será llamada si un error
     * ocurre un error.
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
     * Toma el taskId de los parámetros de la solicitud, el cuerpo de la solicitud, y luego actualiza
     * la tarea con el taskId dado con el cuerpo dado.
     * @param {Request} req - Solicitud - Es el objeto de solicitud que contiene la información de la solicitud.
     * información de la solicitud.
     * @param {Response} res - Response - Este es el objeto de respuesta que se enviará al cliente.
     * cliente.
     * @param {NextFunction} next - NextFunction - Esta es una función que será llamada si un error
     * se produce un error.
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
     * It takes the taskId from the request params, then deletes the task with that id, and returns the
     * deleted task.
     * @param {Request} req - Request - This is the request object that contains all the information
     * about the request.
     * @param {Response} res - Response - This is the response object that we will use to send back a
     * response to the client.
     * @param {NextFunction} next - NextFunction - This is a function that will be called if an error
     * occurs.
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
