/*=====================================================
    APARTA SHOWER
    GIFTS.JS
    PARTE 1
======================================================*/

/*=====================================================
                    CONFIGURACIÓN
======================================================*/

const APP_CONFIG = {

    appName: "Aparta Shower",

    version: "1.0.0",

    moneda: "COP",

    maxSearchResults: 50,

    ordenarPor: "categoria"

};

/*=====================================================
                    CATEGORÍAS
======================================================*/

const CATEGORIAS = {

    COCINA: "Cocina",

    COMEDOR: "Comedor",

    HABITACION: "Habitación",

    BANO: "Baño",

    SALA: "Sala",

    LAVANDERIA: "Lavandería",

    DINERO: "Lluvia de Sobres",

    SORPRESA: "Sorpresas"

};

/*=====================================================
                    REGALOS
======================================================*/

const gifts = [

    {
        id: 1,
        nombre: "Arrocera",
        categoria: CATEGORIAS.COCINA,
        icono: "🍚",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 2,
        nombre: "Sanduchera",
        categoria: CATEGORIAS.COCINA,
        icono: "🥪",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 3,
        nombre: "Picadora",
        categoria: CATEGORIAS.COCINA,
        icono: "🔪",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 4,
        nombre: "Licuadora",
        categoria: CATEGORIAS.COCINA,
        icono: "🥤",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 5,
        nombre: "Exprimidora",
        categoria: CATEGORIAS.COCINA,
        icono: "🍊",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 6,
        nombre: "Olla Express",
        categoria: CATEGORIAS.COCINA,
        icono: "🍲",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 7,
        nombre: "Vajilla",
        categoria: CATEGORIAS.COMEDOR,
        icono: "🍽️",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 8,
        nombre: "Cubiertos",
        categoria: CATEGORIAS.COMEDOR,
        icono: "🍴",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 9,
        nombre: "Juego de Vasos",
        categoria: CATEGORIAS.COMEDOR,
        icono: "🥛",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 10,
        nombre: "Juego de Sartenes",
        categoria: CATEGORIAS.COCINA,
        icono: "🍳",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 11,
        nombre: "Juego de Ollas",
        categoria: CATEGORIAS.COCINA,
        icono: "🥘",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 12,
        nombre: "Tablas para Picar y Juego de Cuchillos",
        categoria: CATEGORIAS.COCINA,
        icono: "🪵",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 13,
        nombre: "Cafetera",
        categoria: CATEGORIAS.COCINA,
        icono: "☕",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 14,
        nombre: "Juego de Sábanas + Almohadas",
        categoria: CATEGORIAS.HABITACION,
        icono: "🛏️",
        cantidad: 3,
        reservados: 0,
        disponible: true
    },

    {
        id: 15,
        nombre: "Organizador de Cocina",
        categoria: CATEGORIAS.COCINA,
        icono: "🗄️",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 16,
        nombre: "Escurridor de Platos",
        categoria: CATEGORIAS.COCINA,
        icono: "🧺",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 17,
        nombre: "Cubrelecho",
        categoria: CATEGORIAS.HABITACION,
        icono: "🛌",
        cantidad: 2,
        reservados: 0,
        disponible: true
    },

    {
        id: 18,
        nombre: "Juego de Toallas",
        categoria: CATEGORIAS.BANO,
        icono: "🛁",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 19,
        nombre: "Kit de Aseo para Apartamento",
        categoria: CATEGORIAS.LAVANDERIA,
        icono: "🧹",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 20,
        nombre: "Sorpresa Cocina",
        categoria: CATEGORIAS.SORPRESA,
        icono: "🎁",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 21,
        nombre: "Sorpresa Baño",
        categoria: CATEGORIAS.SORPRESA,
        icono: "🎁",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 22,
        nombre: "Sorpresa Sala",
        categoria: CATEGORIAS.SORPRESA,
        icono: "🎁",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 23,
        nombre: "Sorpresa Habitación",
        categoria: CATEGORIAS.SORPRESA,
        icono: "🎁",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 24,
        nombre: "Sorpresa Zona de Ropa",
        categoria: CATEGORIAS.SORPRESA,
        icono: "🎁",
        cantidad: 1,
        reservados: 0,
        disponible: true
    },

    {
        id: 25,
        nombre: "Lluvia de Sobres",
        categoria: CATEGORIAS.DINERO,
        icono: "💌",
        cantidad: 5,
        reservados: 0,
        disponible: true
    }

];

