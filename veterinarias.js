const express = require('express');
const app = express();

app.use(express.json());

const veterinarias = [
    { id: 1, nombre: 'Veterinaria Don Gato', direccion: 'calle 10B #23-453', numeroTelefono: 3147857602, correoContacto: 'dongato@gmail.com' },
    { id: 2, nombre: 'Veterinaria El Perro Feliz', direccion: 'avenida 5 #45-678', numeroTelefono: 3101234567, correoContacto: 'elperrofeliz@gmail.com' },
    { id: 3, nombre: 'Veterinaria Amigo Fiel', direccion: 'carrera 15 #34-567', numeroTelefono: 3209876543, correoContacto: 'amigofiel@gmail.com' },
    { id: 4, nombre: 'Veterinaria Gatitos y Perritos', direccion: 'calle 8 #56-789', numeroTelefono: 3187654321, correoContacto: 'gatitosyperritos@gmail.com' },
    { id: 5, nombre: 'Veterinaria Animal Care', direccion: 'carrera 20 #12-345', numeroTelefono: 3158765432, correoContacto: 'animalcare@gmail.com' }
];

// Método Get para obtener una respuesta global //
app.get('/', (req, res) => {
    res.send('Api para obtener veterinarias');
});

// Método Get para obtener el listado de todas las veterinarias //
app.get('/api/veterinarias', (req, res) => {
    res.send(veterinarias);
});

// Método Get para obtener una veterinaria por ID //
app.get('/api/veterinarias/:id', (req, res) => {
    const veterinaria = veterinarias.find(v => v.id === parseInt(req.params.id));
    if (!veterinaria) return res.status(404).send('Veterinaria no encontrada');
    else res.send(veterinaria);
});

// Método Post para añadir una veterinaria a la base de datos //
app.post('/api/veterinarias', (req, res) => {
    const veterinaria = {
        id: veterinarias.length + 1,
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        numeroTelefono: parseInt(req.body.numeroTelefono),
        correoContacto: req.body.correoContacto
    };

    veterinarias.push(veterinaria);
    res.send(veterinaria);
});

// Método Put para editar la información de una veterinaria //
app.put('/api/veterinarias/:id', (req, res) => {
    const veterinaria = veterinarias.find(v => v.id === parseInt(req.params.id));
    if (!veterinaria) return res.status(404).send('Veterinaria no encontrada');

    veterinaria.nombre = req.body.nombre || veterinaria.nombre;
    veterinaria.direccion = req.body.direccion || veterinaria.direccion;
    veterinaria.numeroTelefono = parseInt(req.body.numeroTelefono) || veterinaria.numeroTelefono;
    veterinaria.correoContacto = req.body.correoContacto || veterinaria.correoContacto;

    res.send(veterinaria);
});

// Método Delete para eliminar una veterinaria de la base de datos //
app.delete('/api/veterinarias/:id', (req, res) => {
    const veterinaria = veterinarias.find(v => v.id === parseInt(req.params.id));
    if (!veterinaria) return res.status(404).send('Veterinaria no encontrada');

    const index = veterinarias.indexOf(veterinaria);
    veterinarias.splice(index, 1);
    res.send(veterinaria);
});

const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));