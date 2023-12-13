// ==UserScript==
// @name         Youtube. Подсветка не просмотренных видео из плейлиста
// @namespace    gil9red
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/playlist*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://gil9red.github.io/user-scripts/youtube/Подсветка не просмотренных видео из плейлиста.user.js
// @downloadURL  https://gil9red.github.io/user-scripts/youtube/Подсветка не просмотренных видео из плейлиста.user.js
// ==/UserScript==

(function() {
    'use strict';

    function process() {
        document.querySelectorAll("#contents ytd-playlist-video-renderer").forEach((itemEl) => {
            let notFound = itemEl.querySelector("ytd-thumbnail-overlay-resume-playback-renderer") == null;
            if (notFound) {
                itemEl.style.boxShadow = "0px 0px 12px green";
            } else {
                itemEl.style.boxShadow = null;
            }
        });
    }

    setInterval(process, 1000);
})();