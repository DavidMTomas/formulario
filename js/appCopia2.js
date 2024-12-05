// Obtenemos el formulario

///INICIO /////

// Obtener la fecha y hora actual
const ahora = new Date();

// Sumar 1 hora
ahora.setHours(ahora.getHours() + 1);

// Formatear la fecha y hora en YYYY-MM-DDTHH:MM para el campo datetime-local
const fechaHoraActual = ahora.toISOString().slice(0, 16);

// Asignar la fecha y hora actual (con 1 hora añadida) al campo datetime-local
document.getElementById('fechaHora').value = fechaHoraActual;



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
  document.getElementById('totalDocAportada').innerHTML =
    ' ·' + selectedValues.join('<br> ·');
}

// Añadir un evento de "change" para que se actualicen los resultados al seleccionar un producto
document.querySelectorAll('.dropdown-content input[type="checkbox"]').forEach(function (checkbox) {
  checkbox.addEventListener('change', mostrarSeleccion);
});


// Función general para mostrar/ocultar el campo de texto
function toggleCampoTexto(radioSi, campoTexto) {
  campoTexto.style.display = radioSi.checked ? 'block' : 'none';
  campoTexto.required = !!radioSi.checked;
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
    // document.getElementById("acabadosEstructural").style.display="block" // nuevo estructural


    // Ocultar las opciones de "¿Existe el troquel?" si "Sí" en "Anula troquel" está seleccionado
    opcionesTroquel.style.display = 'none'; // Ocultar las opciones "Sí / No"
    //botonesTroquel.style.display="none"
  } else {
    radioNoAnulaFicha.disabled = false; // Reactiva "No"
    toggleCampoTexto(radioSiAnulaFicha, campoFicha); // Mostrar u ocultar el campo de número de ficha según la selección
    // Si selecciona "No" en "Anula Troquel", mostrar opciones de existencia de troquel
    opcionesTroquel.style.display = 'block'; // Mostrar las opciones de si existe o no el troquel
    //botonesTroquel.style.display="block"
    // document.getElementById("acabadosEstructural").style.display="none" // no hay nuevo estrurtral
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
    //document.getElementById("acabadosEstructural").style.display="block"
  } else {
    // Si selecciona "Sí" en "¿Existe el troquel?", reactiva la opción "Sí" en "Anula FF anterior?"
    radioSiAnulaFicha.disabled = false;
    // document.getElementById("acabadosEstructural").style.display="none"
    //botonesTroquel.style.display="block"
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
//const botonesTroquel = document.getElementById('botonesTroquel');
const existeTroquelSi = document.getElementById('existeTroquelSi');
const existeTroquelNo = document.getElementById('existeTroquelNo');
const campoNumeroTroquelExistente = document.getElementById('campoNumeroTroquelExistente');


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


// mostrar dimensiones si anula troquel, si no existe troqueñ
document.addEventListener('DOMContentLoaded', () => {
  const anulaTroquelRadios = document.getElementsByName('anulaTroquel');
  const existeTroquelRadios = document.getElementsByName('existeTroquel');
  const medidasEstructuralDiv = document.getElementById('medidasEstructural');

  function verificarCombinacion() {
    const anulaTroquel = [...anulaTroquelRadios].find(radio => radio.checked)?.value;
    const existeTroquel = [...existeTroquelRadios].find(radio => radio.checked)?.value;

    // Mostrar el div si la combinación es la requerida
    if (anulaTroquel === 'Si' || existeTroquel === 'No') {
      medidasEstructuralDiv.style.display = 'block';
    } else {
      medidasEstructuralDiv.style.display = 'none';
    }
  }

  // Añadir eventos a los botones de radio
  [...anulaTroquelRadios, ...existeTroquelRadios].forEach(radio => {
    radio.addEventListener('change', verificarCombinacion);
  });
});


//MAQUETA -- IMPRESIONES
// Función para mostrar/ocultar el div de los botones de incremento/decremento
function toggleDropdown(divId,inputId) {
  const dropdown = document.getElementById(divId);
  const checkbox = this.event.target; // Obtener el checkbox que disparó el evento
  const inputValue = document.getElementById(inputId); // Obtener el input asociado

  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  // Cambiar el valor del input a 1 si el checkbox está activado, o 0 si está desactivado
  if (checkbox.checked) {
    inputValue.value = 1;
  } else {
    inputValue.value = 0;
  }

  validarCheckboxesMuestras()
}


// Función para incrementar el valor del input numérico
function increment(inputId) {
  const input = document.getElementById(inputId);
  input.stepUp();
  checkValue(); // Verifica si el valor es mayor que 1 y muestra el texto
}


// Función para decrementar el valor del input numérico
function decrement(inputId) {
  const input = document.getElementById(inputId);
  input.stepDown();
  checkValue(); // Verifica si el valor es mayor que 1 y muestra el texto
}


// FIN MAQUETA -- IMPRESIONES
// Función para verificar el valor del input y mostrar/ocultar el texto
function checkValue() {
  const input = document.getElementById("etiquetasPaletizado");
  const textoExtra = document.getElementById("textoExtra");

  if (parseInt(input.value) > 1) {
    textoExtra.style.display = "block"; // Muestra el texto
  } else {
    textoExtra.style.display = "none"; // Oculta el texto
  }
}





// DIRECCIONES DE ENVIO

window.addEventListener('DOMContentLoaded', function () {
  const seccionEnvios = document.getElementById("seccionEnvios");

  // Obtener valores iniciales de los inputs
  function obtenerTotalesIniciales() {
    return {
      maquetas: parseInt(document.getElementById("muestraExtra").value, 10) || 0,
      bocetos: parseInt(document.getElementById("bocetoExtra").value, 10) || 0,
      plotters: parseInt(document.getElementById("plotterExtra").value, 10) || 0,
      muestrasForradas: parseInt(document.getElementById("forradaExtra").value, 10) || 0,
    };
  }

  // Calcular totales disponibles después de restar los seleccionados en las direcciones actuales
  function calcularTotalesDisponibles() {
    const totalesIniciales = obtenerTotalesIniciales();

    let usadosMaquetas = 0;
    let usadosBocetos = 0;
    let usadosPlotters = 0;
    let usadosMuestrasForradas = 0;

    const direcciones = seccionEnvios.querySelectorAll('.envio');
    direcciones.forEach(envio => {
      usadosMaquetas += parseInt(envio.querySelector('input[name="maquetass[]"]').value, 10) || 0;
      usadosBocetos += parseInt(envio.querySelector('input[name="bocetos[]"]').value, 10) || 0;
      usadosPlotters += parseInt(envio.querySelector('input[name="plotters[]"]').value, 10) || 0;
      usadosMuestrasForradas += parseInt(envio.querySelector('input[name="muestrasForradas[]"]').value, 10) || 0;
    });

    return {
      maquetas: Math.max(0, totalesIniciales.maquetas - usadosMaquetas),
      bocetos: Math.max(0, totalesIniciales.bocetos - usadosBocetos),
      plotters: Math.max(0, totalesIniciales.plotters - usadosPlotters),
      muestrasForradas: Math.max(0, totalesIniciales.muestrasForradas - usadosMuestrasForradas),
    };
  }

  // Agregar una nueva dirección
  document.getElementById("agregarDireccion").addEventListener("click", function () {
    if(!validarCheckboxesMuestras()){
      alert("Debe seleccionar al menos una muestra para poder añadir una dirección de envío");
      return
    }

    const totalesDisponibles = calcularTotalesDisponibles();

    // Validar que hay disponibles los recursos necesarios (maquetas, bocetos, plotters, muestrasForradas)
    if (totalesDisponibles.maquetas === 0 && totalesDisponibles.bocetos === 0 && totalesDisponibles.plotters === 0 && totalesDisponibles.muestrasForradas === 0) {
      alert("No hay recursos disponibles para añadir más direcciones.");
      return;
    }


    const nuevaDireccion = document.createElement("div");
    nuevaDireccion.className = "envio form-group";

    nuevaDireccion.innerHTML = `
      <h4 class="full-width">Dirección ${seccionEnvios.children.length + 1}</h4>
      <div class="form-group">
        <div class="input-medio">
          <label>Persona de contacto:
            <input type="text" name="personaContacto[]" required>
          </label>
        </div>
        <div class="input-corto">
          <label>Teléfono:
            <input type="text" name="telefono[]" required>
          </label>
        </div>
        <div class="input-medio">
          <label>Dirección:
            <input type="text" name="direccion[]" required>
          </label>
        </div>
        <div class="input-corto">
          <label>Código Postal:
            <input type="text" name="codigoPostal[]" required>
          </label>
        </div>
        <div class="input-medio">
          <label>Ciudad:
            <input type="text" name="ciudad[]" required>
          </label>
        </div>
        <div class="input-medio">
          <label>País:
            <input type="text" name="pais[]" required>
          </label>
        </div>
      </div>
      <label>Maquetas a enviar:
        <input type="number" name="maquetass[]" min="0" max="${totalesDisponibles.maquetas}" value="${totalesDisponibles.maquetas}">
      </label>
      <label>Bocetos a enviar:
        <input type="number" name="bocetos[]" min="0" max="${totalesDisponibles.bocetos}" value="${totalesDisponibles.bocetos}">
      </label>
      <label>Plotters a enviar:
        <input type="number" name="plotters[]" min="0" max="${totalesDisponibles.plotters}" value="${totalesDisponibles.plotters}">
      </label>
      <label>Muestras forradas a enviar:
        <input type="number" name="muestrasForradas[]" min="0" max="${totalesDisponibles.muestrasForradas}" value="${totalesDisponibles.muestrasForradas}">
      </label>
      <hr>
    `;

    seccionEnvios.appendChild(nuevaDireccion);

    // Actualizar dinámicamente los totales cuando cambien los valores
    const inputs = nuevaDireccion.querySelectorAll('input[type="number"]');
    inputs.forEach(input => input.addEventListener("input", actualizarTotales));
  });

  // Eliminar la última dirección
  document.getElementById("eliminarDireccion").addEventListener("click", function () {
    if (seccionEnvios.children.length > 0) {
      seccionEnvios.removeChild(seccionEnvios.lastElementChild);
      actualizarTotales(); // Actualizar totales después de eliminar
    }
  });

  // Actualizar totales dinámicamente
  function actualizarTotales() {
  const totalesDisponibles = calcularTotalesDisponibles();

  const direcciones = seccionEnvios.querySelectorAll('.envio');
  direcciones.forEach(envio => {
    const inputMaquetas = envio.querySelector('input[name="maquetass[]"]');
    const inputBocetos = envio.querySelector('input[name="bocetos[]"]');
    const inputPlotters = envio.querySelector('input[name="plotters[]"]');
    const inputMuestrasForradas = envio.querySelector('input[name="muestrasForradas[]"]');

    inputMaquetas.max = totalesDisponibles.maquetas + parseInt(inputMaquetas.value, 10);
    inputBocetos.max = totalesDisponibles.bocetos + parseInt(inputBocetos.value, 10);
    inputPlotters.max = totalesDisponibles.plotters + parseInt(inputPlotters.value, 10);
    inputMuestrasForradas.max = totalesDisponibles.muestrasForradas + parseInt(inputMuestrasForradas.value, 10);
  });
}
});

//FIN DIRECCION ENVIO

// MOSTRAR DIV IMPRESION



// Función para verificar "Sin impresión" y ocultar o mostrar el div de impresión
function verificarSinImpresion() {
  // Obtener el valor de la familia seleccionada
  const cartoncilloSelected = document.getElementById('cartoncillo').checked;
  const contraencoladoSelected = document.getElementById('contraencolado').checked;
  const onduladoSelected = document.getElementById('ondulado').checked;


  // Verificar si "Sin impresión" está seleccionado para cada tipo de producto
  const sinImpresionCartoncillo = cartoncilloSelected && document.getElementById('sinImpresionCartoncillo').checked;
  const sinImpresionContraencolado = contraencoladoSelected && document.getElementById('sinImpresionContraencolado').checked;
  const sinImpresionOndulado = onduladoSelected && document.getElementById('sinImpresionOndulado').checked;

  // Si "Sin impresión" está seleccionado en alguna opción, ocultar el div de impresión
  if (sinImpresionCartoncillo || sinImpresionContraencolado || sinImpresionOndulado) {
    document.getElementById('mostrarTablaImpresion').style.display = 'none';
  } else {
    document.getElementById('mostrarTablaImpresion').style.display = 'block';
  }
}

// Delegación de eventos: escuchamos el evento 'change' en el contenedor general (puede ser un <form>, <div>, etc.)
document.getElementById('cartoncilloListado').addEventListener('change', verificarSinImpresion);
document.getElementById('contraencoladoListado').addEventListener('change', verificarSinImpresion);
document.getElementById('onduladoListado').addEventListener('change', verificarSinImpresion);

// Evento para los radio buttons de "familiaProductos"
document.querySelectorAll('input[name="familiaProductos"]').forEach(radio => {
  radio.addEventListener('change', verificarSinImpresion);
});



// FINAL mostrar div IMPRESION



/////   REQUERIMIENTOS  //////
// Evento para mostrar el campo de texto si se selecciona "Otras"
document.getElementById('rejillas').addEventListener('change', function () {
  const otrasOpcion = document.getElementById('otrasOpcion');
  if (this.value === 'otras') {
    // Mostrar el campo de texto
    otrasOpcion.style.display = 'block';
  } else {
    // Ocultar el campo de texto
    otrasOpcion.style.display = 'none';
  }
});


document.getElementById("paletizado").addEventListener("change", function () {
  const paletizado = document.getElementById("paletizado");
  const mostrarPaletizado = document.getElementById("mostrarPaletizado");
  if (paletizado.value === "especificar") {
    mostrarPaletizado.style.display = "block";
  } else {
    mostrarPaletizado.style.display = "none";
  }
});

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
    if (radio.checked && radio.value === 'multiPieza') {
      isMultipiezaSelected = true;
    }
  });


  // Variable global para el contador de bloques
  contadorTipos = 1; // Comienza con 1, ya que el primer tipo es el tipo 1
  // Mostrar u ocultar el contenedor según si la opción "multipieza" está seleccionada
  if (isMultipiezaSelected) {
    numTiposContainer.style.display = 'block';
    const idPieza = document.getElementById('idPieza');
    idPieza.style.display = "block"
    generarBloques()

  } else {
    numTiposContainer.style.display = 'none';
    const idPieza = document.getElementById('idPieza');
    idPieza.style.display = "none"
    const container = document.getElementById('tiposGenerados');
    container.innerHTML = "";
    contadorTipos = 1
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


// Función para generar bloques dinámicamente
function generarBloques() {
  const container = document.getElementById('tiposGenerados');

  // Verificamos si la opción de "Diseño estructural Multipieza" está seleccionada
  const disenyoMultipieza = document.getElementById('diseñoEstructuralMultiPieza');

  // Si "Estructural Multipieza" está seleccionado, inicializamos el contador a 2 y generamos dos bloques
  if (disenyoMultipieza.checked && contadorTipos === 1) {
    contadorTipos = 2; // Generar 2 bloques cuando la opción de "Estructural Multipieza" se selecciona
  }


  // Crear un nuevo bloque por cada pulsación del botón
  const bloque = document.createElement('div');
  bloque.classList.add('tipo-block');

  // El tipo será el valor del contador actual
  bloque.innerHTML = `
   </div id="tipos">
         <hr>
    <h4>Tipo ${contadorTipos}</h4>
    <!-- Radio buttons para seleccionar la familia de productos -->
     <div class="input-medio">
        <label for="idPieza${contadorTipos}">
        <input type="text" id="idPieza${contadorTipos}" name="familiaProductos${contadorTipos}" placeholder="Identificador de la pieza ${contadorTipos}" required>
        </label>
    </div>

     <div class="form-group">
    <label for="cartoncillo${contadorTipos}">
      <input type="radio" id="cartoncillo${contadorTipos}" name="familiaProductos${contadorTipos}" value="Cartoncillo" checked onchange="mostrarListado(${contadorTipos})"> Cartoncillo
    </label>

    <label for="contraencolado${contadorTipos}">
      <input type="radio" id="contraencolado${contadorTipos}" name="familiaProductos${contadorTipos}" value="Contraencolado" onchange="mostrarListado(${contadorTipos})"> Contraencolado
    </label>

    <label for="ondulado${contadorTipos}">
      <input type="radio" id="ondulado${contadorTipos}" name="familiaProductos${contadorTipos}" value="Ondulado" onchange="mostrarListado(${contadorTipos})"> Ondulado
    </label>

     <div class="input-corto">
        <label for="calidad${contadorTipos}">Calidad</label>
        <input class="campotextomuycorto" type="text" id="calidad${contadorTipos}" name="calidad${contadorTipos}" placeholder="Calidad" required/>
     </div>

    <div class="input-corto">
        <label for="canal${contadorTipos}">Canal</label>
        <input class="campotextomuycorto" type="text" id="canal${contadorTipos}" name="canal${contadorTipos}" placeholder="Canal" required/>
    </div>
      <div class="input-corto">
          <div id="mostrarcalidadcartoncillo${contadorTipos}" style="display:none;">
            <label for="cllo${contadorTipos}">Cllo</label>
            <input class="campotextomuycorto" type="text" id="cllo${contadorTipos}" name="cllo${contadorTipos}" placeholder="Cllo" required/>
            </div>
      </div>
    </div>

    <!-- Cartoncillo -->
    <div id="cartoncilloListado${contadorTipos}" style="display:none;">
      <h4>Tipos de impresión para Cartoncillo</h4>
      <label for="sinImpresionCartoncillo${contadorTipos}">
        <input class="trabajoImpresion" type="radio" id="sinImpresionCartoncillo${contadorTipos}" name="productoCartoncillo${contadorTipos}" value="sinImpresion"> Sin impresión
      </label>
      <label for="offsetCartoncillo${contadorTipos}">
        <input type="radio" id="offsetCartoncillo${contadorTipos}" name="productoCartoncillo${contadorTipos}" value="offset" checked> Offset
      </label>
    </div>

    <!-- Contraencolado -->
    <div id="contraencoladoListado${contadorTipos}" style="display:none;">
      <h4>Tipos de impresión para Contraencolado</h4>
      <label  for="sinImpresionContraencolado${contadorTipos}">
        <input class="trabajoImpresion" type="radio" id="sinImpresionContraencolado${contadorTipos}" name="productoContraencolado${contadorTipos}" value="sinImpresion"> Sin impresión
      </label>
      <label for="offsetContraencolado${contadorTipos}">
        <input type="radio" id="offsetContraencolado${contadorTipos}" name="productoContraencolado${contadorTipos}" value="offset" checked> Offset
      </label>
    </div>

    <!-- Ondulado -->
      <div id="onduladoListado${contadorTipos}" style="display:none;">
        <h4>Tipos de impresión para Ondulado</h4>
        <label for="sinImpresionOndulado${contadorTipos}">
          <input class="trabajoImpresion" type="radio" id="sinImpresionOndulado${contadorTipos}" name="productoOndulado${contadorTipos}" value="sinImpresion"> Sin impresión
        </label>
        <label for="offsetOndulado${contadorTipos}">
          <input type="radio" id="offsetOndulado${contadorTipos}" name="productoOndulado${contadorTipos}" value="offset" checked> Offset
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
    </div>
       <br>

  `;

  // Añadir el bloque al contenedor
  container.appendChild(bloque);

  // Incrementar el contador para el siguiente tipo
  contadorTipos++;
}


// Función para mostrar u ocultar los listados según el tipo de producto seleccionado
function mostrarListado(tipoIndex) {
  // Ocultar todos los listados del tipo seleccionado
  document.getElementById(`cartoncilloListado${tipoIndex}`).style.display = 'none';
  document.getElementById(`contraencoladoListado${tipoIndex}`).style.display = 'none';
  document.getElementById(`onduladoListado${tipoIndex}`).style.display = 'none';
  document.getElementById(`mostrarcalidadcartoncillo${tipoIndex}`).style.display = 'none';

  // Obtener el radio button seleccionado
  const seleccionado = document.querySelector(`input[name="familiaProductos${tipoIndex}"]:checked`);

  // Mostrar el listado correspondiente
  if (seleccionado) {
    const valorSeleccionado = seleccionado.value.toLowerCase();

    // Mostrar el listado correspondiente al valor seleccionado
    document.getElementById(`${valorSeleccionado}Listado${tipoIndex}`).style.display = 'block';

    // Mostrar "mostrar-calidad-cartoncillo" si el valor es "Cartoncillo" o "Contraencolado"
    if (valorSeleccionado == 'cartoncillo' || valorSeleccionado == 'contraencolado') {
      document.getElementById(`mostrarcalidadcartoncillo${tipoIndex}`).style.display = 'block';
    }
  } else {
    document.getElementById(`mostrarcalidadcartoncillo${tipoIndex}`).style.display = 'none';
  }
}


// Función para eliminar bloques
function eliminarBloques() {
  const container = document.getElementById('tiposGenerados');

  // Verificar si hay bloques en el contenedor
  if (container.children.length > 1) {
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
        document.getElementById('mostrarcalidadcartoncillo' + index).style.display = 'block'
      } else if (radioButton.value === 'Contraencolado') {
        document.getElementById('contraencoladoListado' + index).style.display = 'block';
        document.getElementById('mostrarcalidadcartoncillo' + index).style.display = 'block'
      } else if (radioButton.value === 'Ondulado') {
        document.getElementById('onduladoListado' + index).style.display = 'block';
        document.getElementById('mostrarcalidadcartoncillo' + index).style.display = 'none'
      }
    }
  });
}


