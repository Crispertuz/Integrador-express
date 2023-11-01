
const express = require('express');
const app = express();
const port = 3000;

require('dotenv').config(); // Cargar variables de entorno

// Importar las rutas y otros módulos
const route = require('./router');
const listEditRouter = require('./list-edit-router');
const listViewRouter = require('./list-view-router');
const listAllRouter = require('./list-all-router');
const createTaskController = require('./create-task-controller'); 
const updateTaskController = require('./update-task-controller'); 
const deleteTaskController = require('./delete-task-controller'); 
const listAllTasksController = require('./list-all-tasks-controller'); 
const listCompletedTasksController = require('./list-completed-tasks-controller'); 
const listIncompleteTasksController = require('./list-incomplete-tasks-controller'); 
const getTaskByIdController = require('./get-task-by-id-controller'); 

// Middleware para procesar el cuerpo JSON de las solicitudes
app.use(express.json());

// Usar las rutas definidas en los módulos
app.use('/api', route);
app.use('/listas', listViewRouter);
app.use('/editar', listEditRouter);
app.use('/tasks', listAllRouter);

// Otras rutas que puedas tener en app.js sin cambios
app.get('/', (req, res) => {
  res.status(200).send('Bienvenido Al Sistema De Gestión De Tareas');
});

// Crear una nueva tarea
app.post('/api/tareas', createTaskController);

// Actualizar una tarea
app.put('/api/tareas/:id', updateTaskController);

// Eliminar una tarea
app.delete('/api/tareas/:id', deleteTaskController);

// Listar todas las tareas
app.get('/api/tareas', listAllTasksController);

// Listar las tareas completas
app.get('/api/tareas/completas', listCompletedTasksController);

// Listar las tareas incompletas
app.get('/api/tareas/incompletas', listIncompleteTasksController);

// Obtener una sola tarea por ID
app.get('/api/tareas/:id', getTaskByIdController);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
