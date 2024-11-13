// Obtenemos el formulario


///////      DATOS CLIENTE     //////
document.getElementById('petcicionComercial').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente

  // Obtenemos los valores de los campos
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const mensaje = document.getElementById('mensaje').value;

  // Validaciones
  if (nombre === '' || email === '' || mensaje === '') {
    alert('Por favor, completa todos los campos');
    return;
  }

  // Enviar datos o realizar otra acción
  alert('Formulario enviado correctamente');
});

/////////////////////////////////////////////////////
// Obtenemos el checkbox, el campo numeroCliente y la etiqueta del número
document.addEventListener('DOMContentLoaded', function () {
  // Obtener el checkbox, campo de texto y su etiqueta
  const checkboxNuevoCliente = document.getElementById('nuevoCliente');
  const numeroClienteInput = document.getElementById('numeroCliente');
  const labelNumero = document.querySelector('label[for="numeroCliente"]');

  // Función que oculta o muestra el campo número y su etiqueta según el estado del checkbox
  function toggleNumeroCliente() {
    if (checkboxNuevoCliente.checked) {
      // Si el checkbox está marcado, ocultamos el campo numeroCliente, la etiqueta y no es requerido
      numeroClienteInput.style.display = 'none';
      labelNumero.style.display = 'none'; // Ocultamos la etiqueta también
      numeroClienteInput.removeAttribute('required'); // Quitamos el "required"
    } else {
      // Si no está marcado, mostramos el campo numeroCliente, la etiqueta y lo hacemos requerido
      numeroClienteInput.style.display = 'block';
      labelNumero.style.display = 'block'; // Mostramos la etiqueta
      numeroClienteInput.setAttribute('required', 'true'); // Lo marcamos como requerido
    }
  }

  // Ejecutar la función de acuerdo al estado inicial del checkbox
  toggleNumeroCliente();

  // Agregar el evento 'change' al checkbox para activar/desactivar la visibilidad
  checkboxNuevoCliente.addEventListener('change', toggleNumeroCliente);
});


///////     NUEVA    PETICION    /////
/////////////////////////////////////////////////////
///// Adaptar altura Indicaciones cliente segun contenido////////////
const textarea = document.getElementById('indicacionesCliente');
textarea.addEventListener('input', function () {
  this.style.height = 'auto'; // Restablece la altura
  this.style.height = `${this.scrollHeight}px`; // Ajusta según el contenido
});


/////////////////////////////////////////////////////
// Función para mostrar los productos seleccionados automáticamente
function mostrarSeleccion() {
  // Selecciona únicamente los checkboxes que estén dentro del dropdown (productos)
  const checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]:checked');
  const selectedValues = [];

  checkboxes.forEach(function (checkbox) {
    selectedValues.push(checkbox.value); // Almacenar los valores seleccionados
  });

  // Mostrar los valores seleccionados en el contenedor de resultados
  document.getElementById('resultados').innerHTML =
    ' ·' + selectedValues.join('<br> ·');
}

// Añadir un evento de "change" para que se actualicen los resultados al seleccionar un producto
document.querySelectorAll('.dropdown-content input[type="checkbox"]').forEach(function (checkbox) {
  checkbox.addEventListener('change', mostrarSeleccion);
});


// Función general para mostrar/ocultar el campo de texto
function toggleCampoTexto(radioSi, campoTexto) {
  campoTexto.style.display = radioSi.checked ? 'block' : 'none';
}

// Función para gestionar el caso especial de "Anula troquel"
function handleAnulaTroquel() {
  toggleCampoTexto(radioSiAnulaTroquel, campoTroquel);

  // Si "Sí" en "Anula troquel" está seleccionado
  if (radioSiAnulaTroquel.checked) {
    // Marca "Sí" en "Anula FF anterior" y desactiva "No"
    radioSiAnulaFicha.checked = true;
    radioNoAnulaFicha.disabled = true;
    radioNoAnulaFicha.checked = false; // Desmarcar "No"
    toggleCampoTexto(radioSiAnulaFicha, campoFicha); // Mostrar campo de número de ficha

    // Ocultar las opciones de "¿Existe el troquel?" si "Sí" en "Anula troquel" está seleccionado
    opcionesTroquel.style.display = 'none'; // Ocultar las opciones "Sí / No"
  } else {
    radioNoAnulaFicha.disabled = false; // Reactiva "No"
    toggleCampoTexto(radioSiAnulaFicha, campoFicha); // Mostrar u ocultar el campo de número de ficha según la selección
    // Si selecciona "No" en "Anula Troquel", mostrar opciones de existencia de troquel
    opcionesTroquel.style.display = 'block'; // Mostrar las opciones de si existe o no el troquel
  }
}


