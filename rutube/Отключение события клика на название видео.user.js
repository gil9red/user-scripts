// ==UserScript==
// @name         Rutube. Отключение события клика на название видео
// @namespace    gil9red
// @version      2024-10-23
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
    if (els.length == null) {
        return;
    }
    
    els[0].addEventListener(
        "click",
        function(e) {
            e.preventDefault();
            e.stopPropagation();
            return null;
        },
        true
    );
})();
