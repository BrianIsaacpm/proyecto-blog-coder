document.addEventListener("DOMContentLoaded", function () {
  const tabla = document.querySelector("#table");
  //consulta la data en la bd
  const leadsRef = firebase.database().ref("contacto");
  let render = "";

  leadsRef.on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      let childData = childSnapshot.val();

      //inserto la data obtenida desde firebase
      render += `<tr>
            <th scope="row">${childData?.nombre}</th>
            <td>${childData?.email}</td>
            <td>${childData?.asunto}</td>
            <td>${childData?.mensaje}</td>
            <th scope="row">${childData?.numero}</th>
        </tr>`;
    });
    tabla.innerHTML = render;
  });
});
