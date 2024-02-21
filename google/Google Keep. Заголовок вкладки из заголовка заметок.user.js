// ==UserScript==
// @name         Google Keep. Заголовок вкладки из заголовка заметок
// @namespace    gil9red
// @version      0.5
// @description  try to take over the world!
// @author       You
// @match        https://keep.google.com/*
// @icon         https://ssl.gstatic.com/keep/keep_2023q4.ico
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://gil9red.github.io/user-scripts/google/Google Keep. Заголовок вкладки из заголовка заметок.user.js
// @downloadURL  https://gil9red.github.io/user-scripts/google/Google Keep. Заголовок вкладки из заголовка заметок.user.js
// ==/UserScript==

(function() {
    'use strict';

    function process() {
        // Например: "#LIST/" и "#NOTE/"
        const serverId = location.href.split(/#\w+\//)[1]; // Так понимаем, что это выбранная заметка
        if (serverId) {
            let itemEl = document.querySelector('#keep-iape');
            if (itemEl && itemEl.innerText) {
                document.title = itemEl.innerText;
            }
        }
    }

    setInterval(process, 1000);
})();