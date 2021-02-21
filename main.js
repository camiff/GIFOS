/*funcion para download los gifs*/
function toDataURL(url) {
    return fetch(url).then((response) => {
            return response.blob();
        }).then(blob => {
            return URL.createObjectURL(blob);
        });
}

async function download(img, gif) {
    let link = document.createElement('a');
    link.href = await toDataURL(img.src);
    link.download = gif.title + '.gif';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

//MENU

/*este codigo es para el menu hamburguesa para que se forme la cruz*/
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
menuBtn.addEventListener('click', ()=> {
    if(!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen=true;
        document.getElementById('search-bar').style.zIndex = '0';
    }
    else {
        menuBtn.classList.remove('open');
        menuOpen=false;
        document.getElementById('search-bar').style.zIndex = '1000';
    }
})
/*este codigo es para que el menu se abra y cierre*/
const navBar = document.querySelector('.menu');
menuBtn.addEventListener('click', () => {
  navBar.classList.toggle('toggle');
});




/*para cambiar al modo nocturno/diurno*/
const cambiarModo = document.querySelector('.cambiar-modo');
const body = document.body;
let searchBar = document.getElementById('search-bar');

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

/*para que aparezca Favoritos/MisGifos/Crear*/
let botonFavs = document.querySelector('.favs');
let botonGifos = document.querySelector('.gifos');
let botonCrearGifos = document.querySelector('.add-button');

let seccionHero = document.getElementById('hero');
let seccionFavs = document.getElementById('favoritos');
let seccionMisGifos = document.getElementById('mis-gifos');
let seccionCrearGifos = document.getElementById('crear-gifos');
 
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



/*sticky la barra de navegacion*/
const searchBarSticky = document.getElementById('search-bar');
const sectionOne = document.querySelector(".hero_img");
const header = document.getElementById('header');
const hero = document.getElementById('hero');

const sectionOneOptions = {
  rootMargin: "-100px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
        searchBarSticky.classList.add("nav-scrolled");
        
    } else {
        searchBarSticky.classList.remove("nav-scrolled");
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);

//CODIGO DE BARRA DE BUSQUEDA/ TRENDINGS
let lineTitle = document.getElementById('line-title');
let clickSearchIcon = document.getElementById('icon_searchgray');
let input = document.getElementById('input');
let btnVerMas = document.getElementById('verMas');
clickSearchIcon.addEventListener('click', function(e){
    e.preventDefault()
    let q = input.value;
    busqueda(q);
    btnVerMas.style.display = 'block';
    lineTitle.style.display ='block';
    document.getElementById('suggest-container').innerHTML = "";
    
})
 
input.addEventListener("keypress", function(event) {
    if (event.code === 'Enter') {
    event.preventDefault();
    clickSearchIcon.click();  
    }
});

/*autocompletado*/
input.addEventListener('input', function(event) {
    document.getElementById('suggest-container').innerHTML = "";
    let q = event.target.value;
    let autocompletadoURL = `https://api.giphy.com/v1/gifs/search/tags?api_key=SsbriA4VI3IlgJ8nQHjiFzsjMPGRimor&q=${q};`
    fetch(autocompletadoURL)
    .then(response => response.json())
    .then(data => autocompletado(data))
    .catch(error => console.log("error:", error));
    
    function autocompletado(data) {
        data.data.forEach(name => {
            const sugerencia = document.createElement('p');
            sugerencia.innerText = name.name;
            document.getElementById('suggest-container').appendChild(sugerencia);
            const lupaSearch = document.createElement('img');
            lupaSearch.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon_searchgray.png';
            sugerencia.appendChild(lupaSearch)
        })
    }
})
/*crea el contenedor de sugerencias del autocompletado*/
const suggestContainer = document.getElementById('suggest-container');
suggestContainer.addEventListener('click', function(event) {
   let query = event.target.innerText;
   busqueda(query);
   document.getElementById('suggest-container').innerHTML = '';
   btnVerMas.style.display = 'block';
})

/*para que cambie el comportamiento de la barra de busqueda activa*/
let iconSearch = document.getElementById('icon_search');
input.addEventListener('click', () => {
    iconSearch.src = './GIFOS-UI-Desktop+Mobile-Update/assets/close.svg';
    searchBar.classList.add('active');
});


/*limpia la busuqeda*/
iconSearch.addEventListener('click', () => {
    iconSearch.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-search.svg';
    searchBar.classList.remove('active');
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = '';
    document.getElementById('notfound').style.display = 'none';
    btnVerMas.style.display = 'none';
    input.value = ''; 
    lineTitle.style.display ='none';
    document.getElementById('title').innerHTML = '';
    document.getElementById('suggest-container').innerHTML = "";
});
 
/*trae los resultados de la barra de busqueda Y TRENDINGS*/
function busqueda(q){
    const searchURL = `
        https://api.giphy.com/v1/gifs/search?api_key=SsbriA4VI3IlgJ8nQHjiFzsjMPGRimor&limit=12&q=${q}
    `;

    fetch(searchURL)
    .then(response => response.json())
    .then(data => traerGifos(data, 0, false))
    .catch(error => console.log("error:", error));
    //vuelve a cero
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = '';
    offset1 = 0;
    //titulo de resultado
    let titleResult = document.getElementById('title');
    titleResult.innerText = q;
}

function traerGifos(data, resetN, fromTrending) {
    const resultContainer = document.getElementById('result-container');
    const gifTrending = document.getElementById('gif-trending');
    //Condicion para diferenciar
    if (fromTrending === true) {
        gifTrending.innerHTML = '';
        /*let gifTrendingList = document.getElementsByClassName('containerGifHover');
        let gifTrendingAmount = gifTrendingList.length;*/
        // gifTrendingList.forEach(gif => {
        //     let gifIndex = gifTrendingList.
        // })
    }
    let n = resetN;
    if (data.data.length !== 0) {
        data.data.forEach(gif => {
            const gifs = document.createElement('img');
            gifs.src = gif.images.original.url; 
            gifs.classList.add('gifs')   
            document.getElementById('notfound').style.display = 'none'; 

            // Esto crea el hover
            let userName = document.createElement('p');
            userName = gif.username;
            let gifTitle = document.createElement('p');
            gifTitle = gif.title;
            // fav icon
            const iconFav = document.createElement('img');
            iconFav.classList.add('icon-fav');
            iconFav.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-fav.svg';
            // download icon
            const iconDownload = document.createElement('img');
            iconDownload.classList.add('icon-download');
            iconDownload.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-download.svg';
            // max icon
            const iconMax = document.createElement('img');
            iconMax.classList.add('icon-max-normal');
            iconMax.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-max-normal.svg';
            // hover icons
            const hoverIcons = document.createElement('div');
            hoverIcons.classList.add('hoverIcons');
            hoverIcons.appendChild(iconFav);
            hoverIcons.appendChild(iconDownload);
            hoverIcons.appendChild(iconMax);
            // gif container
            const containerGifHover = document.createElement('div');
            containerGifHover.classList.add('containerGifHover');
            containerGifHover.appendChild(hoverIcons);
            containerGifHover.appendChild(gifs);

            //Condicion para diferenciar
            if (fromTrending === true) {
                gifTrending.appendChild(containerGifHover);
            } else {
                resultContainer.appendChild(containerGifHover);
            }

            //agregar a favoritos
            const divFavoritos = document.getElementById('div-favoritos');
            let iconFavList = document.getElementsByClassName('icon-fav');
            let iconFavN = iconFavList.item(n);
            let wasIconFavNClicked = iconFavN.classList.contains('clicked');
            iconFavN.addEventListener('click', () => {
                if (!wasIconFavNClicked) {
                    // cambia estilo del fav icon
                    iconFavN.classList.replace('icon-fav', 'faved-icon');
                    iconFavN.classList.add('clicked');
                    iconFavN.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-fav-active.svg';
                    iconFavN.addEventListener('click', ()=>{
                        const containerFav = favedIcon.parentElement.parentNode;
                        divFavoritos.removeChild(containerFav);
                        iconFavN.classList.replace('faved-icon', 'icon-fav');
                        iconFavN.classList.remove('clicked');
                        iconFavN.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-fav.svg';
                    })
                    // clonación
                    const gifClone = gifs.cloneNode(true);
                    const hoverIconsClone = hoverIcons.cloneNode(true);
                    hoverIconsClone.classList.add('hoverIcons');
                    const containerGifHover = document.createElement('div');
                    containerGifHover.classList.add('containerGifHover');
                    // faved icon
                    const favedIcon = document.createElement('img');
                    favedIcon.classList = 'faved-icon';
                    favedIcon.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-fav-active.svg';
                    favedIcon.addEventListener ('click', ()=>{
                       const containerFav = favedIcon.parentElement.parentNode;
                       divFavoritos.removeChild(containerFav);
                       iconFavN.classList.replace('faved-icon', 'icon-fav');
                       iconFavN.classList.remove('clicked');
                       iconFavN.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-fav.svg';
                    })
                    // reemplaza icon-fav por faved-icon
                    hoverIconsClone.firstChild.replaceWith(favedIcon);
                    // copia estructura de gif con hover
                    containerGifHover.appendChild(hoverIconsClone);
                    containerGifHover.appendChild(gifClone);
                    divFavoritos.appendChild(containerGifHover)
                    // elimina mensaje de favoritos vacíos
                    document.getElementById('favoritos-vacio').style.display = 'none';
                    /*Condicion para diferenciar
                    if (fromTrending === true) {
                        mostrarVerMas(imageFav);
                    } else {
                        mostrarVerMas();
                    }*/
                } else {
                    return false
                }
            })
            iconFavN.addEventListener('mouseover', ()=> {
                wasIconFavNClicked = iconFavN.classList.contains('clicked');
                if (!wasIconFavNClicked) {
                    iconFavN.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-fav-hover.svg';
                }
            })
            iconFavN.addEventListener('mouseout', ()=> {
                wasIconFavNClicked = iconFavN.classList.contains('clicked');
                if (!wasIconFavNClicked) {
                    iconFavN.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-fav.svg';
                }
            })

            //download
            let iconDownloadList = document.getElementsByClassName('icon-download');
            let iconDownloadN = iconDownloadList[n];
            iconDownloadN.addEventListener('click', () =>{
                download(gifs, gif);
            });
            iconDownloadN.addEventListener('mouseover', ()=>{
                iconDownloadN.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-download-hover.svg';
            })
            iconDownloadN.addEventListener('mouseout', ()=>{
                iconDownloadN.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-download.svg';
            })

            //ampliar
            const iconMaxList = document.getElementsByClassName('icon-max-normal');
            let iconMaxN = iconMaxList[n];
            const divMax = document.createElement('div');
            const closeMax = document.createElement('img');
            const iconosMax = document.createElement('div');
            iconMaxN.addEventListener('click', () =>{
                gifs.classList.remove('gifs');
                divMax.classList.add('gif-trending-max');
                closeMax.src = './GIFOS-UI-Desktop+Mobile-Update/assets/close.svg';
                closeMax.classList.add('closeMax');   
                iconosMax.classList.add('divIconosMax');
                iconosMax.innerHTML = `
                    <div>
                        <p id="username">${userName}</p>
                        <p id="gif-title">${gifTitle}</p>
                    </div>
                `;
                iconosMax.appendChild(iconFavN);
                iconosMax.appendChild(iconDownloadN);
                divMax.appendChild(closeMax);  
                divMax.appendChild(gifs);
                divMax.appendChild(iconosMax);
                //Condicion para diferenciar
                if (fromTrending === true) {
                    gifTrending.appendChild(divMax);
                } else {
                    resultContainer.appendChild(divMax);
                }
            });

            closeMax.addEventListener('click', () =>{
                containerGifHover.appendChild(gifs);
                gifs.classList.add('gifs');
                divMax.removeChild(closeMax);
                divMax.removeChild(iconosMax);
                divMax.classList.remove('gif-trending-max');
                hoverIcons.appendChild(iconFavN);
                hoverIcons.appendChild(iconDownloadN);
                hoverIcons.classList.add('icon-after-expand');
            })

            iconMaxN.addEventListener('mouseover', ()=>{
                iconMaxN.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-max-hover.svg';
            })
            iconMaxN.addEventListener('mouseout', ()=>{
                iconMaxN.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-max-normal.svg';
            })
            n = n + 1;
        });
    } else {
        document.getElementById('notfound').style.display = 'block';
        btnVerMas.style.display = 'none';
    }
}

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

//FUNCIONALIDAD BOTON VER MAS
let offset1 = 0;
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
});
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


