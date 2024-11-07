// ==UserScript==
// @name         Jira. Кнопка копирования компонентов в буфер обмена
// @namespace    gil9red
// @version      2024-11-07
// @description  try to take over the world!
// @author       gil9red
// @match        https://helpdesk.compassluxe.com/browse/*
// @icon         https://helpdesk.compassluxe.com/s/5krrdz/712004/7fcd86bd1fac8f876f6db741a6132e00/_/images/fav-jsw.png
// @grant        GM_setClipboard
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Кнопка копирования компонентов в буфер обмена.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Кнопка копирования компонентов в буфер обмена.user.js
// ==/UserScript==

(function() {
    'use strict';

    const id = "copying-components-to-clipboard";

    $("#components-val").parent().append(
        `
        <span
            id="${id}"
            class="aui-button aui-style"
            title="Копирование в буфер обмена"
            style="padding: 4px; font-size: 10px;"
        >
            📋<span class="info"></span>
        </span>
        `
    );

    $(`#${id}`).click(function() {
        let $this = $(this);
        let text = $("#components-field").text().split(",").map(obj => obj.trim()).join(", ") ;
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