// Función para gestionar el caso especial de "¿Existe el troquel?"
function handleExisteTroquel() {
  // Mostrar u ocultar el campo de número de troquel solo si "Si existe" es seleccionado
  toggleCampoTexto(existeTroquelSi, campoNumeroTroquelExistente);

  // Si se selecciona "No" en "¿Existe el troquel?", desmarcar y deshabilitar "Sí" en "Anula FF anterior?"
  if (existeTroquelNo.checked) {
    radioNoAnulaFicha.checked = true; // Marca "No" en "Anula FF anterior?"
    radioSiAnulaFicha.disabled = true; // Desactiva la opción "Sí" en "Anula FF anterior?"
    radioSiAnulaFicha.checked = false; // Desmarcar "Sí"
    toggleCampoTexto(radioSiAnulaFicha, campoFicha); // Ocultar el campo de número de ficha

  } else {
    // Si selecciona "Sí" en "¿Existe el troquel?", reactiva la opción "Sí" en "Anula FF anterior?"
    radioSiAnulaFicha.disabled = false;

  }
}

// Obtener los elementos de "Anula FF anterior"
const radioSiAnulaFicha = document.getElementById('siAnulaFicha');
const radioNoAnulaFicha = document.getElementById('noAnulaFicha');
const campoFicha = document.getElementById('contenedorFicha');

// Obtener los elementos de "Anula troquel"
const radioSiAnulaTroquel = document.getElementById('siAnulaTroquel');
const radioNoAnulaTroquel = document.getElementById('noAnulaTroquel');
const campoTroquel = document.getElementById('contenedorNumeroTroquel');

// Obtener los elementos de "¿Existe el troquel?"
const opcionesTroquel = document.getElementById('opcionesTroquel');
const existeTroquelSi = document.getElementById('existeTroquelSi');
const existeTroquelNo = document.getElementById('existeTroquelNo');
const campoNumeroTroquelExistente = document.getElementById('campoNumeroTroquelExistente');

;
// Eventos para "Anula FF anterior"
radioSiAnulaFicha.addEventListener('change', function () {
  toggleCampoTexto(radioSiAnulaFicha, campoFicha);
});
radioNoAnulaFicha.addEventListener('change', function () {
  toggleCampoTexto(radioSiAnulaFicha, campoFicha);
});

// Eventos para "Anula troquel"
radioSiAnulaTroquel.addEventListener('change', handleAnulaTroquel);
radioNoAnulaTroquel.addEventListener('change', handleAnulaTroquel);

// Eventos para "¿Existe el troquel?"
existeTroquelSi.addEventListener('change', handleExisteTroquel);
existeTroquelNo.addEventListener('change', handleExisteTroquel);

// Llamado inicial para establecer el estado al cargar la página
toggleCampoTexto(radioSiAnulaFicha, campoFicha);
handleAnulaTroquel();


/////// ACABADOS    /////


/////////////////////////////////////////////////////
// Obtener los radio buttons y el contenedor del número de tipos
const opcionesDiseño = document.getElementsByName('tipoDiseño');
const numTiposContainer = document.getElementById('numTiposContainer');


// Función para mostrar u ocultar el contenedor de número de tipos
function toggleNumTipos() {
  // Comprobar si alguno de los radio buttons está seleccionado en "multipieza"
  let isMultipiezaSelected = false;

  // Recorrer los radio buttons
  opcionesDiseño.forEach(radio => {
    if (radio.checked && radio.value === 'multipieza') {
      isMultipiezaSelected = true;
    }
  });

  // Mostrar u ocultar el contenedor según si la opción "multipieza" está seleccionada
  if (isMultipiezaSelected) {
    numTiposContainer.style.display = 'block';
    const idPieza = document.getElementById('idPieza');
    idPieza.style.display = "block"

  } else {
    numTiposContainer.style.display = 'none';
    const idPieza = document.getElementById('idPieza');
    idPieza.style.display = "none"
  }
}

// Añadir eventos a los radio buttons para que se ejecuten cuando se cambien
opcionesDiseño.forEach(radio => {
  radio.addEventListener('change', toggleNumTipos);
});

