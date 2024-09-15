// ==UserScript==
// @name         Rutube. Отключение события клика на название видео
// @namespace    gil9red
// @version      2024-09-15
// @description  try to take over the world!
// @author       gil9red
// @match        https://rutube.ru/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rutube.ru
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/rutube/Отключение события клика на название видео.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/rutube/Отключение события клика на название видео.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let els = document.getElementsByClassName("video-pageinfo-container-module__videoTitleSectionHeader");
    console.log(els);
    if (els.length) {
        console.log(els.length, els[0].click);
        els[0].addEventListener(
            "click",
            function(e) {
                e.preventDefault();
                e.stopPropagation();
                return null;
            },
            true
        );
    }
})();
