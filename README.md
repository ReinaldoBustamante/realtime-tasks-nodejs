# realtime-tasks-nodejs

Aplicación para gestionar tareas en tiempo real con WebSockets. Construida con Node.js y Express

## 📋 Características
- CRUD completo de tareas
- Interfaz simple para probar la API
- Comunicación en tiempo real via websockets.
- Base de datos con SQLite.
- Fácil de probar y ejecutar.

## 🧠 Decisiones de diseño
- **Base de datos**: Se utilizó `SQLite` por su facilidad de uso y configuración en entornos de desarrollo. Para manejar las consultas se usó `Prisma ORM`, lo que simplifica la definición de modelos y el acceso a los datos.
- **WebSockets**: Se optó por la biblioteca `ws` en lugar de `socket.io`, ya que `ws` implementa el protocolo WebSocket de forma nativa y puede ser probado fácilmente con herramientas como `wscat` o `Postman`. En cambio, `socket.io` utiliza un protocolo propio sobre WebSocket, lo que impide su prueba directa con estas herramientas sin un cliente específico.
- **Entorno de ejecución**: Se utilizó `Docker` para garantizar un entorno de ejecución replicable y homogéneo

## 📁 Estructura del proyecto
```bash
realtime-tasks-nodejs
│
├── docker-compose.yml                  # Configuracion de docker-compose para levantar múltiples contenedores
├── .env.template                       # Plantilla de variables de entorno necesarias para la ejecución de la aplicación
├── .gitignore  
├── realtime-tasks-api/
│   ├── Dockerfile                      # Imagen Docker de la API
│   ├── package.json                    # Dependencias y scripts del proyecto
│   ├── tsconfig.json                   # Configuración de TypeScript
│   ├── .dockerignore 
│   ├── prisma/
│   │   └── schema.prisma               # Definición del esquema de base de datos
│   ├── src/
│   │   ├── app.ts                      # Punto de entrada principal de la aplicación
│   │   ├── config/
│   │   │   └── db/  
│   │   │       └── connection.ts       # Creacion de la instancia PrismaClient para interactuar con la base de datos
│   │   ├── domain/  
│   │   │   ├── dtos/  
│   │   │   │   ├── createTask.dto.ts   # Validador y estructura para crear tareas
│   │   │   │   └── updateTask.dto.ts   # Validador y estructura para actualizar tareas
│   │   │   ├── errors/  
│   │   │   │   └── custom.error.ts     # Clase para manejo de errores personalizados
│   │   │   └── services/  
│   │   │       ├── tasks.service.ts    # Logica de negocio para manejar tareas
│   │   │       └── wss.service.ts      # Servicio de WebSockets para comunicación en tiempo real 
│   │   └── presentation/    
│   │       ├── server.ts               # Define los metodos para inicializar el servidor     
│   │       └── routes/    
│   │           ├── router.ts           # Define las rutas globales de la API
│   │           └── todos/  
│   │               ├── controller.ts   # Contiene la logica de las peticiones http
│   │               └── router.ts       # Define los endpoints relacionado a la ruta /tasks
│
├── realtime-tasks-app/
│   ├── Dockerfile                      # Imagen Docker de la interfaz de usuario
│   ├── index.html                      # HTML principal
│   ├── main.js                         # Logica Principal
│   └── styles.css                      # Estilos CSS    
```

## ⚙️ Configuración del entorno

