/* Define los tipo para Query y para Id */
export type Query = Record<string, any>

export type Id = string | number

/* Definir una interfaz. */
export interface DatabaseRepository<T>{
    create(data: Partial<T>, query?: Query): Promise<T>
    list(query?: Query): Promise<T[]>
    get(id:Id, query?: Query): Promise<T>
    update(id:Id, data: T, query?: Query): Promise<T>
    delete(id:Id, query?: Query): Promise<T>

}