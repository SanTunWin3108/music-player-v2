const audio = document.getElementById('audio');
const play_pause_btn = document.getElementById('play-pause');
const resumeBtn = document.getElementById('resume');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const play_lists = document.getElementById('play-lists');
const progress_bar = document.getElementById('music-progress-bar');
const volume_bar = document.getElementById('volume-bar');
let music_name = document.getElementById('music-name');
let currentTimeDisplay = document.getElementById('currentTime');
let durationDisplay = document.getElementById('duration');
let song_id = -1;
let isPlaying = false;
let currentSong = 0;

const song_lists_arr = [
    {
        song_title: 'Viva la Vida - Cold Play',
        song_src: '../Music/Coldplay - Viva la Vida (Lyrics).mp3'
    },

    {
        song_title: 'To be with You - Mr Big',
        song_src: '../Music/Mr Big - To be with you Lyrics.mp3'
    },

    {
        song_title: 'Tease Me Please Me - Scorpions',
        song_src: '../Music/Scorpions - Tease Me Please Me 《Lyrics》.mp3'
    },

    {
        song_title: 'I Lay My Love On You - Westlife',
        song_src: '../Music/Westlife - I Lay My Love On You (Lyrics).mp3'
    },

    {
        song_title: 'My Love - Westlife',
        song_src: '../Music/Westlife - My Love (Lyrics).mp3'
    },
];

//volume to 0.5
audio.volume = 0.5;

//hide resumeBtn
resumeBtn.style.display = 'none';

//create play lists
for(let item of song_lists_arr) {
    song_id++;
    let song = document.createElement('li');
    song.id = song_id;
    song.classList.add('text-warning', 'mb-3', 'fs-5', 'song-item');
    song.textContent = item.song_title;
    play_lists.append(song);
}

//user click song name and the song will play
play_lists.addEventListener('click', (event) => {
    if(event.target.classList.contains('song-item')) {
        playSong(event.target.id);
    }
})

//play and pause buttons
play_pause_btn.addEventListener('click', function() {
    if(isPlaying) {
        pauseSong();
    } else {
        playSong(currentSong);
    }
})

//resume button
resumeBtn.addEventListener('click', function() {
    audio.play();
    resumeBtn.style.display = 'none';
    play_pause_btn.textContent = 'Stop';
    isPlaying = true;
})

//next button
nextBtn.addEventListener('click', function() {
    nextSong();
})

//prev button
prevBtn.addEventListener('click', function() {
    prevSong();
})

//show current time and duration
audio.addEventListener('timeupdate', function() {
    showCurrentTimeAndDuration();
})

//control progress bar
progress_bar.addEventListener('input', function() {
    if(audio.duration) {
        audio.currentTime = (this.value / 100) * audio.duration;
        if(audio.currentTime === audio.duration) {
            nextSong();
    }
    }
}) 
 
//control volume bar
volume_bar.addEventListener('input', function() {
    audio.volume = this.value;
})


//function play song
function playSong(index) {
    music_name.textContent = song_lists_arr[parseInt(index)].song_title;
    audio.src = song_lists_arr[parseInt(index)].song_src;
    audio.load();
    audio.play();
    isPlaying = true;
    play_pause_btn.textContent = 'Stop';
    resumeBtn.style.display = 'none';
    currentSong = index;
}

//function pause song
function pauseSong() {
    audio.pause();
    play_pause_btn.textContent = 'Play';
    resumeBtn.style.display = 'inline';
    isPlaying = false;
}

//function next song
function nextSong() {
    currentSong++;
    if(currentSong < song_lists_arr.length) {
        playSong(currentSong);
    } else {
        currentSong = song_lists_arr.length - 1;
    }
    
}

//function previous song
function prevSong() {
    currentSong--;
    if(currentSong >= 0) {
        playSong(currentSong);
    } else {
        currentSong = 0;
    }
}

//function show current time and duration
function showCurrentTimeAndDuration() {
    const duration = audio.duration;
    const currentTime = audio.currentTime; 
    if(!duration) {
        durationDisplay.textContent = '00:00';
    } else {
        let durationMinute = Math.floor(duration / 60);
        let durationSecond = Math.floor(duration % 60);
        let durationMinuteText = durationMinute < 10 ? '0' + durationMinute : durationMinute;
        let durationSecondText = durationSecond < 10 ? '0' + durationSecond : durationSecond;
        durationDisplay.textContent = `${durationMinuteText}:${durationSecondText}`;

        let currentTimeMinute = Math.floor(currentTime / 60);
        let currentTimeSecond = Math.floor(currentTime % 60);
        let currentTimeMinuteText = currentTimeMinute < 10 ? '0' + currentTimeMinute : currentTimeMinute;
        let currentTimeSecondText = currentTimeSecond < 10 ? '0' + currentTimeSecond : currentTimeSecond;
        currentTimeDisplay.textContent = `${currentTimeMinuteText}:${currentTimeSecondText}`;

        //progress bar
        progress_bar.value = (currentTime/duration) * 100;

        //play next song
        if(audio.currentTime === audio.duration) {
            nextSong();
        }
    }
    
}
