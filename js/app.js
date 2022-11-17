import Data from "../firebase/data.js";

class App {
  constructor() {
    this.initialCharge();
  }

  initialCharge() {
    debugger;
    const inputNombre = document.querySelector("#nombre");
    const inputNumero = document.querySelector("#numero");
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const formulario = document.getElementById("formulario");

    const btnReset = document.querySelector('#formulario button[type="reset"]');

    // Asignacion de Eventos

    inputNombre.addEventListener("blur", this.validar);
    inputNumero.addEventListener("blur", this.validar);
    inputEmail.addEventListener("blur", this.validar);
    inputAsunto.addEventListener("blur", this.validar);
    inputMensaje.addEventListener("blur", this.validar);

    formulario.addEventListener("submit", this.enviarEmail());

    btnReset.addEventListener("click", function (e) {
      e.preventDefault();
      // Reiniciar el objeto
      this.resetFormulario();
    });
  }

  validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  enviarEmail(e) {
    e.preventDefault();
    debugger;

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log("Propiedades del formulario: ", formProps);

    //Captura los componentes
    const spinner = document.querySelector("#spinner");
    const msg = document.querySelector("#message");
    const alertaExito = document.createElement("P");

    spinner.classList.add("d-flex");
    spinner.classList.remove("d-none");

    setTimeout(() => {
      spinner.classList.remove("d-flex");
      spinner.classList.add("d-none");

      //aqui envia la data a la bd
      this.storeData();

      // Reiniciar el objeto
      this.resetFormulario();

      // Alerta mensaje enviado

      alertaExito.classList.add(
        "bg-success",
        "text-white",
        "p-2",
        "text-center",
        "rounded",
        "mt-10",
        "font-weight-bold",
        "text-sm",
        "text-uppercase"
      );
      alertaExito.textContent = "El mensaje fue enviado correctamente";

      msg.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }

  validar(event) {
    // const email = {
    //   nombre: "",
    //   numero: "",
    //   email: "",
    //   asunto: "",
    //   mensaje: "",
    // };

    if (event.target.value.trim() === "") {
      this.mostrarAlerta(
        `El campo de ${event.target.id} es obligatorio`,
        event.target.parentElement
      );
      // email[event.target.name] = "";
      this.comprobarEmail();
      return;
    }

    if (event.target.id === "email" && !this.validarEmail(event.target.value)) {
      this.mostrarAlerta("El email no es válido", event.target.parentElement);
      // email[event.target.name] = "";
      this.comprobarEmail();
      return;
    }

    this.limpiarAlerta(event.target.parentElement);

    // Asignacion de los valores
    email[event.target.name] = event.target.value.trim().toLowerCase();

    // Comprobar el objeto email
    this.comprobarEmail();
  }

  mostrarAlerta(mensaje, referencia) {
    this.limpiarAlerta(referencia);

    // Genera alerta en HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add(
      "bg-danger",
      "text-center",
      "text-white",
      "p-2",
      "mt-2"
    );

    // Agregando el error al formulario
    referencia.appendChild(error);
  }

  limpiarAlerta(referencia) {
    // Comprueba si ya existe una alerta
    const alerta = referencia.querySelector(".bg-danger");
    if (alerta) {
      alerta.remove();
    }
  }

  comprobarEmail() {
    const btnSubmit = document.querySelector(
      '#formulario button[type="submit"]'
    );
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
    } else {
      btnSubmit.classList.remove("opacity-50");
      btnSubmit.disabled = false;
    }
  }

  //   // Reiniciar el objeto

  //   function resetFormulario(){

  //       email.nombre = '';
  //       email.numero = '';
  //       email.email = '';
  //       email.asunto = '';
  //       email.mensaje = '';

  //       formulario.reset();
  //       comprobarEmail();
  //   }

  storeData(values) {
    // Agregando localstorge
    let counter = 0;

    const nombre = document.querySelector("#nombre").value.toLowerCase();
    const numero = document.querySelector("#numero").value;
    const email = document.querySelector("#email").value.toLowerCase();
    const asunto = document.querySelector("#asunto").value.toLowerCase();
    const mensaje = document.querySelector("#mensaje").value.toLowerCase();

    const result = Data.setDataContact(values);
    //  const data = {
    //       nombre,
    //       numero,
    //       email,
    //       asunto,
    //       mensaje
    //   };

    //stores items in the localStorage
    // localstorage.setItem(`info_user${counter++}`,JSON.stringify(data));
  }
}

export default new App();
