const express = require('express');
const app = express();

app.use(express.json());

const mascotas = [
    {id: 1, especie: 'Gato', nombre: 'Luna', raza: 'Criollo', color: 'Negro', edad: 5, genero:'M', duenio: 'Milena Soto', correoContacto: 'milena87@gmail.com', esterilizado: true, alergico: false, atencionEspecial: true},
    {id: 2, especie: 'Gato', nombre: 'Sakura', raza: 'Birmano', color: 'Cafe con manchas blancas', edad: 3, genero:'F', duenio: 'Daniela Contreras', correoContacto: 'danilaosTrece@gmail.com', esterilizado: true, alergico: false, atencionEspecial: false},
    {id: 3, especie: 'Perro', nombre: 'Coco', raza: 'Basenji', color: 'Blanco', edad: 2, genero:'M', duenio: 'Jacobo Torres', correoContacto: 'jacob_simphony@gmail.com', esterilizado: false, alergico: false, atencionEspecial: true},
    {id: 4, especie: 'Perro', nombre: 'Zeus', raza: 'Pastor alemán', color: 'Negro', edad: 1, genero:'M', duenio: 'Lina Orozco', correoContacto: 'linaOrozco123@gmail.com', esterilizado: true, alergico: false, atencionEspecial: false},
    {id: 5, especie: 'Gato', nombre: 'Coraline', raza: 'Criollo', color: 'Negro', edad: 7, genero:'F', duenio: 'Daniel Perlaza', correoContacto: 'daniel.per@gmail.com', esterilizado: false, alergico: true, atencionEspecial: false},
    {id: 6, especie: 'Conejo', nombre: 'Copito de nieve', raza: 'Belier', color: 'Blanco', edad: 1, genero:'MF', duenio: 'Carla Montreal', correoContacto: 'carlamon43@gmail.com', esterilizado: false, alergico: true, atencionEspecial: true}
];

// Método Get para obtener una respuesta global //
app.get('/', (req, res) => {
    res.send('Api veterinaria - KudiVet');
});

// Método Get para obtener el listado de todas las mascotas //
app.get('/api/mascotas', (req, res) => {
    res.send(mascotas);
});

// Método Get para obtener una mascota por ID //
app.get('/api/mascotas/:id', (req, res) => {
    const mascota = mascotas.find(c => c.id === parseInt(req.params.id));
    if (!mascota) return res.status(404).send('Mascota no encontrada');
    else res.send(mascota);
});

// Método Post para añadir una mascota a la base de datos //
app.post('/api/mascotas', (req, res) => {
    const mascota = {
        id: mascotas.length + 1,
        especie: req.body.especie,
        nombre: req.body.nombre,
        raza: req.body.raza,
        color: req.body.color,
        edad: parseInt (req.body.edad),
        genero: req.body.genero,
        duenio: req.body.duenio,
        correoContacto: req.body.correoContacto,
        esterilizado: (req.body.esterilizado === 'true'),
        alergico: (req.body.alergico === 'true'),
        atencionEspecial: (req.body.atencionEspecial === 'true'),
    };

    mascotas.push(mascota);
    res.send(mascota);
});

// Método Put para editar la información de una mascota //
app.put('/api/mascotas/:id', (req, res) => {
    const mascota = mascotas.find(c => c.id === parseInt(req.params.id));
    if (!mascota) return res.status(404).send('Mascota no encontrada');

    mascota.especie = req.body.especie || mascota.especie;
    mascota.nombre = req.body.nombre || mascota.nombre;
    mascota.raza = req.body.raza || mascota.raza;
    mascota.color = req.body.color || mascota.color;
    mascota.edad = parseInt(req.body.edad) || mascota.edad;
    mascota.genero = req.body.genero || mascota.genero;
    mascota.duenio = req.body.duenio || mascota.duenio;
    mascota.correoContacto = req.body.correoContacto || mascota.correoContacto;
    mascota.esterilizado = req.body.esterilizado === 'true';
    mascota.alergico = req.body.alergico === 'true';
    mascota.atencionEspecial = req.body.atencionEspecial === 'true';

    res.send(mascota);
});

// Método Delete para eliminar una mascota a la base de datos //
app.delete('/api/mascotas/:id', (req, res) => {
    const mascota = mascotas.find(c => c.id === parseInt(req.params.id));
    if (!mascota) return res.status(404).send('Mascota no encontrada');

    const index = mascotas.indexOf(mascota);
    mascotas.splice(index, 1);
    res.send(mascota);
});

const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));