// Llamar a la función para asegurarse de que el contenedor esté correctamente visible/oculto
toggleNumTipos(); // Esto asegura que el contenedor tenga el estado correcto cuando se carga la página


///////   TIPO   /////
/////////////////////////////////////////////////////
// Obtener todos los radio buttons y los divs para los listados
const radioButtons = document.getElementsByName('familiaProductos');
const cartoncilloListado = document.getElementById('cartoncilloListado');
const contraencoladoListado = document.getElementById('contraencoladoListado');
const onduladoListado = document.getElementById('onduladoListado');

// Función para mostrar el listado correspondiente según el radio button seleccionado
function mostrarListado() {
  // Ocultar todos los listados al principio
  cartoncilloListado.style.display = 'none';
  contraencoladoListado.style.display = 'none';
  onduladoListado.style.display = 'none';

  // Recorrer los radio buttons seleccionados
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      // Mostrar el listado correspondiente según el valor seleccionado
      if (radioButton.value === 'Cartoncillo') {
        cartoncilloListado.style.display = 'block';
      } else if (radioButton.value === 'Contraencolado') {
        contraencoladoListado.style.display = 'block';
      } else if (radioButton.value === 'Ondulado') {
        onduladoListado.style.display = 'block';
      }
    }
  }
}

// Añadir un evento para cada cambio en los radio buttons
for (const radioButton of radioButtons) {
  radioButton.addEventListener('change', mostrarListado);
}

// Añadir un evento para detectar el cambio en cualquier radio button de la opción "estructuralOpciones"
document.querySelectorAll('input[name="estructuralOpciones"]').forEach(radioButton => {
  radioButton.addEventListener('change', toggleNumTipos);
});
// Ejecutar la función para asegurarse de que el estado sea correcto cuando se cargue la página
document.addEventListener('DOMContentLoaded', toggleNumTipos);






/////////////////////////////////////////////////////
// Función para generar los bloques dinámicamente según el número de tipos seleccionado
/////////////////////////////////////////////////////
// Variable global para el contador de bloques
let contadorTipos = 1; // Comienza con 1, ya que el primer tipo es el tipo 1

