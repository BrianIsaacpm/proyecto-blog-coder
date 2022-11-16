// campos del formulario
const nombreInput = document.querySelector('#nombre');
const apellidoInput = document.querySelector('#apellido');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const servicioInput = document.querySelector('#servicio');


// interfas del usuairo
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;

class Citas {
    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id );
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);

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

        // quitar alerta
        setTimeout(() => {
            divMensaje.remove();
        }, 3000 );

    }

    imprimirCitas({citas}) {
        
        this.limpiarHTML();
        
        citas.forEach(cita => {
            const {nombre, apellido, telefono, fecha, hora, servicio, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //SCRIPTING DE LOS ELEMENTOS DE LA CITA
            const nombreParrafo = document.createElement('p');
            nombreParrafo.innerHTML = `
                <span class="font-weight-bolder">Nombre: </span> ${nombre}            
            `;

            const apellidoParrafo = document.createElement('p');
            apellidoParrafo.innerHTML = `
                <span class="font-weight-bolder">Apellido: </span> ${apellido}            
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Teléfono: </span> ${telefono}            
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}            
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}            
            `;

            const servicioParrafo = document.createElement('p');
            servicioParrafo.innerHTML = `
                <span class="font-weight-bolder">Servicio: </span> ${servicio}            
            `;

            //Boton para eliminar cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'me-2');
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            `;

            btnEliminar.onclick = () => eliminarCita(id);

             //Boton para editar cita
             const btnEditar = document.createElement('button');
             btnEditar.classList.add('btn', 'btn-info', 'me-2');
             btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
             <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
             </svg>
             `;
             btnEditar.onclick = () => cargarEdicion(cita);
           

            //AGREGAR LOS PARRAFOS AL divCita
            divCita.appendChild(nombreParrafo);
            divCita.appendChild(apellidoParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(servicioParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            //agregar las citas al html
            contenedorCitas.appendChild(divCita);

        })
    }
    
    limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
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
    servicioInput.addEventListener('change', datosCita);

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

function reiniciarObjeto() {
    citaObj.nombre = '';
    citaObj.apellido = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.servicio = '';
}

function eliminarCita(id) {
    //Eliminar cita
    administrarCitas.eliminarCita(id);

    //Mostrar mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    //Fefrescar la cita
    ui.imprimirCitas(administrarCitas);
} 

// Carga los datos y el modo edicion

function cargarEdicion(cita) {
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