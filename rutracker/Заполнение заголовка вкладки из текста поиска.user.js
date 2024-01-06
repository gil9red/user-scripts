// ==UserScript==
// @name         Rutracker. Заполнение заголовка вкладки из текста поиска
// @namespace    gil9red
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://rutracker.org/forum/tracker.php?*nm=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rutracker.org
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://gil9red.github.io/user-scripts/rutracker/Заполнение заголовка вкладки из текста поиска.user.js
// @downloadURL  https://gil9red.github.io/user-scripts/rutracker/Заполнение заголовка вкладки из текста поиска.user.js
// ==/UserScript==

(function() {
    'use strict';

    let searchEl = document.getElementById("title-search");
    if (!searchEl) {
        alert("Не удалось найти поле поиска!");
        return;
    }

    let text = searchEl.getAttribute("value");
    document.title = `Поиск: ${text}`;
})();
