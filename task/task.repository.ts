import database from "../src/config/database"
import Task from "../src/Entity/task";
import { DatabaseRepository, Id, Query } from "./declarations";
import {NotFound } from "http-errors"

export class TaskRepository implements DatabaseRepository<Task> {
    async create(data: Partial<Task>, query?: Query | undefined): Promise<Task> {
        const repository = database.getRepository(Task)

        const task = repository.create(data)

        await repository.save(task)
        return task
    }

    async list(query?: Query | undefined): Promise<Task[]> {
        const repository = database.getRepository(Task)
        
        return repository.find()
    }
    async get(id: Id, query?: Query | undefined): Promise<Task> {
        const repository = database.getRepository(Task)

        const task = await repository.findOneBy({id: id as any})
        if (!task) {
        throw new NotFound("Task does not exist")
        }
        return task
            
    }
    async update(id: Id, data: Task, query?: Query | undefined): Promise<Task> {
        const repository = database.getRepository(Task)
        await repository.update(id, data)

        return this.get(id, query)
    }
    async delete(id: Id, query?: Query | undefined): Promise<Task> {
        const repository = database.getRepository(Task)

        const task= this.get(id, query)
        await repository.delete(id)
        return task
    }



}