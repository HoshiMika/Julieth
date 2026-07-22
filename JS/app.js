/*=====================================================
                    APP.JS
        APARTA SHOWER - JULIETH
======================================================*/

/*=====================================================
                VARIABLES GLOBALES
======================================================*/

let regalos = [...gifts];

window.regaloSeleccionado = null;

let reservas = [];

let cargando = false;

/*=====================================================
                ELEMENTOS DEL DOM
======================================================*/

const listaRegalos = document.getElementById("listaRegalos");

const formulario = document.getElementById("formReserva");

const inputNombre = document.getElementById("nombre");

const inputCorreo = document.getElementById("correo");

const inputTelefono = document.getElementById("telefono");

const inputBusqueda = document.getElementById("buscarRegalo");

const btnReservar = document.getElementById("btnReservar");

const contadorDisponibles = document.getElementById("contadorDisponibles");

const contadorReservados = document.getElementById("contadorReservados");

const contadorTotal = document.getElementById("contadorTotal");

const mensaje = document.getElementById("mensaje");

/*=====================================================
                INICIALIZACIÓN
======================================================*/

document.addEventListener("DOMContentLoaded", iniciarAplicacion);

/*=====================================================
                INICIAR APP
======================================================*/

async function iniciarAplicacion(){

    console.log("==================================");

    console.log("Aparta Shower iniciado");

    console.log("==================================");

    registrarEventos();

    renderizarRegalos();

    cargarEstadisticas();

    try{

        if(window.FirebaseDB){

            await FirebaseDB.iniciar();

            console.log("Firebase conectado.");

        }

    }
    catch(error){

        console.error("Error iniciando Firebase:", error);

    }

}
/*=====================================================
                EVENTOS
======================================================*/

function registrarEventos(){

    if(formulario){

        formulario.addEventListener(

            "submit",

            enviarFormulario

        );

    }

    if(inputBusqueda){

        inputBusqueda.addEventListener(

            "input",

            buscarRegalos

        );

    }

}

/*=====================================================
            ENVIAR FORMULARIO
======================================================*/

async function enviarFormulario(e){

    e.preventDefault();

    if(cargando){

        return;

    }

    const datos = obtenerDatosFormulario();

    if(!datos){

        return;

    }

    await crearReserva(datos);

}
/*=====================================================
            OBTENER DATOS
======================================================*/

function obtenerDatosFormulario(){

    if(!window.regaloSeleccionado){

        mostrarMensaje(

            "Seleccione un regalo.",

            "error"

        );

        return null;

    }

    return{

        nombre: inputNombre.value.trim(),

        correo: inputCorreo.value.trim(),

        telefono: inputTelefono.value.trim(),

        regalo: window.regaloSeleccionado.id

    };

}
/*=====================================================
                RENDERIZAR REGALOS
======================================================*/

function renderizarRegalos(lista = regalos){

    if(!listaRegalos){

        return;

    }

    listaRegalos.innerHTML = "";

    if(lista.length === 0){

        listaRegalos.innerHTML = `

            <div class="sin-resultados">

                <h3>No se encontraron regalos.</h3>

            </div>

        `;

        return;

    }

    lista.forEach(regalo=>{

        listaRegalos.appendChild(

            crearTarjetaRegalo(regalo)

        );

    });

}
/*=====================================================
            CREAR TARJETA
======================================================*/

function crearTarjetaRegalo(regalo){

    const card = document.createElement("div");

    card.className = "gift-card";

    if(regalo.reservados){

        card.classList.add("reservado");

    }

    card.dataset.id = regalo.id;

    card.innerHTML = `

        <div class="gift-header">

            <h3>${regalo.nombre}</h3>

        </div>

        <div class="gift-body">

            <p>

                ${regalo.descripcion || ""}

            </p>

        </div>

        <div class="gift-footer">

            <span class="${
                regalo.reservados
                    ? "estado reservado"
                    : "estado disponible"
            }">

                ${
                    regalo.reservados
                        ? "Reservado"
                        : "Disponible"
                }

            </span>

        </div>

    `;

    if(!regalo.reservados){

        card.addEventListener(

            "click",

            ()=>seleccionarRegalo(regalo.id)

        );

    }
    console.log("APP.JS");
    return card;

}
/*=====================================================
            SELECCIONAR REGALO
======================================================*/

function seleccionarRegalo(id){

    const regalo = regalos.find(

        regalo=>regalo.id===id

    );

    if(!regalo){

        return;

    }

    if(regalo.reservados){

        mostrarMensaje(

            "Este regalo ya fue reservado.",

            "error"

        );

        return;

    }

    regaloSeleccionado = regalo;

    document

        .querySelectorAll(".gift-card")

        .forEach(card=>{

            card.classList.remove("seleccionado");

        });

    const card = document.querySelector(

        `[data-id="${id}"]`

    );

    if(card){

        card.classList.add("seleccionado");

    }

    mostrarMensaje(

        `Seleccionaste: ${regalo.nombre}`,

        "success"

    );

}
/*=====================================================
                BUSCADOR
======================================================*/

function buscarRegalos(){

    const texto =

        inputBusqueda.value

            .trim()

            .toLowerCase();

    if(texto===""){

        renderizarRegalos();

        return;

    }

    const resultado = regalos.filter(regalo=>

        regalo.nombre

            .toLowerCase()

            .includes(texto)

    );

    renderizarRegalos(resultado);

}
/*=====================================================
                VALIDAR FORMULARIO
======================================================*/

