let segundos = 10;
let aux = 0;
let h1 = document.getElementById("cuentaAtras");
let dialog = document.getElementById("modal");
let botones = document.querySelectorAll("button");
let posiblesRespuestas = document.getElementById("posiblesRespuestas");
let h2 = document.getElementById("pregunta");
let intervalo;
let puntos = [];
let correctas = 0;
let incorrectas = 0;
let preguntasTotales;
let respondido = false;
//Muestra la cuenta regresiva y se encarga de manipular el dom, también si no se responde a tiempo suma las incorrectas
function cuentaAtras() {
  h1.textContent = segundos - aux;
  aux++;
  if (aux >= segundos) {
    clearInterval(intervalo);
    h1.textContent = "Fin";
    incorrectas++;
    puntos.push(0);
    siguientePregunta();
  }
}
//Simplemente se encarga de entre pregunta y pregunta, agregar un mensaje para dar una sensación
function siguientePregunta() {
  setTimeout(() => {
    h2.textContent = "Cargando siguiente pregunta....";
    posiblesRespuestas.innerHTML = "";
  }, 1000);
}
//Mostrar las preguntas y los botones
function mostrarPregunta(pregunta) {
  clearInterval(intervalo);
  aux = 0;
  segundos = 10;
  respondido = false;
  intervalo = setInterval(cuentaAtras, 1000);
  h2.textContent = pregunta.pregunta;
  posiblesRespuestas.innerHTML = "";
  let respuestas = pregunta.respuestas;
  respuestas.forEach((respuesta) => {
    let boton = document.createElement("button");
    boton.value = respuesta.correcta;
    boton.textContent = respuesta.texto;
    posiblesRespuestas.appendChild(boton);
    boton.addEventListener("click", () => validarRespuestas(boton.value));
  });
}
async function obtenerPreguntas() {
  try {
    const response = await fetch("js/preguntas.json");
    if (!response.ok) {
      throw new Error("Error al obtener las preguntas");
    }
    const preguntas = await response.json();
    preguntasTotales = preguntas.length;
    preguntas.forEach((pregunta, index) => {
      setTimeout(() => {
        mostrarPregunta(pregunta)
;      }, 13000 * index);
    });
    setTimeout(() => {
      mostrarResultados();
    }, 13000 * preguntas.length);
  } catch (error) {
    console.error("Error:", error);
  }
}
//Se encarga de ver si la respuesta es correcta o no
function validarRespuestas(valor) {
  //Esto lo hacemos, porque no queremos se puedan seleccionar varias respuestas
  if (respondido) return;
  clearInterval(intervalo);
  let tiempoRestante = segundos - aux;
  let puntuacion = (tiempoRestante + 1) * 100;
  if (valor === "true") {
    correctas++;
    puntos.push(puntuacion);
  } else {
    incorrectas++;
    puntos.push(0);
  }
  respondido = true;
  siguientePregunta();
}
//Para mostrar los resultados

  function mostrarResultados() {
    alert(`🏆 Resultados finales: 
✅ Correctas: ${correctas}
❌ Incorrectas: ${incorrectas}
🎯 Puntos Totales: ${puntos.reduce((acu, p) => acu + p, 0)}`);
h2.textContent = "Volver a inicio";
h2.addEventListener("click", () => alert("No hay inicio"))
}

obtenerPreguntas();