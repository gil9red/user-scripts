// ==UserScript==
// @name         Gamestatus. Название игры на вкладке
// @namespace    gil9red
// @version      2026-03-09
// @description  try to take over the world!
// @author       gil9red
// @match        https://gamestatus.info/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gamestatus.info
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/Gamestatus. Название игры на вкладке.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/Gamestatus. Название игры на вкладке.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(
        function() {
            let title = document.querySelector(".game-info__title").textContent.trim();
            document.title = `${title} - Gamestatus`;
        },
        1000
    );
})();