function validarFormulario(datos){

    if(!datos.nombre){

        mostrarMensaje(

            "Ingrese su nombre.",

            "error"

        );

        return false;

    }

    if(!datos.correo){

        mostrarMensaje(

            "Ingrese su correo.",

            "error"

        );

        return false;

    }

    const regexCorreo =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regexCorreo.test(datos.correo)){

        mostrarMensaje(

            "Ingrese un correo válido.",

            "error"

        );

        return false;

    }

    if(!datos.telefono){

        mostrarMensaje(

            "Ingrese su teléfono.",

            "error"

        );

        return false;

    }

    return true;

}
/*=====================================================
                CREAR RESERVA
======================================================*/

async function crearReserva(datosFormulario){

    if(!validarFormulario(datosFormulario)){

        return true;

    }

    cargando = true;

    if(btnReservar){

        btnReservar.disabled = true;

        btnReservar.textContent =

            "Guardando...";

    }

    try{

        const regalo = regalos.find(

            r=>r.id===datosFormulario.regalo

        );

        if(!regalo){

            throw new Error(

                "Regalo no encontrado."

            );

        }

        const reserva = {

    regalo: {

        id: regalo.id,

        nombre: regalo.nombre

    },

    fecha: new Date().toISOString()

};

        await FirebaseDB.guardarReserva(reserva);

        await EmailService.enviarCorreoReserva(reserva);

        regalo.reservados=1;

        renderizarRegalos();

        cargarEstadisticas();

        limpiarFormulario();

        mostrarMensaje(

            "🎉 ¡Reserva realizada correctamente!",

            "success"

        );

    }

    catch(error){

        console.error(error);

        mostrarMensaje(

            error.message ||

            "No fue posible realizar la reserva.",

            "error"

        );

    }

    finally{

        cargando=false;

        if(btnReservar){

            btnReservar.disabled=false;

            btnReservar.textContent=

                "Reservar";

        }

    }

}
/*=====================================================
            LIMPIAR FORMULARIO
======================================================*/

function limpiarFormulario(){

    formulario.reset();

    regaloSeleccionado=null;

    document

        .querySelectorAll(".gift-card")

        .forEach(card=>{

            card.classList.remove(

                "seleccionado"

            );

        });

}
/*=====================================================
                ESTADÍSTICAS
======================================================*/

function cargarEstadisticas(){

    const total = regalos.length;

    const reservados = regalos.filter(

        regalo => regalo.reservados

    ).length;

    const disponibles = total - reservados;

    if(contadorDisponibles){

        contadorDisponibles.textContent = disponibles;

    }

    if(contadorReservados){

        contadorReservados.textContent = reservados;

    }

    if(contadorTotal){

        contadorTotal.textContent = total;

    }

}
/*=====================================================
                MOSTRAR MENSAJE
======================================================*/

function mostrarMensaje(texto,tipo="success"){

    if(!mensaje){

        alert(texto);

        return;

    }

    mensaje.textContent = texto;

    mensaje.className = "";

    mensaje.classList.add(

        "mensaje",

        tipo

    );

    mensaje.style.display = "block";

    setTimeout(()=>{

        mensaje.style.display = "none";

    },4000);

}
/*=====================================================
            ACTUALIZAR ESTADO
======================================================*/

function actualizarEstado(idRegalo){

    const regalo = regalos.find(

        regalo=>regalo.id===idRegalo

    );

    if(!regalo){

        return;

    }

    regalo.reservados = 1;

    renderizarRegalos();

    cargarEstadisticas();

}
/*=====================================================
        SINCRONIZAR FIREBASE
======================================================*/

async function sincronizarFirebase(){

    try{

        const reservasFirebase =

            await FirebaseDB.obtenerReservas();

        regalos.forEach(regalo=>{

            regalo.reservados = 0;

        });

        reservasFirebase.forEach(reserva=>{

            const regalo = regalos.find(

                item => item.id === reserva.regalo.id

            );

            if(regalo){

                regalo.reservados = 1;

            }

        });

        renderizarRegalos();

        cargarEstadisticas();

    }
    catch(error){

        console.error(

            "Error sincronizando:",

            error

        );

    }

}
/*=====================================================
            ESCUCHAR FIREBASE
======================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        if(

            window.FirebaseDB &&

            FirebaseDB.escucharReservas

        ){

            FirebaseDB.escucharReservas();

        }

    }

);

/*=====================================================
                FIN PARTE 4
======================================================*/
/*=====================================================
                UTILIDADES
======================================================*/

function obtenerRegaloPorId(id){

    return regalos.find(

        regalo => regalo.id === id

    );

}

/*=====================================================
            VALIDAR REGALO
======================================================*/

function validarRegalo(id){

    const regalo = obtenerRegaloPorId(id);

    if(!regalo){

        mostrarMensaje(

            "El regalo no existe.",

            "error"

        );

        return false;

    }

    if(regalo.reservados){

        mostrarMensaje(

            "Este regalo ya fue reservado.",

            "error"

        );

        return false;

    }

    return true;

}

/*=====================================================
            GENERAR ID
======================================================*/

function generarId(){

    return crypto.randomUUID();

}

/*=====================================================
            CERRAR MENSAJES
======================================================*/

function ocultarMensaje(){

    if(!mensaje){

        return;

    }

    mensaje.style.display = "none";

}

/*=====================================================
            DEBUG
======================================================*/

window.debugApp = {

    regalos,

    obtenerRegaloPorId,

    validarRegalo,

    mostrarMensaje,

    cargarEstadisticas

};

console.log("====================================");

console.log("APP.JS CARGADO CORRECTAMENTE");

console.log("Versión 2.0");

console.log("====================================");
