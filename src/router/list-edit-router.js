const express = require('express');
const router = express.Router();
const validateHTTPMethod = require('../middleware/http-method-validator'); // Importa el middleware

module.exports = function (tasks) {
  // Middleware para manejar errores de solicitud POST y PUT
  const handleErrors = (req, res, next) => {
    if (req.method === 'POST' && (!req.body || Object.keys(req.body).length === 0)) {
      return res.status(400).json({ message: 'El cuerpo de la solicitud POST está vacío' });
    }

    if (req.method === 'POST' && (!req.body.id || !req.body.otroAtributo)) {
      return res.status(400).json({ message: 'Información no válida o atributos faltantes para crear la tarea' });
    }

    if ((req.method === 'PUT' || req.method === 'PATCH') && (!req.body || Object.keys(req.body).length === 0)) {
      return res.status(400).json({ message: 'El cuerpo de la solicitud PUT/PATCH está vacío' });
    }

    if ((req.method === 'PUT' || req.method === 'PATCH') && (!req.body.id || !req.body.otroAtributo)) {
      return res.status(400).json({ message: 'Información no válida o atributos faltantes para actualizar la tarea' });
    }

    next(); // Continuar con la solicitud si no se encontraron errores
  };

  // Aplicar el middleware a nivel de aplicación
  router.use(validateHTTPMethod);

  // Aplicar el middleware a todas las rutas
  router.use(handleErrors);

  // Ruta para crear una tarea (POST)
  router.post('/crear', (req, res) => {
    const newTask = { ...req.body };
    
    if (!newTask.id || !newTask.description) {
      res.status(400).json({ message: 'Información no válida o atributos faltantes para crear la tarea' });
      return;
    }
  
    // Agregar la nueva tarea a la lista de tareas
    tasks.push(newTask);
  
    // Responder con la nueva tarea
    res.status(201).json(newTask); // 201 Created
  });
  

// Ruta para eliminar una tarea por ID (DELETE)
router.delete('/eliminar/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(204).json({ message: 'Tarea eliminada con éxito' }); // 204 No Content
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});


// Ruta para actualizar una tarea por ID (PUT o PATCH)
router.put('/actualizar/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body; // Se espera un objeto con los detalles actualizados de la tarea
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});



  return router;
};
