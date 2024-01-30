// ==UserScript==
// @name         Google Keep. Заголовок вкладки из заголовка заметок
// @namespace    gil9red
// @version      0.4
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
        let foundTitle = false;

        // Например: "#LIST/" и "#NOTE/"
        const serverId = location.href.split(/#\w+\//)[1];
        if (serverId) {
            let chunkJsonText = null;

            // Работает для закрепленных
            let scripts = document.querySelectorAll("script");
            for (let i = 0; i < scripts.length; i++) {
                let scriptText = scripts[i].innerText;
                let m = scriptText.match(/loadChunk\(JSON\.parse\(['"](.+?)['"]\)/);
                if (m) {
                    // Символы экранированы в ASCII
                    chunkJsonText = eval('"' + m[1] + '"');
                    break;
                }
            }

            if (!chunkJsonText) {
                alert("Не удалось найти JSON из loadChunk!");
                return;
            }

            let chunkData = JSON.parse(chunkJsonText);
            for (let data of chunkData) {
                if (data.serverId == serverId) {
                    document.title = data.title;
                    foundTitle = true;
                    break;
                }
            }
        }

        if (!foundTitle) {
            // Поиск от кнопки в заметке и к определенному элементу по порядку на том же уровне вложенности
            const cssSelector = '[data-tooltip-text="Закрепить заметку"] ~ div:nth-child(4) > div[contenteditable="true"][role="textbox"][dir="ltr"]';

            let itemEl = document.querySelector(cssSelector);
            if (itemEl && itemEl.innerText) {
                document.title = itemEl.innerText;
            }
        }
    }
    setInterval(process, 1000);
})();