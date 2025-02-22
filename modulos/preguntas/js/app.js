let segundos = 10;
let aux = 0;
let h1 = document.getElementById("cuentaAtras");
let dialog = document.getElementById("modal");
let botones = document.querySelectorAll("button");
let posiblesRespuestas = document.getElementById("posiblesRespuestas");
let h2 = document.getElementById("pregunta");
/*
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
    */
async function obtenerPreguntas() {
    try {
      const response = await fetch("js/preguntas.json");
      if (!response.ok) {
        throw new Error("Error al obtener las preguntas");
      }
      const preguntas = await response.json();
      preguntas.forEach((pregunta, index) => {
        setTimeout(() =>{
            h2.textContent = pregunta.pregunta;
            posiblesRespuestas.innerHTML ="";
            let respuestas = pregunta.respuestas;
            respuestas.forEach((respuesta)  =>
            { 
              let boton = document.createElement("button");
              boton.value = respuesta.correcta;
              boton.textContent = respuesta.texto;
              posiblesRespuestas.appendChild(boton);
              boton.addEventListener("click", () => validarRespuestas(boton.value) )
            })
            
        }, 10000*index)
      })
    } catch (error) {
      console.error("Error:", error);
    }
  }
  obtenerPreguntas();

function validarRespuestas(valor){
    if(valor === "true"){
        alert("Respuesta correcta");
    }else{
        alert("Respuesta incorrecta");
    }
}
