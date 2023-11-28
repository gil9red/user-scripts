// ==UserScript==
// @name         Youtube. Спрятать вкладки "Сообщество" и "Каналы"
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       gil9red
// @match        https://www.youtube.com/@*
// @match        https://www.youtube.com/channel/*
// @require      https://gist.githubusercontent.com/mjblay/18d34d861e981b7785e407c3b443b99b/raw/debc0e6d4d537ac228d1d71f44b1162979a5278c/waitForKeyElements.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://gil9red.github.io/user-scripts/youtube/Спрятать вкладки/main.user.js
// @downloadURL  https://gil9red.github.io/user-scripts/youtube/Спрятать вкладки/main.user.js
// ==/UserScript==

(function() {
    'use strict';

    function hideTabs(titles) {
        function processText(text) {
            return text == null ? null : text.trim().toLowerCase();
        }

        titles = titles.map(processText);

        waitForKeyElements(
            "#tabs-container yt-tab-shape",
            (tabEl) => {
                let tabText = tabEl.getAttribute("tab-title");
                tabText = processText(tabText);
                if (titles.includes(tabText)) {
                    tabEl.style.display = 'none';
                }
            }
        );
    }

    hideTabs(["Сообщество", "Каналы"]);
})();
