// ==UserScript==
// @name         Youtube. Изменение текста рамки плейлиста у видео
// @namespace    gil9red
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/watch?*list=*
// @require      https://gist.githubusercontent.com/mjblay/18d34d861e981b7785e407c3b443b99b/raw/debc0e6d4d537ac228d1d71f44b1162979a5278c/waitForKeyElements.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://gil9red.github.io/user-scripts/youtube/Изменение текста рамки плейлиста у видео.user.js
// @downloadURL  https://gil9red.github.io/user-scripts/youtube/Изменение текста рамки плейлиста у видео.user.js
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Изменение стиля элементов - #publisher-container будет ярче и больше
    GM_addStyle(`
        #content #publisher-container * {
            color: white !important;
            font-size: 1.4rem !important;
        }

        #content #next-video-title * {
            color: gray !important;
            font-size: 1.2rem !important;
        }
    `);

    // Изменение порядка элементов - #publisher-container будет выше #next-video-title
    waitForKeyElements(
        "#content #publisher-container",
        (el) => {
            let parentElement = el.parentNode;
            let siblingElement = parentElement.querySelector("#next-video-title");
            parentElement.insertBefore(el, siblingElement);
        }
    );
})();