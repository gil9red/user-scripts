// ==UserScript==
// @name         Youtube. Подсветка не просмотренных видео из плейлиста
// @namespace    gil9red
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/playlist*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        GM_addStyle
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://gil9red.github.io/user-scripts/youtube/Подсветка не просмотренных видео из плейлиста.user.js
// @downloadURL  https://gil9red.github.io/user-scripts/youtube/Подсветка не просмотренных видео из плейлиста.user.js
// ==/UserScript==

(function() {
    'use strict';

    const notViewedClass = "my-not-viewed";

    GM_addStyle(`
    .${notViewedClass} {
        box-shadow: 0px 0px 12px green;
    }
    `);

    /* NOTE: Stylus. Youtube - Спрятать просмотренные видео
    @-moz-document domain("youtube.com") {
        #contents > ytd-playlist-video-renderer:not(.my-not-viewed) > * {
            opacity: 0;
        }
        #contents > ytd-playlist-video-renderer:not(.my-not-viewed)::before {
            content: '// Спрятано Stylus';
            color: var(--yt-spec-text-secondary);
            font-size: 2rem;
        }
    }
    */

    function process() {
        document.querySelectorAll("#contents ytd-playlist-video-renderer").forEach((itemEl) => {
            let notFound = itemEl.querySelector("ytd-thumbnail-overlay-resume-playback-renderer") == null;
            if (notFound) {
                itemEl.classList.add(notViewedClass);
            } else {
                itemEl.classList.remove(notViewedClass);
            }
        });
    }

    setInterval(process, 1000);
})();