/** Importa la conexión a la base de datos desde el archivo database.ts. */
import database from "../config/database"
/** Importa la clase Task del archivo task.ts. */
import Task from "../Entity/task";
/** Importa las interfaces DatabaseRepository, Id y Query del archivo declarations.ts. */
import { DatabaseRepository, Id, Query } from "./declarations";
/** Importa la clase NotFound del paquete http-errors. */
import {NotFound } from "http-errors"


/* Es una clase que implementa la interfaz DatabaseRepository, lo que significa que tiene que tener un método
findAll() que devuelva un array de objetos Task. */
export class TaskRepository implements DatabaseRepository<Task> {

    
    /**
     * Crea una nueva tarea y la guarda en la base de datos.
     * @param data - Partial<Task> - Son los datos que se utilizarán para crear la nueva tarea.
     * @param {Query | undefined} [query] - Query | undefined
     * @returns La tarea que se ha creado.
     */
    async create(data: Partial<Task>, query?: Query | undefined): Promise<Task> {
        const repository = database.getRepository(Task)
        /* Creación de una nueva tarea con los datos que se han pasado a la función. */
        const task = repository.create(data)
        /* Guardando la tarea en la base de datos y devolviendo la tarea. */
        await repository.save(task)
        return task
    }

    /**
     * Esta función devuelve una lista de tareas de la base de datos.
     * @param {Query | undefined} [query] - Consulta | undefined
     * @Retorna Un array de objetos Tarea.
     */
    async list(query?: Query | undefined): Promise<Task[]> {
        /* Obtención del repositorio para la entidad Task. */
        const repository = database.getRepository(Task)
        /* Devolución de todas las tareas de la base de datos.*/
        return repository.find()
    }

    /**
     * "Esta función devuelve una tarea de la base de datos, si existe, de lo contrario arroja un error".
     * 
     * La primera línea de la función es una anotación de tipo. Le dice al compilador que la función
     * devuelve una promesa de una tarea.
     * 
     * La segunda línea es una anotación de tipo para el parámetro id. Le dice al compilador que el parámetro id
     * es de tipo Id.
     * 
     * La tercera línea es una anotación de tipo para el parámetro query. Indica al compilador que el parámetro
     * parámetro de consulta es de tipo Query.
     * 
     * La cuarta línea es una anotación de tipo para el valor de retorno de la función. Le dice al compilador
     * que la función devuelve una tarea.
     * 
     * La quinta línea es una anotación de tipo para la variable de repositorio. Le dice al compilador que la variable
     * la variable repositorio es de tipo Repositorio.
     * 
     * La sexta línea es una anotación de tipo para la variable tarea. Indica al compilador que la variable task
     * es de tipo Task
     * @param {Id} id - Id - El id de la tarea a obtener
     * @param {Query | undefined} [query] - Query | undefined
     * @returns El objeto de la tarea
     */
    async get(id: Id, query?: Query | undefined): Promise<Task> {

        /* Obtención del repositorio para la entidad de la Tarea. */
        const repository = database.getRepository(Task)
        /* El método `findOneBy` toma un objeto como parámetro. El objeto tiene una propiedad llamada `id`.
        y el valor de la propiedad es `id as any`. El "como cualquiera" es una afirmación de tipo. Le dice al compilador
        al compilador que el valor de la variable `id` es del tipo `any`. */
        const task = await repository.findOneBy({id: id as any})
        /* Comprueba si la tarea existe. Si no existe, lanza un error. Si existe, devuelve la
        devuelve la tarea. */
        if (!task) {
        throw new NotFound("Task does not exist")
        }
        return task   
    }


    /**
     * Actualizar una tarea por id, y devolver la tarea actualizada.
     * @param {Id} id - Id - El id de la tarea a actualizar
     * @param {Task} data - Tarea - Son los datos que se actualizarán en la base de datos.
     * @param {Query | undefined} [query] - Consulta | undefined
     * @returns La tarea actualizada.
     */
    async update(id: Id, data: Task, query?: Query | undefined): Promise<Task> {
        /* Obtención del repositorio para la entidad de la Tarea. */
        const repository = database.getRepository(Task)
        /* Actualizar la tarea con el id de `id` con los datos de `data`. */
        await repository.update(id, data)

        /* Returning the updated task. */
        return this.get(id, query)
    }

    /**
     * Delete a task from the database and return the deleted task.
     * @param {Id} id - Id - The id of the task to delete
     * @param {Query | undefined} [query] - Query | undefined
     * @returns The task that was deleted.
     */
    async delete(id: Id, query?: Query | undefined): Promise<Task> {
        /* Obtención del repositorio para la entidad de la Tarea. */
        const repository = database.getRepository(Task)

        /* Obtener la tarea que se va a eliminar. */
        const task= this.get(id, query)
        /* Deleting the task and returning the deleted task. */
        await repository.delete(id)
        return task
    }



}