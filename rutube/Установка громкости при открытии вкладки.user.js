// ==UserScript==
// @name         Rutube. Установка громкости при открытии вкладки
// @namespace    gil9red
// @version      2025-12-08
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

    function process() {
        console.log("Videos", document.getElementsByTagName("video"));
        
        for (let video of document.getElementsByTagName("video")) {
            video.volume = 0.15;
        }
    }

    process();

    var intervalId = setInterval(process, 100);

    // Думаю, 5 секунд хватит, чтобы обработать видео
    setTimeout(() => clearInterval(intervalId), 5000);
})();
