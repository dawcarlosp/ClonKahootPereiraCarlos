let dialogo = document.getElementById("dialogo");
function ocultarLogo (){
    let logo = document.getElementById("logo");
    logo.style.display = "none";
    mostrarDialogo();
}
function mostrarDialogo(){
   dialogo.showModal();
}
setTimeout(ocultarLogo, 5000);