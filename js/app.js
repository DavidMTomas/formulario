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
  // Obtiene el valor seleccionado
  const styleSelector = document.getElementById('styleSelector');
  const themeStylesheet = document.getElementById('themeStylesheet');
  // Cambia el atributo href del archivo de estilos
  themeStylesheet.href = styleSelector.value;
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
    //document.getElementById("acabadosEstructural").style.display="block"
  } else {
    // Si selecciona "Sí" en "¿Existe el troquel?", reactiva la opción "Sí" en "Anula FF anterior?"
    radioSiAnulaFicha.disabled = false;
    radioSiAnulaFicha.style.visibility='visible'; // Ocultar "Sí"
    document.getElementById("noAnulaFichaSi").style.visibility = 'visible'; // Mostrar "No"
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

// Función para verificar el valor del input y las opciones seleccionadas
function checkValue() {
  const input = document.getElementById("etiquetasPaletizado");
  const textoExtra = document.getElementById("textoExtra");
  const selectedRadio = document.querySelector('input[name="CajaMuestraPorEtiqueta"]:checked').value;

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
    if (!validarCheckboxesMuestras()) {
      alert("Debe seleccionar al menos una muestra para poder añadir una dirección de envío");
      return;
    }

    document.getElementById("eliminarDireccion").style.display = "block";
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
    <label>Maquetas a enviar:
         <div class="input-corto custom-spinner" >
          <button type="button" class="controlBtn" onclick="decrement('maquetass${seccionEnvios.children.length}')">-</button>
              <input type="number" class="numerosNoPermitidos" name="maquetass[]" id="maquetass${seccionEnvios.children.length}" min="0" max="${totalesDisponibles.maquetas}" value="${totalesDisponibles.maquetas}" readonly>
        <button type="button" class="controlBtn" onclick="increment('maquetass${seccionEnvios.children.length}')">+</button>
        </div>
    </label>

    <label>Bocetos a enviar:
          <div class="input-corto custom-spinner" >
           <button type="button" class="controlBtn" onclick="decrement('bocetos${seccionEnvios.children.length}')">-</button>
              <input type="number" class="numerosNoPermitidos" name="bocetos[]" id="bocetos${seccionEnvios.children.length}" min="0" max="${totalesDisponibles.bocetos}" value="${totalesDisponibles.bocetos}" readonly>
         <button type="button" class="controlBtn" onclick="increment('bocetos${seccionEnvios.children.length}')">+</button>
        </div>
    </label>

    <label>Plotters a enviar:
        <div class="input-corto custom-spinner" >
            <button type="button" class="controlBtn" onclick="decrement('plotters${seccionEnvios.children.length}')">-</button>
             <input type="number" class="numerosNoPermitidos" name="plotters[]" id="plotters${seccionEnvios.children.length}" min="0" max="${totalesDisponibles.plotters}" value="${totalesDisponibles.plotters}" readonly>
            <button type="button" class="controlBtn" onclick="increment('plotters${seccionEnvios.children.length}')">+</button>
       </div>
    </label>

    <label>Muestras forradas a enviar:

         <div class="input-corto custom-spinner" >
         <button type="button" class="controlBtn" onclick="decrement('muestrasForradas${seccionEnvios.children.length}')">-</button>
          <input type="number" class="numerosNoPermitidos" name="muestrasForradas[]" id="muestrasForradas${seccionEnvios.children.length}" min="0" max="${totalesDisponibles.muestrasForradas}" value="${totalesDisponibles.muestrasForradas}" readonly>
        <button type="button" class="controlBtn" onclick="increment('muestrasForradas${seccionEnvios.children.length}')">+</button>
        </div>
    </label>

    <hr>
  `;

    seccionEnvios.appendChild(nuevaDireccion);

    // Después de agregar la nueva dirección, vincula los eventos de 'keydown' para evitar la escritura de números
    agregarEventosCampos();

    // Actualizar dinámicamente los totales cuando cambien los valores
    const inputs = nuevaDireccion.querySelectorAll('input[type="number"]');
    inputs.forEach(input => input.addEventListener("input", actualizarTotales));
  });


// Recoger muestras por comerciales
  document.getElementById("recogerMuestra").addEventListener("click", function (event) {
    const contenedor = document.getElementById("totalMuestrasArecoger");

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
          //if(document.getElementById("eliminarDireccion").style.display === "none"){
            desbloquearCheckboxesMuestras();
        //  }
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
            <input type="number" name="maquetass[]" min="0" max="${totalesDisponibles.maquetas}" value="${totalesDisponibles.maquetas}" readonly="true">
         </div>
    </label>


    <label>Bocetos a recoger:
       <div class="input-corto">
            <input type="number" name="bocetos[]" min="0" max="${totalesDisponibles.bocetos}" value="${totalesDisponibles.bocetos}" readonly="true">
        </div>
    </label>


    <label>Plotters a recoger:
        <div class="input-corto">
            <input type="number" name="plotters[]" min="0" max="${totalesDisponibles.plotters}" value="${totalesDisponibles.plotters}" readonly="true">
        </div>
    </label>


    <label>Muestras forradas a recoger:
       <div class="input-corto">
            <input type="number" name="muestrasForradas[]" min="0" max="${totalesDisponibles.muestrasForradas}" value="${totalesDisponibles.muestrasForradas}" readonly="true">
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
    const inputs = recoger.querySelectorAll('input[type="number"]');
    inputs.forEach(input => input.addEventListener("input", actualizarTotales));
  });


  function bloquearCheckboxesMuestras(){
    document.getElementById("checkDiseñoEstructural").disabled = true;
    document.getElementById("checkBoceto").disabled = true;
    document.getElementById("checkPlotter").disabled = true;
    document.getElementById("checkForrada").disabled = true;
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
    document.getElementById("checkForrada").disabled = false;
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
      actualizarTotales(); // Actualizar totales después de eliminar
    }
    if(seccionEnvios.children.length === 0){
      document.getElementById("eliminarDireccion").style.display = "none";
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
  if ((sinImpresionCartoncillo || sinImpresionContraencolado || sinImpresionOndulado) && contadorTipos === 1) {
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
const opcionesDisenyo = document.getElementsByName('tipoDiseño');
const numTiposContainer = document.getElementById('numTiposContainer');

// Función para mostrar u ocultar el contenedor de número de tipos
function toggleNumTipos() {
  // Comprobar si alguno de los radio buttons está seleccionado en "multipieza"
  let isMultipiezaSelected = false;

  // Recorrer los radio buttons
  opcionesDisenyo.forEach(radio => {
    if (radio.checked && radio.value === 'multiPieza') {
      isMultipiezaSelected = true;
    }
  });



  // Mostrar u ocultar el contenedor según si la opción "multipieza" está seleccionada
  if (isMultipiezaSelected) {
    numTiposContainer.style.display = 'block';
    const idPieza = document.getElementById('idPieza');
    idPieza.style.display = "block"
    generarBloques()
    document.getElementById('mostrarTablaImpresion').style.display = 'block'; // esta es La principal
    if(contadorTipos >=1 || contadorTipos <=3 ){
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
const radioButtons = document.getElementsByName('familiaProductos');
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
    const value = this.value.toLowerCase();

    document.getElementById('tintasOffset').style.display = (value === 'offset') ? 'block' : 'none';
    document.getElementById('tintasDigital').style.display = (value === 'digital') ? 'block' : 'none';
    document.getElementById('tintasFlexo').style.display = (value.includes('flexo')) ? 'block' : 'none';
  });
});

//fin mostrar tintas


// MOSTRAR SELECT CANAL EN FUNCION DEL TIPO DE PAPEL
// Función para manejar la actualización del canal
function actualizarCanal() {
  // Obtener el valor del radio button seleccionado
  const tipoPapel = document.querySelector('.divTipoPapel input[name="familiaProductos"]:checked').value;

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
    selectCanal.value = "L"; // Seleccionar automáticamente "L"
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
const radios = document.querySelectorAll('.divTipoPapel input[name="familiaProductos"]');
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

  // Obtener el radio button seleccionado
  const seleccionado = document.querySelector(`input[name="familiaProductos${prefijo}"]:checked`);

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
      document.getElementById(`mostrarcalidadcartoncillo${prefijo}`).style.display = 'none';
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
  alert("Mensaje")
});

/////////////////////////////////////////////////////
// Función para generar los bloques dinámicamente según el número de tipos seleccionado
/////////////////////////////////////////////////////
// Función para generar bloques dinámicamente
function generarBloques() {
  const container = document.getElementById('tiposGenerados');

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
    bloque.style.backgroundColor = '#cedce7'; // Azul claro
      //'#f0f0f0'; // Color más oscuro (gris claro)
  } else {
    bloque.style.backgroundColor = '#ffffff'; // Color blanco por defecto
  }

  // El tipo será el valor del contador actual
  bloque.innerHTML = `

   <div id="tipos">
         <hr>

    <!-- Radio buttons para seleccionar la familia de productos -->
     <div class="input-medio">
        <label for="idPieza${contadorTipos}">
        <input type="text" id="idPieza${contadorTipos}" name="familiaProductos${contadorTipos}" placeholder="Identificador de la pieza ${contadorTipos}" required>
        </label>
    </div>
        <h4>Tipo papel ${contadorTipos}</h4>
     <div class="form-group">
        <label for="cartoncillo${contadorTipos}">
        <input type="radio" id="cartoncillo${contadorTipos}" name="familiaProductos${contadorTipos}" value="Cartoncillo" onchange="mostrarListaTiposImpresionMultipieza(${contadorTipos})"> Cartoncillo
        </label>

    <label for="contraencolado${contadorTipos}">
      <input type="radio" id="contraencolado${contadorTipos}" name="familiaProductos${contadorTipos}" value="Contraencolado" onchange="mostrarListaTiposImpresionMultipieza(${contadorTipos})"> Contraencolado
    </label>

    <label for="ondulado${contadorTipos}">
      <input type="radio" id="ondulado${contadorTipos}" name="familiaProductos${contadorTipos}" value="Ondulado" checked onchange="mostrarListaTiposImpresionMultipieza(${contadorTipos})"> Ondulado
    </label>


     <div class="input-corto">
        <label for="calidad${contadorTipos}">Calidad</label>
        <input class="campotextomuycorto" type="text" id="calidad${contadorTipos}" name="calidad${contadorTipos}" placeholder="Calidad" required/>
     </div>

    <div class="input-intermedio">
        <label for="canal${contadorTipos}">Canal</label>
        <select id="canal${contadorTipos}" name="canal" required>


          <!-- Opciones para Ondulado -->
          <optgroup id="mostrarCanalOndulado${contadorTipos}" style="display:block;">
          <option value="">Seleccionar</option>
          <option value="G Nanomicro" class="canalOndulado${contadorTipos}">G Nanomicro</option>
          <option value="F Minimicro" class="canalOndulado${contadorTipos}">F Minimicro 1,1mm</option>
          <option value="F Micro" class="canalOndulado${contadorTipos}">E Micro 1,5-1,7mm</option>
          <option value="D CanalD" class="canalOndulado${contadorTipos}">D Canal-D 2,5mm</option>
          <option value="B Canal3" class="canalOndulado${contadorTipos}">B Canal-3 3mm</option>
          <option value="C Canal5" class="canalOndulado${contadorTipos}">C Canal-5 4mm</option>
          <option value="ED MicroD" class="canalOndulado${contadorTipos}">ED Micro-D 4mm</option>
          <option value="EC Micro5" class="canalOndulado${contadorTipos}">EC Micro-5 6mm</option>
          <option value="BC Canal3-5" class="canalOndulado${contadorTipos}">BC Canal 3-5 7mm</option>
          </optgroup>


          <!-- Opciones para Contraencolado -->
          <optgroup id="mostrarCanalContraencolado${contadorTipos}" style="display:none;">
          <option value="">Seleccionar</option>
          <option value="L+B" class="canalContraencolado${contadorTipos}">L+B</option>
          <option value="L+BC" class="canalContraencolado${contadorTipos}">L+BC</option>
          <option value="L+C" class="canalContraencolado${contadorTipos}">L+C</option>
          <option value="L+D" class="canalContraencolado${contadorTipos}">L+D</option>
          <option value="L+E" class="canalContraencolado${contadorTipos}">L+E</option>
          <option value="L+EC" class="canalContraencolado${contadorTipos}">L+EC</option>
          <option value="L+ED" class="canalContraencolado${contadorTipos}">L+ED</option>
          <option value="L+F" class="canalContraencolado${contadorTipos}">L+F</option>
          </optgroup>

          <!-- Opciones para Cartoncillo -->
          <optgroup id="mostrarCanalCartoncillo${contadorTipos}" style="display:none;">
          <option value="L" class="canalCartoncillo${contadorTipos}" >L</option>
          </optgroup>
        </select>

        </div>


        <div class="input-corto">
            <div id="mostrarcalidadcartoncillo${contadorTipos}" style="display:none;">
              <label for="cllo${contadorTipos}">Cllo</label>
              <input class="campotextomuycorto" type="text" id="cllo${contadorTipos}" name="cllo${contadorTipos}" placeholder="Cllo" required/>
              </div>
        </div>
    </div>


    <!-- Tipos de Impresion segun papel elegido-->


    <!-- Cartoncillo -->
    <div id="cartoncilloListado${contadorTipos}" style="display:none;">
      <h4>Tipos de impresión para Cartoncillo</h4>
      <label for="sinImpresionCartoncillo${contadorTipos}">
        <input class="trabajoImpresion tipoImpresionM${contadorTipos}" type="radio" id="sinImpresionCartoncillo${contadorTipos}" name="tipoImpresionM${contadorTipos}" value="sinImpresion"  onchange="actualizarTintasMultipieza(${contadorTipos})"> Sin impresión
      </label>
      <label for="offsetCartoncillo${contadorTipos}">
        <input type="radio" class="tipoImpresionM${contadorTipos}" id="offsetCartoncillo${contadorTipos}" name="tipoImpresionM${contadorTipos}" value="offset" onchange="actualizarTintasMultipieza(${contadorTipos})"> Offset
      </label>
    </div>

    <!-- Contraencolado -->
    <div id="contraencoladoListado${contadorTipos}" style="display:none;">
      <h4>Tipos de impresión para Contraencolado</h4>
      <label  for="sinImpresionContraencolado${contadorTipos}">
        <input class="trabajoImpresion tipoImpresionM${contadorTipos}" type="radio" id="sinImpresionContraencolado${contadorTipos}" name="tipoImpresionM${contadorTipos}" value="sinImpresion"  onchange="actualizarTintasMultipieza(${contadorTipos})"> Sin impresión
      </label>
      <label for="offsetContraencolado${contadorTipos}">
        <input type="radio" class="tipoImpresionM${contadorTipos}" id="offsetContraencolado${contadorTipos}" name="tipoImpresionM${contadorTipos}" value="offset" onchange="actualizarTintasMultipieza(${contadorTipos})"> Offset
      </label>
    </div>

    <!-- Ondulado -->

        <div class="onduladoListado"
      <div id="onduladoListado${contadorTipos}" style="display:block;">
        <h4>Tipos de impresión para Ondulado</h4>
        <label for="sinImpresionOndulado${contadorTipos}">
          <input class="trabajoImpresion tipoImpresionM${contadorTipos}" type="radio" id="sinImpresionOndulado${contadorTipos}"name="tipoImpresionM${contadorTipos}" value="sinImpresion" checked onchange="actualizarTintasMultipieza(${contadorTipos})">Sin impresión
        </label>
        <label for="offsetOndulado${contadorTipos}">
          <input type="radio" class="tipoImpresionM${contadorTipos}" id="offsetOndulado${contadorTipos}" name="tipoImpresionM${contadorTipos}" value="offset" onchange="actualizarTintasMultipieza(${contadorTipos})">Offset
        </label>
        <label for="digitalOndulado${contadorTipos}">
          <input type="radio" class="tipoImpresionM${contadorTipos}" id="digitalOndulado${contadorTipos}" name="tipoImpresionM${contadorTipos}" value="digital" onchange="actualizarTintasMultipieza(${contadorTipos})">Digital
        </label>
        <label for="flexoOndulado${contadorTipos}">
          <input type="radio" class="tipoImpresionM${contadorTipos}" id="flexoOndulado${contadorTipos}" name="tipoImpresionM${contadorTipos}" value="flexo" onchange="actualizarTintasMultipieza(${contadorTipos})">Flexo
        </label>
        <label for="flexoMejoradoOndulado${contadorTipos}">
          <input type="radio" class="tipoImpresionM${contadorTipos}" id="flexoMejoradoOndulado${contadorTipos}" name="tipoImpresionM${contadorTipos}" value="flexo mejorado" onchange="actualizarTintasMultipieza(${contadorTipos})">Flexo mejorado
        </label>
        <label for="flexoHDOndulado${contadorTipos}">
          <input type="radio" class="tipoImpresionM${contadorTipos}" id="flexoHDOndulado${contadorTipos}" name="tipoImpresionM${contadorTipos}" value="flexo hd" onchange="actualizarTintasMultipieza(${contadorTipos})">Flexo HD
        </label>
      </div>
      </div>



     <div id="tintasOffset${contadorTipos}" style="display:none;">
      <h4>Tintas para Offset</h4>
      <div class="form-group">
        <label >
          <input type="checkbox" id="tintaCoffset${contadorTipos}" name="cian" value="cian"> Cian (C)
        </label>
        <label>
          <input type="checkbox" id="tintaMoffset${contadorTipos}" name="magenta" value="magenta"> Magenta (M)
        </label>
        <label >
          <input type="checkbox" id="tintaYoffset${contadorTipos}" name="amarillo" value="amarillo"> Amarillo (Y)
        </label>
        <label>
          <input type="checkbox" id="tintaKoffset${contadorTipos}" name="negro" value="negro"> Negro (K)
        </label>
        <div class="input-corto">
          <label > Tinta 5
          <input type="text" name="tinta5Offset" id="tinta5Offset${contadorTipos}" >
          </label>
        </div>
        <div class="input-corto">
          <label > Tinta 6
          <input type="text" name="tinta6Offset" id="tinta6Offset${contadorTipos}" >
          </label>
        </div>
        <div class="input-corto">
          <label >Tinta 7
          <input type="text" name="tinta7Offset" id="tinta7Offset${contadorTipos}">
          </label>
        </div>
      </div>
    </div>


    <div id="tintasDigital${contadorTipos}" style="display:none;">
      <h4>Tintas para digital</h4>
      <div class="form-group">
        <label >
          <input type="checkbox" id="tintaCdigital${contadorTipos}" name="cian" value="cian"> Cian (C)
        </label>
        <label >
          <input type="checkbox" id="tintaMdigital${contadorTipos}" name="magenta" value="magenta"> Magenta (M)
        </label>
        <label>
          <input type="checkbox" id="tintaYdigital${contadorTipos}" name="amarillo" value="amarillo"> Amarillo (Y)
        </label>
        <label>
          <input type="checkbox" id="tintaKdigital${contadorTipos}" name="negro" value="negro"> Negro (K)
        </label>
        <label>
          <input type="checkbox" id="tintaOdigital${contadorTipos}" name="naranja" value="violeta"> Orange (O)
        </label>
        <label>
          <input type="checkbox" id="tintaVdigital${contadorTipos}" name="violeta" value="violeta"> Violeta (V)
        </label>
      </div>
    </div>


    <div id="tintasFlexo${contadorTipos}" style="display:none;">
      <h4>Tintas para flexo</h4>
      <div class="form-group">
        <div class="input-corto">
          <label > Tinta 1
          <input type="text" name="tinta1Flexo" id="tinta1Flexo${contadorTipos}" >
          </label>
        </div>
        <div class="input-corto">
          <label > Tinta 2
            <input type="text" name="tinta2Flexo" id="tinta2Flexo${contadorTipos}" >
          </label>
        </div>
        <div class="input-corto">
          <label > Tinta 3
            <input type="text" name="tinta3Flexo" id="tinta3Flexo${contadorTipos}" >
          </label>
        </div>
        <div class="input-corto">
          <label > Tinta 4
            <input type="text" name="tinta4Flexo" id="tinta4Flexo${contadorTipos}" >
          </label>
        </div>
        <div class="input-corto">
          <label > Tinta 5
            <input type="text" name="tinta5Flexo" id="tinta5Flexo${contadorTipos}" >
          </label>
        </div>
        <div class="input-corto">
          <label > Tinta 6
            <input type="text" name="tinta6Flexo" id="tinta6Flexo${contadorTipos}" >
          </label>
        </div>
      </div>
    </div>
       <br>

  `;

  // Añadir el bloque al contenedor
  container.appendChild(bloque);

  // Incrementar el contador para el siguiente tipo
  contadorTipos++;
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

  // Obtener el radio button seleccionado
  const seleccionado = document.querySelector(`input[name="tipoImpresionM${prefijo}"]:checked`);

  // Restablecer el valor del select a "Seleccionar" (opción por defecto)
  const selectCanal = document.getElementById(`canal${tipoIndex}`);
  selectCanal.value = '';  // Restablecer a la opción "Seleccionar"

  // Mostrar el listado correspondiente de tintas según el tipo de impresión
  if (seleccionado) {
    const valorSeleccionado = seleccionado.value.toLowerCase();

    // Mostrar el listado de tintas correspondiente al valor seleccionado
    // Mostrar el listado de tintas correspondiente al valor seleccionado
    if (valorSeleccionado === 'offset') {
      document.getElementById(`tintasOffset${prefijo}`).style.display = 'block';
    } else if (valorSeleccionado === 'digital') {
      document.getElementById(`tintasDigital${prefijo}`).style.display = 'block';
    } else if (['flexo', 'flexo mejorado', 'flexo hd'].includes(valorSeleccionado)) {
      document.getElementById(`tintasFlexo${prefijo}`).style.display = 'block';
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

    /*
    document.getElementById("eliminarDireccion").style.display = "none";
    document.getElementById("seccionEnvios").innerHTML = "";
    //document.getElementById("seccionEnvios").style.display = "none";

    // desmarcar checkbox recoger muestra
    document.getElementById("recogerMuestra").checked=false;
    document.getElementById("totalMuestrasArecoger").style.display = "none";
    */

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
        // Guardamos el primer campo con error
        if (primerCampoConError === null) {
          primerCampoConError = campo;
        }

      } else {
        campo.classList.remove("error"); // Remueve la clase de error si está completado
      }
    }
  });

  // Si hay un campo con error, movemos el foco al primer campo con error
  if (primerCampoConError !== null) {
    primerCampoConError.scrollIntoView({ behavior: "smooth", block: "center" });
    primerCampoConError.focus();
    return false; // Evitar que el formulario se envíe
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
    event.preventDefault(); // Prevenir la acción predeterminada del Enter (enviar formulario)

    // Encontrar el campo activo (con el foco)
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
      } else if (campo.type === 'checkbox' && campo.checked) {
        // Solo agregar los checkboxes seleccionados
        agregarTexto(`${campo.name} : Sí`, 'normal', [0, 0, 255]); // Azul para seleccionados
      } else if (campo.type === 'radio') {
        // Mostrar solo el radio seleccionado y cambiar color dependiendo de si es "Sí", "No" o cualquier otro valor
        if (campo.checked) {
          const valorRadio = campo.value.toLowerCase(); // Asegurar que el valor esté en minúsculas
          const colorRadio = valorRadio === 'sí' ? [0, 128, 0] :
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
    alert("Formulario enviado y campos específicos limpiados.\nReferencia\nIndicaciones del cliente\nCantidad de lote\nConsumo anual\nNúmero de ficha");
  } else {
    console.log("Formulario no válido. No se generará el PDF ni se enviará el correo.");
  }
});