/// motrar calidadcartoncillo
function mostrarTextoCalidadCartoncillo() {
  let cartoncillo = document.getElementById("cartoncillo")
  let contraencolado = document.getElementById("contraencolado")
  let mostrarTexto = document.getElementById("mostrarcalidadcartoncillo")

  if (cartoncillo.checked || contraencolado.checked) {
    mostrarTexto.style.display = "block"
  } else {
    mostrarTexto.style.display = "none"
  }

}

// Agregar eventos a los checkboxes
document.getElementById("cartoncillo").addEventListener("change", mostrarTextoCalidadCartoncillo);
document.getElementById("contraencolado").addEventListener("change", mostrarTextoCalidadCartoncillo);
document.getElementById("ondulado").addEventListener("change", mostrarTextoCalidadCartoncillo);


/////////////////////////////////////////////////////
// Inicializar los bloques y los listados cuando la página se cargue
document.addEventListener('DOMContentLoaded', function () {
  generarBloques();
  mostrarListado();
});

/////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  const contenedorTiposGenerados = document.getElementById('tiposGenerados');
  const radioDiseñoEstructuralMultipieza = document.getElementById('diseñoEstructuralMultiPieza');


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


function validarCheckboxesMuestras() {
  const checkboxes = [
    document.getElementById("checkDiseñoEstructural"),
    document.getElementById("checkBoceto"),
    document.getElementById("checkPlotter"),
    document.getElementById("checkForrada")
  ];
  const tablasCheckboxes = document.querySelectorAll(".controlPeticion"); // Seleccionar todas las tablas con la clase "controlPeticion"

  let algunoMarcado = false;

  // Verificar si al menos uno está marcado
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      algunoMarcado = true;
    }
  });

  if (!algunoMarcado) {
    // Agregar clase de error a cada tabla y a cada checkbox
    tablasCheckboxes.forEach(function (tabla) {
      tabla.classList.add("error"); // Resaltar la tabla
    });

    checkboxes.forEach(function (checkbox) {
      checkbox.classList.add("error-checkbox"); // Resaltar cada checkbox
    });

    alert("Por favor, selecciona al menos uno de los tipos de impresión o muestras.");
    return false; // No permitir el envío
  } else {
    // Quitar la clase de error de cada tabla y de cada checkbox si es válido
    tablasCheckboxes.forEach(function (tabla) {
      tabla.classList.remove("error"); // Quitar el resaltado de la tabla
    });

    checkboxes.forEach(function (checkbox) {
      checkbox.classList.remove("error-checkbox"); // Quitar el resaltado de los checkboxes
    });
  }

  return true; // Permitir el envío si al menos uno está marcado

}