La aplicación esta configurada para ejecutarse mediante Docker. Para ello, sigue estos pasos:
- Instala [Docker](https://docs.docker.com/get-started/get-docker/) si aun no lo tienes
- Clona el repositorio

    ```
    git clone https://github.com/ReinaldoBustamante/realtime-tasks-nodejs.git
    ```
- Accede al directorio del proyecto
    
    ```
    cd realtime-tasks-nodejs
    ```

- En la raiz del proyecto, crea un archivo `.env` a partir del `.env.template` con la variable:

    ```
    DATABASE_URL="file:./dev.db"
    ```

---
> **Importante:** La siguiente configuración es solo por si se desea ejecutar únicamente la API sin el frontend.

Para ejecutar la API manualmente, se deberá hacer lo siguiente:
- En la carpeta `realtime-tasks-api/`, crea un archivo `.env`a partir del `.env.template` con la variable:

    ```
    DATABASE_URL="file:./dev.db"
    ```
- Accede al directorio realtime-tasks-api/
    ```
    cd realtime-tasks-api
    ```
- Instala las dependencias del proyecto :
    ```bash
    npm install
    ``` 
- Crea la migración y generar el cliente de Prisma:
    ```bash
    npx prisma migrate dev
    ``` 
## ▶️ Ejecución de la aplicación

La ejecucion dependera de como se configuro el entorno. 

### Ejecucion backend + frontend ( Docker ).
Ejecute el siguiente comando en la raiz del proyecto.
```
docker compose up
```

Esto construira y levantará automaticamente los contenedores definidos en `docker-compose.yml`. Una vez levantados los servicios se podra acceder mediante:
- API: http://localhost:3000/api
- Interfaz web: http://localhost:8080

### Ejecucion manual de la API.
Accede al directorio `realtime-tasks-api/`
```
cd realtime-tasks-api
```

Ejecute la aplicacion utilizando los script definidos en `package.json`
```
npm run dev
```
La API estara corriendo en el puerto 3000 y se podra acceder a travez de http://localhost:3000/api


#### Probar WebSockets sin frontend
Para probar WebSockets sin una interfaz grafica, es necesario utilizar herramientas como `wscat` el cual simula un cliente. Para hacer esto instale la herramienta mencionada
```
sudo npm install -g wscat
```
Conectece al websocket desde multiples ventanas de la terminal
```
wscat -c ws://localhost:3000/api
```
En otra terminal realice peticiones http mediante la herramienta de su preferencia, para esto se utilizara curl
```
curl -X POST http://localhost:3000/api/tasks \
-H "Content-Type: application/json" \
-d '{"title": "Nueva tarea"}'
```
revisar las terminales clientes y observar el evento emitido `{ type, payload }`

### Endpoints
- GET /tasks
    - **Descripcion**: Obtiene la lista de tareas del sistema
    - **Methodo HTTP**: GET
    - **Ejemplo de request**:

        ```
        curl -X GET http://localhost:3000/api/tasks
        ```
- POST /tasks
    - **Descripcion**: Crea una nueva tarea en el sistema
    - **Methodo HTTP**: POST
    - **Campos (JSON)**:
        | Campo     | Tipo    | Requerido | Descripción                           |
        |---------------|---------|-----------|---------------------------------------|
        | `title`          | string  | Sí        | ID de la tarea                        |
        | `description`          | string  | No        | Descripcion de la tarea                      |
        | `status`          | string  | No        | Estado de la tarea (pendiente o completada)                        |
    - **Ejemplo de request**:

        ```
        curl -X POST http://localhost:3000/api/tasks \
        -H "Content-Type: application/json" \
        -d '{"title": "Nueva tarea"}'
        ```
- PUT /tasks/:id
    - **Descripcion**: Actualiza una tarea existente
    - **Methodo HTTP**: PUT
    - **Parametros de la url**:
        | Parametro     | Tipo    | Requerido | Descripción                           |
        |---------------|---------|-----------|---------------------------------------|
        | `id`          | int  | Sí        | ID de la tarea                        |
    - **Campos (JSON)**:
        | Campo     | Tipo    | Requerido | Descripción                           |
        |---------------|---------|-----------|---------------------------------------|
        | `title`          | string  | No        | ID de la tarea                        |
        | `description`          | string  | No        | Descripcion de la tarea                      |
        | `status`          | string  | No        | Estado de la tarea (pendiente o completada)                        |
    - **Ejemplo de request**:

        ```
        curl -X PUT http://localhost:3000/api/tasks/id \
        -H "Content-Type: application/json" \
        -d '{"title": "Nueva tarea actualizada", "status": "completed"}'
        ```

- DELETE /tasks/:id
    - **Descripcion**: Elimina una tarea existente
    - **Methodo HTTP**: DELETE
    - **Parametros de la url**:
        | Parametro     | Tipo    | Requerido | Descripción                           |
        |---------------|---------|-----------|---------------------------------------|
        | `id`          | int  | Sí        | ID de la tarea                        |
                    
    - **Ejemplo de request**:

        ```
        curl -X DELETE http://localhost:3000/api/tasks/id
        ```