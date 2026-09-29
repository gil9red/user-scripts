// ==UserScript==
// @name         Google Keep. Заголовок вкладки из заголовка заметок
// @namespace    gil9red
// @version      2026-07-28
// @description  try to take over the world!
// @author       You
// @match        https://keep.google.com/*
// @icon         https://ssl.gstatic.com/keep/keep_2023q4.ico
// @homepage     https://github.com/gil9red/user-scripts/blob/main/google/Google%20Keep.%20Заголовок%20вкладки%20из%20заголовка%20заметок.user.js
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/google/Google%20Keep.%20Заголовок%20вкладки%20из%20заголовка%20заметок.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/google/Google%20Keep.%20Заголовок%20вкладки%20из%20заголовка%20заметок.user.js
// @grant        GM_addElement
// ==/UserScript==

(function() {
    'use strict';

    let oldDocumentTitle = document.title;

    // NOTE: Тут данные извлекаются из <script>
    document._gil9red_chunkJson = null;

    function process() {
        // Например: "#LIST/" и "#NOTE/"
        const serverId = location.href.split(/#\w+\//)[1]; // Так понимаем, что это выбранная заметка
        if (serverId) {
            let itemEl = document.querySelector('#keep-iape');
            if (itemEl && itemEl.innerText != "Новая заметка" && itemEl.innerText != "Новый список") {
                document.title = itemEl.innerText;
                return;
            }

            if (document._gil9red_chunkJson === null) {
                // Работает для закрепленных
                let scripts = document.querySelectorAll("script");
                for (let i = 0; i < scripts.length; i++) {
                    let scriptText = scripts[i].innerText;
                    // \x5b - символ [
                    let m = scriptText.match(/(?:loadChunk|updateUserInfoFromInitialSyncRead)\(\s*(JSON\.parse\(['"]\\x5b.+?['"]\)\s*)/);
                    if (m) {
                        // Символы экранированы в ASCII
                        // NOTE: Вместо eval
                        GM_addElement(
                            'script',
                            {
                                textContent: `document._gil9red_chunkJson = ${m[1]};`,
                            }
                        ).remove();
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
            }

            // Список CSS-селекторов для поиска названия заметки
            const selectors = [
                'div:has(> div[role="toolbar"] > div[data-tooltip-text]) > div > div[contenteditable="true"][role="textbox"][dir="ltr"]',
                '[data-tooltip-text*=" заметку"] ~ div:nth-child(4) > div[contenteditable="true"][role="textbox"][dir="ltr"]'
            ];
            for (const selector of selectors) {
                const itemEl = document.querySelector(selector);

                // Если элемент найден и в нем есть текст — обновляем заголовок и выходим
                if (itemEl && itemEl.innerText?.trim()) {
                    document.title = itemEl.innerText;
                    return;
                }
            }
        }

        document.title = oldDocumentTitle;
    }

    let timerId = setInterval(process, 1000);
})();
