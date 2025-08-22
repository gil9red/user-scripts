// ==UserScript==
// @name         Google Keep. Заголовок вкладки из заголовка заметок
// @namespace    gil9red
// @version      2025-08-23
// @description  try to take over the world!
// @author       You
// @match        https://keep.google.com/*
// @icon         https://ssl.gstatic.com/keep/keep_2023q4.ico
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/google/Google Keep. Заголовок вкладки из заголовка заметок.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/google/Google Keep. Заголовок вкладки из заголовка заметок.user.js
// @grant        GM_addElement
// ==/UserScript==

(function() {
    'use strict';

    let oldDocumentTitle = document.title;

    function process() {
        // Например: "#LIST/" и "#NOTE/"
        const serverId = location.href.split(/#\w+\//)[1]; // Так понимаем, что это выбранная заметка
        if (serverId) {
            let itemEl = document.querySelector('#keep-iape');
            if (itemEl && itemEl.innerText != "Новая заметка" && itemEl.innerText != "Новый список") {
                document.title = itemEl.innerText;
                return;
            }

            // Работает для закрепленных
            document._gil9red_chunkJson = null;
            let scripts = document.querySelectorAll("script");
            for (let i = 0; i < scripts.length; i++) {
                let scriptText = scripts[i].innerText;
                let m = scriptText.match(/loadChunk\((JSON\.parse\(['"].+?['"]\))/);
                if (m) {
                    // Символы экранированы в ASCII
                    // NOTE: Вместо eval
                    GM_addElement(
                        'script',
                        {
                            textContent: `document._gil9red_chunkJson = ${m[1]};`,
                        }
                    );
                    break;
                }
            }

            if (document._gil9red_chunkJson == null) {
                alert("Не удалось найти JSON из loadChunk!");
                clearInterval(timerId);
                return;
            }

            for (let data of document._gil9red_chunkJson) {
                if (data.serverId == serverId) {
                    document.title = data.title;
                    return;
                }
            }

            // Поиск от кнопки в заметке и к определенному элементу по порядку на том же уровне вложенности
            const cssSelector = '[data-tooltip-text*=" заметку"] ~ div:nth-child(4) > div[contenteditable="true"][role="textbox"][dir="ltr"]';

            itemEl = document.querySelector(cssSelector);
            if (itemEl && itemEl.innerText) {
                document.title = itemEl.innerText;
                return;
            }
        }

        document.title = oldDocumentTitle;
    }

    let timerId = setInterval(process, 1000);
})();
