/* Importación del módulo express. */
import express from "express";

/* Una biblioteca que le permite usar decoradores en TypeScript. */
import "reflect-metadata"; 
/* Importación de la conexión a la base de datos. */
import database from "./config/database";


import TaskRoutes from "../task/task.routes";


/* Creación de una instancia de la aplicación express */
const app = express(); 

app.use(express.json())
app.use(express.urlencoded({extended: false}))

database.initialize()
 .then(() => console.log("Database connected"))
 .catch(console.error)

app.use('/api', TaskRoutes)

app.listen(3030, () => {
    console.log("App execute in port: 3030")
});
