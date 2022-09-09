import { DataSource } from "typeorm";
import Task from "../Entity/task";


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