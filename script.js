const player = new Howl({
    src: ['https://stream.zeno.fm/ki5fhhpz6lptv'],
    html5: true,
    volume: 0.8
});

const playBtn = document.getElementById('play');
const volume = document.getElementById('volume');

playBtn.addEventListener('click', () => {

    if (player.playing()) {
        player.pause();
        playBtn.textContent = '▶';
    } else {
        player.play();
        playBtn.textContent = '❚❚';
    }

});

volume.addEventListener('input', (e) => {
    player.volume(e.target.value / 100);
});
