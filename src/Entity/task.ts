/* Importación de los decoradores de la biblioteca typeorm. */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

/* La clase Task es una clase TypeScript que está decorada con el decorador @Entity(). 

El decorador @Entity() indica a TypeORM que esta clase es una entidad que debe ser almacenada en la
base de datos. 

El decorador @PrimaryGeneratedColumn() le dice a TypeORM que esta columna es la clave primaria de la
tabla. 

El decorador @Column() indica a TypeORM que esta propiedad es una columna de la base de datos. 

Los decoradores @CreateDateColumn() y @UpdateDateColumn() indican a TypeORM que estas propiedades son
createdAt y updatedAt columnas en la base de datos. 

El decorador @Column("boolean", {por defecto: false}) indica a TypeORM que esta propiedad es una columna booleana
en la base de datos. 

El decorador @Column() se utiliza para decorar las propiedades title y description. 
*/

@Entity()
export default class Task {
    @PrimaryGeneratedColumn("uuid") 
    id!: number;

    @Column()
    title!: string

    @Column()
    description!: string

    @Column("boolean")
    isCompleted!: boolean

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updateAt!: Date
    
}