/** Importación del módulo express. */
import express from "express";
/** Una biblioteca que le permite usar decoradores en TypeScript. -TypeOrm */
import "reflect-metadata";
/** Importación de la conexión a la base de datos. - MySql*/
import database from "./config/database";
/** Importar las rutas del archivo task.routes.ts. */
import TaskRoutes from "./task/task.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./Docs/swagger";


/** Creación de una instancia de la aplicación express */
const app = express();


/** Un middleware que analiza el cuerpo de la solicitud y lo hace disponible en la propiedad req.body. */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/documentation",swaggerUi.serve, swaggerUi.setup(swaggerSetup))

/** Una promesa que se está llamando. */
database.initialize()
    .then(() => console.log("Se conecto correctamente con la base de datos"))
    .catch(console.error)

/** Un middleware que se va a ejecutar cada vez que el usuario haga una petición al servidor. */
app.use(TaskRoutes)

/** Escuchando el puerto 3030. */
app.listen(3030, () => {
    console.log("La app se esta ejecutando en el puerto: 3030")
});
