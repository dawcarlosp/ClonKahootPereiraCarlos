let segundos = 10;
let aux = 0;
let h1 = document.getElementById("cuentaAtras");
let dialog = document.getElementById("modal");
let botones = document.querySelectorAll("button");
let intervalo = setInterval(cuentaAtras, 1000);
function cuentaAtras (){
    h1.textContent = segundos - aux;
    aux++;
    if (aux == 12){
        clearInterval(intervalo);
        h1.textContent = "Fin";
        dialog.style.display = "none";
        dialog.closest();
    }
}
// si ponemos ("click", validarRespuestas(boton.value)); no funciona porque se ejecuta al momento y no cuando hacemos click
// Aparte de usar el callback, como se hizo abajo también se podria una función flecha
botones.forEach(boton => boton.addEventListener("click", function (){validarRespuestas(boton.value)}));
function validarRespuestas(valor){
    if(valor === "C"){
        alert("Respuesta correcta");
    }else{
        alert("Respuesta incorrecta");
    }
}