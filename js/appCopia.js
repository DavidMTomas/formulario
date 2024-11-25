document.addEventListener('DOMContentLoaded', function () {
  generarBloques();
  mostrarListado();
  verificarYVaciarContenedor();

  // Add event listeners for checkboxes
  document.getElementById("cartoncillo").addEventListener("change", mostrarTextoCalidadCartoncillo);
  document.getElementById("contraencolado").addEventListener("change", mostrarTextoCalidadCartoncillo);
  document.getElementById("ondulado").addEventListener("change", mostrarTextoCalidadCartoncillo);

  // Add event listeners for form submission buttons
  document.getElementById("enviarTerminar").addEventListener("click", function (event) {
    event.preventDefault();
    enviarFormulario("ruta/a/tu/servidor", true);
  });

  document.getElementById("enviarSobreescribir").addEventListener("click", function (event) {
    event.preventDefault();
    enviarFormulario("ruta/a/tu/servidor", false);
  });

  // Initialize the state of the troquel options
  document.getElementById("opcionesTroquel").style.display = "none";
});

function mostrarListado() {
  const radioButtons = document.querySelectorAll('[name^="familiaProductos"]');
  const cartoncilloListados = document.querySelectorAll('[id^="cartoncilloListado"]');
  const contraencoladoListados = document.querySelectorAll('[id^="contraencoladoListado"]');
  const onduladoListados = document.querySelectorAll('[id^="onduladoListado"]');

  cartoncilloListados.forEach(listado => listado.style.display = 'none');
  contraencoladoListados.forEach(listado => listado.style.display = 'none');
  onduladoListados.forEach(listado => listado.style.display = 'none');

  radioButtons.forEach(radioButton => {
    if (radioButton.checked) {
      const index = radioButton.name.replace('familiaProductos', '');
      if (radioButton.value === 'Cartoncillo') {
        document.getElementById('cartoncilloListado' + index).style.display = 'block';
        document.getElementById('mostrarcalidadcartoncillo' + index).style.display = 'block';
      } else if (radioButton.value === 'Contraencolado') {
        document.getElementById('contraencoladoListado' + index).style.display = 'block';
        document.getElementById('mostrarcalidadcartoncillo' + index).style.display = 'block';
      } else if (radioButton.value === 'Ondulado') {
        document.getElementById('onduladoListado' + index).style.display = 'block';
        document.getElementById('mostrarcalidadcartoncillo' + index).style.display = 'none';
      }
    }
  });
}

function mostrarTextoCalidadCartoncillo() {
  let cartoncillo = document.getElementById("cartoncillo");
  let contraencolado = document.getElementById("contraencolado");
  let mostrarTexto = document.getElementById("mostrarcalidadcartoncillo");

  if (cartoncillo.checked || contraencolado.checked) {
    mostrarTexto.style.display = "block";
  } else {
    mostrarTexto.style.display = "none";
  }
}

function verificarYVaciarContenedor() {
  const contenedorTiposGenerados = document.getElementById('tiposGenerados');
  const radioDiseñoEstructuralMultipieza = document.getElementById('diseñoEstructuralMultipieza');

  if (!radioDiseñoEstructuralMultipieza.checked) {
    contenedorTiposGenerados.innerHTML = '';
    contadorTipos = 1;
  }

  const radioButtonsEstructural = document.querySelectorAll('input[name="estructuralOpciones"]');
  radioButtonsEstructural.forEach(radioButton => {
    radioButton.addEventListener('change', verificarYVaciarContenedor);
  });
}



function enviarFormulario(url, limpiarFormulario) {
  const formData = new FormData(document.getElementById("petcicionComercial"));

  fetch(url, {
    method: "POST",
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      alert("Formulario enviado");
      if (limpiarFormulario) {
        document.getElementById("petcicionComercial").reset();
      } else {
        document.getElementById("referencia").value = "";
      }
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
    });
}




function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const nombre = document.getElementById('nombre').value;
  const email = "dmtomas@outlook.es";
  const referencia = document.getElementById('referencia').value;

  doc.text(`Formulario de solicitud`, 10, 10);
  doc.text(`Nombre: ${nombre}`, 10, 20);
  doc.text(`Email: ${email}`, 10, 30);
  doc.text(`Referencia: ${referencia}`, 10, 40);

  doc.save("formulario.pdf");

  window.location.href = `mailto:${email}?subject=Formulario PDF&body=Adjunta el PDF descargado.`;
}




function enviarCorreoConPDF() {
  const pdfBlob = generarPDF();

  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(pdfBlob);
  enlace.download = 'formulario.pdf';
  enlace.click();

  window.location.href = 'mailto:correo@ejemplo.com?subject=Envío de Formulario';
}
