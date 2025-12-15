// ==UserScript==
// @name         MultFan. Настройка громности и скорости
// @namespace    gil9red
// @version      2025-12-15
// @description  try to take over the world!
// @author       gil9red
// @match        https://*.mult-fan.tv/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mult-fan.tv
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/MultFan.%20Настройка%20громности%20и%20скорости.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/MultFan.%20Настройка%20громности%20и%20скорости.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function process() {
        for (let video of document.getElementsByTagName("video")) {
            console.log("video", video);

            video.playbackRate = 1.25;
            video.volume = 0.25;
            video.muted = false;
        }
    }

    var intervalId = setInterval(process, 500);

    // Думаю, 3 секунд хватит, чтобы обработать видео
    setTimeout(() => clearInterval(intervalId), 3000);
})();
