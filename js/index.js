const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('duration'),
progress = document.getElementById('progress'),
playerProgress = document.getElementById('player-progress'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play'),
background = document.getElementById('bg-img');

const music = new Audio();

const songs = [ 
    {
        path: 'src/Music/1.mp3',
        displayName: 'Save Me',
        cover: 'src/Bg/bg-2.jpg',
        artist: 'Live From The Apocalypse',
    },

    {
        path: 'src/Music/2.mp3',
        displayName: 'Circle With Me',
        cover: 'src/Bg/bg-3.jpg',
        artist: 'Spiritbox',
    },

    {
        path: 'src/Music/3.mp3',
        displayName: 'Courtesy Call',
        cover: 'src/Bg/bg-4.jpg',
        artist: 'Thousand Foot Krutch',
    },

    {
        path: 'src/Music/4.mp3',
        displayName: 'Choke',
        cover: 'src/Bg/bg-5.jpg',
        artist: 'Bury Tomorrow',
    },

    {
        path: 'src/Music/5.mp3',
        displayName: 'Falling Through the Sky',
        cover: 'src/Bg/bg-6.jpg',
        artist: 'Fit for a King',
    },


    {
        path: 'src/Music/6.mp3',
        displayName: ' Victims Of Contingency',
        cover: 'src/Bg/bg-1.jpeg',
        artist: 'Epica',
    },

];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic (){
    isPlaying = true;

    playBtn.classList.replace('fa-play', 'fa-pause');
    
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic (){
    isPlaying = false;

    playBtn.classList.replace('fa-pause', 'fa-play');
    
    playBtn.setAttribute('title', 'Play');
    music.pause();
}


function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) %
    songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const { duration, currentTime} = music;
    const progressPercent = (currentTime / duration ) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2,'0');
    durationEl.textContent = `${formatTime( duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime( currentTime / 60)}:${formatTime(currentTime % 60)}`;
}


function setProgressBar (e) {
const width = playerProgress.clientWidth;
const clickX = e.offsetX;
music.currentTime = ( clickX / width) * music.duration;

} 


playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);