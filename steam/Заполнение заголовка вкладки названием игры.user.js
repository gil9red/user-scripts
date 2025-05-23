// ==UserScript==
// @name         Steam. Заполнение заголовка вкладки названием игры
// @namespace    gil9red
// @version      2025-04-03
// @description  try to take over the world!
// @author       gil9red
// @match        https://store.steampowered.com/app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/steam/Заполнение заголовка вкладки названием игры.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/steam/Заполнение заголовка вкладки названием игры.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let appNameEl = document.getElementById("appHubAppName");
    if (!appNameEl) {
        console.error("Не удалось найти название игры!");
        return;
    }

    document.title = `${appNameEl.textContent} - Steam`;
})();
