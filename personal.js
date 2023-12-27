const express = require('express');
const app = express();

app.use(express.json());

const personalVeterinaria = [
    { id: 1, nombre: 'Carlos Pizarro', cargo: 'Gerente', rol: 'Master', jornada: 'Tiempo completo', numeroContacto: '3135560394', correoElectronico: 'carlosPiza@gmail.com' },
    { id: 2, nombre: 'Ana López', cargo: 'Veterinario', rol: 'Especialista en Cirugía', jornada: 'Medio tiempo', numeroContacto: '3101234567', correoElectronico: 'anaLopez@gmail.com' },
    { id: 3, nombre: 'Mario Rodriguez', cargo: 'Asistente de Veterinaria', rol: 'Cuidado Preventivo', jornada: 'Tiempo completo', numeroContacto: '3209876543', correoElectronico: 'marioRodriguez@gmail.com' },
    { id: 4, nombre: 'Laura Montes', cargo: 'Recepcionista', rol: 'Atención al Cliente', jornada: 'Tiempo completo', numeroContacto: '3187654321', correoElectronico: 'lauraMontes@gmail.com' },
    { id: 5, nombre: 'Gabriel Ramírez', cargo: 'Técnico Veterinario', rol: 'Laboratorio y Diagnóstico', jornada: 'Medio tiempo', numeroContacto: '3158765432', correoElectronico: 'gabrielRamirez@gmail.com' }
];

// Método Get para obtener una respuesta global //
app.get('/', (req, res) => {
    res.send('Api para obtener personal de la veterinaria');
});

// Método Get para obtener el listado de todo el personal de la veterinaria //
app.get('/api/personalVeterinaria', (req, res) => {
    res.send(personalVeterinaria);
});

// Método Get para obtener un miembro del personal por ID //
app.get('/api/personalVeterinaria/:id', (req, res) => {
    const empleado = personalVeterinaria.find(p => p.id === parseInt(req.params.id));
    if (!empleado) return res.status(404).send('Empleado no encontrado');
    else res.send(empleado);
});

// Método Post para añadir un nuevo miembro al personal de la veterinaria //
app.post('/api/personalVeterinaria', (req, res) => {
    const empleado = {
        id: personalVeterinaria.length + 1,
        nombre: req.body.nombre,
        cargo: req.body.cargo,
        rol: req.body.rol,
        jornada: req.body.jornada,
        numeroContacto: req.body.numeroContacto,
        correoElectronico: req.body.correoElectronico
    };

    personalVeterinaria.push(empleado);
    res.send(empleado);
});

// Método Put para editar la información de un miembro del personal //
app.put('/api/personalVeterinaria/:id', (req, res) => {
    const empleado = personalVeterinaria.find(p => p.id === parseInt(req.params.id));
    if (!empleado) return res.status(404).send('Empleado no encontrado');

    empleado.nombre = req.body.nombre || empleado.nombre;
    empleado.cargo = req.body.cargo || empleado.cargo;
    empleado.rol = req.body.rol || empleado.rol;
    empleado.jornada = req.body.jornada || empleado.jornada;
    empleado.numeroContacto = req.body.numeroContacto || empleado.numeroContacto;
    empleado.correoElectronico = req.body.correoElectronico || empleado.correoElectronico;

    res.send(empleado);
});

// Método Delete para eliminar un miembro del personal de la veterinaria //
app.delete('/api/personalVeterinaria/:id', (req, res) => {
    const empleado = personalVeterinaria.find(p => p.id === parseInt(req.params.id));
    if (!empleado) return res.status(404).send('Empleado no encontrado');

    const index = personalVeterinaria.indexOf(empleado);
    personalVeterinaria.splice(index, 1);
    res.send(empleado);
});

const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));