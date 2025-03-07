//Variables
//variable para saber si ya estamos con la ultima pregunta, para cambiar el texto de siguiente pregunta
let ultimaPregunta = false;
//Select que va permitir seleccionar diferentes valores, los cuales usaremos para elegir el json del que vamos a extraer los datos
let juegos = document.getElementById("juegos");
//Contiene el logo inicial, solo va a aparecer 5 segundos
let dialogo = document.getElementById("dialogo");
let segundos = 10;
let aux = 0;
//Donde se vera la cuenta atrás, lo ocultamos de esta manera cutre para que no apezca con la intro al principio
let h1 = document.getElementById("cuentaAtras");
h1.style.display = "none";
//Aqui se va a visualizar las pregunta con las respuestas, también se oculta al principio
let dialog = document.getElementById("modal");
dialog.style.display = "none";
//Padre al que le haremos el append de botones que contienen las respuestas
let posiblesRespuestas = document.getElementById("posiblesRespuestas");
//Donde mostraremos la pregunta
let h2 = document.getElementById("pregunta");
let intervalo;
let puntos = [];
let correctas = 0;
let incorrectas = 0;
let preguntasTotales;
let respondido = false;
let origen;
//intro
function ocultarLogo (){
    let logo = document.getElementById("logo");
    logo.style.display = "none";
    mostrarDialogo();
}
function mostrarDialogo(){
   dialogo.showModal();
}
setTimeout(ocultarLogo, 5000);
//Estilo que tenia el dialogo donde se visualizan las preguntas
function dialogStyle(){
  dialogo.close();
  dialog.style.display="flex";
  dialog.style.position ="relative";
  dialog.style.flexDirection="column";
  dialog.style.alignItems="center";
  dialog.style.borderRadius=10;
   h1.style.display = "block";
   h1.style.transform = 2;   
   //Forzar que el titulo y el modal aparezcan uno debajo de otro
   document.body.style.display="flex";
   document.body.style.flexDirection="column";
}
//Una vez que el usuario eliga un juego ocultamos el select y mostramos lo que nos interesa
juegos.addEventListener("change", () => {obtenerPreguntas(juegos.value); dialogStyle();});
//Intento de integrar las preguntas
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
    if(ultimaPregunta){
      h2.textContent = "Cargando resultados...";
    }else{
    h2.textContent = "Cargando siguiente pregunta...."};
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
    boton.addEventListener("click", () => validarRespuestas(boton));
  });
}
async function obtenerPreguntas(value) {
  //dialog.showModal();
  dialogo.style.display = "none";
  try {
    const response = await fetch(value);
    if (!response.ok) {
      throw new Error("Error al obtener las preguntas");
    }
    const preguntas = await response.json();
    preguntasTotales = preguntas.length;
    preguntas.forEach((pregunta, index) => {
      setTimeout(() => {
        if ( index == (preguntas.length-1)){
          ultimaPregunta = true;
        }else{
          ultimaPregunta = false;
        }
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
function validarRespuestas(boton) {
  valor = boton.value;
  //Esto lo hacemos, porque no queremos se puedan seleccionar varias respuestas
  if (respondido) return;
  clearInterval(intervalo);
  let tiempoRestante = segundos - aux;
  let puntuacion = (tiempoRestante + 1) * 100;
  if (valor === "true") {
    correctas++;
    puntos.push(puntuacion);
    boton.style.background = "green";
    boton.style.color = "black";
  } else {
    boton.style.background = "red";
    boton.style.color = "black";
    incorrectas++;
    puntos.push(0);
  }
  respondido = true;
  siguientePregunta();
}
//Para mostrar los resultados

  function mostrarResultados() {
    //Les asignamos un id para poder borrarlo en la siguiente partida
    let r = document.createElement("p");
    r.id = "r";
    r.textContent = `Resultados Finales:`;
    let correctasP = document.createElement("p");
    correctasP.id = "correctasP";
    let incorrectasP = document.createElement("p");
    incorrectasP.id = "incorrectasP";
    let puntosMsg = document.createElement("p");
    puntosMsg.id = "puntosMsg";
    correctasP.textContent = `Correctas: ${correctas}`;
    incorrectasP.textContent = `Incorrectas: ${incorrectas}`;
    puntosMsg.textContent = `Puntos totales: ${puntos.reduce((acu,p) => acu + p, 0)}`;
    dialog.appendChild(r);
    dialog.appendChild(correctasP);
    dialog.appendChild(incorrectasP);
    dialog.appendChild(puntosMsg);
h2.textContent = "Volver a inicio";
}

//Evento fuera de mostrar resultados
h2.addEventListener("click", recrearInicio )

//Intentar recrear el inicio
function recrearInicio(){
  if(h2.textContent == "Volver a inicio"){
  h1.style.display = "none";
  dialog.close();
  dialog.style.display = "none";
  dialogo.showModal();
  dialogo.style.display = "flex";
  //Cuando el usuario quiera volver a inicio, para que el change del select no de problemas si quiere volver a jugar el mismo
  juegos.value = "";
  //Borrar los resultados anteriores
  if(document.getElementById("r")){
    dialog.removeChild(document.getElementById("r"));
    dialog.removeChild(document.getElementById("correctasP"));
    dialog.removeChild(document.getElementById("incorrectasP"));
    dialog.removeChild(document.getElementById("puntosMsg"));
  }
  }
  //También tenemos que resetar las variables de las puntuaciones
  incorrectas = 0;
  correctas = 0;
  puntos = [];
}
//Musica
document.addEventListener("DOMContentLoaded", function () {
  let audio = document.getElementById("musica");
  audio.play().catch(error => {
      console.log("Autoplay bloqueado, esperando interacción del usuario.");
  });

  document.addEventListener("click", function () {
      audio.play();
  });
});