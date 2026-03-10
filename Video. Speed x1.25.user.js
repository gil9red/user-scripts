// ==UserScript==
// @name         Video. Speed x1.25
// @namespace    gil9red
// @version      2026-03-10
// @description  try to take over the world!
// @author       gil9red
// @match        https://jut.su/*
// @match        https://www.youtube.com/shorts/*
// @match        https://www.youtube.com/watch*
// @match        https://www.youtube.com/live/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jut.su
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/Video.%20Speed%20x1.25.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/Video.%20Speed%20x1.25.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_addValueChangeListener
// @require      https://github.com/PRO-2684/GM_config/releases/download/v1.2.2/config.min.js#md5=c45f9b0d19ba69bb2d44918746c4d7ae
// ==/UserScript==

(function() {
    'use strict';

    const configDesc = {
        videoSpeed: {
            name: "Speed (%)",
            type: "int",
            value: 125, // Default 125%
            min: 25,    // Minimum 25%
            max: 400    // Maximum 400%
        }
    };
    const config = new GM_config(configDesc);

    setInterval(
        () => {
            const speed = config.get("videoSpeed") / 100;

            for (let video of document.getElementsByTagName("video")) {
                if (speed != video.playbackRate) {
                    video.playbackRate = speed;
                    video.defaultPlaybackRate = speed;
                    console.log(video, 'speed', speed);
                }
            }
        },
        1000
    );
})();
