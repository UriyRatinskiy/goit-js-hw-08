import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

    const iframe = document.querySelector('iframe');
    const player = new Player(iframe);

  
    player.on('timeupdate', throttle (onUpdatingTime, 1000));

    function onUpdatingTime (data) {
    localStorage.setItem("videoplayer-current-time", data.seconds)
    }

    const videoplayerCurrentTime = localStorage.getItem("videoplayer-current-time");

    player.setCurrentTime(videoplayerCurrentTime );