// ==UserScript==
// @name         gamesisart.ru. Восстановление копирования
// @namespace    gil9red
// @version      0.1
// @description  try to take over the world!
// @author       gil9red
// @match        https://gamesisart.ru/guide/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gamesisart.ru
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/gamesisart/Восстановление копирования.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/gamesisart/Восстановление копирования.user.js
// ==/UserScript==

(function() {
    'use strict';

    for (let el of document.querySelectorAll("[oncopy]")) {
        el.removeAttribute("oncopy");
    }
})();