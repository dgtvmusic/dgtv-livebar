/* ===========================================
   DG TV LIVE RADIO PLAYER V2
=========================================== */

const audio = document.getElementById("radio");
const playButton = document.getElementById("playButton");
const muteButton = document.getElementById("muteButton");
const volume = document.getElementById("volume");
const loader = document.getElementById("loader");
const trackTitle = document.getElementById("trackTitle");
const player = document.querySelector(".player");

/* --------------------------
   Volume
-------------------------- */

let savedVolume = localStorage.getItem("dgtv-volume");

if(savedVolume !== null){

    audio.volume = savedVolume;
    volume.value = savedVolume * 100;

}else{

    audio.volume = 0.8;

}

/* --------------------------
   Play / Pause
-------------------------- */

playButton.addEventListener("click", ()=>{

    if(audio.paused){

        loader.style.display="block";

        audio.play();

    }else{

        audio.pause();

    }

});

/* --------------------------
   Stream avviato
-------------------------- */

audio.addEventListener("playing",()=>{

    loader.style.display="none";

    player.classList.add("playing");

    playButton.innerHTML=`

    <svg viewBox="0 0 24 24">
    <path fill="currentColor"
    d="M6 5h4v14H6zm8 0h4v14h-4z"/>
    </svg>`;

    trackTitle.innerHTML="DG TV LIVE RADIO • LIVE";

});

/* --------------------------
   Pausa
-------------------------- */

audio.addEventListener("pause",()=>{

    player.classList.remove("playing");

    playButton.innerHTML=`

    <svg viewBox="0 0 24 24">
    <path fill="currentColor"
    d="M8 5v14l11-7z"/>
    </svg>`;

    trackTitle.innerHTML="Premere PLAY";

});

/* --------------------------
   Buffering
-------------------------- */

audio.addEventListener("waiting",()=>{

    loader.style.display="block";

});

audio.addEventListener("canplay",()=>{

    loader.style.display="none";

});

/* --------------------------
   Errori
-------------------------- */

audio.addEventListener("error",()=>{

    loader.style.display="none";

    trackTitle.innerHTML="Errore connessione stream";

});

/* --------------------------
   Volume
-------------------------- */

volume.addEventListener("input",()=>{

    audio.volume = volume.value / 100;

    localStorage.setItem(
        "dgtv-volume",
        audio.volume
    );

});

/* --------------------------
   Mute
-------------------------- */

muteButton.addEventListener("click",()=>{

    audio.muted=!audio.muted;

    if(audio.muted){

        muteButton.innerHTML="🔇";

    }else{

        muteButton.innerHTML="🔊";

    }

});

/* --------------------------
   Aggiornamento metadata
-------------------------- */

setInterval(()=>{

    /*
    Qui in futuro verranno letti
    automaticamente:

    - Titolo brano
    - Artista
    - Programma
    - Copertina

    tramite API dello stream.

    */

},10000);

/* --------------------------
   Avvio
-------------------------- */

window.addEventListener("load",()=>{

    loader.style.display="none";

});
