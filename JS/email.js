/*=====================================================
                EMAIL.JS
======================================================*/

const EMAIL_CONFIG = {

    PUBLIC_KEY: "f65_42YyAVwMNbPmfJX47",

    SERVICE_ID: "service_cv3fckv",

    TEMPLATE_ID: "template_xrxchih",

    DESTINO: "juliethkknte@gmail.com"

};

/*=====================================================
                INICIALIZAR
======================================================*/

emailjs.init({

    publicKey: EMAIL_CONFIG.PUBLIC_KEY

});

/*=====================================================
                ENVIAR CORREO
======================================================*/

async function enviarCorreoReserva(reserva){

    try{

        const parametros = {

            destino: EMAIL_CONFIG.DESTINO,

            nombre: reserva.nombre,

            correo: reserva.correo,

            telefono: reserva.telefono,

            regalo: reserva.regalo.nombre,

            fecha: new Date().toLocaleString("es-CO")

        };

        const respuesta = await emailjs.send(

            EMAIL_CONFIG.SERVICE_ID,

            EMAIL_CONFIG.TEMPLATE_ID,

            parametros

        );

        console.log("Correo enviado correctamente.");

        return respuesta;

    }
    catch(error){

        console.error("Error enviando correo:", error);

        throw error;

    }

}

window.EmailService={

    enviarCorreoReserva

};