/*=====================================================
                VARIABLES GLOBALES
======================================================*/


let invitadoActual = null;

let regalosFiltrados = [...gifts];

/*=====================================================
                FIN PARTE 1
======================================================*/
/*=====================================================
    APARTA SHOWER
    GIFTS.JS
    PARTE 2
======================================================*/

/*=====================================================
            OBTENER TODOS LOS REGALOS
======================================================*/

function obtenerRegalos() {

    return regalosFiltrados;

}

/*=====================================================
            BUSCAR REGALO POR ID
======================================================*/

function obtenerRegaloPorId(id) {

    return gifts.find(regalo => regalo.id === Number(id));

}

/*=====================================================
            BUSCAR POR NOMBRE
======================================================*/

function buscarRegalos(texto) {

    if (!texto || texto.trim() === "") {

        regalosFiltrados = [...gifts];

        return regalosFiltrados;

    }

    const busqueda = texto.toLowerCase().trim();

    regalosFiltrados = gifts.filter(regalo =>
        regalo.nombre.toLowerCase().includes(busqueda)
    );

    return regalosFiltrados;

}

/*=====================================================
            FILTRAR POR CATEGORÍA
======================================================*/

function filtrarPorCategoria(categoria) {

    if (!categoria || categoria === "Todas") {

        regalosFiltrados = [...gifts];

        return regalosFiltrados;

    }

    regalosFiltrados = gifts.filter(regalo =>
        regalo.categoria === categoria
    );

    return regalosFiltrados;

}

/*=====================================================
            ORDENAR ALFABÉTICAMENTE
======================================================*/

function ordenarPorNombre() {

    regalosFiltrados.sort((a, b) =>
        a.nombre.localeCompare(b.nombre, "es")
    );

    return regalosFiltrados;

}

/*=====================================================
            ORDENAR POR CATEGORÍA
======================================================*/

function ordenarPorCategoria() {

    regalosFiltrados.sort((a, b) => {

        if (a.categoria === b.categoria) {

            return a.nombre.localeCompare(b.nombre, "es");

        }

        return a.categoria.localeCompare(b.categoria, "es");

    });

    return regalosFiltrados;

}

/*=====================================================
            DISPONIBLES
======================================================*/

function unidadesDisponibles(regalo) {

    return regalo.cantidad - regalo.reservados;

}

/*=====================================================
            ¿ESTÁ DISPONIBLE?
======================================================*/

function estaDisponible(regalo) {

    return unidadesDisponibles(regalo) > 0;

}

/*=====================================================
            ACTUALIZAR ESTADO
======================================================*/

function actualizarEstadoGift(regalo) {

    regalo.disponible = estaDisponible(regalo);

    return regalo;

}

/*=====================================================
            ACTUALIZAR TODOS
======================================================*/

function actualizarEstados() {

    gifts.forEach(regalo => {

        actualizarEstadoGift(regalo);

    });

}

/*=====================================================
            TEXTO DEL ESTADO
======================================================*/

function obtenerEstado(regalo) {

    const disponibles = unidadesDisponibles(regalo);

    if (disponibles <= 0) {

        return "Agotado";

    }

    if (disponibles === 1 && regalo.cantidad > 1) {

        return "Última unidad";

    }

    return "Disponible";

}

/*=====================================================
            COLOR DEL ESTADO
======================================================*/

function obtenerClaseEstado(regalo) {

    const disponibles = unidadesDisponibles(regalo);

    if (disponibles <= 0) {

        return "agotado";

    }

    if (disponibles === 1 && regalo.cantidad > 1) {

        return "ultima";

    }

    return "disponible";

}

