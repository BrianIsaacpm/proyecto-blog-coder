// campos del formulario
const nombreInput = document.querySelector('#nombre');
const apellidoInput = document.querySelector('#apellido');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const servicionInput = document.querySelector('#servicio');


// interfas del usuairo
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

class Citas {
    constructor(){
        this.citas = [];
    }

}

class UI {

    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;
        // agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
    }

}

const ui = new UI();
const administrarCitas = new Citas();

// registro de eventos
eventListeners();
function eventListeners(){
    nombreInput.addEventListener('change', datosCita);
    apellidoInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput .addEventListener('change', datosCita);
    servicionInput.addEventListener('change', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

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
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;

}

//valida y agrega nueva cita a clase citas
function nuevaCita(e) {
    e.preventDefault();

    const {nombre, apellido, telefono, fecha, hora, servicio} = citaObj;

    // validar
    if (nombre === '' || apellido === '' || telefono === '' || hora === '' || fecha === '' || servicio === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }

}