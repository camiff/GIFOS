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

