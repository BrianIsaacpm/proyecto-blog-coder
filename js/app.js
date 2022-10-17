
document.addEventListener('DOMContentLoaded', function() {

    const email = {
        nombre: '',
        numero: '',
        email: '',
        asunto: '',
        mensaje: ''
    }

    const inputNombre = document.querySelector('#nombre');
    const inputNumero = document.querySelector('#numero');
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    

    // Asignacion de Eventos

    inputNombre.addEventListener('blur', validar);
    inputNumero.addEventListener('blur', validar);
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();

        // Reiniciar el objeto
        resetFormulario();
    })

///////////////////////// ARREGLAR ///////////////////////////////////////////

    function enviarEmail(e){
        e.preventDefault();
        console.log('enviando...')          // aca tengo un error que no me muestra al momento de realizar el evento..

        spinner.classList.add('d-flex');
        spinner.classList.remove('d-none');

        setTimeout(() => {
            spinner.classList.remove('d-flex');
            spinner.classList.add('d-none');

            // Reiniciar el objeto
            resetFormulario();

            // Alerta mensaje enviado
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-success', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-weight-bold', 'text-sm', 'text-uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }

///////////////////////////////////////////////


    function validar(e) {

        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo de ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        } 

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
        mostrarAlerta('El email no es válido', e.target.parentElement);
        email[e.target.name] = '';
        comprobarEmail();
        return;

        }

        limpiarAlerta(e.target.parentElement);

        // Asignacion de los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        // Comprobar elobjeto email
        comprobarEmail();

    }

    function mostrarAlerta (mensaje, referencia) {

       limpiarAlerta(referencia);

        // Genera alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add ('bg-danger', 'text-center', 'text-white', 'p-2', 'mt-2')
        
       // Agregando el error al formulario 
       referencia.appendChild(error);
    }

    function limpiarAlerta (referencia){
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-danger');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {

        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disable = true;

        } else {
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disable = false;
        }
    }

    // Reiniciar el objeto

    function resetFormulario(){

        email.nombre = '';
        email.numero = '';
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }

});
