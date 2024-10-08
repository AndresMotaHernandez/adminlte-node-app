const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para el formulario de validación
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'adminLTE', 'index.html'));
});

// Ruta para validar al participante con la API
app.get('/validate', (req, res) => {
    const { id, NombreCentro } = req.query; // Obtener los datos del query string

    // Verificar que se hayan pasado ambos parámetros
    if (!id || !NombreCentro) {
        return res.status(400).json({ error: 'Faltan parámetros: id y NombreCentro son obligatorios' });
    }

    // Llamar a la API de validación
    axios.get(`https://oportunidad1424api.gabsocial.gob.do/api/v1/participants/validatePartipanteByCriteria`, {
        params: {
            id: id,
            NombreCentro: NombreCentro
        }
    })
    .then(response => {
        // Manejar la respuesta de la API
        if (response.data.valid) {
            // Si es válido, redirigir a la página permitida
            res.redirect('/acceso-permitido');
        } else {
            // Si no es válido, enviar un mensaje de error
            res.status(401).json({ error: 'Validación fallida. Los datos proporcionados no son correctos.' });
        }
    })
    .catch(error => {
        console.error('Error en la llamada a la API:', error);
        res.status(500).json({ error: 'Error en el servidor o en la API.' });
    });
});

// Ruta para la página de acceso permitido
app.get('/acceso-permitido', (req, res) => {
    res.send('<h1>Acceso Permitido</h1><p>Has sido validado correctamente.</p>');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
