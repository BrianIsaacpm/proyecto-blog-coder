//funcion que retorna arreglo con referencias a imagenes para la galeria
function obtenerGaleria() {
  const galeria = [
    { src: "../img/galeria/1.jpg", alt: "imagen 1" },
    { src: "../img/galeria/2.jpg", alt: "imagen 2" },
    { src: "../img/galeria/3.jpg", alt: "imagen 3" },
    { src: "../img/galeria/4.jpg", alt: "imagen 4" },
    { src: "../img/galeria/5.jpg", alt: "imagen 5" },
    { src: "../img/galeria/6.jpg", alt: "imagen 6" },
    { src: "../img/galeria/7.jpg", alt: "imagen 7" },
    { src: "../img/galeria/8.jpg", alt: "imagen 8" },
    { src: "../img/galeria/9.jpg", alt: "imagen 9" },
    { src: "../img/galeria/10.jpg", alt: "imagen 10" },
    { src: "../img/galeria/11.jpg", alt: "imagen 11" },
    { src: "../img/galeria/12.jpg", alt: "imagen 12" },
    { src: "../img/galeria/13.jpg", alt: "imagen 13" },
    { src: "../img/galeria/14.jpg", alt: "imagen 14" },
    { src: "../img/galeria/15.jpg", alt: "imagen 15" },
    { src: "../img/galeria/16.jpg", alt: "imagen 16" },
    { src: "../img/galeria/17.jpg", alt: "imagen 17" },
    { src: "../img/galeria/18.jpg", alt: "imagen 18" },
  ];
  return new Promise(function (resolve, reject) {
    if (galeria.length > 0) {
      resolve(galeria);
    } else {
      reject({ status: "error", message: "No existen imagenes en la galeria" });
    }
  });
}

// funcion que se encarga de mostrar las imagenes
async function imprimirGaleria() {
  let render = "";
  //referencia al elemeto del html
  const galeria = document.querySelector("#rowgaleria");

  //obtencion de las imagenes que otorga la promesa
  const imagenes = await obtenerGaleria();

  //creación de un elemento div para incrustar la imagenes
  let row = document.createElement("div");
  // se agrega una clase de tipo row al div creado anteriormente
  row.classList.add("row");

  //recorro las imagenes que me entrego la promesa
  imagenes.map((imagen, i) => {
    render += `
      <div class="col-xl-3 col-lg-4 col-md-3 col-sm-12">
      <img src="${imagen?.src}" alt="${imagen?.alt}" />
    </div>`;
  });

  row.innerHTML = render;
  galeria.appendChild(row);
}

document.addEventListener("DOMContentLoaded", function () {
  imprimirGaleria();
});