//FUNCIONALIDAD BTN VER MAS FAVORITOS
function mostrarVerMas(imgFav) {
    let btnVerMasFav = document.getElementById('verMasFav');
    let divFav = document.getElementById('div-favoritos');
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
                let i = 0
                if (i === 4) {
                    child.style.display = 'block';
                }
                i = i + 1;
            });
        })
    }
}

//CREAR MIS GIFOS

const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
let hours = '00',
    minutes = '00',
    seconds = '00',
    chronometerDisplay = document.getElementById('temporizador'),
    chronometerCall
let cuadrado = document.getElementById('cuadrado');
let videoBox = document.getElementById('video-box');
let btnRepetirCaptura = document.getElementById('repetir-captura');
let btnComenzar = document.getElementById('comenzar');
let btnGrabarFinalizarSubir = document.getElementById('grabar-finalizar-subir');
let temporizador = document.getElementById('temporizador');
let contenedorMisGifos = document.getElementById('div-MisGifos');
btnComenzar.addEventListener('click', () => {
    //estilos
    document.getElementById('primer-h2').innerHTML = 
    `<h2>¿Nos das acceso a tu cámara?</h2>`;
    document.getElementById('primer-p').innerHTML = 
    `<p>El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.</p>`;
    btn1.style.backgroundColor = '#572EE5';
    btn1.style.color = 'white';
    btnComenzar.style.display = 'none';
    videoBox.style.display = 'block';
    if(body.classList == 'nocturno'){
        btn1.style.backgroundColor = 'white';
        btn1.style.color = ' #37383C';
    }
    ///
    getStreamAndRecord();
});

