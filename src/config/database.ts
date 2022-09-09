/* Importa la clase DataSource del paquete typeorm. */
import { DataSource } from "typeorm";
/* Importa la clase Task del archivo Entity/task.ts. */
import Task from "../Entity/task";


/* Crear un nuevo objeto DataSource y exportarlo. */
export default new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "todo",
    entities: [Task],
    synchronize: true,
    logging: false
     
})