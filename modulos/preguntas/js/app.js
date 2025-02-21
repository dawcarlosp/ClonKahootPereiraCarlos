let segundos = 10;
let aux = 0;
let h1 = document.getElementById("cuentaAtras");
let dialog = document.getElementById("modal");
let botones = document.querySelectorAll("button");
let posiblesRespuestas = document.getElementById("posiblesRespuestas");
let h2 = document.getElementById("pregunta");
let intervalo = setInterval(cuentaAtras, 1000);
function cuentaAtras (){
    h1.textContent = segundos - aux;
    aux++;
    if (aux == 12){
        clearInterval(intervalo);
        h1.textContent = "Fin";
        dialog.style.display = "none";
        dialog.close();
    }
}
async function obtenerPreguntas() {
    try {
      const response = await fetch("js/preguntas.json");
      if (!response.ok) {
        throw new Error("Error al obtener las preguntas");
      }
      const preguntas = await response.json();
      preguntas.forEach(pregunta => {
        h2.textContent = pregunta.pregunta;
      })
    } catch (error) {
      console.error("Error:", error);
    }
  }
  obtenerPreguntas();
/*
botones.forEach(boton => boton.addEventListener("click", function (){validarRespuestas(boton.value)}));
function validarRespuestas(valor){
    if(valor === "C"){
        alert("Respuesta correcta");
    }else{
        alert("Respuesta incorrecta");
    }
}
*/