const track = document.getElementById("track");
const track_img = document.getElementById("track_img");
const background_image = document.querySelector("content");
const trackArtist = document.getElementById("artist_name");
const trackTitle = document.getElementById("track_name");
const track_time = document.getElementById("track_time");
const currentTime = document.getElementById("currentTime");
const durationTime = document.getElementById("durationTime");
let play = document.getElementById("play_music");
let pause = document.getElementById("pause_music");
let next = document.getElementById("next-track");
let prev = document.getElementById("back_track");

let trackIndex = 0;
let playing = false;
let trackList = [
  {
    "path": "mp3/feelingGood.mp3",
    "img": "images/tracks/feelingood_nina.jpeg",
    "title": "Feeling Good",
    "artist": "Nina Simone"
  },
  {
    "path": "mp3/respect.mp3",
    "img": "images/tracks/respect_aretha.jpeg",
    "title": "Respect",
    "artist": "Aretha Franklin"
  },
  {
    "path": "mp3/flyMeToTheMoon.mp3",
    "img": "images/tracks/flymetothemoon_frank.jpeg",
    "title": "Fly Me To The Moon",
    "artist": "Frank Sinatra"
  },
  {
    "path": "mp3/standByMe.mp3",
    "img": "images/tracks/standbyme_ben.jpeg",
    "title": "Stand By Me",
    "artist": "Ben E. King"
  }
];
function pausePlay(trackIndex) {
  if (playing) {
    play_music.style.display = "none";
    pause_music.style.display = "block";
    track.play();
    playing = false;
}
else {
    pause_music.style.display = "none";
    play_music.style.display = "block";
    track.pause();
    playing = true;
  }
}

play_music.addEventListener("click", pausePlay);
pause_music.addEventListener("click", pausePlay);
track.addEventListener("ended", nextTrack);

function nextTrack() {
  trackIndex++;
  if (trackIndex > trackList.length - 1) {
    trackIndex = 0;
  }
  track.src = trackList[trackIndex].path;
  track_img.src = trackList[trackIndex].img;
  trackArtist.innerHTML = trackList[trackIndex].artist;
  trackTitle.innerHTML = trackList[trackIndex].title;
  random_bg_color();

  playing = true;
  pausePlay();
}

next_track.addEventListener("click", nextTrack);

function backTrack() {
  trackIndex--;
  if (trackIndex < 0) {
    trackIndex = trackList.length - 1;
  }

  track.src = trackList[trackIndex].path;
  track_img.src = trackList[trackIndex].img;
  trackArtist.textContent = trackList[trackIndex].artist;
  trackTitle.textContent = trackList[trackIndex].title;
  random_bg_color();

  playing = true;
  pausePlay();
}

prev.addEventListener("click", backTrack);

function random_bg_color() {
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;
  let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
  document.body.style.background = bgColor;
}

function timeValue() {
  track_time.max = track.duration;
  track_time.value = track.currentTime;
  currentTime.textContent = formatTime(track.currentTime);
  durationTime.textContent = formatTime(track.duration);
}

setInterval(timeValue, 500);

function formatTime(sec) {
  let minutes = Math.floor(sec / 60);
  let seconds = Math.floor(sec - minutes * 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

function changeTimeBar() {
  track.currentTime = track_time.value;
}

track_time.addEventListener("click", changeTimeBar);

pausePlay(0);
