import { datosCita, nuevaCita } from "../funciones.js";
import {
  nombreInput,
  apellidoInput,
  telefonoInput,
  fechaInput,
  horaInput,
  servicioInput,
  formulario,
} from "../selectores.js";

class Agenda {
  constructor() {
    this.initAgenda();
  }

  initAgenda() {
    nombreInput.addEventListener("change", datosCita);
    apellidoInput.addEventListener("change", datosCita);
    telefonoInput.addEventListener("change", datosCita);
    fechaInput.addEventListener("change", datosCita);
    horaInput.addEventListener("change", datosCita);
    servicioInput.addEventListener("change", datosCita);
    formulario.addEventListener("submit", nuevaCita);
  }
}

export default new Agenda();
