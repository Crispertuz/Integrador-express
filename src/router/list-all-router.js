
const express = require('express');
const router = express.Router();

router.get('/todas', (req, res) => {
  res.status(200).json(tasks); // Devuelve todas las tareas con el código 200 OK
});

module.exports = router;
