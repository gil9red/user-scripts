// ==UserScript==
// @name         Gamestatus. Название игры на вкладке
// @namespace    gil9red
// @version      2025-04-28
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
            let titleEl = document.querySelector("meta[property='og:site_name'][content]");
            if (!titleEl) {
                console.error("Не удалось найти название игры!");
                return;
            }

            let title = titleEl.getAttribute("content");
            title = title.replace("Gamestatus - Crack ", "").trim();

            document.title = `${title} - Gamestatus`;
        },
        1000
    );
})();
