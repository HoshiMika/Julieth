/*=====================================================
                FIREBASE.JS
                PARTE 1
======================================================*/

/*=====================================================
                IMPORTS
======================================================*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {

    getFirestore,

    collection,

    addDoc,

    getDocs,

    deleteDoc,

    doc,

    onSnapshot,

    query,

    where

} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

/*=====================================================
                CONFIGURACIÓN
======================================================*/

const firebaseConfig = {

    apiKey: "AIzaSyAQi7_ZteNRV1KkS_RoZFI2Itug2q9Q2Pk",

    authDomain: "apartashower-julieth.firebaseapp.com",

    projectId: "apartashower-julieth",

    storageBucket: "apartashower-julieth.firebasestorage.app",

    messagingSenderId: "77500433763",

    appId: "1:77500433763:web:2b9fb10f68dbc7af65bf56"

};

/*=====================================================
                INICIALIZAR
======================================================*/

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

/*=====================================================
                COLECCIÓN
======================================================*/

const COLLECTION = "reservas";

/*=====================================================
                EXPORTAR
======================================================*/

window.FirebaseDB = {

    db,

    COLLECTION

};

/*=====================================================
                FIN PARTE 1
======================================================*/
/*=====================================================
                FIREBASE.JS
                PARTE 2
======================================================*/

/*=====================================================
            GUARDAR RESERVA
======================================================*/

async function guardarReservaFirebase(reserva){

    try{

        const existe = await regaloYaReservado(
            reserva.regalo.id
        );

        if(existe){

            throw new Error(
                "Este regalo ya fue reservado."
            );

        }

        const respuesta = await addDoc(

            collection(db, COLLECTION),

            reserva

        );

        console.log(
            "Reserva guardada:",
            respuesta.id
        );

        return respuesta.id;

    }
    catch(error){

        console.error(error);

        throw error;

    }

}

/*=====================================================
        VALIDAR REGALO RESERVADO
======================================================*/

async function regaloYaReservado(idRegalo){

    const consulta = query(

        collection(db, COLLECTION),

        where("regalo.id","==",idRegalo)

    );

    const resultado = await getDocs(consulta);

    return !resultado.empty;

}

/*=====================================================
        BUSCAR RESERVA
======================================================*/

async function obtenerReservaPorRegalo(idRegalo){

    const consulta = query(

        collection(db, COLLECTION),

        where("regalo.id","==",idRegalo)

    );

    const resultado = await getDocs(consulta);

    if(resultado.empty){

        return null;

    }

    const documento = resultado.docs[0];

    return{

        id:documento.id,

        ...documento.data()

    };

}

/*=====================================================
            EXPORTAR
======================================================*/

window.FirebaseDB.guardarReserva =

    guardarReservaFirebase;

window.FirebaseDB.regaloYaReservado =

    regaloYaReservado;

window.FirebaseDB.obtenerReserva =

    obtenerReservaPorRegalo;

/*=====================================================
            FIN PARTE 2
======================================================*/
/*=====================================================
                FIREBASE.JS
                PARTE 3
======================================================*/

/*=====================================================
            ESCUCHAR CAMBIOS
======================================================*/

function escucharReservas() {

    const reservasRef = collection(db, COLLECTION);

    onSnapshot(reservasRef, (snapshot) => {

        const reservas = [];

        snapshot.forEach((doc) => {

            reservas.push({

                id: doc.id,

                ...doc.data()

            });

        });

        actualizarReservasLocales(reservas);

        console.log("Reservas sincronizadas:", reservas.length);

    }, (error) => {

        console.error("Error al escuchar Firestore:", error);

    });

}

/*=====================================================
        ACTUALIZAR RESERVAS
======================================================*/

function actualizarReservasLocales(reservas){

    if(typeof gifts === "undefined") return;

    gifts.forEach(regalo =>{

        regalo.reservados = 0;

    });

    reservas.forEach(reserva=>{

        const regalo = gifts.find(

            g => g.id === reserva.regalo.id

        );

        if(regalo){

            regalo.reservados = 1;

        }

    });

    if(typeof renderizarRegalos === "function"){

        renderizarRegalos();

    }

    if(typeof cargarEstadisticas === "function"){

        cargarEstadisticas();

    }

}

/*=====================================================
        OBTENER RESERVAS
======================================================*/

async function obtenerReservasFirebase(){

    const snapshot = await getDocs(

        collection(db, COLLECTION)

    );

    const reservas = [];

    snapshot.forEach(doc=>{

        reservas.push({

            id:doc.id,

            ...doc.data()

        });

    });

    return reservas;

}

