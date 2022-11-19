//funcion random para generar un id unico a los registros que se almacenaran en la base de datos
async function getUUID() {
  const response = await fetch(
    "https://miro.medium.com/max/1400/1*sAUnjuM5TXHlf7Qdef84jw.png",
  );
  const blob = await response.blob();

  const url = URL.createObjectURL(blob);
  const uuid = url.split("/").at(-1);
  URL.revokeObjectURL(url);

  return uuid + new Date().setSeconds();
}
//funcion para enviar alertas de mensajes
function showMessage(msg) {
  iziToast.success({
    transitionIn: "flipInX",
    transitionOut: "flipOutX",
    titleSize: "1.3em",
    icon: "fa fa-envelope",
    theme: "light",
    title: "Hey!",
    position: "center",
    color: "yellow", // blue, red, green, yellow
    message: msg,
    messageSize: "1.3em",
  });
}
