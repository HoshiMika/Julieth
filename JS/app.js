/*=====================================================
    APARTA SHOWER
    APP.JS
    PARTE 1
======================================================*/

/*=====================================================
                CONFIGURACIÓN
======================================================*/

// ⚠️ Cambia esta fecha por la fecha real del Aparta Shower
const EVENT_DATE = new Date("2026-09-12T15:00:00");

/*=====================================================
                VARIABLES GLOBALES
======================================================*/

let countdownInterval = null;

let appLoaded = false;

let invitadoSeleccionado = null;

let estadisticasActuales = {};

/*=====================================================
                INICIALIZAR APP
======================================================*/

function iniciarAplicacion() {

    console.clear();

    console.log("====================================");

    console.log(APP_CONFIG.appName);

    console.log("Versión:", APP_CONFIG.version);

    console.log("Inicializando aplicación...");

    console.log("====================================");

    iniciarCuentaRegresiva();

    cargarEstadisticas();

    cargarRegalos();

    configurarEventos();

    appLoaded = true;

}

/*=====================================================
                CARGAR REGALOS
======================================================*/

function cargarRegalos() {

    actualizarEstados();

    renderizarRegalos();

}

/*=====================================================
                ESTADÍSTICAS
======================================================*/

function cargarEstadisticas() {

    estadisticasActuales = obtenerEstadisticas();

    actualizarTarjetasEstadisticas();

}

/*=====================================================
            ACTUALIZAR ESTADÍSTICAS
======================================================*/

function actualizarTarjetasEstadisticas() {

    const totalRegalos =
        document.getElementById("totalRegalos");

    const disponibles =
        document.getElementById("totalDisponibles");

    const reservados =
        document.getElementById("totalReservados");

    const invitados =
        document.getElementById("totalInvitados");

    if (totalRegalos)
        totalRegalos.textContent =
            estadisticasActuales.total;

    if (disponibles)
        disponibles.textContent =
            estadisticasActuales.disponibles;

    if (reservados)
        reservados.textContent =
            estadisticasActuales.reservas;

    if (invitados)
        invitados.textContent =
            reservas.length;

}

/*=====================================================
            CUENTA REGRESIVA
======================================================*/

function iniciarCuentaRegresiva() {

    actualizarCuentaRegresiva();

    countdownInterval = setInterval(() => {

        actualizarCuentaRegresiva();

    }, 1000);

}

/*=====================================================
            ACTUALIZAR CONTADOR
======================================================*/

