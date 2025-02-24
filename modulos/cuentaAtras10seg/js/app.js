let segundos = 10;
let aux = 0;
let h1 = document.getElementById("cuentaAtras");
let intervalo = setInterval(cuentaAtras, 1000);
function cuentaAtras (){
    h1.textContent = segundos - aux;
    aux++;
    if (aux == 12){
        clearInterval(intervalo);
        h1.textContent = "Fin";
        h1.style.scale = 4;
    }
}
