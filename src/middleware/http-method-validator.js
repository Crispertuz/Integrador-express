// http-method-validator.js
module.exports = function (req, res, next) {
    if (req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'PATCH' && req.method !== 'DELETE') {
      return res.status(400).json({ message: 'Método HTTP no válido' });
    }
    next(); // Continuar con la solicitud si es un método HTTP válido
  };
  