// Función para validar el formulario
function validarFormulario() {
  const formulario = document.getElementById("petcicionComercial");
  const camposRequeridos = formulario.querySelectorAll("[required]");
  let valido = true;
  let mensajeMostrado = false; // Controla si ya mostramos el mensaje de advertencia



  // Recorremos todos los campos requeridos
  camposRequeridos.forEach(function (campo) {
    // Verificamos si el campo está visible (no oculto)
    const estilo = window.getComputedStyle(campo);
    const esVisible = (estilo.display !== 'none') && (estilo.visibility !== 'hidden') && (campo.offsetParent !== null);

    // Solo validamos si el campo es visible
    if (esVisible) {
      if (campo.value.trim() === "") {
        valido = false;
        campo.classList.add("error"); // Agrega clase de error si el campo está vacío

        // Mostrar el mensaje solo una vez
        if (!mensajeMostrado) {
          alert("Por favor, completa todos los campos requeridos.");
          mensajeMostrado = true; // Marcar que el mensaje ya fue mostrado
        }
      } else {
        campo.classList.remove("error"); // Remueve la clase de error si está completado
      }
    }
  });

  // Llamamos a la función que valida los checkboxes
  if (!validarCheckboxesMuestras()) {
    return false; // Si no se seleccionó ningún checkbox, no permitir el envío
  }


  return valido;
}

