/*para que aparezca Favoritos/MisGifos/Crear*/
const botonFavs = document.querySelector('.favs');
const botonGifos = document.querySelector('.gifos');
const botonCrearGifos = document.querySelector('.add-button');

const seccionHero = document.getElementById('hero');
const seccionFavs = document.getElementById('favoritos');
const seccionMisGifos = document.getElementById('mis-gifos');
const seccionCrearGifos = document.getElementById('crear-gifos');
 
botonFavs.addEventListener('click', () => {
        seccionFavs.style.display = 'block';
        seccionHero.style.display = 'none';
        seccionMisGifos.style.display = 'none';
        seccionCrearGifos.style.display = 'none';   
});
botonGifos.addEventListener('click', () => {
    seccionMisGifos.style.display = 'block';
    seccionHero.style.display = 'none';
    seccionFavs.style.display = 'none';
    seccionCrearGifos.style.display = 'none';
  
});

botonCrearGifos.addEventListener('click', () => {
    seccionCrearGifos.style.display = 'block';
    seccionHero.style.display = 'none';
    seccionFavs.style.display = 'none';
    seccionMisGifos.style.display = 'none';
});



//FUNCIONALIDAD BTN VER MAS FAVORITOS
function mostrarVerMas(imgFav) {
    const btnVerMasFav = document.getElementById('verMasFav');
    const divFav = document.getElementById('div-favoritos');
    if (divFav.childNodes.length <= 12) {
        btnVerMasFav.style.display = 'none';
        if (divFav.childNodes.length === 0) {
            // insertar texto con mensaje
        }
    } else {
        btnVerMasFav.style.display = 'block';
        imgFav.style.display = 'none';
        btnVerMasFav.addEventListener('click', () => {
            divFav.childNodes.forEach(child => {
                const i = 0
                if (i === 4) {
                    child.style.display = 'block';
                }
                i = i + 1;
            });
        })
    }
}