function actualizarCuentaRegresiva() {

    const ahora = new Date();

    const diferencia = EVENT_DATE - ahora;

    if (diferencia <= 0) {

        finalizarCuentaRegresiva();

        return;

    }

    const dias =
        Math.floor(diferencia / (1000 * 60 * 60 * 24));

    const horas =
        Math.floor(
            (diferencia % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

    const minutos =
        Math.floor(
            (diferencia % (1000 * 60 * 60))
            / (1000 * 60)
        );

    const segundos =
        Math.floor(
            (diferencia % (1000 * 60))
            / 1000
        );

    actualizarElemento("dias", dias);

    actualizarElemento("horas", horas);

    actualizarElemento("minutos", minutos);

    actualizarElemento("segundos", segundos);

}

/*=====================================================
            ACTUALIZAR ELEMENTO
======================================================*/

function actualizarElemento(id, valor) {

    const elemento = document.getElementById(id);

    if (!elemento) return;

    elemento.textContent = String(valor).padStart(2, "0");

}

/*=====================================================
            FINALIZAR CONTADOR
======================================================*/

function finalizarCuentaRegresiva() {

    clearInterval(countdownInterval);

    actualizarElemento("dias", 0);

    actualizarElemento("horas", 0);

    actualizarElemento("minutos", 0);

    actualizarElemento("segundos", 0);

}

/*=====================================================
            CONFIGURAR EVENTOS
======================================================*/

function configurarEventos() {

    console.log("Eventos preparados.");

}

/*=====================================================
            REFRESCAR APP
======================================================*/

function refrescarAplicacion() {

    cargarRegalos();

    cargarEstadisticas();

}

/*=====================================================
            DOM READY
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

    iniciarAplicacion();

});

/*=====================================================
            FIN PARTE 1
======================================================*/
/*=====================================================
    APARTA SHOWER
    APP.JS
    PARTE 2
======================================================*/

/*=====================================================
                BUSCADOR
======================================================*/

function configurarBuscador() {

    const inputBusqueda = document.getElementById("searchGift");

    if (!inputBusqueda) {

        console.warn("Buscador no encontrado.");

        return;

    }

    inputBusqueda.addEventListener("input", (e) => {

        const texto = e.target.value.trim();

        if (texto === "") {

            renderizarRegalos(gifts);

            cargarEstadisticas();

            return;

        }

        renderizarBusqueda(texto);

        cargarEstadisticas();

    });

}

/*=====================================================
                FILTRO CATEGORÍAS
======================================================*/

function configurarCategorias() {

    const categoria = document.getElementById("categoryFilter");

    if (!categoria) {

        console.warn("Filtro de categorías no encontrado.");

        return;

    }

    categoria.addEventListener("change", (e) => {

        const valor = e.target.value;

        renderizarCategoria(valor);

        cargarEstadisticas();

    });

}

/*=====================================================
                LIMPIAR FILTROS
======================================================*/

function limpiarFiltros() {

    const buscador =
        document.getElementById("searchGift");

    const categoria =
        document.getElementById("categoryFilter");

    if (buscador) {

        buscador.value = "";

    }

    if (categoria) {

        categoria.value = "Todas";

    }

    renderizarRegalos(gifts);

    cargarEstadisticas();

}

/*=====================================================
            BOTÓN LIMPIAR
======================================================*/

function configurarBotonLimpiar() {

    const boton =
        document.getElementById("btnClear");

    if (!boton) {

        return;

    }

    boton.addEventListener("click", () => {

        limpiarFiltros();

    });

}

/*=====================================================
            ORDENAR REGALOS
======================================================*/

function configurarOrdenamiento() {

    const orden =
        document.getElementById("sortGift");

    if (!orden) {

        return;

    }

    orden.addEventListener("change", (e) => {

        switch (e.target.value) {

            case "nombre":

                ordenarPorNombre();

                break;

            case "categoria":

                ordenarPorCategoria();

                break;

            default:

                ordenarPorCategoria();

        }

        renderizarRegalos(regalosFiltrados);

    });

}

/*=====================================================
            CONTADOR DE RESULTADOS
======================================================*/

function actualizarContadorResultados() {

    const contador =
        document.getElementById("giftCounter");

    if (!contador) {

        return;

    }

    contador.textContent =
        `${regalosFiltrados.length} regalos encontrados`;

}

/*=====================================================
            OBSERVAR CAMBIOS
======================================================*/

function actualizarVista() {

    actualizarEstados();

    renderizarRegalos(regalosFiltrados);

    actualizarContadorResultados();

    cargarEstadisticas();

}

/*=====================================================
            CONFIGURAR EVENTOS
======================================================*/

function configurarEventos() {

    configurarBuscador();

    configurarCategorias();

    configurarBotonLimpiar();

    configurarOrdenamiento();

    console.log("Eventos cargados correctamente.");

}

/*=====================================================
            OBSERVADOR
======================================================*/

const observer = new MutationObserver(() => {

    actualizarContadorResultados();

});

const giftContainer =
    document.getElementById("giftContainer");

if (giftContainer) {

    observer.observe(giftContainer, {

        childList: true

    });

}

/*=====================================================
            FIN PARTE 2
======================================================*/
/*=====================================================
            APP.JS
            PARTE 3
======================================================*/

/*=====================================================
            VARIABLES FORMULARIO
======================================================*/

const formulario = document.getElementById("giftForm");

const txtNombre = document.getElementById("guestName");

const txtTelefono = document.getElementById("guestPhone");

const txtCorreo = document.getElementById("guestEmail");

const lblRegalo = document.getElementById("selectedGift");

const btnReservar = document.getElementById("btnReserve");

let regaloActual = null;

/*=====================================================
        MOSTRAR REGALO SELECCIONADO
======================================================*/

function mostrarRegaloSeleccionado(regalo){

    regaloActual = regalo;

    if(!lblRegalo) return;

    lblRegalo.innerHTML = `
        <strong>🎁 Regalo seleccionado:</strong><br>
        ${regalo.icono} ${regalo.nombre}
    `;

}

/*=====================================================
        LIMPIAR REGALO
======================================================*/

function limpiarRegaloSeleccionado(){

    regaloActual = null;

    if(lblRegalo){

        lblRegalo.innerHTML =
            "No has seleccionado ningún regalo.";

    }

}

/*=====================================================
        VALIDAR EMAIL
======================================================*/

function validarCorreo(email){

    const expresion =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return expresion.test(email);

}

/*=====================================================
        VALIDAR FORMULARIO
======================================================*/

function validarFormulario(){

    if(!txtNombre.value.trim()){

        mostrarError("Ingresa tu nombre.");

        return false;

    }

    if(!txtTelefono.value.trim()){

        mostrarError("Ingresa tu celular.");

        return false;

    }

    if(!validarCorreo(txtCorreo.value.trim())){

        mostrarError("Correo electrónico inválido.");

        return false;

    }

    if(regaloActual == null){

        mostrarError(
            "Selecciona un regalo antes de continuar."
        );

        return false;

    }

    return true;

}

/*=====================================================
        LIMPIAR FORMULARIO
======================================================*/

function limpiarFormulario(){

    formulario.reset();

    limpiarRegaloSeleccionado();

}

/*=====================================================
        PREPARAR RESERVA
======================================================*/

function obtenerDatosReserva(){

    return{

        nombre:txtNombre.value.trim(),

        telefono:txtTelefono.value.trim(),

        correo:txtCorreo.value.trim(),

        regalo:regaloActual,

        fecha:new Date().toISOString()

    };

}

/*=====================================================
        EVENTO FORMULARIO
======================================================*/

if(formulario){

    formulario.addEventListener("submit",(e)=>{

        e.preventDefault();

        if(!validarFormulario()){

            return;

        }

        const datos = obtenerDatosReserva();

        console.log("Reserva preparada");

        console.table(datos);

        guardarReserva(datos);

    });

}

/*=====================================================
        FIN PARTE 3
======================================================*/
/*=====================================================
            APP.JS
            PARTE 4
======================================================*/

/*=====================================================
            GUARDAR RESERVA
======================================================*/

function guardarReserva(datos){

    console.log("Guardando reserva...");

    console.table(datos);

    // Guardar temporalmente en memoria
    reservas.push(datos);

    // Actualizar regalo
    actualizarReservaRegalo(datos.regalo.id);

    // Actualizar estadísticas
    refrescarAplicacion();

    // Mostrar mensaje
    mostrarReservaExitosa(datos);

}

/*=====================================================
        ACTUALIZAR RESERVA
======================================================*/

function actualizarReservaRegalo(id){

    const regalo = obtenerRegaloPorId(id);

    if(!regalo){

        mostrarError("No fue posible actualizar el regalo.");

        return;

    }

    regalo.reservados++;

    actualizarEstado(regalo);

}

/*=====================================================
        RESERVA EXITOSA
======================================================*/

function mostrarReservaExitosa(datos){

    console.log("Reserva realizada");

    alert(`🎉

Gracias ${datos.nombre}

Has reservado:

${datos.regalo.icono} ${datos.regalo.nombre}

¡Nos vemos en el Aparta Shower!`);

    limpiarFormulario();

}

/*=====================================================
        CANCELAR RESERVA
======================================================*/

function cancelarReserva(){

    limpiarFormulario();

}

/*=====================================================
        DESHABILITAR BOTÓN
======================================================*/

function bloquearBoton(){

    if(btnReservar){

        btnReservar.disabled = true;

        btnReservar.innerText = "Guardando...";

    }

}

/*=====================================================
        HABILITAR BOTÓN
======================================================*/

function desbloquearBoton(){

    if(btnReservar){

        btnReservar.disabled = false;

        btnReservar.innerText = "Reservar regalo";

    }

}

/*=====================================================
        SIMULAR GUARDADO
======================================================*/

async function guardarReservaAsync(datos){

    bloquearBoton();

    await new Promise(resolve=>{

        setTimeout(resolve,800);

    });

    guardarReserva(datos);

    desbloquearBoton();

}

/*=====================================================
        REEMPLAZAR EVENTO
======================================================*/

if(formulario){

    formulario.removeEventListener("submit",()=>{});

    formulario.addEventListener("submit",async(e)=>{

        e.preventDefault();

        if(!validarFormulario()){

            return;

        }

        const datos = obtenerDatosReserva();

        await guardarReservaAsync(datos);

    });

}

/*=====================================================
        FIN PARTE 4
======================================================*/
/*=====================================================
            APP.JS
            PARTE 5
======================================================*/

/*=====================================================
            PROVEEDOR DE DATOS
======================================================*/

const DataProvider = {

    async guardarReserva(datos) {

        // Temporalmente usamos almacenamiento local.
        // Luego esta línea se reemplazará por Firebase.

        return guardarReservaLocal(datos);

    },

    async obtenerReservas() {

        return obtenerReservasLocales();

    },

    async eliminarReserva(id) {

        return eliminarReservaLocal(id);

    }

};

/*=====================================================
            STORAGE LOCAL
======================================================*/

const STORAGE_KEY = "aparta_shower_reservas";

/*=====================================================
            OBTENER RESERVAS
======================================================*/

function obtenerReservasLocales(){

    const datos = localStorage.getItem(STORAGE_KEY);

    if(!datos){

        return [];

    }

    try{

        return JSON.parse(datos);

    }
    catch(error){

        console.error(error);

        return [];

    }

}

/*=====================================================
            GUARDAR LOCAL
======================================================*/

function guardarReservaLocal(datos){

    const reservas = obtenerReservasLocales();

    reservas.push(datos);

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(reservas)

    );

    return true;

}

/*=====================================================
            ELIMINAR
======================================================*/

function eliminarReservaLocal(id){

    const reservas = obtenerReservasLocales()

        .filter(r=>r.id!==id);

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(reservas)

    );

}

