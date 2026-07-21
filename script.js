const playButton = document.getElementById("playButton");
const muteButton = document.getElementById("muteButton");
const volume = document.getElementById("volume");
const loader = document.getElementById("loader");
const trackTitle = document.getElementById("trackTitle");
const player = document.querySelector(".player");

let playing = false;

const radio = new Howl({
    src: ["https://stream.zeno.fm/ki5fhhpz6lptv"],
    html5: true,
    format: ["mp3"],
    volume: 0.8,
    onplay: () => {
        loader.style.display = "none";
        player.classList.add("playing");
        trackTitle.textContent = "DG TV LIVE RADIO • LIVE";
        playButton.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path fill="currentColor"
                d="M6 5h4v14H6zm8 0h4v14h-4z"/>
            </svg>`;
        playing = true;
    },
    onload: () => {
        loader.style.display = "none";
    },
    onloaderror: () => {
        loader.style.display = "none";
        trackTitle.textContent = "Errore caricamento stream";
    },
    onplayerror: () => {
        loader.style.display = "none";
        trackTitle.textContent = "Impossibile avviare lo stream";
    },
    onend: () => {
        playing = false;
    }
});

playButton.addEventListener("click", () => {

    if (!playing) {
        loader.style.display = "block";
        radio.play();
    } else {
        radio.pause();
        player.classList.remove("playing");
        trackTitle.textContent = "Premere PLAY";
        playButton.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path fill="currentColor"
                d="M8 5v14l11-7z"/>
            </svg>`;
        playing = false;
    }

});

volume.addEventListener("input", () => {
    radio.volume(volume.value / 100);
    localStorage.setItem("dgtv-volume", volume.value);
});

const saved = localStorage.getItem("dgtv-volume");

if (saved) {
    volume.value = saved;
    radio.volume(saved / 100);
}

muteButton.addEventListener("click", () => {

    radio.mute(!radio.mute());

    muteButton.textContent = radio.mute() ? "🔇" : "🔊";

});