/*=====================================================
            CONTADORES
======================================================*/

function totalRegalos() {

    return gifts.length;

}

function totalDisponibles() {

    return gifts.filter(regalo =>
        regalo.disponible
    ).length;

}

function totalReservados() {

    return gifts.filter(regalo =>
        !regalo.disponible
    ).length;

}

/*=====================================================
            ESTADÍSTICAS
======================================================*/

function obtenerEstadisticas() {

    actualizarEstados();

    return {

        total: totalRegalos(),

        disponibles: totalDisponibles(),

        agotados: totalReservados(),

        reservas: gifts.reduce((total, regalo) => {

            return total + regalo.reservados;

        }, 0)

    };

}

/*=====================================================
            DEBUG
======================================================*/

console.log("===================================");

console.log(APP_CONFIG.appName);

console.log("Versión:", APP_CONFIG.version);

console.log("Regalos cargados:", gifts.length);

console.log(obtenerEstadisticas());

console.log("===================================");

/*=====================================================
            FIN PARTE 2
======================================================*/
/*=====================================================
    APARTA SHOWER
    GIFTS.JS
    PARTE 3
======================================================*/

/*=====================================================
            OBTENER COLOR DEL BADGE
======================================================*/

function obtenerColorBadge(regalo) {

    const disponibles = unidadesDisponibles(regalo);

    if (disponibles <= 0) {

        return "badge-danger";

    }

    if (disponibles === 1 && regalo.cantidad > 1) {

        return "badge-warning";

    }

    return "badge-success";

}

/*=====================================================
            CREAR TARJETA
======================================================*/

console.log("GIFTS.JS");
function crearTarjetaRegalo(regalo) {

    const disponibles = unidadesDisponibles(regalo);

    const estado = obtenerEstado(regalo);

    const colorEstado = obtenerClaseEstado(regalo);

    const badge = obtenerColorBadge(regalo);

    return `

        <div class="gift-item ${colorEstado}" data-id="${regalo.id}">

            <div class="gift-header">

                <div class="gift-icon">

                    ${regalo.icono}

                </div>

            </div>

            <div class="gift-body">

                <h3>

                    ${regalo.nombre}

                </h3>

                <span class="gift-category">

                    ${regalo.categoria}

                </span>

                <div class="gift-status">

                    <span class="badge ${badge}">

                        ${estado}

                    </span>

                </div>

                <div class="gift-stock">

                    Disponibles:

                    <strong>

                        ${disponibles}

                    </strong>

                    de

                    <strong>

                        ${regalo.cantidad}

                    </strong>

                </div>

            </div>

            <div class="gift-footer">

                ${
                    regalo.disponible
                        ? `
                            <button
                                class="btn-primary reservar-btn"
                                data-id="${regalo.id}">

                                Reservar

                            </button>
                        `
                        : `
                            <button
                                class="btn-secondary"
                                disabled>

                                Agotado

                            </button>
                        `
                }

            </div>

        </div>

    `;

}

/*=====================================================
            RENDERIZAR REGALOS
======================================================*/

function renderizarRegalosGift(lista = gifts) {

    actualizarEstados();

    const container = document.getElementById("giftContainer");

    if (!container) return;

    if (lista.length === 0) {

        container.innerHTML = `

            <div class="empty-result">

                <h2>

                    😔

                </h2>

                <p>

                    No encontramos regalos.

                </p>

            </div>

        `;

        return;

    }

    container.innerHTML = lista
        .map(regalo => crearTarjetaRegalo(regalo))
        .join("");

    activarBotonesReserva();

}

/*=====================================================
            RENDERIZAR POR BÚSQUEDA
======================================================*/

function renderizarBusqueda(texto) {

    const resultados = buscarRegalos(texto);

    renderizarRegalos(resultados);

}

/*=====================================================
            RENDERIZAR CATEGORÍA
======================================================*/

function renderizarCategoria(categoria) {

    const resultados = filtrarPorCategoria(categoria);

    renderizarRegalos(resultados);

}