/*=====================================================
            EXISTE REGALO
======================================================*/

function regaloReservado(idRegalo){

    const reservas = obtenerReservasLocales();

    return reservas.some(

        r=>r.regalo.id===idRegalo

    );

}

/*=====================================================
            SINCRONIZAR
======================================================*/

function sincronizarRegalos(){

    const reservas = obtenerReservasLocales();

    gifts.forEach(regalo=>{

        regalo.reservados = 0;

    });

    reservas.forEach(reserva=>{

        const regalo = obtenerRegaloPorId(

            reserva.regalo.id

        );

        if(regalo){

            regalo.reservados++;

            actualizarEstado(regalo);

        }

    });

    renderizarRegalos();

}

/*=====================================================
            CARGAR RESERVAS
======================================================*/

function cargarReservas(){

    sincronizarRegalos();

    cargarEstadisticas();

}

/*=====================================================
            RECARGAR
======================================================*/

window.addEventListener("load",()=>{

    cargarReservas();

});

/*=====================================================
            FIN PARTE 5
======================================================*/
/*=====================================================
            APP.JS
            PARTE 6
======================================================*/

/*=====================================================
            LIMPIAR FORMULARIO
======================================================*/

function limpiarFormulario(){

    formulario.reset();

    regaloSeleccionado = null;

    document
        .querySelectorAll(".gift-card.selected")
        .forEach(card =>{

            card.classList.remove("selected");

        });

}

