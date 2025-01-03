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

// Variable global para el contador de bloques
let contadorTipos = 1; // Comienza con 1, ya que el primer tipo es el tipo 1


// slect de stilos
function changeStyle() {
  // Obtiene el valor del radio button seleccionado
  const selectedStyle = document.querySelector('input[name="switch"]:checked').value;
  // Obtiene el elemento <link> con id "themeStylesheet"
  const themeStylesheet = document.getElementById('themeStylesheet');
  // Cambia el atributo href para aplicar el nuevo estilo
  themeStylesheet.href = selectedStyle;
}

// VALIDACIONES

// Función para validar el correo electrónico
function validarEmail() {
  const emailInput = document.getElementById('email'); // Obtener el input de email
  const mensajeEmail = document.getElementById('mensajeEmail');
  const email = emailInput.value;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para correo electrónico

  // Validamos el email
  if (!regexEmail.test(email)) {
    mensajeEmail.textContent = 'Por favor, introduce un correo electrónico válido.';
    mensajeEmail.style.color = 'red'; // Aseguramos que el mensaje de error se vea en rojo
    emailInput.classList.add('error'); // Añadimos la clase .error al input
    emailInput.value = ''; // Limpiamos el campo
  } else {
    mensajeEmail.textContent = ''; // Eliminar mensaje si es válido
    emailInput.classList.remove('error'); // Eliminamos la clase .error si es válido
  }
}

// Función para validar el teléfono
function validarTelefono(telefonoInput) {
  // Usar el `id` del campo para crear un mensaje único de error
  const mensajeTelefono = telefonoInput.nextElementSibling; // El siguiente elemento es el span con el mensaje de error
  let telefono = telefonoInput.value.trim(); // Eliminamos los espacios al principio y al final

  // Expresión regular para validar el teléfono con o sin + o 00
  const regexTelefono = /^(?:\+?\d{2}|00\d{2})[\d\s]{9}$|^\d{9}$/; // Permite +34, 0034, o 9 dígitos más opcionales espacios
  telefono = telefono.replace(/\s+/g, ''); // Eliminamos los espacios en el teléfono

  // Validamos el teléfono
  if (!regexTelefono.test(telefono)) {
    mensajeTelefono.textContent = 'El teléfono debe tener 9 dígitos, puede empezar por +XX, o 00XX';
    mensajeTelefono.style.color = 'red'; // Aseguramos que el mensaje de error se vea en rojo
    telefonoInput.classList.add('error'); // Añadimos la clase .error al input
    telefonoInput.value = ''; // Limpiamos el campo
  } else {
    mensajeTelefono.textContent = ''; // Eliminar mensaje si es válido
    telefonoInput.classList.remove('error'); // Eliminamos la clase .error si es válido
  }
}


