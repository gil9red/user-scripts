// ==UserScript==
// @name         Jira. Кнопка копирования номера задачи в буфер обмена
// @namespace    gil9red
// @version      2024-10-28
// @description  try to take over the world!
// @author       gil9red
// @match        https://helpdesk.compassluxe.com/browse/*
// @icon         https://helpdesk.compassluxe.com/s/5krrdz/712004/7fcd86bd1fac8f876f6db741a6132e00/_/images/fav-jsw.png
// @grant        GM_setClipboard
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Кнопка копирования номера задачи в буфер обмена.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Кнопка копирования номера задачи в буфер обмена.user.js
// ==/UserScript==

(function() {
    'use strict';

    const id = "coping-jira-key-to-clipboard";
    $(".aui-header-primary > .aui-nav").append(
        `
        <li>
            <span
                id="${id}"
                class="aui-button aui-button-primary aui-style"
                title="Копирование номер джиры в буфер-обмена"
            >
                📋<span class="info"></span>
            </span>
        </li>
        `
    );
    $(`#${id}`).click(function() {
        let jiraId = $(`meta[name="ajs-issue-key"]`).attr("content");

        let $info = $(this).find(".info");
        $info.text(" - копирование...");
        GM_setClipboard(
            jiraId,
            "text",
            () => {
                $info.text(" - готово!");
                setTimeout(() => $info.text(""), 1500);
            }
        );
    });
})();
