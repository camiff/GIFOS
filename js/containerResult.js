import { busqueda, traerGifos } from './search.js'

const btnVerMas = document.getElementById('verMas');
let offset1 = 0;


/*crea el contenedor de sugerencias del autocompletado*/
const suggestContainer = document.getElementById('suggest-container');
suggestContainer.addEventListener('click', function(event) {
   let query = event.target.innerText;
   busqueda(query);
   document.getElementById('suggest-container').innerHTML = '';
   btnVerMas.style.display = 'block';
})


//FUNCIONALIDAD BOTON VER MAS
// btnVerMas = document.getElementById('verMas');

btnVerMas.addEventListener('click', () => {
    offset1 = offset1 + 12;
    let q = input.value;
    let clickURLsearch = `
        https://api.giphy.com/v1/gifs/search?api_key=SsbriA4VI3IlgJ8nQHjiFzsjMPGRimor&limit=12&q=${q}&offset=${offset1};
    `;
    fetch(clickURLsearch)
   .then(response => response.json())
   .then(data => traerGifos(data, offset1, false))
   .catch(error => console.log("error:", error));
})
