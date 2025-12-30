// ==UserScript==
// @name         Rutube. Установка громкости при открытии вкладки
// @namespace    gil9red
// @version      2025-12-31
// @description  try to take over the world!
// @author       gil9red
// @match        https://rutube.ru/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rutube.ru
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/rutube/Установка%20громкости%20при%20открытии%20вкладки.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/rutube/Установка%20громкости%20при%20открытии%20вкладки.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var videoByProcessed = new Map();

    function process() {
        for (let video of document.getElementsByTagName("video")) {
            if (!videoByProcessed.has(video)) {
                videoByProcessed.set(video, false);
            }

            if (videoByProcessed.get(video)) {
                continue;
            }

            // Почему-то некоторые видео имеют максимальную громность или отключенную громкость
            if (video.volume == 1 || video.muted) {
                console.log("video", video);

                video.muted = false;
                video.volume = 0.15;
                videoByProcessed.set(video, true);
            }
        }
    }

    process();

    setInterval(process, 500);
})();