// Función para evitar caracteres específicos
// Función para evitar caracteres específicos
function evitarCaracteres(event) {
  const codigoTecla = event.key;  // Obtener la tecla presionada
  const campo = event.target.id;

  // IDs de campos categorizados
  const camposMilimetros = ["ancho", "alto", "largo"];
  const camposEnteros = ["cajasPalet", "unidadesPaquete", "unidadesBase", "unidadesAltura", "consumoAnual", "cantidadLote", "numeroTroquelExistente", "numeroFicha"

  ];

  // Si la tecla presionada es una coma (`,`) o un punto (`.`), evitamos su ingreso
  if (codigoTecla === ',' || codigoTecla === '.') {
    let mensaje = ""; // Variable para el mensaje

    if (campo === "alturaPalet") {
      mensaje = "Medida en centímetros, no se permiten decimales";
    } else if (camposMilimetros.includes(campo)) {
      mensaje = "Medida en milímetros, no se permiten decimales";
    } else if (camposEnteros.includes(campo)) {
      mensaje = "Decimales no permitidos para valores enteros";
    }

    if (mensaje) {
      alert(mensaje); // Muestra el mensaje
    }

    event.preventDefault();  // Prevenir la acción predeterminada
  }
}

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
///// Adaptar altura Indicaciones cliente segun contenido////////////
const textarea = document.getElementById('indicacionesCliente');
textarea.addEventListener('input', function () {
  this.style.height = 'auto'; // Restablece la altura
  this.style.height = `${this.scrollHeight}px`; // Ajusta según el contenido
});

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
    radioSiAnulaFicha.disabled = false;
    // Marca "Sí" en "Anula FF anterior" y desactiva "No"
    document.getElementById("existeTroquelSi").checked=true;
    radioSiAnulaFicha.style.visibility='visible';
    document.getElementById("noAnulaFichaSi").style.visibility = 'visible'; // Mostrar "No"
    radioSiAnulaFicha.checked = true;
    radioNoAnulaFicha.style.visibility='hidden'; // Ocultar "No"
    document.getElementById("noAnulaFichaNo").style.visibility = 'hidden'; // Mostrar "No"
    radioNoAnulaFicha.checked = false; // Desmarcar "No"
    toggleCampoTexto(radioSiAnulaFicha, campoFicha); // Mostrar campo de número de ficha
    document.getElementById("contenedorFefco").style.visibility='visible'
    document.getElementById("contenedorPegado").style.visibility='visible'
    document.getElementById("contenedorMaqueta").style.visibility='visible'
    // document.getElementById("acabadosEstructural").style.display="block" // nuevo estructural

    // Forzar actualización del estilo visual
    radioSiAnulaFicha.dispatchEvent(new Event('change')); // Disparar el evento de cambio para actualizar el estilo

    // Ocultar las opciones de "¿Existe el troquel?" si "Sí" en "Anula troquel" está seleccionado
    opcionesTroquel.style.display = 'none'; // Ocultar las opciones "Sí / No"
    //botonesTroquel.style.display="none"
  } else {
    campoNumeroTroquelExistente.style.display = "block";
    document.getElementById("noAnulaFichaNo").style.visibility = 'visible'; // Mostrar "No"
    radioNoAnulaFicha.style.visibility='visible'; // Mostrar "No"
    radioNoAnulaFicha.disabled = false; // Reactiva "No"
    toggleCampoTexto(radioSiAnulaFicha, campoFicha); // Mostrar u ocultar el campo de número de ficha según la selección
    // Si selecciona "No" en "Anula Troquel", mostrar opciones de existencia de troquel
    opcionesTroquel.style.display = 'block'; // Mostrar las opciones de si existe o no el troquel
    document.getElementById("contenedorFefco").style.visibility='hidden'
    document.getElementById("contenedorPegado").style.visibility='hidden'
    document.getElementById("contenedorMaqueta").style.visibility='hidden'
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
    radioSiAnulaFicha.style.visibility='hidden'; // Ocultar "Sí"
    document.getElementById("noAnulaFichaSi").style.visibility = 'hidden'; // Mostrar "No"
    toggleCampoTexto(radioSiAnulaFicha, campoFicha); // Ocultar el campo de número de ficha
    document.getElementById("contenedorFefco").style.visibility='visible'
    document.getElementById("contenedorPegado").style.visibility='visible'
    document.getElementById("contenedorMaqueta").style.visibility='visible'
    //document.getElementById("acabadosEstructural").style.display="block"
  } else {
    // Si selecciona "Sí" en "¿Existe el troquel?", reactiva la opción "Sí" en "Anula FF anterior?"
    radioSiAnulaFicha.disabled = false;
    radioSiAnulaFicha.style.visibility='visible'; // Ocultar "Sí"
    document.getElementById("noAnulaFichaSi").style.visibility = 'visible'; // Mostrar "No"
    document.getElementById("contenedorFefco").style.visibility='hidden'
    document.getElementById("contenedorPegado").style.visibility='hidden'
    document.getElementById("contenedorMaqueta").style.visibility='hidden'
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


// mostrar dimensiones si anula troquel, si no existe troquel
document.addEventListener('DOMContentLoaded', () => {
  const anulaTroquelRadios = document.getElementsByName('anula_troquel');
  const existeTroquelRadios = document.getElementsByName('existe_troquel');
  const medidasEstructuralDiv = document.getElementById('medidasEstructural');

  function verificarCombinacion() {
    const anulaTroquel = [...anulaTroquelRadios].find(radio => radio.checked)?.value;
    const existeTroquel = [...existeTroquelRadios].find(radio => radio.checked)?.value;

    // Mostrar el div si la combinación es la requerida
    if (anulaTroquel === 'si' || existeTroquel === 'no') {
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



// MODIFICAR REQUERIMIENTO DIMENSIONES SI ESTA MARCADO ARCHIVO ADJUNTO Y ENTREGA MUESTAR FISICIA
// Función para actualizar el estado de los campos
function actualizarCampos() {

  document.getElementById("onduladoListado").style.display = "block";
  // Obtener los elementos de las casillas de verificación
  const archivoAdjunto = document.getElementById('archivoAdjunto');
  const muestraFisica = document.getElementById('muestraFisica');

  // Obtener los campos de ancho, alto y largo
  const ancho = document.getElementById('ancho');
  const alto = document.getElementById('alto');
  const largo = document.getElementById('largo');

  // Si cualquiera de las casillas está marcada, los campos no son requeridos
  if (archivoAdjunto.checked || muestraFisica.checked) {
    ancho.removeAttribute('required');
    alto.removeAttribute('required');
    largo.removeAttribute('required');
  } else {
    // Si ninguna casilla está marcada, los campos son requeridos
    ancho.setAttribute('required', true);
    alto.setAttribute('required', true);
    largo.setAttribute('required', true);
  }
}

// Escuchar cambios en las casillas de verificación
document.getElementById('archivoAdjunto').addEventListener('change', actualizarCampos);
document.getElementById('muestraFisica').addEventListener('change', actualizarCampos);

// Ejecutar la función al cargar la página por si las casillas ya están seleccionadas
window.onload = actualizarCampos;

// FIN REQUERIDO MUESTRA


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


function muestraMinima(event,inputId, estiloBotones) {
  const selectedRadio = event.target.value;
  const inputElement = document.getElementById(inputId);
  const botones = document.getElementsByClassName(estiloBotones);

  let valor = 0;
  switch (selectedRadio) {
    case "original":
      valor = 1;
      inputElement.value=valor
      Array.from(botones).forEach(boton => {
        boton.style.visibility="hidden";
      });
      break;
    case "copia":
      valor = 2;
      Array.from(botones).forEach(boton =>{
        boton.style.visibility="visible";
      });
      break;
    case "ninguna":
      valor = 2;
      Array.from(botones).forEach(boton => {
        boton.style.visibility="visible";
      });

      break;
  }


  inputElement.min = valor;
  if(inputElement.value<valor){
    inputElement.value=valor;
  }


}

// Función para verificar el valor del input y las opciones seleccionadas
function checkValue() {
  const input = document.getElementById("etiquetasPaletizado");
  const textoExtra = document.getElementById("textoExtra");
  const selectedRadio = document.querySelector('input[name="caja_muestra_por_etiqueta"]:checked').value;

  // Ajustar valor mínimo según la opción seleccionada
  if (selectedRadio === "largoAncho") {
    input.value = Math.max(2, input.value); // Si es Largo y ancho, valor mínimo es 2
  } else if (selectedRadio === "4lados") {
    input.value = Math.max(4, input.value); // Si es 4 lados, valor mínimo es 4
  }

  // Mostrar el mensaje si el valor es mayor a 1
  if (parseInt(input.value) > 1) {
    textoExtra.style.display = "block"; // Muestra el texto
  } else {
    textoExtra.style.display = "none"; // Oculta el texto
  }
}


function validarUnidadesEnvio(){
  const contadorM = document.getElementById(`maquetas${contadorEnvios}`);
  const contadorB = document.getElementById(`bocetos${contadorEnvios}`);
  const contadorP = document.getElementById(`plotters${contadorEnvios}`);
  const contadorF = document.getElementById(`muestrasForradas${contadorEnvios}`);

  return contadorM.value === "0" && contadorB.value === "0" && contadorP.value === "0" && contadorF.value === "0";

}


let contadorEnvios=0;
// DIRECCIONES DE ENVIO
window.addEventListener('DOMContentLoaded', function () {
  const seccionEnvios = document.getElementById("seccionEnvios");

  // Obtener valores iniciales de los inputs
  function obtenerTotalesIniciales() {
    const noDevMuestra= document.getElementById("noDevuelveMuestra").checked
    const noDevPlotter= document.getElementById("noDevuelvePlotter").checked


    let plotters = parseInt(document.getElementById("plotterExtra").value, 10) || 0;
    if(noDevPlotter){
      plotters-=1;
    }

    let muestrasForradas = parseInt(document.getElementById("forradaExtra").value, 10) || 0;
    if(noDevMuestra){
      muestrasForradas-=1;
    }

    return {
      maquetas: parseInt(document.getElementById("muestraExtra").value, 10) || 0,
      bocetos: parseInt(document.getElementById("bocetoExtra").value, 10) || 0,
      plotters:plotters,
      muestrasForradas:muestrasForradas,
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
      usadosMaquetas += parseInt(envio.querySelector('input[name="maquetas[]"]').value, 10) || 0;
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
    if (!validarCheckboxesMuestras()) {
      alert("Debe seleccionar al menos una muestra para poder añadir una dirección de envío");
      return;
    }
    document.getElementById("agregarDireccion").scrollIntoView({ behavior: 'smooth', block: 'center' });
    const buttons = document.querySelectorAll(".controlBtn");  // Selecciona todos los botones con la clase "controlBtn"
    buttons.forEach(button => {
      button.disabled = true;  // Deshabilita cada botón
      button.style.background = "grey";
    });

    document.getElementById("eliminarDireccion").style.display = "block";
    const totalesDisponibles = calcularTotalesDisponibles();

    // Validar que hay disponibles los recursos necesarios (maquetas, bocetos, plotters, muestrasForradas)
    if (totalesDisponibles.maquetas === 0 && totalesDisponibles.bocetos === 0 && totalesDisponibles.plotters === 0 && totalesDisponibles.muestrasForradas === 0) {
      alert("No hay recursos disponibles para añadir más direcciones.");
      return;
    }


    if (contadorEnvios>0 && validarUnidadesEnvio()) {
      alert("Para enviar los registros, al menos una cantidad debe ser mayor a 0. Modifique las cantidades.");
      return;
    }

    contadorEnvios++;


    bloquearCheckboxesMuestras()
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
      <div class="input-intermedio">
        <label>Teléfono:
          <input type="text" name="telefono[]" required onblur="validarTelefono(this)">
          <!-- Mensaje de error para el teléfono -->
          <span class="mensajeTelefono" style="color: red;"></span>
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
          <input type="text" name="pais[]" required value="España">
        </label>
      </div>
    </div>

    <div class="form-group">
    <label>Maquetas a enviar:
         <div class="input-corto custom-spinner" >
          <button type="button" class="controlBtnG" onclick="decrement('maquetas${contadorEnvios}')">-</button>
              <input type="number" class="numerosNoPermitidos" name="maquetas[]" id="maquetas${contadorEnvios}" min="0" max="${totalesDisponibles.maquetas}" value="${totalesDisponibles.maquetas}" readonly>
        <button type="button" class="controlBtnG" onclick="increment('maquetas${contadorEnvios}')">+</button>
        </div>
    </label>

    <label>Bocetos a enviar:
          <div class="input-corto custom-spinner" >
           <button type="button" class="controlBtnG" onclick="decrement('bocetos${contadorEnvios}')">-</button>
              <input type="number" class="numerosNoPermitidos" name="bocetos[]" id="bocetos${contadorEnvios}" min="0" max="${totalesDisponibles.bocetos}" value="${totalesDisponibles.bocetos}" readonly>
         <button type="button" class="controlBtnG" onclick="increment('bocetos${contadorEnvios}')">+</button>
        </div>
    </label>

    <label>Plotters a enviar:
        <div class="input-corto custom-spinner" >
            <button type="button" class="controlBtnG" onclick="decrement('plotters${contadorEnvios}')">-</button>
             <input type="number" class="numerosNoPermitidos" name="plotters[]" id="plotters${contadorEnvios}" min="0" max="${totalesDisponibles.plotters}" value="${totalesDisponibles.plotters}" readonly>
            <button type="button" class="controlBtnG" onclick="increment('plotters${contadorEnvios}')">+</button>
       </div>
    </label>

    <label>Muestras forradas a enviar:

         <div class="input-corto custom-spinner" >
         <button type="button" class="controlBtnG" onclick="decrement('muestrasForradas${contadorEnvios}')">-</button>
          <input type="number" class="numerosNoPermitidos" name="muestrasForradas[]" id="muestrasForradas${contadorEnvios}" min="0" max="${totalesDisponibles.muestrasForradas}" value="${totalesDisponibles.muestrasForradas}" readonly>
        <button type="button" class="controlBtnG" onclick="increment('muestrasForradas${seccionEnvios.children.length}')">+</button>
        </div>
    </label>
    </div>

    <hr>
  `;

    seccionEnvios.appendChild(nuevaDireccion);
    agregarDatosContacto(nuevaDireccion)
    // Después de agregar la nueva dirección, vincula los eventos de 'keydown' para evitar la escritura de números
    agregarEventosCampos();


    // Actualizar dinámicamente los totales cuando cambien los valores
    //const inputs = nuevaDireccion.querySelectorAll('input[type="number"]');
   // inputs.forEach(input => input.addEventListener("input", actualizarTotales()));
  });

// Manejo de eventos después de crear nueva dirección
  function agregarDatosContacto(nuevaDireccion) {
    const contactoCliente = document.getElementById("personaContacto").value;
    const telefonoCliente = document.getElementById("telefonoPersonaContacto").value;

    const nuevosCamposContacto = nuevaDireccion.querySelector("input[name='personaContacto[]']");
    const nuevosCamposTelefono = nuevaDireccion.querySelector("input[name='telefono[]']");

    nuevosCamposContacto.value = contactoCliente; // Asigna el valor al nuevo campo de contacto
    nuevosCamposTelefono.value = telefonoCliente; // Asigna el valor al nuevo campo de teléfono
  }



// Recoger muestras por comerciales
  document.getElementById("recogerMuestra").addEventListener("click", function (event) {
    const contenedor = document.getElementById("totalMuestrasArecoger");

    if(validarUnidadesEnvio()){
      alert("Las cantidades de la ultima dirección son todas 0. Elimine la dirección para activar esta opción");
      event.target.checked=false;
      return;
    }


    // Obtener los totales disponibles
    const totalesDisponibles = calcularTotalesDisponibles();

    // Verificar si no hay recursos disponibles
    if (totalesDisponibles.maquetas === 0 && totalesDisponibles.bocetos === 0 && totalesDisponibles.plotters === 0 && totalesDisponibles.muestrasForradas === 0) {
      alert("No hay recursos disponibles para añadir más direcciones.");

      // Prevenir que el checkbox quede marcado
      event.preventDefault(); // Evita que el cambio en el checkbox se registre
      return;
    }
    bloquearCheckboxesMuestras();
    // Verificar si el checkbox está marcado
    const checkbox = document.getElementById("recogerMuestra");
    const mensaje = document.getElementById('mensaje');

    // Si el checkbox no está marcado, ocultar el contenedor y desmarcarlo
    if (!checkbox.checked) {
      const buttons = document.querySelectorAll(".controlBtnG");  // Selecciona todos los botones con la clase "controlBtn"
      buttons.forEach(button => {
        button.disabled = false;  // Deshabilita cada botón
        button.style.background = "";
      });
      contenedor.style.display = "none";  // Ocultar el contenedor si el checkbox no está marcado
      document.getElementById("agregarDireccion").disabled=false
      document.getElementById("agregarDireccion").style.background = "";
      document.getElementById("eliminarDireccion").disabled=false
      document.getElementById("eliminarDireccion").style.background = "";
      contenedor.style.display = "none"; // Ocultar el contenedor si el checkbox no está marcado
      mensaje.style.display = 'none';
      return;
    }

    // Validar si al menos una muestra ha sido seleccionada
    if (!validarCheckboxesMuestras()) {
      alert("Debe seleccionar al menos una muestra para poder añadir una dirección de envío");
      event.preventDefault(); // Evita que el checkbox quede marcado
      contenedor.innerHTML = "";
      contenedor.style.display = "none"; // Ocultar el contenedor
      return;
    }

    // Limpiar el contenido anterior
    contenedor.innerHTML = "";

    // Crear un contenedor para los campos de entrada
    const recoger = document.createElement("div");
    recoger.className = "envio form-group";


    // Añadir campos de entrada con los valores disponibles
    recoger.innerHTML = `

    <label>Maquetas a recoger:
        <div class="input-corto">
            <input type="number" name="maquetas[]" min="0" max="${totalesDisponibles.maquetas}" value="${totalesDisponibles.maquetas}" readonly>
         </div>
    </label>

    <label>Bocetos a recoger:
       <div class="input-corto">
            <input type="number" name="bocetos[]" min="0" max="${totalesDisponibles.bocetos}" value="${totalesDisponibles.bocetos}" readonly>
        </div>
    </label>

    <label>Plotters a recoger:
        <div class="input-corto">
            <input type="number" name="plotters[]" min="0" max="${totalesDisponibles.plotters}" value="${totalesDisponibles.plotters}" readonly>
        </div>
    </label>

    <label>Muestras forradas a recoger:
       <div class="input-corto">
            <input type="number" name="muestrasForradas[]" min="0" max="${totalesDisponibles.muestrasForradas}" value="${totalesDisponibles.muestrasForradas}" readonly>
        </div>
    </label>

    <hr>
  `;

    // Añadir el nuevo contenedor con los inputs al contenedor principal
    contenedor.appendChild(recoger);
    contenedor.style.display = "block"; // Mostrar el contenedor si está oculto
    document.getElementById("agregarDireccion").disabled=true
    document.getElementById("agregarDireccion").style.background = "grey";
    document.getElementById("eliminarDireccion").disabled=true
    document.getElementById("eliminarDireccion").style.background = "grey";

    mensaje.style.display = 'block';

    // Ahora añadimos el evento de 'input' a cada campo de tipo number
   // const inputs = recoger.querySelectorAll('input[type="number"]');
   // inputs.forEach(input => input.addEventListener("input", actualizarTotales));
  });



  function bloquearCheckboxesMuestras(){
    document.getElementById("checkDiseñoEstructural").disabled = true;
    document.getElementById("checkBoceto").disabled = true;
    document.getElementById("checkPlotter").disabled = true;
    document.getElementById("opcionFirmasPlotter").disabled = true;
    document.getElementById("checkForrada").disabled = true;
    document.getElementById("opcionFirmasMuestra").disabled = true;
    const buttonsG = document.querySelectorAll(".controlBtnG");  // Selecciona todos los botones con la clase "controlBtn"
    buttonsG.forEach(button => {
      button.disabled = true;  // Deshabilita cada botón
      button.style.background = "grey";
    });

    const buttons = document.querySelectorAll(".controlBtn");  // Selecciona todos los botones con la clase "controlBtn"
    buttons.forEach(button => {
      button.disabled = true;  // Deshabilita cada botón
      button.style.background = "grey";
    });
  }


  function desbloquearCheckboxesMuestras(){
    document.getElementById("checkDiseñoEstructural").disabled = false;
    document.getElementById("checkBoceto").disabled = false;
    document.getElementById("checkPlotter").disabled = false;
    document.getElementById("opcionFirmasPlotter").disabled = false;
    document.getElementById("checkForrada").disabled = false;
    document.getElementById("opcionFirmasMuestra").disabled = false;

    const buttonsG = document.querySelectorAll(".controlBtnG");  // Selecciona todos los botones con la clase "controlBtn"
    buttonsG.forEach(button => {
      button.disabled = false;  // Deshabilita cada botón
      button.style.background = "";
    });

    const buttons = document.querySelectorAll(".controlBtn");
    buttons.forEach(button => {
      button.disabled = false;  // Habilita cada botón
      button.style.background = "";
    });
  }




// Seleccionar los elementos de entrada y agregar el evento de escucha
  document.getElementById("cantidadLote").addEventListener("keydown", evitarCaracteres);
  document.getElementById("consumoAnual").addEventListener("keydown", evitarCaracteres);
  document.getElementById("ancho").addEventListener("keydown", evitarCaracteres);
  document.getElementById("alto").addEventListener("keydown", evitarCaracteres);
  document.getElementById("largo").addEventListener("keydown", evitarCaracteres);
  document.getElementById("alturaPalet").addEventListener("keydown", evitarCaracteres);
  document.getElementById("cajasPalet").addEventListener("keydown", evitarCaracteres);
  document.getElementById("unidadesPaquete").addEventListener("keydown", evitarCaracteres);
  document.getElementById("unidadesBase").addEventListener("keydown", evitarCaracteres);
  document.getElementById("unidadesAltura").addEventListener("keydown", evitarCaracteres);




  // Eliminar la última dirección
  document.getElementById("eliminarDireccion").addEventListener("click", function () {
    if (seccionEnvios.children.length > 0) {
      seccionEnvios.removeChild(seccionEnvios.lastElementChild);
      const buttons = document.querySelectorAll(".controlBtnG");  // Selecciona todos los botones con la clase "controlBtn"
      buttons.forEach(button => {
        button.disabled = false;  // Deshabilita cada botón
        button.style.background = "";
      });
      contadorEnvios--;
    }
    if(seccionEnvios.children.length === 0){
      document.getElementById("eliminarDireccion").style.display = "none";
      desbloquearCheckboxesMuestras()
    }
    document.getElementById("eliminarDireccion").scrollIntoView({ behavior: 'smooth', block: 'center' });
  });



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
  if ((sinImpresionCartoncillo || sinImpresionContraencolado || sinImpresionOndulado) && contadorTipos === 1) {
    document.getElementById('mostrarTablaImpresion').style.display = 'none';
    document.getElementById('fscQr').style.display = 'none';
   // document.getElementById('fscNo').checked=true;
  } else {
    document.getElementById('mostrarTablaImpresion').style.display = 'block';
    document.getElementById('fscQr').style.display = 'block';
    document.getElementById('fscNo').checked=true;
  }
}

// Delegación de eventos: escuchamos el evento 'change' en el contenedor general (puede ser un <form>, <div>, etc.)
document.getElementById('cartoncilloListado').addEventListener('change', verificarSinImpresion);
document.getElementById('contraencoladoListado').addEventListener('change', verificarSinImpresion);
document.getElementById('onduladoListado').addEventListener('change', verificarSinImpresion);
// Evento para los radio buttons de "tipo_papel"
document.querySelectorAll('input[name="tipo_papel"]').forEach(radio => {
  radio.addEventListener('change', verificarSinImpresion);
});

// FINAL mostrar div IMPRESION


/////   REQUERIMIENTOS  //////
// Agrega un evento para detectar cambios en el checkbox
document.getElementById("archivoAdjunto").addEventListener('change', (event) => {
  const checkbox = event.target;
  const archivo= document.getElementById("archivoSubidaMedidas")
  if (checkbox.checked) {
    archivo.style.display = 'block'; // Muestra el botón
  } else {
    archivo.style.display = 'none'; // Oculta el botón
  }
});

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
const opcionesDisenyo = document.getElementsByName('tipo_diseño');
const numTiposContainer = document.getElementById('numTiposContainer');

// Función para mostrar u ocultar el contenedor de número de tipos
function toggleNumTipos() {
  // Comprobar si alguno de los radio buttons está seleccionado en "multipieza"
  let isMultipiezaSelected = false;



  // Recorrer los radio buttons
  opcionesDisenyo.forEach(radio => {
    if (radio.checked && radio.value === 'multi_pieza') {
      isMultipiezaSelected = true;
    }
  });



  // Mostrar u ocultar el contenedor según si la opción "multipieza" está seleccionada
  if (isMultipiezaSelected) {
    numTiposContainer.style.display = 'block';
    const idPieza = document.getElementById(`idPieza`);
    idPieza.style.display = "block"
    generarBloques()
    document.getElementById('mostrarTablaImpresion').style.display = 'block'; // esta es La principal
    if(contadorTipos >=1 ){
      document.getElementById("numTiposDec").style.display = 'none'; // Ocultar el botón de decremento
    }
  } else {
    numTiposContainer.style.display = 'none';
    const idPieza = document.getElementById('idPieza');
    idPieza.style.display = "none"
    const container = document.getElementById('tiposGenerados');
    container.innerHTML = "";
    contadorTipos = 1
    verificarSinImpresion()
  }
}

// Añadir eventos a los radio buttons para que se ejecuten cuando se cambien
opcionesDisenyo.forEach(radio => {
  radio.addEventListener('change', toggleNumTipos);
});

// Llamar a la función para asegurarse de que el contenedor esté correctamente visible/oculto
toggleNumTipos(); // Esto asegura que el contenedor tenga el estado correcto cuando se carga la página

///////   TIPO   /////
/////////////////////////////////////////////////////
// Obtener todos los radio buttons y los divs para los listados
const radioButtons = document.getElementsByName('tipo_papel');
const cartoncilloListado = document.getElementById('cartoncilloListado');
const contraencoladoListado = document.getElementById('contraencoladoListado');
const onduladoListado = document.getElementById('onduladoListado');
const mostrartextoCartoncillo=document.getElementById('mostrarcalidadcartoncillo')

// Función para mostrar el listado de tipos de impresion correspondiente según el radio boton seleccionado
// cartoncillo, contraencolado y ondulado
// oculta o muestra el texto de Cllo
function mostrarListaTiposImpresion() {
  // Ocultar todos los listados al principio
  cartoncilloListado.style.display = 'none';
  contraencoladoListado.style.display = 'none';
  onduladoListado.style.display = 'none';
 mostrartextoCartoncillo.style.display = 'none'
  document.getElementById('fscQr').style.display = 'none';

  // Recorrer los radio buttons seleccionados
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      // Mostrar el listado correspondiente según el valor seleccionado
      if (radioButton.value === 'Cartoncillo') {
        cartoncilloListado.style.display = 'block';
        cartoncilloListado.querySelector('input#sinImpresionCartoncillo').checked=true
       mostrartextoCartoncillo.style.display = 'block'
      } else if (radioButton.value === 'Contraencolado') {
        contraencoladoListado.style.display = 'block';
        contraencoladoListado.querySelector('input#sinImpresionContraencolado').checked=true
        mostrartextoCartoncillo.style.display = 'block'
      } else if (radioButton.value === 'Ondulado') {
        onduladoListado.style.display = 'block';
        // Accede al input usando querySelector
        onduladoListado.querySelector('input#sinImpresionOndulado').checked=true;
      }
    }
  }
}

// Añadir un evento para cada cambio en los radio buttons
for (const radioButton of radioButtons) {
  radioButton.addEventListener('change', mostrarListaTiposImpresion);
}

// Añadir un evento para detectar el cambio en cualquier radio button de la opción "estructuralOpciones"
document.querySelectorAll('input[name="estructuralOpciones"]').forEach(radioButton => {
  radioButton.addEventListener('change', toggleNumTipos);
});
// Ejecutar la función para asegurarse de que el estado sea correcto cuando se cargue la página
document.addEventListener('DOMContentLoaded', toggleNumTipos);


// mostrar tintas
// Función para mostrar las tintas según el radio seleccionado
function actualizarVisibilidadTintas() {
  // Buscar el radio que está marcado por defecto
  const radioSeleccionado = document.querySelector('input[type="radio"]:checked');
  if (radioSeleccionado) {
    const value = radioSeleccionado.value.toLowerCase();

    // Mostrar u ocultar los divs correspondientes según el valor del radio seleccionado
    document.getElementById('tintasOffset').style.display = (value === 'offset') ? 'block' : 'none';
    document.getElementById('tintasDigital').style.display = (value === 'digital') ? 'block' : 'none';
    document.getElementById('tintasFlexo').style.display = (value.includes('flexo')) ? 'block' : 'none';
  }
}

// Añadir el evento al cambiar la selección de los radios
document.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', function () {
    // Verificar si el radio está dentro de 'fscQR' y salir si es así
    if (this.closest('.fscQrList')) return; // Ignorar si el radio pertenece al contenedor 'fscQR'
    const value = this.value.toLowerCase();

    document.getElementById('tintasOffset').style.display = (value === 'offset') ? 'block' : 'none';
    document.getElementById('tintasDigital').style.display = (value === 'digital') ? 'block' : 'none';
    document.getElementById('tintasFlexo').style.display = (value.includes('flexo')) ? 'block' : 'none';
    document.getElementById('contenedorBarnizHD').style.display=(value=== 'flexo hd') ? 'block' : 'none';

  });
});

//fin mostrar tintas


// MOSTRAR SELECT CANAL EN FUNCION DEL TIPO DE PAPEL
// Función para manejar la actualización del canal
function actualizarCanal() {
  // Obtener el valor del radio button seleccionado
  const tipoPapel = document.querySelector('.divTipoPapel input[name="tipo_papel"]:checked').value;

  // Obtener el select y restablecer su valor al estado inicial
  const selectCanal = document.getElementById('canal');
  selectCanal.value = "";  // Esto restablece el valor del select a la opción por defecto

  // Ocultar todas las opciones del select
  const opciones = selectCanal.querySelectorAll('option');
  opciones.forEach(option => {
    option.style.display = 'none'; // Ocultar todas las opciones
  });

  // Mostrar solo las opciones correspondientes al tipo de papel seleccionado
  if (tipoPapel === "Cartoncillo") {
    // Mostrar solo las opciones para Cartoncillo
    const opcionesCartoncillo = selectCanal.querySelectorAll('.canalCartoncillo');
    opcionesCartoncillo.forEach(option => {
      option.style.display = 'block'; // Mostrar las opciones de cartoncillo
    });
    selectCanal.value = "l"; // Seleccionar automáticamente "L"
  } else if (tipoPapel === "Contraencolado") {
    // Mostrar solo las opciones para Contraencolado
    const opcionesContraencolado = selectCanal.querySelectorAll('.canalContraencolado');
    opcionesContraencolado.forEach(option => {
      option.style.display = 'block'; // Mostrar las opciones de contraencolado
    });
  } else if (tipoPapel === "Ondulado") {
    // Mostrar solo las opciones para Ondulado
    const opcionesOndulado = selectCanal.querySelectorAll('.canalOndulado');
    opcionesOndulado.forEach(option => {
      option.style.display = 'block'; // Mostrar las opciones de ondulado
    });
  }
}

// Agregar el evento para los radio buttons
const radios = document.querySelectorAll('.divTipoPapel input[name="tipo_papel"]');
radios.forEach(radio => {
  radio.addEventListener('change', actualizarCanal);
});

// Llamar a la función al cargar el script para inicializar correctamente
document.addEventListener('DOMContentLoaded', actualizarCanal);
/// FIN CANAL

// Función para mostrar el listado de tipos de impresion correspondiente según el radio boton seleccionado
// cartoncillo, contraencolado y ondulado
// oculta o muestra el texto de Cllo
function mostrarListaTiposImpresionMultipieza(tipoIndex = '') {
  // Construir los IDs dinámicamente según si hay un índice o no
  const prefijo = tipoIndex ? `${tipoIndex}` : '';

  // Ocultar todos los listados del tipo seleccionado
  document.getElementById(`cartoncilloListado${prefijo}`).style.display = 'none';
  document.getElementById(`contraencoladoListado${prefijo}`).style.display = 'none';
  document.getElementById(`onduladoListado${prefijo}`).style.display = 'none';
  document.getElementById(`mostrarcalidadcartoncillo${prefijo}`).style.display = 'none';
  document.getElementById(`fscQr${prefijo}`).style.display = 'none';
  document.getElementById(`fscNo${prefijo}`).checked = false;

  // Obtener el radio button seleccionado
  const seleccionado = document.querySelector(`input[name="tipo_papel_${prefijo}"]:checked`);

  // Restablecer el valor del select a "Seleccionar" (opción por defecto)
  const selectCanal = document.getElementById(`canal${tipoIndex}`);
  selectCanal.value = '';  // Restablecer a la opción "Seleccionar"

  // Mostrar el listado correspondiente
  if (seleccionado) {
    const valorSeleccionado = seleccionado.value.toLowerCase();

    // Mostrar el listado correspondiente al valor seleccionado
    document.getElementById(`${valorSeleccionado}Listado${prefijo}`).style.display = 'block';
    const contraencoladoCanal = document.getElementById(`mostrarCanalContraencolado${prefijo}`);

    // Mostrar "mostrar-calidad-cartoncillo" si el valor es "Cartoncillo"
    if (valorSeleccionado === 'cartoncillo') {
      selectCanal.value = 'l'; // Seleccionar automáticamente "L"
      document.getElementById(`mostrarCanalCartoncillo${prefijo}`).style.display = 'block';
      document.getElementById(`mostrarCanalContraencolado${prefijo}`).style.display = 'none';
      document.getElementById(`mostrarCanalOndulado${prefijo}`).style.display = 'none';
      document.getElementById(`mostrarcalidadcartoncillo${prefijo}`).style.display = 'block';
      document.getElementById(`sinImpresionCartoncillo${prefijo}`).checked = true; // ESTE CHECLK DEEBRIA MARCARSE
      document.getElementById(`tintasOffset${prefijo}`).style.display = 'none';
      document.getElementById(`tintasDigital${prefijo}`).style.display = 'none';
      document.getElementById(`tintasFlexo${prefijo}`).style.display = 'none';
    } else if (valorSeleccionado === 'contraencolado') {
      document.getElementById(`mostrarCanalContraencolado${prefijo}`).style.display = 'block';
      document.getElementById(`mostrarCanalCartoncillo${prefijo}`).style.display = 'none';
      document.getElementById(`mostrarCanalOndulado${prefijo}`).style.display = 'none';
      document.getElementById(`mostrarcalidadcartoncillo${prefijo}`).style.display = 'block';
      document.getElementById(`sinImpresionContraencolado${prefijo}`).checked = true;
      document.getElementById(`tintasOffset${prefijo}`).style.display = 'none';
      document.getElementById(`tintasDigital${prefijo}`).style.display = 'none';
      document.getElementById(`tintasFlexo${prefijo}`).style.display = 'none';
    } else if (valorSeleccionado === 'ondulado') {
      document.getElementById(`mostrarCanalOndulado${prefijo}`).style.display = 'block';
      document.getElementById(`mostrarCanalCartoncillo${prefijo}`).style.display = 'none';
      document.getElementById(`mostrarCanalContraencolado${prefijo}`).style.display = 'none';
      document.getElementById(`mostrarcalidadcartoncillo${prefijo}`).style.display = 'none';
      document.getElementById(`sinImpresionOndulado${prefijo}`).checked = true;
      document.getElementById(`tintasOffset${prefijo}`).style.display = 'none';
      document.getElementById(`tintasDigital${prefijo}`).style.display = 'none';
      document.getElementById(`tintasFlexo${prefijo}`).style.display = 'none';
    }


  }
}

/////////////////////////////////////////////////////
// Inicializar los bloques y los listados cuando la página se cargue
document.addEventListener('DOMContentLoaded', function () {
  generarBloques();
  //mostrarListado();
  mostrarListaTiposImpresionMultipieza();
});

/////////////////////////////////////////////////////
// Función para generar los bloques dinámicamente según el número de tipos seleccionado
/////////////////////////////////////////////////////
// Función para generar bloques dinámicamente
function generarBloques() {
  const container = document.getElementById('tiposGenerados');
  document.getElementById("numTiposInc").scrollIntoView({ behavior: 'smooth', block: 'center' });
  if(contadorTipos >30) {
    alert(`No se pueden añadir más de ${contadorTipos-1} tipos, contacta con el administrador`);
    return;
  }

  // Verificamos si la opción de "Diseño estructural Multipieza" está seleccionada
  const disenyoMultipieza = document.getElementById('diseñoEstructuralMultiPieza');

  // Si "Estructural Multipieza" está seleccionado, inicializamos el contador a 2 y generamos dos bloques
  if (disenyoMultipieza.checked && contadorTipos === 1) {
    contadorTipos = 2; // Generar 2 bloques cuando la opción de "Estructural Multipieza" se selecciona
    // Desplazarse hacia el radio button seleccionado
    disenyoMultipieza.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Mostrar el botón de decremento solo si el contador es mayor o igual a 3
  if (contadorTipos === 3) {
    document.getElementById("numTiposDec").style.display = 'block'; // Mostrar el botón de decremento
  }

  // Crear un nuevo bloque por cada pulsación del botón
  const bloque = document.createElement('div');
  bloque.classList.add('tipo-block');

  // Aplicar un color de fondo más oscuro si el contador es par
  if (contadorTipos % 2 === 0) {
    bloque.style.cssText = "background: transparent; border: 5px solid #2ecc71; border-radius: 12px; box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.1); padding: 20px; transition: all 0.3s ease;";
      //'#f0f0f0'; // Color más oscuro (gris claro)
  } else {
    bloque.style.cssText = "background: transparent; border: 5px solid #3498db; border-radius: 12px; box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.1); padding: 20px; transition: all 0.3s ease;";
  }

  // El tipo será el valor del contador actual
  bloque.innerHTML = `

   <div id="tipos${contadorTipos}">
         <br>

    <!-- Radio buttons para seleccionar la familia de productos -->
     <div class="input-medio">
      <h4>Pieza ${contadorTipos}</h4>
        <label for="idPieza${contadorTipos}">
        <input type="text" id="idPieza${contadorTipos}" name="pieza_id_${contadorTipos}" placeholder="Identificador de la pieza ${contadorTipos}" required>
        </label>
    </div>
        <h4>Tipo papel ${contadorTipos}</h4>
     <div class="form-group">
        <label for="cartoncillo${contadorTipos}">
        <input type="radio" id="cartoncillo${contadorTipos}" name="tipo_papel_${contadorTipos}" value="Cartoncillo" onchange="mostrarListaTiposImpresionMultipieza(${contadorTipos})"> Cartoncillo
        </label>

    <label for="contraencolado${contadorTipos}">
      <input type="radio" id="contraencolado${contadorTipos}" name="tipo_papel_${contadorTipos}" value="Contraencolado" onchange="mostrarListaTiposImpresionMultipieza(${contadorTipos})"> Contraencolado
    </label>

    <label for="ondulado${contadorTipos}">
      <input type="radio" id="ondulado${contadorTipos}" name="tipo_papel_${contadorTipos}" value="Ondulado" checked onchange="mostrarListaTiposImpresionMultipieza(${contadorTipos})"> Ondulado
    </label>


     <div class="input-corto">
        <label for="calidad${contadorTipos}">Calidad</label>
        <input class="campotextomuycorto" type="text" id="calidad${contadorTipos}" name="calidad_${contadorTipos}" placeholder="Calidad" required/>
     </div>

        <div class="input-intermedio">
        <label for="canal${contadorTipos}">Canal</label>
        <select id="canal${contadorTipos}" name="canal" required>


          <!-- Opciones para Ondulado -->
          <optgroup id="mostrarCanalOndulado${contadorTipos}" style="display:block;">
          <option value="">Seleccionar</option>
          <option value="g_nanomicro" class="canalOndulado${contadorTipos}">G Nanomicro</option>
          <option value="f_minimicro" class="canalOndulado${contadorTipos}">F Minimicro 1,1mm</option>
          <option value="f_micro" class="canalOndulado${contadorTipos}">E Micro 1,5-1,7mm</option>
          <option value="d_canal_d" class="canalOndulado${contadorTipos}">D Canal-D 2,5mm</option>
          <option value="b_canal_3" class="canalOndulado${contadorTipos}">B Canal-3 3mm</option>
          <option value="c_canal_5" class="canalOndulado${contadorTipos}">C Canal-5 4mm</option>
          <option value="ed_micro_d" class="canalOndulado${contadorTipos}">ED Micro-D 4mm</option>
          <option value="ec_micro_5" class="canalOndulado${contadorTipos}">EC Micro-5 6mm</option>
          <option value="bc_canal_3-5" class="canalOndulado${contadorTipos}">BC Canal 3-5 7mm</option>
          </optgroup>


          <!-- Opciones para Contraencolado -->
          <optgroup id="mostrarCanalContraencolado${contadorTipos}" style="display:none;">
          <option value="">Seleccionar</option>
          <option value="l+b" class="canalContraencolado${contadorTipos}">L+B</option>
          <option value="l+bc" class="canalContraencolado${contadorTipos}">L+BC</option>
          <option value="l+c" class="canalContraencolado${contadorTipos}">L+C</option>
          <option value="l+d" class="canalContraencolado${contadorTipos}">L+D</option>
          <option value="l+e" class="canalContraencolado${contadorTipos}">L+E</option>
          <option value="l+ec" class="canalContraencolado${contadorTipos}">L+EC</option>
          <option value="l+ed" class="canalContraencolado${contadorTipos}">L+ED</option>
          <option value="l+f" class="canalContraencolado${contadorTipos}">L+F</option>
          </optgroup>

          <!-- Opciones para Cartoncillo -->
          <optgroup id="mostrarCanalCartoncillo${contadorTipos}" style="display:none;">
          <option value="l" class="canalCartoncillo${contadorTipos}" >L</option>
          </optgroup>
        </select>

        </div>

        <div class="input-corto">
            <div id="mostrarcalidadcartoncillo${contadorTipos}" style="display:none;">
              <label for="cllo${contadorTipos}">Cllo</label>
              <input class="campotextomuycorto" type="text" id="cllo${contadorTipos}" name="cllo_${contadorTipos}" placeholder="Cllo" required/>
              </div>
        </div>
    </div>

    <!-- Tipos de Impresion segun papel elegido-->

    <!-- Cartoncillo -->
    <div id="cartoncilloListado${contadorTipos}" style="display:none;">
      <h4>Tipos de impresión para Cartoncillo</h4>
      <label for="sinImpresionCartoncillo${contadorTipos}">
        <input class="trabajoImpresion tipoImpresionM${contadorTipos}" type="radio" id="sinImpresionCartoncillo${contadorTipos}" class="tipoImpresionM_${contadorTipos}" name="cartoncillo_${contadorTipos}_impresion" value="sinImpresion"  onchange="actualizarTintasMultipieza(${contadorTipos})"> Sin impresión
      </label>
      <label for="offsetCartoncillo${contadorTipos}">
        <input type="radio" class="tipoImpresionM${contadorTipos}" id="offsetCartoncillo${contadorTipos}" class="tipoImpresionM_${contadorTipos}" name="cartoncillo_${contadorTipos}_impresion" value="offset" onchange="actualizarTintasMultipieza(${contadorTipos})"> Offset
      </label>
    </div>

    <!-- Contraencolado -->
    <div id="contraencoladoListado${contadorTipos}" style="display:none;">
      <h4>Tipos de impresión para Contraencolado</h4>
      <label  for="sinImpresionContraencolado${contadorTipos}">
        <input class="trabajoImpresion tipoImpresionM${contadorTipos}" type="radio" id="sinImpresionContraencolado${contadorTipos}" class="tipoImpresionM_${contadorTipos}" name="contraencolado_${contadorTipos}_impresion" value="sinImpresion"  onchange="actualizarTintasMultipieza(${contadorTipos})"> Sin impresión
      </label>
      <label for="offsetContraencolado${contadorTipos}">
        <input type="radio" class="tipoImpresionM${contadorTipos}" id="offsetContraencolado${contadorTipos}" class="tipoImpresionM_${contadorTipos}" name="contraencolado_${contadorTipos}_impresion"  value="offset" onchange="actualizarTintasMultipieza(${contadorTipos})"> Offset
      </label>
    </div>

    <!-- Ondulado -->
        <div class="onduladoListado"
      <div id="onduladoListado${contadorTipos}" style="display:block;">
        <h4>Tipos de impresión para Ondulado</h4>
        <label for="sinImpresionOndulado${contadorTipos}">
          <input class="trabajoImpresion tipoImpresionM${contadorTipos}" type="radio" id="sinImpresionOndulado${contadorTipos}" class="tipoImpresionM_${contadorTipos}" name="ondulado_${contadorTipos}_impresion" value="sinImpresion" checked onchange="actualizarTintasMultipieza(${contadorTipos})">Sin impresión
        </label>
        <label for="offsetOndulado${contadorTipos}">
          <input type="radio" class="tipoImpresionM${contadorTipos}" id="offsetOndulado${contadorTipos}" class="tipoImpresionM_${contadorTipos}" name="ondulado_${contadorTipos}_impresion" value="offset" onchange="actualizarTintasMultipieza(${contadorTipos})">Offset
        </label>
        <label for="digitalOndulado${contadorTipos}">
          <input type="radio" class="tipoImpresionM${contadorTipos}" id="digitalOndulado${contadorTipos}" class="tipoImpresionM_${contadorTipos}" name="ondulado_${contadorTipos}_impresion" value="digital" onchange="actualizarTintasMultipieza(${contadorTipos})">Digital
        </label>
        <label for="flexoOndulado${contadorTipos}">
          <input type="radio" class="tipoImpresionM${contadorTipos}" id="flexoOndulado${contadorTipos}" class="tipoImpresionM_${contadorTipos}" name="ondulado_${contadorTipos}_impresion" value="flexo" onchange="actualizarTintasMultipieza(${contadorTipos})">Flexo
        </label>
        <label for="flexoMejoradoOndulado${contadorTipos}">
          <input type="radio" class="tipoImpresionM${contadorTipos}" id="flexoMejoradoOndulado${contadorTipos}" class="tipoImpresionM_${contadorTipos}" name="ondulado_${contadorTipos}_impresion" value="flexo mejorado" onchange="actualizarTintasMultipieza(${contadorTipos})">Flexo mejorado
        </label>
        <label for="flexoHDOndulado${contadorTipos}">
          <input type="radio" class="tipoImpresionM${contadorTipos}" id="flexoHDOndulado${contadorTipos}" class="tipoImpresionM_${contadorTipos}" name="ondulado_${contadorTipos}_impresion" value="flexo hd" onchange="actualizarTintasMultipieza(${contadorTipos})">Flexo HD
        </label>
      </div>
      </div>

     <div id="tintasOffset${contadorTipos}" style="display:none;">
      <h4>Tintas para Offset</h4>
      <div class="form-group">
        <label >
          <input type="checkbox" id="tintaCoffset${contadorTipos}" name="offset_${contadorTipos}_cian" value="cian" checked> Cian (C)
        </label>
        <label>
          <input type="checkbox" id="tintaMoffset${contadorTipos}" name="offset_${contadorTipos}_magenta" value="magenta" checked> Magenta (M)
        </label>
        <label >
          <input type="checkbox" id="tintaYoffset${contadorTipos}" name="offset_${contadorTipos}_amarillo" value="amarillo" checked> Amarillo (Y)
        </label>
        <label>
          <input type="checkbox" id="tintaKoffset${contadorTipos}" name="offset_${contadorTipos}_negro" value="negro" checked> Negro (K)
        </label>
        <div class="input-corto">
          <label > Tinta 5
          <input type="text" name="offset_${contadorTipos}_tinta5" id="tinta5Offset${contadorTipos}" >
          </label>
        </div>
        <div class="input-corto">
          <label > Tinta 6
          <input type="text" name="offset_${contadorTipos}_tinta6" id="tinta6Offset${contadorTipos}" >
          </label>
        </div>
        <div class="input-corto">
          <label >Tinta 7
          <input type="text" name="offset_${contadorTipos}_tinta7" id="tinta7Offset${contadorTipos}">
          </label>
        </div>
      </div>


        <div class="form-group">
        <div class="input-intermedio">
          <label for="barniz">Tipo de barniz:</label>
          <select id="barniz${contadorTipos}" name="barniz">
            <option value="">Seleccionar</option>
            <option value="acrilico_brillo">Acrílico Brillo</option>
            <option value="acrilico_mate">Acrílico Mate</option>
            <option value="barniz_antideslizante">Barniz Antideslizante</option>
            <option value="barniz_antieslip">Barniz Antieslip</option>
            <option value="barniz_graso">Barniz Graso</option>
            <option value="no">NO</option>
            <option value="primer">Primer</option>
            <option value="uvi_brillo">UVI Brillo</option>
            <option value="uvi_mate">UVI Mate</option>
          </select>
        </div>
        <div class="input-intermedio">
          <label>Acabados especiales:</label>
          <ul class="checkbox-list">
            <li>
              <input type="checkbox" id="cool_foild${contadorTipos}" name="coolFoild_M_${contadorTipos}" value="coolFoild">
              <label for="cool_foild${contadorTipos}">COOL FOILD</label>
            </li>
            <li>
              <input type="checkbox" id="glasofonado_brillo${contadorTipos}" name="glasofonadoBrillo_M_${contadorTipos}" value="glasofonadoBrillo">
              <label for="glasofonado_brillo${contadorTipos}">GLASOFONADO BRILLO</label>
            </li>
            <li>
              <input type="checkbox" id="glasofonado_mate${contadorTipos}" name="glasofonadoMate_M_${contadorTipos}" value="glasofonadoMate">
              <label for="glasofonado_mate${contadorTipos}">GLASOFONADO MATE</label>
            </li>
            <li>
              <input type="checkbox" id="gofrado${contadorTipos}" name="gofrado_M_${contadorTipos}" value="gofrado">
              <label for="gofrado${contadorTipos}">GOFRADO</label>
            </li>
            <li>
              <input type="checkbox" id="relieve${contadorTipos}" name="relieve_M_${contadorTipos}" value="relieve">
              <label for="relieve${contadorTipos}">RELIEVE</label>
            </li>
            <li>
              <input type="checkbox" id="stamping${contadorTipos}" name="stamping_M_${contadorTipos}" value="stamping">
              <label for="stamping${contadorTipos}">STAMPING</label>
            </li>
            <li>
              <input type="checkbox" id="uvi_selectivo${contadorTipos}" name="uviSelectivo_M_${contadorTipos}" value="uviSelectivo">
              <label for="uvi_selectivo${contadorTipos}">UVI SELECTIVO</label>
            </li>
          </ul>
        </div>
      </div>

    </div>

    <div id="tintasDigital${contadorTipos}" style="display:none;">
      <h4>Tintas para Digital</h4>
      <div class="form-group">
        <label >
          <input type="checkbox" id="tintaCdigital${contadorTipos}" name="digital_${contadorTipos}_cian" value="cian" checked> Cian (C)
        </label>
        <label >
          <input type="checkbox" id="tintaMdigital${contadorTipos}" name="digital_${contadorTipos}_magenta" value="magenta" checked> Magenta (M)
        </label>
        <label>
          <input type="checkbox" id="tintaYdigital${contadorTipos}" name="digital_${contadorTipos}_amarillo" value="amarillo" checked> Amarillo (Y)
        </label>
        <label>
          <input type="checkbox" id="tintaKdigital${contadorTipos}" name="digital_${contadorTipos}_negro" value="negro" checked> Negro (K)
        </label>
        <label>
          <input type="checkbox" id="tintaOdigital${contadorTipos}" name="digital_${contadorTipos}_naranja" value="violeta" checked> Orange (O)
        </label>
        <label>
          <input type="checkbox" id="tintaVdigital${contadorTipos}" name="digital_${contadorTipos}_violeta" value="violeta" checked> Violeta (V)
        </label>
      </div>
    </div>

    <div id="tintasFlexo${contadorTipos}" style="display:none;">
      <h4>Tintas para Flexo</h4>
      <div class="form-group">
        <div class="input-corto">
          <label > Tinta 1
          <input type="text" name="flexo_${contadorTipos}_tinta1" id="tinta1Flexo${contadorTipos}" >
          </label>
        </div>
        <div class="input-corto">
          <label > Tinta 2
            <input type="text" name="flexo_${contadorTipos}_tinta2" id="tinta2Flexo${contadorTipos}" >
          </label>
        </div>
        <div class="input-corto">
          <label > Tinta 3
            <input type="text" name="flexo_${contadorTipos}_tinta3" id="tinta3Flexo${contadorTipos}" >
          </label>
        </div>
        <div class="input-corto">
          <label > Tinta 4
            <input type="text" name="flexo_${contadorTipos}_tinta4" id="tinta4Flexo${contadorTipos}" >
          </label>
        </div>
        <div class="input-corto">
          <label > Tinta 5
            <input type="text" name="flexo_${contadorTipos}_tinta5" id="tinta5Flexo${contadorTipos}" >
          </label>
        </div>
        <div class="input-corto">
          <label > Tinta 6
            <input type="text" name="flexo_${contadorTipos}_tinta6" id="tinta6Flexo${contadorTipos}" >
          </label>
        </div>
      </div>
      <div class="input-intermedio" id="contenedorBarnizHD${contadorTipos}" style="display: none">
        <label for="barnizFelxoHD">Tipo de barniz:</label>
        <select id="barnizFelxoHD${contadorTipos}" name="barniz">
          <option value="">Seleccionar</option>
          <option value="acrilico_brillo">Acrílico Brillo</option>
          <option value="acrilico_mate">Acrílico Mate</option>
          <option value="barniz_antideslizante">Barniz Antideslizante</option>
          <option value="barniz_antieslip">Barniz Antieslip</option>
          <option value="barniz_graso">Barniz Graso</option>
          <option value="no">NO</option>
          <option value="primer">Primer</option>
          <option value="uvi_brillo">UVI Brillo</option>
          <option value="uvi_mate">UVI Mate</option>
        </select>
      </div>

    </div>

     <div id="fscQr${contadorTipos}" class="fscQrList" style="display: none">
        <div class="form-group">
          <label>FSC:</label>
          <label>
            <input type="radio" id="fscNo${contadorTipos}" name="fsc_${contadorTipos}" value="no" checked>NO
          </label>
          <label>
            <input type="radio" id="fscR${contadorTipos}" name="fsc_${contadorTipos}" value="fsc_r">FSC R
          </label>
          <label>
            <input type="radio" id="fscTm${contadorTipos}" name="fsc_${contadorTipos}" value="fsc_tm">FSC TM
          </label>
        </div>
      <div class="input-corto">
        <label for="llevaQr">Código QR:
          <input type="checkbox" id="llevaQr${contadorTipos}" name="lleva_qr_${contadorTipos}">
        </label>
      </div>
      <div class="input-medio">
        <label>Observaciones impresión:
          <input type="text" id="obsImp${contadorTipos}" name="observaciones_impresion_${contadorTipos}">
        </label>
      </div>
      <br>
    </div>

  `;

  // Añadir el bloque al contenedor
  container.appendChild(bloque);

  // Incrementar el contador para el siguiente tipo
  contadorTipos++;
}

// Función para eliminar bloques
function eliminarBloques() {
  const container = document.getElementById('tiposGenerados');
  document.getElementById("numTiposDec").scrollIntoView({ behavior: 'smooth', block: 'end' });

  // Verificar si hay bloques en el contenedor
  if (container.children.length > 1) {
    // Eliminar el último bloque
    container.removeChild(container.lastElementChild);

    // Decrementar el contador de tipos
    if (contadorTipos > 1) {
      contadorTipos--;
    }
    if(contadorTipos === 3 || contadorTipos === 2){
      document.getElementById("numTiposDec").style.display = 'none'; // Ocultar el botón de decremento

    }
  }
}

/////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  const contenedorTiposGenerados = document.getElementById('tiposGenerados');
  const radioDisenyoEstructuralMultipieza = document.getElementById('diseñoEstructuralMultiPieza');

  /// OK   ///
  // Función que vacía el contenedor #tiposGenerados si "Diseño estructural Multipieza" no está seleccionado
  function verificarYVaciarContenedor() {
    // Si "Diseño estructural Multipieza FEFCO" NO está seleccionado, vaciar el contenedor
    if (!radioDisenyoEstructuralMultipieza.checked) {
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

/// MOSTRAR TINTAS


function mostrarTintasMultipieza(tipoIndex = '') {
  // Construir los IDs dinámicamente según si hay un índice o no
  const prefijo = tipoIndex ? `${tipoIndex}` : '';
  // Ocultar todos los listados de tintas
  document.getElementById(`tintasOffset${prefijo}`).style.display = 'none';
  document.getElementById(`tintasDigital${prefijo}`).style.display = 'none';
  document.getElementById(`tintasFlexo${prefijo}`).style.display = 'none';
  document.getElementById(`contenedorBarnizHD${prefijo}`).style.display = 'none';
  document.getElementById(`fscQr${prefijo}`).style.display = 'none';
  document.getElementById(`fscNo${prefijo}`).checked = false;

  // Obtener el radio button seleccionado
  const seleccionado = document.querySelector(`input.tipoImpresionM${prefijo}:checked`);


  // Restablecer el valor del select a "Seleccionar" (opción por defecto)

  // Mostrar el listado correspondiente de tintas según el tipo de impresión
  if (seleccionado) {
    const valorSeleccionado = seleccionado.value.toLowerCase();

    // Mostrar el listado de tintas correspondiente al valor seleccionado
    // Mostrar el listado de tintas correspondiente al valor seleccionado
    if (valorSeleccionado === 'offset') {
      document.getElementById(`tintasOffset${prefijo}`).style.display = 'block';
      document.getElementById(`fscQr${prefijo}`).style.display = 'block';
      document.getElementById(`fscNo${prefijo}`).checked = true;
    } else if (valorSeleccionado === 'digital') {
      document.getElementById(`tintasDigital${prefijo}`).style.display = 'block';
      document.getElementById(`fscQr${prefijo}`).style.display = 'block';
      document.getElementById(`fscNo${prefijo}`).checked = true;
    } else if (['flexo', 'flexo mejorado', 'flexo hd'].includes(valorSeleccionado)) {
      document.getElementById(`tintasFlexo${prefijo}`).style.display = 'block';
      document.getElementById(`fscQr${prefijo}`).style.display = 'block';
      document.getElementById(`fscNo${prefijo}`).checked = true;
      if (valorSeleccionado === 'flexo hd') {document.getElementById(`contenedorBarnizHD${prefijo}`).style.display = 'block';
      }
    }

  }
  }
// Llamar a la función en el onchange de los radios correspondientes
function actualizarTintasMultipieza(tipoIndex) {
  mostrarTintasMultipieza(tipoIndex);
}

//FIN TINTAS

function validarCheckboxesMuestras() {
  const checkboxes = [
    document.getElementById("checkDiseñoEstructural"),
    document.getElementById("checkBoceto"),
    document.getElementById("checkPlotter"),
    document.getElementById("checkForrada")
  ];
  const tablasCheckboxes = document.querySelectorAll(".controlPeticion"); // Seleccionar todas las tablas con la clase "controlPeticion"
  const primerCheckbox = checkboxes[0]; // Obtener el primer checkbox

  let algunoMarcado = false;

  // Verificar si al menos uno está marcado
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      algunoMarcado = true;
      document.getElementById("recogerMuestra").disabled=false;
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
    primerCheckbox.focus(); // Llevar el foco al primer checkbox
    primerCheckbox.scrollIntoView({ behavior: "smooth", block: "center" }); // Desplazarse al primer checkbox
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
  let primerCampoConError = null; // Variable para almacenar el primer campo con error

  // Validar campos requeridos
  camposRequeridos.forEach(function (campo) {
    const estilo = window.getComputedStyle(campo);
    const esVisible = (estilo.display !== 'none') && (estilo.visibility !== 'hidden') && (campo.offsetParent !== null);

    if (esVisible) {
      if (campo.value.trim() === "") {
        valido = false;
        campo.classList.add("error"); // Agrega clase de error si el campo está vacío

        if (!mensajeMostrado) {
          alert("Por favor, completa todos los campos requeridos.");
          mensajeMostrado = true; // Marcar que el mensaje ya fue mostrado
        }

        if (primerCampoConError === null) {
          primerCampoConError = campo;
        }
      } else {
        campo.classList.remove("error"); // Remueve la clase de error si está completado
      }
    }
  });

  // Si hay un campo con error, mover el foco
  if (primerCampoConError !== null) {
    primerCampoConError.scrollIntoView({ behavior: "smooth", block: "center" });
    primerCampoConError.focus();
    return false;
  }

  // Validar divs sin prefijo
  const divsTintas = [
    document.getElementById("tintasOffset"),
    document.getElementById("tintasDigital"),
    document.getElementById("tintasFlexo"),
  ];

  let divValido = true; // Suponemos que todos los divs cumplen
  divsTintas.forEach(div => {
    if (div && div.style.display !== "none") {
      const inputs = div.querySelectorAll("input");
      const tieneSeleccionado = Array.from(inputs).some(input =>
        (input.type === "checkbox" && input.checked) ||
        (input.type === "text" && input.value.trim() !== "")
      );

      if (!tieneSeleccionado) {
        divValido = false;
        if (!mensajeMostrado) {
          alert(`Por favor selecciona o completa al menos un campo en ${div.querySelector("h4").innerText}`);
          div.scrollIntoView({ behavior: "smooth", block: "center" });
          div.focus(); // Mover el foco al div de tinta
          div.classList.add("error"); // Agrega clase de error si el div no tiene selección
          mensajeMostrado = true;
        }
      } else {
        div.classList.remove("error"); // Si tiene selección, remueve el error
      }
    }
  });

  if (!divValido) {
    return false; // Evitar envío si no pasa la validación
  }

  // Obtener todos los prefijos dinámicamente basados en los divs con prefijo
  const divsConPrefijo = document.querySelectorAll("[id^='tintasOffset'], [id^='tintasDigital'], [id^='tintasFlexo']");

  divsConPrefijo.forEach(div => {
    // Solo procesamos los divs visibles
    if (div && div.style.display !== "none") {
      const prefijo = div.id.replace(/^tintas(Offset|Digital|Flexo)/, ""); // Extraemos el prefijo del ID
      const inputs = div.querySelectorAll("input");

      const tieneSeleccionado = Array.from(inputs).some(input =>
        (input.type === "checkbox" && input.checked) ||
        (input.type === "text" && input.value.trim() !== "")
      );

      if (!tieneSeleccionado) {
        divValido = false;
        if (!mensajeMostrado) {
          alert(`Por favor selecciona o completa al menos un campo en ${div.querySelector("h4").innerText}`);
          div.scrollIntoView({ behavior: "smooth", block: "center" });
          div.focus(); // Mover el foco al div de tinta
          div.classList.add("error"); // Agrega clase de error si el div no tiene selección
          mensajeMostrado = true;
        }
      } else {
        div.classList.remove("error"); // Si tiene selección, remueve el error
      }
    }
  });

  if (!divValido) {
    return false; // Evitar envío si no pasa la validación
  }

  // Llamamos a la función que valida los checkboxes
  if (!validarCheckboxesMuestras()) {
    return false; // Si no se seleccionó ningún checkbox, no permitir el envío
  }

  return valido;
}
// validar formulario

// Prevenir el envío del formulario y mover el foco al siguiente campo al presionar Enter
document.getElementById("petcicionComercial").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // Si el campo activo es un textarea, permitir la nueva línea y no mover el foco
    if (document.activeElement.tagName === "TEXTAREA") {
      return; // No hacemos nada, dejamos que Enter funcione normalmente
    }

    // Prevenir la acción predeterminada del Enter (como enviar el formulario)
    event.preventDefault();

    // Encontrar todos los campos del formulario
    const campos = Array.from(document.querySelectorAll("#petcicionComercial input, #petcicionComercial select, #petcicionComercial textarea"));

    // Filtrar los campos visibles
    const camposVisibles = campos.filter(campo => {
      const estilo = window.getComputedStyle(campo);
      return (estilo.display !== 'none') && (estilo.visibility !== 'hidden') && (campo.offsetParent !== null);
    });

    // Encontrar el índice del campo actualmente con foco
    const indiceActual = camposVisibles.indexOf(document.activeElement);

    // Mover el foco al siguiente campo, si hay uno
    if (indiceActual !== -1 && indiceActual < camposVisibles.length - 1) {
      camposVisibles[indiceActual + 1].focus();
    }
  }
});

// Función para eliminar las clases "error" o "reenvio" cuando el usuario empieza a escribir
function actualizarEstadoCampo(campo) {
  if (campo.value.trim() !== "") {
    campo.classList.remove("error", "reenvio"); // Elimina ambas clases si el campo tiene texto
  }else{
    campo.classList.add("error");
  }
}

// Añadir el evento "input" a todos los campos requeridos
const campos = document.querySelectorAll("[required]"); // Seleccionamos todos los campos requeridos
campos.forEach(function (campo) {
  campo.addEventListener("input", function() {
    actualizarEstadoCampo(campo); // Llamamos a la función cuando el usuario escribe
  });
});

// Función para agregar los eventos de los campos nuevos (dinámicos)
function agregarEventosCampos() {
  const campos = document.querySelectorAll("[required]"); // Seleccionamos todos los campos requeridos
  campos.forEach(function (campo) {
    // Nos aseguramos de que el evento no se agregue varias veces
    if (!campo.hasAttribute('data-evento-agregado')) {
      // Evento para detectar la entrada de datos
      campo.addEventListener("input", function() {
        actualizarEstadoCampo(campo); // Llamamos a la función cuando el usuario escribe
      });
      // Marcamos el campo como que ya tiene evento agregado
      campo.setAttribute('data-evento-agregado', 'true');
    }
  });
}

const fechaHora = document.getElementById("fechaHora");
// Prevenir foco y edición
fechaHora.addEventListener("focus", (event) => {
  event.preventDefault(); // Evita que el campo sea enfocado
  fechaHora.blur(); // Elimina cualquier foco activo
});
// Prevenir navegación con tabulación
fechaHora.setAttribute("tabindex", "-1"); // Elimina del orden de tabulación



// Función para generar el PDF con el orden del formulario y los encabezados hasta h5
function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const nombre = document.getElementById('nombre').value;
  const email = ""; // Correo predeterminado
  const referencia = document.getElementById('referencia').value;
  const nombreComercial = document.getElementById('nombreComercial').value;
  const fechaHora = document.getElementById('fechaHora').value;

  let yPosition = 10;

  // Función para agregar texto con control de salto de página y formato
  function agregarTexto(texto, estilo = 'normal', color = [0, 0, 0], fontSize = 12) {
    doc.setTextColor(color[0], color[1], color[2]);
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", estilo);
    doc.text(texto, 10, yPosition);
    yPosition += fontSize * 1.1; // Reducir el espacio entre líneas (ajustado a un 20% más pequeño)
    if (yPosition >= 280) {
      doc.addPage();
      yPosition = 10;
    }
  }

  // Función para verificar si un campo está visible
  function esVisible(campo) {
    const estilo = window.getComputedStyle(campo);
    return (estilo.display !== 'none') && (estilo.visibility !== 'hidden') && (campo.offsetParent !== null);
  }

  // Obtener valores de los checkboxes seleccionados
  function obtenerCheckboxSeleccionados() {
    const checkboxes = document.querySelectorAll('input[name="documento"]:checked');
    let valores = [];
    checkboxes.forEach(checkbox => {
      valores.push(checkbox.value); // Obtener el valor de cada checkbox seleccionado
    });
    return valores.join(' '); // Retornar los valores separados por espacio
  }

  // Agregar el salto de línea por palabra en el texto de los documentos seleccionados
  function agregarSaltoDeLineaPorPalabra(texto) {
    const palabras = texto.split(' '); // Dividir el texto en palabras
    palabras.forEach(palabra => {
      agregarTexto(palabra, 'normal', [0, 0, 0], 12); // Agregar cada palabra en una nueva línea
    });
  }

  // Agregar título principal
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text('Formulario de Solicitud - Detalles', 10, yPosition);
  yPosition += 10;



  // Recorremos el formulario en el orden de los elementos
  const formulario = document.getElementById('petcicionComercial');
  const campos = formulario.querySelectorAll('input, select, textarea, h1, h2, h3, h4, h5'); // Incluir encabezados hasta h5

  campos.forEach(campo => {
    // Verificar si el campo es visible
    if (esVisible(campo)) {
      if (campo.tagName.toLowerCase() === 'h1' || campo.tagName.toLowerCase() === 'h2' || campo.tagName.toLowerCase() === 'h3' || campo.tagName.toLowerCase() === 'h4' || campo.tagName.toLowerCase() === 'h5') {
        // Agregar encabezados con formato
        agregarTexto(campo.innerText, 'bold', [0, 0, 0], 14); // Títulos en negrita y mayor tamaño
        if(campo.textContent.includes('Información adicional:')){
          // Imprimir los valores de los checkboxes seleccionados con salto de línea por palabra
          const documentosSeleccionados = obtenerCheckboxSeleccionados();
          if (documentosSeleccionados) {
            // Primer paso: agregar el título "Tipo de documentación aportada"
            agregarTexto('Tipo de documentación aportada:', 'bold', [0, 0, 0], 12);
            // Segundo paso: agregar cada palabra seleccionada en un salto de línea
            agregarSaltoDeLineaPorPalabra(documentosSeleccionados);
          }
        }
      } else if (campo.type === 'checkbox' && campo.checked) {
        // Solo agregar los checkboxes seleccionados
        agregarTexto(`${campo.name} : Sí`, 'normal', [0, 0, 255]); // Azul para seleccionados
      } else if (campo.type === 'radio') {
        // Mostrar solo el radio seleccionado y cambiar color dependiendo de si es "Sí", "No" o cualquier otro valor
        if (campo.checked) {
          const valorRadio = campo.value.toLowerCase(); // Asegurar que el valor esté en minúsculas
          const colorRadio = valorRadio === 'si' ? [0, 128, 0] :
            valorRadio === 'no' ? [255, 0, 0] :
              [255, 165, 0]; // Naranja si no es "Sí" ni "No"
          agregarTexto(`${campo.name} : ${campo.value}`, 'normal', colorRadio);
        }
      } else if (campo.type !== 'checkbox' && campo.type !== 'radio' && campo.value.trim() !== '') {
        // Agregar los demás campos con su valor, sin mostrar el ID ni valores vacíos
        agregarTexto(`${campo.name || campo.id}: ${campo.value}`, 'normal', [0, 0, 0]);
      }
    }
  });

  // Formato para el nombre del archivo
  const fechaFormateada = fechaHora.replace("T", "_").replace(":", "-").replace(":", "-");
  const nombreArchivo = `peticion_${fechaFormateada}.pdf`;

  // Guardar el archivo PDF
  doc.save(nombreArchivo);

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

    // Limpiar los campos específicos y aplicar estilos
    const camposAlimpiar = [
      "referencia",
      "indicacionesCliente",
      "cantidadLote",
      "consumoAnual",
      "numeroFicha"
    ];

    let primerCampoVacio = null;

    camposAlimpiar.forEach(function (campoId) {
      const campo = document.getElementById(campoId);

      // Limpiar el campo
      campo.value = "";

      // Añadir clases para modificar el estilo del campo (resaltar en verde)
      campo.classList.add("reenvio");

      // Guardamos el primer campo vacío para poner el foco en él después
      if (!primerCampoVacio && campo.value.trim() === "") {
        primerCampoVacio = campo;
      }
    });

    // Si hay un campo vacío, mover el foco hacia él
    if (primerCampoVacio) {
      primerCampoVacio.focus();
      primerCampoVacio.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Mostrar mensaje de éxito
    //alert("Formulario enviado y campos específicos limpiados.\nReferencia\nIndicaciones del cliente\nCantidad de lote\nConsumo anual\nNúmero de ficha");
  } else {
    console.log("Formulario no válido. No se generará el PDF ni se enviará el correo.");
  }
});


// Obtener todos los checkboxes
const checkboxes = document.querySelectorAll('.checkbox-list-especiales input[type="checkbox"]');

// Crear un array de los valores de los checkboxes seleccionados
const valoresSeleccionados = [];
checkboxes.forEach((checkbox) => {
  if (checkbox.checked) {
    valoresSeleccionados.push(checkbox.value);
  }
});