function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { ideal: 320 }
        }
    }).then(function(stream) {
        videoBox.srcObject = stream;
        videoBox.play();
        console.log(stream)
        //estilos
        document.getElementById('primer-h2').innerHTML = '';
        document.getElementById('primer-p').innerHTML = '';
        btn2.style.backgroundColor = '#572EE5';
        btn2.style.color = 'white';
        btn1.style.backgroundColor = 'white';
        btn1.style.color = '#572EE5';
        if(body.classList == 'nocturno'){
            btn1.style.backgroundColor = '#37383C';
            btn1.style.color = 'white';
            btn2.style.backgroundColor = 'white';
            btn2.style.color = '#37383C';
        }
        btnGrabarFinalizarSubir.style.display = 'block';
        ///
    })
};

let recorder = {};
let form = new FormData();
btnGrabarFinalizarSubir.addEventListener('click', () => {
    if (!recorder.state) {
        recorder = new RecordRTC(videoBox.srcObject, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            heigth: 320,
            hidden: 240,
            onGifRecordingStarted: function() {
                console.log('started');
            },
        });
    }
    if (recorder.state === 'inactive') {
        console.log(recorder.state);
        recorder.startRecording();
        console.log(recorder.state);
        recorder.state = 'recording';
        console.log(recorder.state);
        // Cambiar boton por Finalizar
        btnGrabarFinalizarSubir.innerHTML = 'FINALIZAR';
        // Agregar temporizador
        temporizador.style.display = 'block';
        // Iniciar conteo
        chronometerCall = setInterval(chronometer, 1000)
    } else if (recorder.state === 'recording') {
        console.log(recorder.state);
        recorder.stopRecording(function callback() {
            // Cambiar boton por Subir Gifo
            btnGrabarFinalizarSubir.innerHTML = 'SUBIR GIFO';
            console.log(recorder.getBlob());
        });
        console.log(recorder.state);
        recorder.state = 'stopped';
        console.log(recorder.state);
        // Agregar boton Repetir Captura
        btnRepetirCaptura.style.visibility = 'visible';
        temporizador.style.top = '-40px';
        // Finalizar conteo
        clearInterval(chronometerCall)
    } else if (recorder.state === 'stopped') {
        btnGrabarFinalizarSubir.style.display = 'none';
        btnRepetirCaptura.style.visibility = 'hidden';
        temporizador.style.display = 'none';
        console.log(recorder.state);
        // Agregar Gif a la pestaña Mis Gifos
        form.append('file', recorder.getBlob(), 'myGif.gif');
        let urlSubirGifo = `https://upload.giphy.com/v1/gifs?api_key=SsbriA4VI3IlgJ8nQHjiFzsjMPGRimor`;
        fetch(urlSubirGifo, {
            method: 'POST',
            body: form
        })
        .then(response => response.json())
        .then(data => almacenarEnLocalstorage(data))
        .catch(error => console.log("error:", error));
        //Pintar 3
        btn3.style.backgroundColor = '#572EE5';
        btn3.style.color = 'white';
        btn2.style.backgroundColor = 'white';
        btn2.style.color = '#572EE5';
        if(body.classList == 'nocturno'){
            btn2.style.backgroundColor = '#37383C';
            btn2.style.color = 'white';
            btn3.style.backgroundColor = 'white';
            btn3.style.color = '#37383C';
        }
        // Aparecer plantilla
        let alertaSubiendoGif = document.createElement('div');
        alertaSubiendoGif.classList.add('alertaSubiendoGif');
        alertaSubiendoGif.innerHTML = ` 
        <img id="loader" src="./GIFOS-UI-Desktop+Mobile-Update/assets/loader.svg">
        <p>Estamos subiendo tu GIFO</p>
        ` 
        cuadrado.appendChild(alertaSubiendoGif);
    }
});
//temporizador
btnRepetirCaptura.addEventListener('click', () => {
    if (recorder.state === 'stopped') {
        recorder = new RecordRTC(videoBox.srcObject, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            heigth: 320,
            hidden: 240,
            onGifRecordingStarted: function() {
                console.log('started');
            },
        });
        console.log(recorder.state);
        recorder.startRecording();
        console.log(recorder.state);
        recorder.state = 'recording';
        console.log(recorder.state);
        // Cambiar boton por Finalizar
        btnGrabarFinalizarSubir.innerHTML = 'FINALIZAR';
        btnRepetirCaptura.style.visibility = 'hidden';
        temporizador.style.top = '-55px';
        // Iniciar conteo
        clearInterval(chronometerCall)
        chronometerDisplay.textContent = `00:00:00`
        hours = '00',
        minutes = '00',
        seconds = '00'
        chronometerCall = setInterval(chronometer, 1000)
    }
})