// Función para enviar el formulario y limpiar los campos
document.getElementById("enviarTerminar").addEventListener("click", function (event) {
  event.preventDefault(); // Prevenir el envío inmediato del formulario

  // Validar el formulario
  if (validarFormulario()) {
    // Aquí iría el código para generar el PDF y abrir el correo
    // ... Tu lógica para generar el PDF y enviar el correo

    // Mostrar mensaje de éxito
    alert("Formulario enviado y limpiado");

    // Limpiar el formulario, EXCLUYENDO el campo de fecha
    const fechaHoraValue = document.getElementById("fechaHora").value; // Guardar el valor de la fecha
    document.getElementById("petcicionComercial").reset(); // Limpiar el formulario
    document.getElementById("fechaHora").value = fechaHoraValue; // Restaurar el valor de la fecha
  }
});

// Función para enviar el formulario y sobrescribir (sin limpiar el formulario completo)
document.getElementById("enviarSobreescribir").addEventListener("click", function (event) {
  event.preventDefault(); // Prevenir el envío inmediato del formulario

  // Validar el formulario
  if (validarFormulario()) {
    // Aquí iría el código para generar el PDF y abrir el correo
    // ... Tu lógica para generar el PDF y enviar el correo

    // Mostrar mensaje de éxito
    alert("Formulario enviado sin limpiar");

    // Borrar solo el campo "referencia cliente" (si existe)
    document.getElementById("referencia").value = ""; // Sobreescribir con vacío el campo de referencia cliente
  }
});

