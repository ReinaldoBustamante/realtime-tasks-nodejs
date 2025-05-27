# realtime-todo-api

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
- **Entorno de ejecución**: Se utilizó Docker para garantizar un entorno de ejecución replicable y homogéneo

## 📁 Estructura del proyecto


## ⚙️ Configuración del entorno

## ▶️ Ejecución de la aplicación
