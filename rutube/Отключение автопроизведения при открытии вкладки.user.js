// ==UserScript==
// @name         Rutube. Отключение автопроизведения при открытии вкладки
// @namespace    gil9red
// @version      2025-05-23
// @description  try to take over the world!
// @author       gil9red
// @match        https://rutube.ru/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rutube.ru
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/rutube/Отключение автопроизведения при открытии вкладки.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/rutube/Отключение автопроизведения при открытии вкладки.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var videoByProcessed = new Map();

    function process() {
        for (let video of document.getElementsByTagName("video")) {
            if (!videoByProcessed.has(video)) {
                videoByProcessed.set(video, false);
                continue;
            }

            if (videoByProcessed.get(video)) {
                continue;
            }

            if (!video.paused) {
                video.pause();
                if (video.volume == 0 || video.muted) {
                    video.volume = 0.25;
                    video.muted = false;
                }

                videoByProcessed.set(video, true);
            }
        }
    }

    process();

    var intervalId = setInterval(process, 100);

    // Думаю, 5 секунд хватит, чтобы остановить все видео
    setTimeout(() => clearInterval(intervalId), 5000);
})();