// Función para generar el PDF
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

// Función para manejar el evento de clic en el botón "Enviar y Terminar"
document.getElementById("enviarTerminar").addEventListener("click", function (event) {
  event.preventDefault(); // Prevenir que el formulario se envíe inmediatamente

  // Validar el formulario
  if (validarFormulario()) {
    // Si la validación es exitosa, generar el PDF y abrir el correo
    generarPDF();

    // Limpiar el formulario completo, EXCLUYENDO el campo de fecha
    const fechaHoraValue = document.getElementById("fechaHora").value; // Guardar el valor de la fecha
    document.getElementById("petcicionComercial").reset(); // Limpiar el formulario
    document.getElementById("fechaHora").value = fechaHoraValue; // Restaurar el valor de la fecha
  } else {
    console.log("Formulario no válido. No se generará el PDF ni se enviará el correo.");
  }
});

// Función para manejar el evento de clic en el botón "Enviar y Sobreescribir"
document.getElementById("enviarSobreescribir").addEventListener("click", function (event) {
  event.preventDefault(); // Prevenir que el formulario se envíe inmediatamente

  // Validar el formulario
  if (validarFormulario()) {
    // Si la validación es exitosa, generar el PDF y abrir el correo
    generarPDF();

    // Borrar solo los campos específicos sin limpiar todo el formulario
    document.getElementById("referencia").value = ""; // Borrar campo referencia
    document.getElementById("indicacionesCliente").value = "";
    document.getElementById("cantidadLote").value = ""; // Borrar campo cantidad
    document.getElementById("consumoAnual").value = ""; // Borrar campo cantidad
    document.getElementById("numeroFicha").value = ""; // Borrar campo n ficha
  } else {
    console.log("Formulario no válido. No se generará el PDF ni se enviará el correo.");
  }
});




// Llamado inicial para establecer el estado al cargar la página
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("opcionesTroquel").style.display = "none"
});

document.querySelector('form').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
});
