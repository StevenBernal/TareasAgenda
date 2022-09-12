import swaggerJSDoc, {OAS3Definition, OAS3Options} from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
    openapi: "3.0.3",
    info:{
        title: "Documentacion de la API Agenda de tareas",
        version: "1.0.0",
    },
    servers:[
        {
            url: "http://localhost:3030",
        },
    ],
    components: {
        securitySchemes:{
            bearerAuth:{
                type: "http",
                schema: "bearer",
            },
        },   
        schemas: {
            task:{
                type: "object",
                required:[ "title, description, isCompleted, createdAt, updateAt" ],
                properties: {    
                    title: { 
                        type: 'string', 
                    },
                    description: {
                        type: 'string'
                    },
                    isCompleted: { 
                        type: 'boolean'
                    },
                    createdAt:{
                        type: 'Date'
                    },
                    updateAt: {
                        type: 'Date'
                    }

                },
            },
            
        },
            
    },



};

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ["./src/task/*.ts"]

}

export default swaggerJSDoc(swaggerOptions);