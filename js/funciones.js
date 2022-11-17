import Citas from './class/Citas.js';
import UI from './class/UI.js';


import {
    nombreInput, 
    apellidoInput,
    telefonoInput,
    fechaInput, 
    horaInput, 
    servicioInput,
    formulario 
    } from './selectores.js';

const administrarCitas = new Citas();
const ui = new UI(administrarCitas);


let editando = false;

//objeto con la informacion de la cita
const citaObj = {
    nombre: '',
    apellido: '',
    telefono: '',
    fecha: '',
    hora: '',
    servicio: ''
}

// agrega dato al objeto cita
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;

}

//valida y agrega nueva cita a clase citas
export function nuevaCita(e) {
    e.preventDefault();

    const {nombre, apellido, telefono, fecha, hora, servicio} = citaObj;

    // validar
    if (nombre === '' || apellido === '' || telefono === '' || hora === '' || fecha === '' || servicio === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }

    if (editando){
        ui.imprimirAlerta('Editado correctamente');

        // Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj})

        // regresar texto del boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        //Quitar modo edicion
        editando = false;

    } else {
        //Generar un id unico
        citaObj.id = Date.now();

        // Creando una nueva cita
        administrarCitas.agregarCita({...citaObj});

        //Mensaje de agregado
        ui.imprimirAlerta('Se agregó correctamente');


    }

    //reiniciar el objeto para validacion
    reiniciarObjeto();

    //reiniciar el formulario
    formulario.reset();

    //Mostrar cias en html
    ui.imprimirCitas(administrarCitas);

}

export function reiniciarObjeto() {
    citaObj.nombre = '';
    citaObj.apellido = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.servicio = '';
}

export function eliminarCita(id) {
    //Eliminar cita
    administrarCitas.eliminarCita(id);

    //Mostrar mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    //Fefrescar la cita
    ui.imprimirCitas(administrarCitas);
} 

// Carga los datos y el modo edicion

export function cargarEdicion(cita) {
    const {nombre, apellido, telefono, fecha, hora, servicio, id} = cita;

    // Llenar los input
    nombreInput.value = nombre;
    apellidoInput.value = apellido;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    servicioInput.value = servicio;

    //llenar el objeto
    citaObj.nombre = nombre;
    citaObj.apellido = apellido;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.servicio = servicio;
    citaObj.id = id;


    //Cambiar el texto del boton 
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    
    editando = true;

}