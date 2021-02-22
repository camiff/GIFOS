// import {traerGifos} from './containerResult.js'

//CODIGO DE BARRA DE BUSQUEDA/ TRENDINGS
const lineTitle = document.getElementById('line-title');
const clickSearchIcon = document.getElementById('icon_searchgray');
const input = document.getElementById('input');
const searchBar = document.getElementById('search-bar');
let offset1 = 0;
const btnVerMas = document.getElementById('verMas');


clickSearchIcon.addEventListener('click', function (e) {
    e.preventDefault()
    const q = input.value;
    busqueda(q);
    btnVerMas.style.display = 'block';
    lineTitle.style.display = 'block';
    document.getElementById('suggest-container').innerHTML = "";

})

input.addEventListener("keypress", function (event) {
    if (event.code === 'Enter') {
        event.preventDefault();
        clickSearchIcon.click();
    }
});

/*trae los resultados de la barra de busqueda Y TRENDINGS*/
export const busqueda = (q) => {
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

/*autocompletado*/
input.addEventListener('input', function (event) {
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
    lineTitle.style.display = 'none';
    document.getElementById('title').innerHTML = '';
    document.getElementById('suggest-container').innerHTML = "";
});

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

export const traerGifos = (data, resetN, fromTrending) => {
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

            //titles y username del hover // no funciona
            let userName = document.createElement('p');
            userName = gif.username;
            let gifTitle = document.createElement('p');
            gifTitle = gif.title;

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
                    iconFavN.addEventListener('click', () => {
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
                    favedIcon.addEventListener('click', () => {
                        const containerFav = favedIcon.parentElement.parentNode;
                        divFavoritos.removeChild(containerFav);
                        iconFavN.classList.replace('faved-icon', 'icon-fav');
                        iconFavN.classList.remove('clicked');
                        iconFavN.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-fav.svg';
                    })

                    const downloadClone = document.querySelector('.icon-download')
                    downloadClone.addEventListener('click', () => {
                        console.log('holisss')
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
            iconFavN.addEventListener('mouseover', () => {
                wasIconFavNClicked = iconFavN.classList.contains('clicked');
                if (!wasIconFavNClicked) {
                    iconFavN.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-fav-hover.svg';
                }
            })
            iconFavN.addEventListener('mouseout', () => {
                wasIconFavNClicked = iconFavN.classList.contains('clicked');
                if (!wasIconFavNClicked) {
                    iconFavN.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-fav.svg';
                }
            })

            //download
            const iconDownloadList = document.getElementsByClassName('icon-download');
            // console.log(iconDownloadList)
            let iconDownloadN = iconDownloadList[n];

            console.log(iconDownloadN)
            iconDownloadN.addEventListener('click', () => {
                download(gifs, gif);
                console.log('algo')
            });
            iconDownloadN.addEventListener('mouseover', () => {
                iconDownloadN.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-download-hover.svg';
            })
            iconDownloadN.addEventListener('mouseout', () => {
                iconDownloadN.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-download.svg';
            })

            //ampliar
            const iconMaxList = document.getElementsByClassName('icon-max-normal');
            let iconMaxN = iconMaxList[n];
            const divMax = document.createElement('div');
            const closeMax = document.createElement('img');
            const iconosMax = document.createElement('div');
            iconMaxN.addEventListener('click', () => {
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

            closeMax.addEventListener('click', () => {
                containerGifHover.appendChild(gifs);
                gifs.classList.add('gifs');
                divMax.removeChild(closeMax);
                divMax.removeChild(iconosMax);
                divMax.classList.remove('gif-trending-max');
                hoverIcons.appendChild(iconFavN);
                hoverIcons.appendChild(iconDownloadN);
                hoverIcons.classList.add('icon-after-expand');
            })

            iconMaxN.addEventListener('mouseover', () => {
                iconMaxN.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-max-hover.svg';
            })
            iconMaxN.addEventListener('mouseout', () => {
                iconMaxN.src = './GIFOS-UI-Desktop+Mobile-Update/assets/icon-max-normal.svg';
            })
            n = n + 1;
        });
    } else {
        document.getElementById('notfound').style.display = 'block';
        btnVerMas.style.display = 'none';
    }
}