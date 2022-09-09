/** Importación del módulo express. */
import express from "express";
/** Una biblioteca que le permite usar decoradores en TypeScript. -TypeOrm */
import "reflect-metadata";
/** Importación de la conexión a la base de datos. - MySql*/
import database from "./config/database";
/** Importar las rutas del archivo task.routes.ts. */
import TaskRoutes from "../task/task.routes";


/** Creación de una instancia de la aplicación express */
const app = express();


/** Un middleware que analiza el cuerpo de la solicitud y lo hace disponible en la propiedad req.body. */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


/** Una promesa que se está llamando. */
database.initialize()
    .then(() => console.log("Database connected"))
    .catch(console.error)

/** Un middleware que se va a ejecutar cada vez que el usuario haga una petición al servidor. */
app.use('/api', TaskRoutes)

/** Escuchando el puerto 3030. */
app.listen(3030, () => {
    console.log("App execute in port: 3030")
});
