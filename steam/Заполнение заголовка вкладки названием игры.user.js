// ==UserScript==
// @name         Steam. Заполнение заголовка вкладки названием игры
// @namespace    gil9red
// @version      2024-08-12
// @description  try to take over the world!
// @author       gil9red
// @match        https://store.steampowered.com/app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @updateURL    https://gil9red.github.io/user-scripts/steam/Заполнение заголовка вкладки названием игры.user.js
// @downloadURL  https://gil9red.github.io/user-scripts/steam/Заполнение заголовка вкладки названием игры.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let appNameEl = document.getElementById("appHubAppName");
    if (!appNameEl) {
        alert("Не удалось найти название игры!");
        return;
    }

    document.title = appNameEl.textContent;
})();
