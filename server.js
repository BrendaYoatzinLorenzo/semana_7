const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Directorio de los archivos construidos del PWA
const publicPath = path.join(__dirname, 'dist');

// Servir los archivos estáticos
app.use(express.static(publicPath));

// Manejar todas las rutas y enviar index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});