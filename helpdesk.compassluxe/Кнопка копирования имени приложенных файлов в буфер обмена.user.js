// ==UserScript==
// @name         Jira. Кнопка копирования имени приложенных файлов в буфер обмена
// @namespace    gil9red
// @version      2024-11-16
// @description  try to take over the world!
// @author       gil9red
// @match        https://helpdesk.compassluxe.com/browse/*
// @match        https://helpdesk.compassluxe.com/projects/*/issues/*
// @icon         https://helpdesk.compassluxe.com/s/5krrdz/712004/7fcd86bd1fac8f876f6db741a6132e00/_/images/fav-jsw.png
// @grant        GM_setClipboard
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Кнопка копирования имени приложенных файлов в буфер обмена.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Кнопка копирования имени приложенных файлов в буфер обмена.user.js
// ==/UserScript==

(function() {
    'use strict';

    const className = "copying-file-name-to-clipboard";

    $(".attachment-title").append(
        `
        <span
            class="${className} aui-button aui-style"
            title="Копирование имени в буфер обмена"
            style="padding: 4px; font-size: 10px; margin-left: 5px;"
        >
            📋<span class="info"></span>
        </span>
        `
    );

    $(`.${className}`).click(function() {
        let $this = $(this);
        let text = $this.parents(".attachment-title").find("a").text();
        let $info = $this.find(".info");

        $info.text(" - копирование...");
        GM_setClipboard(
            text,
            "text",
            () => {
                $info.text(" - готово!");
                setTimeout(() => $info.text(""), 1500);
            }
        );
    });
})();