// Función para generar bloques dinámicamente
function generarBloques() {
  const container = document.getElementById('tiposGenerados');

  // Verificamos si la opción de "Diseño estructural Multipieza" está seleccionada
  const diseñoMultipieza = document.getElementById('diseñoEstructuralMultipieza');

  // Si "Estructural Multipieza" está seleccionado, inicializamos el contador a 2 y generamos dos bloques
  if (diseñoMultipieza.checked && contadorTipos === 1) {
    contadorTipos = 2; // Generar 2 bloques cuando la opción de "Estructural Multipieza" se selecciona
  }


  // Crear un nuevo bloque por cada pulsación del botón
  const bloque = document.createElement('div');
  bloque.classList.add('tipo-block');

  // El tipo será el valor del contador actual
  bloque.innerHTML = `
</class id="tipos">
    <h4>Tipo ${contadorTipos}</h4>
    <!-- Radio buttons para seleccionar la familia de productos -->
     <label for="idPieza${contadorTipos}">
    <input type="text" id="idPieza${contadorTipos}" name="familiaProductos${contadorTipos}" placeholder="Identificador de la pieza ${contadorTipos}" required>
  </label>
    <label for="cartoncillo${contadorTipos}">
      <input type="radio" id="cartoncillo${contadorTipos}" name="familiaProductos${contadorTipos}" value="Cartoncillo" onchange="mostrarListado(${contadorTipos})"> Cartoncillo
    </label>

    <label for="contraencolado${contadorTipos}">
      <input type="radio" id="contraencolado${contadorTipos}" name="familiaProductos${contadorTipos}" value="Contraencolado" onchange="mostrarListado(${contadorTipos})"> Contraencolado
    </label>

    <label for="ondulado${contadorTipos}">
      <input type="radio" id="ondulado${contadorTipos}" name="familiaProductos${contadorTipos}" value="Ondulado" onchange="mostrarListado(${contadorTipos})"> Ondulado
    </label>

    <!-- Cartoncillo -->
    <div id="cartoncilloListado${contadorTipos}" style="display:none;">
      <h4>Tipos de impresion para Cartoncillo</h4>
      <label for="sinImpresionCartoncillo${contadorTipos}">
        <input type="radio" id="sinImpresionCartoncillo${contadorTipos}" name="productoCartoncillo${contadorTipos}" value="sin impresion"> Sin impresion
      </label>
      <label for="offsetCartoncillo${contadorTipos}">
        <input type="radio" id="offsetCartoncillo${contadorTipos}" name="productoCartoncillo${contadorTipos}" value="offset"> Offset
      </label>
    </div>

    <!-- Contraencolado -->
    <div id="contraencoladoListado${contadorTipos}" style="display:none;">
      <h4>Tipos de impresion para Contraencolado</h4>
      <label for="sinImpresionContraencolado${contadorTipos}">
        <input type="radio" id="sinImpresionContraencolado${contadorTipos}" name="productoContraencolado${contadorTipos}" value="sin impresion"> Sin impresion
      </label>
      <label for="offsetContraencolado${contadorTipos}">
        <input type="radio" id="offsetContraencolado${contadorTipos}" name="productoContraencolado${contadorTipos}" value="offset"> Offset
      </label>
    </div>

    <!-- Ondulado -->
    <div id="onduladoListado${contadorTipos}" style="display:none;">
      <h4>Tipos de impresion para Ondulado</h4>
      <label for="sinImpresionOndulado${contadorTipos}">
        <input type="radio" id="sinImpresionOndulado${contadorTipos}" name="productoOndulado${contadorTipos}" value="sin impresion"> Sin impresion
      </label>
      <label for="offsetOndulado${contadorTipos}">
        <input type="radio" id="offsetOndulado${contadorTipos}" name="productoOndulado${contadorTipos}" value="offset"> Offset
      </label>
      <label for="digitalOndulado${contadorTipos}">
        <input type="radio" id="digitalOndulado${contadorTipos}" name="productoOndulado${contadorTipos}" value="digital"> Digital
      </label>
      <label for="flexoOndulado${contadorTipos}">
        <input type="radio" id="flexoOndulado${contadorTipos}" name="productoOndulado${contadorTipos}" value="flexo"> Flexo
      </label>
      <label for="flexoMejoradoOndulado${contadorTipos}">
        <input type="radio" id="flexoMejoradoOndulado${contadorTipos}" name="productoOndulado${contadorTipos}" value="flexo mejorado"> Flexo mejorado
      </label>
      <label for="flexoHDOndulado${contadorTipos}">
        <input type="radio" id="flexoHDOndulado${contadorTipos}" name="productoOndulado${contadorTipos}" value="flexo HD"> Flexo HD
      </label>
    </div>

    <hr>
      </class>
  `;

  // Añadir el bloque al contenedor
  container.appendChild(bloque);

  // Incrementar el contador para el siguiente tipo
  contadorTipos++;
}





/////////////////////////////////////////////////////
// Función para mostrar u ocultar los listados según el tipo de producto seleccionado
function mostrarListado(tipoIndex) {
  // Ocultar todos los listados del tipo seleccionado
  document.getElementById(`cartoncilloListado${tipoIndex}`).style.display = 'none';
  document.getElementById(`contraencoladoListado${tipoIndex}`).style.display = 'none';
  document.getElementById(`onduladoListado${tipoIndex}`).style.display = 'none';

  // Obtener el radio button seleccionado
  const seleccionado = document.querySelector(`input[name="familiaProductos${tipoIndex}"]:checked`);

  // Mostrar el listado correspondiente
  if (seleccionado) {
    const valorSeleccionado = seleccionado.value;
    document.getElementById(`${valorSeleccionado.toLowerCase()}Listado${tipoIndex}`).style.display = 'block';
  }
}




// Función para eliminar bloques
function eliminarBloques() {
  const container = document.getElementById('tiposGenerados');

  // Verificar si hay bloques en el contenedor
  if (container.children.length > 0) {
    // Eliminar el último bloque
    container.removeChild(container.lastElementChild);

    // Decrementar el contador de tipos
    if (contadorTipos > 1) {
      contadorTipos--;
    }
  }
}