/*=====================================================
            RECARGAR
======================================================*/

function refrescarRegalos() {

    actualizarEstados();

    renderizarRegalos(regalosFiltrados);

}

/*=====================================================
            CARGA INICIAL
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

    actualizarEstados();

    renderizarRegalosGift();

});
/*=====================================================
    APARTA SHOWER
    GIFTS.JS
    PARTE 4
======================================================*/

/*=====================================================
            ACTIVAR BOTONES
======================================================*/

function activarBotonesReserva() {

    const botones = document.querySelectorAll(".reservar-btn");

    botones.forEach(boton => {

        boton.addEventListener("click", seleccionarRegaloGift);

    });

}

/*=====================================================
            SELECCIONAR REGALO
======================================================*/

function seleccionarRegaloGift(evento) {

    const id = Number(evento.target.dataset.id);

    const regalo = obtenerRegaloPorId(id);

    if (!regalo) {

        return;

    }

    if (!estaDisponible(regalo)) {

        mostrarError(
            "Este regalo ya fue reservado."
        );

        return;

    }

    window.regaloSeleccionado = regalo;

    document
        .querySelectorAll(".gift-item")
        .forEach(card => {

            card.classList.remove("selected");

        });

    evento.target
        .closest(".gift-item")
        .classList.add("selected");

    mostrarSeleccion(regalo);

}

/*=====================================================
            MOSTRAR REGALO
======================================================*/

function mostrarSeleccion(regalo) {

    console.log("Regalo seleccionado:");

    console.table(regalo);

    if (typeof mostrarRegaloSeleccionado === "function") {

        mostrarRegaloSeleccionado(regalo);

    }

}

/*=====================================================
            VALIDAR FORMULARIO
======================================================*/

function validarFormulario() {

    const nombre =
        document
        .getElementById("guestName")
        .value
        .trim();

    const telefono =
        document
        .getElementById("guestPhone")
        .value
        .trim();

    if (nombre.length < 3) {

        mostrarError(
            "Escribe tu nombre completo."
        );

        return false;

    }

    if (telefono.length < 7) {

        mostrarError(
            "Número de celular inválido."
        );

        return false;

    }

    if (!regaloSeleccionado) {

        mostrarError(
            "Selecciona un regalo."
        );

        return false;

    }

    return true;

}

/*=====================================================
            RESERVAR
======================================================*/

function reservarRegalo() {

    if (!validarFormulario()) {

        return;

    }

    const regalo = regaloSeleccionado;

    if (!estaDisponible(regalo)) {

        mostrarError(
            "Otro invitado reservó este regalo."
        );

        return;

    }

    regalo.reservados++;

    actualizarEstado(regalo);

    const reserva = {

        id: crypto.randomUUID(),

        nombre:
            document
            .getElementById("guestName")
            .value
            .trim(),

        telefono:
            document
            .getElementById("guestPhone")
            .value
            .trim(),

        correo:
            document
            .getElementById("guestEmail")
            .value
            .trim(),

        regaloId: regalo.id,

        regalo: regalo.nombre,

        categoria: regalo.categoria,

        fecha: new Date().toISOString()

    };

    reservas.push(reserva);

    invitadoActual = reserva;

    refrescarRegalos();

    limpiarFormulario();

    mostrarExito();

}

/*=====================================================
            LIMPIAR
======================================================*/

function limpiarFormularioGift() {

    document
        .getElementById("giftForm")
        .reset();

    window.regaloSeleccionado = null;

}

/*=====================================================
            MENSAJES
======================================================*/

function mostrarError(mensaje) {

    alert(mensaje);

}

function mostrarExito() {

    alert(
        "🎉 Gracias.\n\nTu regalo fue reservado correctamente."
    );

}

/*=====================================================
            EVENTO FORMULARIO
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const formulario =
        document.getElementById("giftForm");

    if (!formulario) {

        return;

    }

    formulario.addEventListener("submit", evento => {

        evento.preventDefault();

        reservarRegalo();

    });

});

/*=====================================================
            FIN PARTE 4
======================================================*/