/*=====================================================
        EXPORTAR
======================================================*/

window.FirebaseDB.obtenerReservas =

    obtenerReservasFirebase;

window.FirebaseDB.escucharReservas =

    escucharReservas;

/*=====================================================
        INICIAR FIREBASE
======================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        escucharReservas();

    }

);

/*=====================================================
                FIN PARTE 3
======================================================*/
/*=====================================================
                FIREBASE.JS
                PARTE 4
======================================================*/

/*=====================================================
            ELIMINAR RESERVA
======================================================*/

async function eliminarReservaFirebase(idReserva){

    try{

        await deleteDoc(

            doc(db, COLLECTION, idReserva)

        );

        console.log(

            "Reserva eliminada:",

            idReserva

        );

        return true;

    }
    catch(error){

        console.error(error);

        return false;

    }

}

/*=====================================================
            LIBERAR REGALO
======================================================*/

async function liberarRegalo(idRegalo){

    try{

        const reserva = await obtenerReservaPorRegalo(

            idRegalo

        );

        if(!reserva){

            console.warn(

                "El regalo ya está disponible."

            );

            return false;

        }

        await eliminarReservaFirebase(

            reserva.id

        );

        return true;

    }
    catch(error){

        console.error(error);

        return false;

    }

}

/*=====================================================
            OBTENER UNA RESERVA
======================================================*/

async function obtenerReserva(idReserva){

    const reservas = await obtenerReservasFirebase();

    return reservas.find(

        reserva => reserva.id === idReserva

    );

}

/*=====================================================
            CONTAR RESERVAS
======================================================*/

async function contarReservas(){

    const reservas = await obtenerReservasFirebase();

    return reservas.length;

}

/*=====================================================
            LIMPIAR COLECCIÓN
======================================================*/

async function limpiarReservas(){

    const reservas = await obtenerReservasFirebase();

    for(const reserva of reservas){

        await eliminarReservaFirebase(

            reserva.id

        );

    }

    console.log(

        "Todas las reservas fueron eliminadas."

    );

}

/*=====================================================
            EXPORTAR FUNCIONES
======================================================*/

window.FirebaseDB.eliminarReserva =

    eliminarReservaFirebase;

window.FirebaseDB.liberarRegalo =

    liberarRegalo;

window.FirebaseDB.obtenerReservaPorId =

    obtenerReserva;

window.FirebaseDB.contarReservas =

    contarReservas;

window.FirebaseDB.limpiarReservas =

    limpiarReservas;

/*=====================================================
                FIN PARTE 4
======================================================*/
/*=====================================================
                FIREBASE.JS
                PARTE 5
======================================================*/

/*=====================================================
            ESTADO FIREBASE
======================================================*/

const FirebaseService = {

    conectado: false,

    ultimaActualizacion: null

};

/*=====================================================
            VERIFICAR CONEXIÓN
======================================================*/

async function verificarFirebase(){

    try{

        await getDocs(

            collection(db, COLLECTION)

        );

        FirebaseService.conectado = true;

        FirebaseService.ultimaActualizacion = new Date();

        console.log("Firebase conectado.");

        return true;

    }
    catch(error){

        FirebaseService.conectado = false;

        console.error(error);

        return false;

    }

}

/*=====================================================
            OBTENER ESTADO
======================================================*/

function estadoFirebase(){

    return{

        conectado: FirebaseService.conectado,

        ultimaActualizacion:

            FirebaseService.ultimaActualizacion

    };

}

/*=====================================================
            RECONECTAR
======================================================*/

async function reconectarFirebase(){

    console.log("Reconectando...");

    const conectado = await verificarFirebase();

    if(conectado){

        escucharReservas();

    }

    return conectado;

}

/*=====================================================
            INICIALIZAR FIREBASE
======================================================*/

async function iniciarFirebase(){

    console.log("================================");

    console.log("Firebase iniciado");

    console.log("Proyecto: apartashower-julieth");

    console.log("================================");

    await verificarFirebase();

    escucharReservas();

}

/*=====================================================
            EVENTOS
======================================================*/

window.addEventListener("online",()=>{

    reconectarFirebase();

});

window.addEventListener("offline",()=>{

    FirebaseService.conectado = false;

    console.warn("Sin conexión.");

});

/*=====================================================
            EXPORTAR
======================================================*/

window.FirebaseDB.estado = estadoFirebase;

window.FirebaseDB.reconectar = reconectarFirebase;

window.FirebaseDB.iniciar = iniciarFirebase;

/*=====================================================
            INICIAR
======================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        iniciarFirebase();

    }

);

/*=====================================================
                FIN FIREBASE.JS
======================================================*/