function chronometer() {
    seconds ++
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    if (seconds > 59) {
        seconds = '00'
        minutes ++
        if (minutes < 10) {
            minutes = '0' + minutes
        }
    }
    if (minutes > 59) {
        minutes = '00'
        hours ++
        if (hours < 10) {
            hours = '0' + hours
        }
    }
    chronometerDisplay.textContent = `${hours}:${minutes}:${seconds}`
}

localStorage.clear();   //HOJALDRE: ESTO HAY QUE SACARLO DESPUES PORQUE SINO VA A BORRAR TODOS MIS GIFOS AL RECARGAR
let n = 0;              //HOJALDRE CON ESTO TAMBIÉN
function almacenarEnLocalstorage(data) {

    console.log(data);
    localStorage.setItem(`myGif-${n}`, data.data.id);
    console.log(localStorage);
    let idGifAgregar = localStorage.getItem(`myGif-${n}`);
    console.log(idGifAgregar);
    let urlGifAgregar = `https://api.giphy.com/v1/gifs?api_key=SsbriA4VI3IlgJ8nQHjiFzsjMPGRimor&ids=${idGifAgregar}`;
    fetch(urlGifAgregar)
   .then(response => response.json())
   .then(data => almacenarEnMisGifos(data))
   .catch(error => console.log("error:", error));
    n = n + 1;
}
function almacenarEnMisGifos(data) {
    let nuevoGifo = document.createElement('img');
    nuevoGifo.classList.add('gifs');
    let hoverMisGifosIcons = document.createElement('div');
    hoverMisGifosIcons.classList.add('hoverIcons');
    hoverMisGifosIcons.innerHTML = `
    <img class="icon-trash" src="./GIFOS-UI-Desktop+Mobile-Update/assets/icon-trash-normal.svg">
    <img class="icon-download" src="./GIFOS-UI-Desktop+Mobile-Update/assets/icon-download.svg">
    <img class="icon-max-normal" src="./GIFOS-UI-Desktop+Mobile-Update/assets/icon-max-normal.svg">
` ;
    const containerGifHoverMisGifos = document.createElement('div');
    containerGifHoverMisGifos.classList.add('containerGifHover');
    containerGifHoverMisGifos.appendChild( hoverMisGifosIcons);
    containerGifHoverMisGifos.appendChild(nuevoGifo);
    contenedorMisGifos.appendChild(containerGifHoverMisGifos);
    document.getElementById('misGifos-vacio').style.display = 'none';


    console.log(data.data[0].images);
    nuevoGifo.src = data.data[0].images.original.url;
    // Cambia mensaje de plantilla
    let alertaGifSubido = document.createElement('div');
    alertaGifSubido.classList.add('alertaGifSubido');
    alertaGifSubido.innerHTML = ` 
    <img id="check" src="./GIFOS-UI-Desktop+Mobile-Update/assets/check.svg">
    <p>GIFO subido con éxito</p>
    <img class="icon-download" src="./GIFOS-UI-Desktop+Mobile-Update/assets/icon-download.svg">
    <img class="icon-trash" src="./GIFOS-UI-Desktop+Mobile-Update/assets/icon-trash-normal.svg">
    ` 
    cuadrado.appendChild(alertaGifSubido);
    document.querySelector('.alertaSubiendoGif').innerHTML = '';
}

