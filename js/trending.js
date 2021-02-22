import {traerGifos} from './search.js';

//TITULOS DE TRENDINGS DEL HERO  
const urlTags = 'https://api.giphy.com/v1/trending/searches?api_key=SsbriA4VI3IlgJ8nQHjiFzsjMPGRimor&limit=4';
 
fetch(urlTags)
.then(response => response.json())
.then(data => createTags(data))
.catch(error => console.log("error:", error));
 
function createTags(data) {
    let title = [];   
    for(let i = 0; i <4; i++) {
        const titleString = data.data[i];
        title.push(titleString);
    }
    const concatTitle = title.join(', ');
    const finalTitle = document.createElement('p');
    finalTitle.innerText = concatTitle;
    const trendingHero = document.getElementById('trending_hero');
    trendingHero.appendChild(finalTitle);
};


 
//TRENDING DEL SLIDER 
const urlTrending = 'https://api.giphy.com/v1/gifs/trending?api_key=SsbriA4VI3IlgJ8nQHjiFzsjMPGRimor&limit=3'; 
 
fetch(urlTrending)
.then(response => response.json())
.then(data => traerGifos(data, 0, true))
.catch(error => console.log("error:", error));

/*trae mas img de trending onclick en slide derecho R7cTAy3NlajpF4sPQjmP9nmlxvKtH1Yi*/
let sliderRight = document.getElementById('sliderRight');
let offset = 0;
sliderRight.addEventListener('click', () => {
    offset = offset + 3;
    let clickUrl = `
        https://api.giphy.com/v1/gifs/trending?api_key=SsbriA4VI3IlgJ8nQHjiFzsjMPGRimor&limit=3&offset=${offset}
    `;
    fetch(clickUrl)
   .then(response => response.json())
   .then(data => traerGifos(data, 0, true))
   .catch(error => console.log("error:", error));
})

/*hover de slider derecho*/
sliderRight.addEventListener('mouseover', () =>{
    sliderRight.src = './GIFOS-UI-Desktop+Mobile-Update/assets/Button-Slider-right-hover.svg';
})

sliderRight.addEventListener('mouseout', () =>{
    sliderRight.src = './GIFOS-UI-Desktop+Mobile-Update/assets/Button-Slider-right.svg';
    if (body.classList == 'nocturno'){
        sliderRight.src = './GIFOS-UI-Desktop+Mobile-Update/assets/button-slider-right-md-noct.svg';
    }
});
 
/*trae mas img de trending onclick en slide izquierdo R7cTAy3NlajpF4sPQjmP9nmlxvKtH1Yi*/
let sliderLeft = document.getElementById('sliderLeft');

sliderLeft.addEventListener('click', () => {
    if (offset <= 0) {
        return false;
    } else {
        offset = offset - 3;
        let clickUrl = `
            https://api.giphy.com/v1/gifs/trending?api_key=SsbriA4VI3IlgJ8nQHjiFzsjMPGRimor&limit=3&offset=${offset}
        `;
        fetch(clickUrl)
        .then(response => response.json())
        .then(data => traerGifos(data, 0, true))
        .catch(error => console.log("error:", error));
    } 
 });

/*hover de slider izquierdo*/
sliderLeft.addEventListener('mouseover', () =>{
    sliderLeft.src = './GIFOS-UI-Desktop+Mobile-Update/assets/button-slider-left-hover.svg';
});
sliderLeft.addEventListener('mouseout', () =>{
    sliderLeft.src = './GIFOS-UI-Desktop+Mobile-Update/assets/button-slider-left.svg';
    if (body.classList == 'nocturno'){
        sliderLeft.src = './GIFOS-UI-Desktop+Mobile-Update/assets/button-slider-left-md-noct.svg';
    }
});