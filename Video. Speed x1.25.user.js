// ==UserScript==
// @name         Video. Speed x1.25
// @namespace    gil9red
// @version      2025-04-06
// @description  try to take over the world!
// @author       gil9red
// @match        https://jut.su/*
// @match        https://www.youtube.com/shorts/*
// @match        https://www.youtube.com/watch*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jut.su
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/Video. Speed x1.25.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/Video. Speed x1.25.user.js
// ==/UserScript==

(function() {
    'use strict';

    for (let video of document.getElementsByTagName("video")) {
        video.playbackRate = 1.25;
        video.defaultPlaybackRate = video.playbackRate;
        console.log(video);
    }
})();