/*=====================================================
            CARGAR ESTADÍSTICAS
======================================================*/

function cargarEstadisticas(){

    const reservas = obtenerReservasLocales();

    const totalReservados = reservas.length;

    const disponibles = gifts.filter(

        regalo => regalo.disponibles > regalo.reservados

    ).length;

    const reservados = gifts.filter(

        regalo => regalo.reservados >= regalo.disponibles

    ).length;

    console.log("Total reservas:", totalReservados);

    console.log("Disponibles:", disponibles);

    console.log("Reservados:", reservados);

}

/*=====================================================
            MOSTRAR LOADER
======================================================*/

function mostrarLoader(){

    const boton = document.querySelector("#btnReservar");

    if(!boton) return;

    boton.disabled = true;

    boton.innerHTML = "Guardando...";

}

/*=====================================================
            OCULTAR LOADER
======================================================*/

function ocultarLoader(){

    const boton = document.querySelector("#btnReservar");

    if(!boton) return;

    boton.disabled = false;

    boton.innerHTML = "Reservar";

}

/*=====================================================
            FIN PARTE 6
======================================================*/
/*=====================================================
            APP.JS
            PARTE 7
======================================================*/

/*=====================================================
            VALIDAR REGALO
======================================================*/

function validarRegalo(idRegalo){

    if(regaloReservado(idRegalo)){

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

    return Date.now().toString() +
        Math.random().toString(36).substring(2,9);

}

/*=====================================================
            CREAR RESERVA
======================================================*/

async function crearReserva(datosFormulario){

    try{

        const regalo = obtenerRegaloPorId(datosFormulario.regalo);

        if(!regalo){

            mostrarMensaje(
                "El regalo seleccionado no existe.",
                "error"
            );

            return false;

        }

        if(!validarRegalo(regalo.id)){

            return false;

        }

        const reserva = {

            id: generarId(),

            nombre: datosFormulario.nombre,

            correo: datosFormulario.correo,

            telefono: datosFormulario.telefono,

            regalo,

            fecha: new Date().toISOString()

        };

        await FirebaseDB.guardarReserva(reserva);

        /*=====================================================
            ENVIAR CORREO
======================================================*/

try{

    await EmailService.enviarCorreoReserva(reserva);

    console.log("Correo enviado correctamente.");

}
catch(error){

    console.error("No fue posible enviar el correo.", error);

}

        regalo.reservados++;

        actualizarEstado(regalo);

        renderizarRegalos();

        cargarEstadisticas();

        limpiarFormulario();

        mostrarMensaje(

            "¡Reserva realizada correctamente!",

            "success"

        );

        return true;

    }

    catch(error){

        console.error(error);

        mostrarMensaje(

            "Ocurrió un error al guardar la reserva.",

            "error"

        );

        return false;

    }

}

/*=====================================================
            FIN PARTE 7
======================================================*/
/*=====================================================
            APP.JS
            PARTE 8
======================================================*/

/*=====================================================
            ENVIAR FORMULARIO
======================================================*/

async function enviarFormulario(event){

    event.preventDefault();

    const nombre = document
        .querySelector("#nombre")
        .value
        .trim();

    const correo = document
        .querySelector("#correo")
        .value
        .trim();

    const telefono = document
        .querySelector("#telefono")
        .value
        .trim();

    if(!nombre){

        mostrarMensaje(
            "Ingresa tu nombre.",
            "error"
        );

        return;

    }

    if(!correo){

        mostrarMensaje(
            "Ingresa tu correo.",
            "error"
        );

        return;

    }

    if(!telefono){

        mostrarMensaje(
            "Ingresa tu teléfono.",
            "error"
        );

        return;

    }

    if(!regaloSeleccionado){

        mostrarMensaje(
            "Selecciona un regalo.",
            "error"
        );

        return;

    }

    mostrarLoader();

    const reserva = {

        nombre,

        correo,

        telefono,

        regalo: regaloSeleccionado

    };

    const resultado = await crearReserva(reserva);

    ocultarLoader();

    if(resultado){

        console.log("Reserva realizada correctamente.");

    }

}

/*=====================================================
            REGISTRAR EVENTOS
======================================================*/

function registrarEventos(){

    if(formulario){

        formulario.addEventListener(

            "submit",

            enviarFormulario

        );

    }

}

/*=====================================================
            INICIALIZAR APP
======================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        registrarEventos();

    }

);

/*=====================================================
            FIN PARTE 8
======================================================*/
/*=====================================================
            APP.JS
            PARTE 9
======================================================*/

/*=====================================================
            ACTUALIZAR INTERFAZ
======================================================*/

function actualizarAplicacion(){

    try{

        renderizarRegalos();

        cargarEstadisticas();

        actualizarContadorResultados();

    }
    catch(error){

        console.error(error);

    }

}

/*=====================================================
            RECARGAR RESERVAS
======================================================*/

async function recargarReservas(){

    try{

        const reservas =
            await DataProvider.obtenerReservas();

        console.log("Reservas cargadas:", reservas.length);

        actualizarAplicacion();

    }
    catch(error){

        console.error(error);

    }

}

/*=====================================================
            REFRESCAR DATOS
======================================================*/

async function refrescarDatos(){

    mostrarLoader();

    await recargarReservas();

    ocultarLoader();

}

/*=====================================================
            RESETEAR APLICACIÓN
======================================================*/

function reiniciarAplicacion(){

    limpiarFormulario();

    actualizarAplicacion();

}

/*=====================================================
            VERIFICAR CONEXIÓN
======================================================*/

function verificarConexion(){

    if(navigator.onLine){

        console.log("Conectado a Internet");

    }else{

        mostrarMensaje(

            "No hay conexión a Internet.",

            "warning"

        );

    }

}

/*=====================================================
            EVENTOS DEL NAVEGADOR
======================================================*/

window.addEventListener(

    "online",

    ()=>{

        console.log("Conexión restaurada");

        refrescarDatos();

    }

);

window.addEventListener(

    "offline",

    ()=>{

        mostrarMensaje(

            "Se perdió la conexión.",

            "warning"

        );

    }

);

/*=====================================================
            INICIALIZAR
======================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        verificarConexion();

        refrescarDatos();

    }

);

/*=====================================================
            FIN PARTE 9
======================================================*/
/*=====================================================
            APP.JS
            PARTE 10
======================================================*/

/*=====================================================
            MENSAJES
======================================================*/

function mostrarMensaje(mensaje, tipo = "success") {

    const contenedor = document.getElementById("messageContainer");

    if (!contenedor) {

        alert(mensaje);

        return;

    }

    contenedor.innerHTML = "";

    const alerta = document.createElement("div");

    alerta.className = `alert alert-${tipo}`;

    alerta.textContent = mensaje;

    contenedor.appendChild(alerta);

    setTimeout(() => {

        alerta.remove();

    }, 5000);

}

/*=====================================================
            CONFIRMACIÓN
======================================================*/

function confirmarAccion(mensaje){

    return confirm(mensaje);

}

/*=====================================================
            RESETEAR FORMULARIO
======================================================*/

function resetearFormulario(){

    if(formulario){

        formulario.reset();

    }

    regaloSeleccionado = null;

    document
        .querySelectorAll(".gift-card.selected")
        .forEach(card=>{

            card.classList.remove("selected");

        });

}

/*=====================================================
            CERRAR MODALES
======================================================*/

function cerrarModales(){

    document

        .querySelectorAll(".modal.show")

        .forEach(modal=>{

            modal.classList.remove("show");

        });

}

/*=====================================================
            CARGAR APLICACIÓN
======================================================*/

async function iniciarAplicacion(){

    console.log("================================");

    console.log(" Aparta Shower");

    console.log(" Aplicación iniciada");

    console.log("================================");

    try{

        await recargarReservas();

        actualizarAplicacion();

    }

    catch(error){

        console.error(error);

    }

}

/*=====================================================
            DOM READY
======================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        iniciarAplicacion();

    }

);

/*=====================================================
            OBJETO GLOBAL
======================================================*/

window.App={

    iniciarAplicacion,

    crearReserva,

    mostrarMensaje,

    actualizarAplicacion,

    refrescarDatos,

    resetearFormulario,

    cerrarModales

};

/*=====================================================
            FIN APP.JS
======================================================*/