// ==UserScript==
// @name         Jira. Кнопка копирования компонентов в буфер обмена
// @namespace    gil9red
// @version      2026-07-14
// @description  try to take over the world!
// @author       gil9red
// @match        https://helpdesk.compassluxe.com/browse/*
// @match        https://helpdesk.compassluxe.com/projects/*/issues/*
// @icon         https://helpdesk.compassluxe.com/s/5krrdz/712004/7fcd86bd1fac8f876f6db741a6132e00/_/images/fav-jsw.png
// @grant        GM_setClipboard
// @homepage     https://github.com/gil9red/user-scripts/blob/main/helpdesk.compassluxe/Кнопка копирования компонентов в буфер обмена.user.js
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Кнопка копирования компонентов в буфер обмена.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Кнопка копирования компонентов в буфер обмена.user.js
// ==/UserScript==

(function() {
    'use strict';

    const id = "copying-components-to-clipboard";

    function processComponentField() {
        const el = document.querySelector("#components-val");
        if (!el) return;
        if (el.querySelector(`#${id}`)) return;

        el.insertAdjacentHTML(
            'beforeend',
            `
            <span
                id="${id}"
                class="aui-button aui-style"
                title="Копирование в буфер обмена"
                style="padding: 4px; font-size: 10px;"
            >
                📋<span class="info"></span>
            </span>
        `);
    }

    document.addEventListener('click', function(event) {
        const button = event.target.closest(`#${id}`);
        if (!button) return;

        event.stopPropagation();
        event.preventDefault();

        const text = document.querySelector("#components-field").textContent.split(",").map(obj => obj.trim()).join(", ");
        const info = button.querySelector(".info");

        info.textContent = " - копирование...";
        GM_setClipboard(
            text,
            "text",
            () => {
                info.textContent = " - готово!";
                setTimeout(() => {info.textContent = "";}, 1500);
            }
        );
    }, true);

    const observer = new MutationObserver(() => {
        processComponentField();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
