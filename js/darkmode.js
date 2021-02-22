/*para cambiar al modo nocturno/diurno*/
const cambiarModo = document.querySelector('.cambiar-modo');
const body = document.body;

cambiarModo.addEventListener('click', () => {
    body.classList.toggle('nocturno');
    if (cambiarModo.textContent ==="Modo nocturno") {
        cambiarModo.textContent = "Modo diurno";
    } else {
        cambiarModo.textContent = "Modo nocturno";
    }
    if(body.classList == 'nocturno'){
        document.getElementById('icon_search').src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-search-modo-noct.svg';
        document.getElementById('sliderLeft').src = './GIFOS-UI-Desktop+Mobile-Update/assets/button-slider-left-md-noct.svg';
        document.getElementById('sliderRight').src = './GIFOS-UI-Desktop+Mobile-Update/assets/button-slider-right-md-noct.svg';
        document.getElementById('camara').src = './GIFOS-UI-Desktop+Mobile-Update/assets/camara-modo-noc.svg';
        document.getElementById('pelicula').src = './GIFOS-UI-Desktop+Mobile-Update/assets/pelicula-modo-noc.svg';
    } else {
        document.getElementById('icon_search').src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-search.svg';
        document.getElementById('sliderLeft').src = './GIFOS-UI-Desktop+Mobile-Update/assets/button-slider-left.svg';
        document.getElementById('sliderRight').src = './GIFOS-UI-Desktop+Mobile-Update/assets/Button-Slider-right.svg';
        document.getElementById('camara').src = './GIFOS-UI-Desktop+Mobile-Update/assets/camara.svg';
        document.getElementById('pelicula').src = './GIFOS-UI-Desktop+Mobile-Update/assets/pelicula.svg';
    }   
}); 