/////////////////////////////////////////////////////
// Función para mostrar u ocultar los listados según el tipo de producto seleccionado
function mostrarListado() {
  // Ocultar todos los listados
  const radioButtons = document.querySelectorAll('[name^="familiaProductos"]');
  const cartoncilloListados = document.querySelectorAll('[id^="cartoncilloListado"]');
  const contraencoladoListados = document.querySelectorAll('[id^="contraencoladoListado"]');
  const onduladoListados = document.querySelectorAll('[id^="onduladoListado"]');

  // Ocultar todos los listados al principio
  cartoncilloListados.forEach(listado => listado.style.display = 'none');
  contraencoladoListados.forEach(listado => listado.style.display = 'none');
  onduladoListados.forEach(listado => listado.style.display = 'none');

  // Recorrer todos los radio buttons y mostrar el listado correspondiente
  radioButtons.forEach(radioButton => {
    if (radioButton.checked) {
      const index = radioButton.name.replace('familiaProductos', '');
      if (radioButton.value === 'Cartoncillo') {
        document.getElementById('cartoncilloListado' + index).style.display = 'block';
      } else if (radioButton.value === 'Contraencolado') {
        document.getElementById('contraencoladoListado' + index).style.display = 'block';
      } else if (radioButton.value === 'Ondulado') {
        document.getElementById('onduladoListado' + index).style.display = 'block';
      }
    }
  });
}





/////////////////////////////////////////////////////
// Inicializar los bloques y los listados cuando la página se cargue
document.addEventListener('DOMContentLoaded', function () {
  generarBloques();
  mostrarListado();
});

/////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  const contenedorTiposGenerados = document.getElementById('tiposGenerados');
  const radioDiseñoEstructuralMultipieza = document.getElementById('diseñoEstructuralMultipieza');





  /// OK   ///
  // Función que vacía el contenedor #tiposGenerados si "Diseño estructural Multipieza" no está seleccionado
  function verificarYVaciarContenedor() {
    // Si "Diseño estructural Multipieza FEFCO" NO está seleccionado, vaciar el contenedor
    if (!radioDiseñoEstructuralMultipieza.checked) {
      contenedorTiposGenerados.innerHTML = ''; // Vaciar el contenedor
      contadorTipos = 1; // Reiniciar el contador a 1
    }
  }

  // Comprobar el estado al cargar la página
  verificarYVaciarContenedor();

  // Agregar un listener a los radio buttons para que se verifique cuando cambian
  const radioButtonsEstructural = document.querySelectorAll('input[name="estructuralOpciones"]');

  radioButtonsEstructural.forEach(radioButton => {
    radioButton.addEventListener('change', verificarYVaciarContenedor);
  });
});


////////    final  //
document.getElementById("enviarTerminar").addEventListener("click", function(event) {
  event.preventDefault(); // Prevenir que el formulario se envíe inmediatamente

  // Crear el objeto FormData con los datos del formulario
  var formData = new FormData(document.getElementById("petcicionComercial"));

  // Enviar el formulario usando fetch (AJAX)
  fetch("ruta/a/tu/servidor", {
    method: "POST",
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      // Mostrar ventana con mensaje
      alert("Formulario enviado y limpiado");
      // Limpiar el formulario
      document.getElementById("petcicionComercial").reset();
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
    });
});

document.getElementById("enviarSobreescribir").addEventListener("click", function(event) {
  event.preventDefault(); // Prevenir que el formulario se envíe inmediatamente

  // Crear el objeto FormData con los datos del formulario
  var formData = new FormData(document.getElementById("petcicionComercial"));

  // Enviar el formulario usando fetch (AJAX)
  fetch("ruta/a/tu/servidor", {
    method: "POST",
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      // Mostrar ventana con mensaje
      alert("Formulario enviado sin limpiar");
      // Limpiar solo el campo 'referencia'
      document.getElementById("referencia").value = "";
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
    });
});



//////  envio    ///

function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Capturar los datos del formulario
  const nombre = document.getElementById('nombre').value;
  const email = "dmtomas@outlook.es";
  const referencia = document.getElementById('referencia').value;

  // Agregar contenido al PDF
  doc.text(`Formulario de solicitud`, 10, 10);
  doc.text(`Nombre: ${nombre}`, 10, 20);
  doc.text(`Email: ${email}`, 10, 30);
  doc.text(`Referencia: ${referencia}`, 10, 40);
  // Agregar más campos según sea necesario...

  // Descargar el PDF automáticamente
  doc.save("formulario.pdf");

  // Abrir el cliente de correo con 'mailto'
  window.location.href = `mailto:${email}?subject=Formulario PDF&body=Adjunta el PDF descargado.`;
}


function enviarCorreoConPDF() {
  const pdfBlob = generarPDF();

  // Guardar el archivo temporalmente y pedir al usuario que lo adjunte manualmente
  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(pdfBlob);
  enlace.download = 'formulario.pdf';
  enlace.click();

  // Enviar correo con el enlace
  window.location.href = 'mailto:correo@ejemplo.com?subject=Envío de Formulario';
}
