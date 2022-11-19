document.addEventListener("DOMContentLoaded", function () {
  const email = {
    nombre: "",
    numero: "",
    email: "",
    asunto: "",
    mensaje: "",
  };

  const inputNombre = document.querySelector("#nombre");
  const inputNumero = document.querySelector("#numero");
  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.getElementById("formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector("#spinner");
  const msg = document.querySelector("#message");

  if (btnSubmit.disabled) {
    btnSubmit.classList.add("opacity-50");
  }
  // Asignacion de Eventos

  inputNombre.addEventListener("change", validar);
  inputNumero.addEventListener("change", validar);
  inputEmail.addEventListener("change", validar);
  inputAsunto.addEventListener("change", validar);
  inputMensaje.addEventListener("change", validar);
  formulario.addEventListener("submit", enviarEmail);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();

    // Reiniciar el formulario
    resetFormulario();
  });

  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.add("d-flex");
    spinner.classList.remove("d-none");

    setTimeout(() => {
      spinner.classList.remove("d-flex");
      spinner.classList.add("d-none");

      storeData();

      // Reiniciar el objeto
      resetFormulario();

      // Alerta mensaje enviado
      showMessage("Tu mensaje ha sido enviado con éxito!...");
    }, 2000);
  }

  function validar(e) {
    if (e.target.value.trim() === "") {
      mostrarAlerta(
        `El campo de ${e.target.id} es obligatorio`,
        e.target.parentElement,
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("El email no es válido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    // Asignacion de los valores
    email[e.target.name] = e.target.value.trim().toLowerCase();

    // Comprobar elobjeto email
    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    // Genera alerta en HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add(
      "bg-danger",
      "text-center",
      "text-white",
      "p-2",
      "mt-2",
    );

    // Agregando el error al formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    // Comprueba si ya existe una alerta
    const alerta = referencia.querySelector(".bg-danger");
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
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
    } else {
      btnSubmit.classList.remove("opacity-50");
      btnSubmit.disabled = false;
    }
  }

  // Reiniciar el objeto

  function resetFormulario() {
    email.nombre = "";
    email.numero = "";
    email.email = "";
    email.asunto = "";
    email.mensaje = "";

    formulario.reset();
    comprobarEmail();
  }

  async function storeData() {
    //stores items in the localStorage
    const nombre = document.querySelector("#nombre").value.toLowerCase();
    const numero = document.querySelector("#numero").value;
    const email = document.querySelector("#email").value.toLowerCase();
    const asunto = document.querySelector("#asunto").value.toLowerCase();
    const mensaje = document.querySelector("#mensaje").value.toLowerCase();

    const data = {
      nombre,
      numero,
      email,
      asunto,
      mensaje,
    };

    //almacena la data en la bd
    firebase
      .database()
      .ref("contacto/" + (await getUUID()))
      .set(data);

    //almacena en localstorage
    localStorage.setItem(`info_user${await getUUID()}`, JSON.stringify(data));
  }

  //solo para testear el show modal
  var toastTrigger = document.getElementById("liveToastBtn");
  var toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    toastTrigger.addEventListener("click", function () {
      showMessage("Tu mensaje ha sido enviado con éxito!...");
    });
  }
});
