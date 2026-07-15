// ==UserScript==
// @name         Jira. Кнопка копирования имени приложенных файлов в буфер обмена
// @namespace    gil9red
// @version      2026-07-15
// @description  try to take over the world!
// @author       gil9red
// @match        https://helpdesk.compassluxe.com/browse/*
// @match        https://helpdesk.compassluxe.com/projects/*/issues/*
// @icon         https://helpdesk.compassluxe.com/s/5krrdz/712004/7fcd86bd1fac8f876f6db741a6132e00/_/images/fav-jsw.png
// @grant        GM_setClipboard
// @homepage     https://github.com/gil9red/user-scripts/blob/main/helpdesk.compassluxe/Кнопка%20копирования%20имени%20приложенных%20файлов%20в%20буфер%20обмена.user.js
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Кнопка%20копирования%20имени%20приложенных%20файлов%20в%20буфер%20обмена.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Кнопка%20копирования%20имени%20приложенных%20файлов%20в%20буфер%20обмена.user.js
// ==/UserScript==

(function() {
    'use strict';
    
    const className = "copying-file-name-to-clipboard";
    const SELECTOR_TITLE = ".attachment-title";
    const SELECTOR_BUTTON = `.${className}`;

    function addButton(attachmentTitle) {
        const span = document.createElement("span");
        span.className = `${className} aui-button aui-style`;
        span.title = "Копирование имени в буфер обмена";
        span.style.padding = "4px";
        span.style.fontSize = "10px";
        span.style.marginLeft = "5px";
        span.innerHTML = '📋<span class="info"></span>';
        attachmentTitle.appendChild(span);
    }

    function processTitles(root) {
        if (!(root instanceof Element)) return;

        root.querySelectorAll(SELECTOR_TITLE).forEach(title => {
            if (!title.querySelector(SELECTOR_BUTTON)) {
            	addButton(title);
            }
        });
    }

    document.body.addEventListener("click", function(event) {
        const span = event.target.closest(SELECTOR_BUTTON);
        if (!span) return;

        const attachmentTitle = span.closest(SELECTOR_TITLE);
        if (!attachmentTitle) return;

        const link = attachmentTitle.querySelector("a");
        if (!link) return;

        const text = link.textContent;
        const info = span.querySelector(".info");
        info.textContent = " - копирование...";

        GM_setClipboard(text, "text", () => {
            info.textContent = " - готово!";
            setTimeout(() => {info.textContent = "";}, 1500);
        });
    });

    const target = document.body || document.documentElement;
    
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            mutation.addedNodes.forEach(processTitles);
        }
    });
    observer.observe(target, {
        childList: true,
        subtree: true
    });

    processTitles(target);
})();
