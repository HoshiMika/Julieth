/*=====================================
        CONTADOR APARTA SHOWER
======================================*/

const fechaEvento = new Date(
    "September 6, 2026 13:00:00"
).getTime();


function actualizarContador(){

    const ahora = new Date().getTime();

    const diferencia = fechaEvento - ahora;


    if(diferencia <= 0){

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }


    const dias = Math.floor(
        diferencia /
        (1000 * 60 * 60 * 24)
    );


    const horas = Math.floor(
        (diferencia %
        (1000 * 60 * 60 * 24))
        /
        (1000 * 60 * 60)
    );


    const minutos = Math.floor(
        (diferencia %
        (1000 * 60 * 60))
        /
        (1000 * 60)
    );


    const segundos = Math.floor(
        (diferencia %
        (1000 * 60))
        /
        1000
    );


    document.getElementById("days").textContent =
        dias.toString().padStart(2,"0");


    document.getElementById("hours").textContent =
        horas.toString().padStart(2,"0");


    document.getElementById("minutes").textContent =
        minutos.toString().padStart(2,"0");


    document.getElementById("seconds").textContent =
        segundos.toString().padStart(2,"0");

}


setInterval(
    actualizarContador,
    1000
);


actualizarContador();