// ==UserScript==
// @name         Jira. Кнопка копирования номера задачи в буфер обмена
// @namespace    gil9red
// @version      2025-06-24
// @description  try to take over the world!
// @author       gil9red
// @match        https://helpdesk.compassluxe.com/browse/*
// @match        https://helpdesk.compassluxe.com/projects/*/issues/*
// @icon         https://helpdesk.compassluxe.com/s/5krrdz/712004/7fcd86bd1fac8f876f6db741a6132e00/_/images/fav-jsw.png
// @grant        GM_setClipboard
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Кнопка копирования номера задачи в буфер обмена.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Кнопка копирования номера задачи в буфер обмена.user.js
// ==/UserScript==

(function() {
    'use strict';

    {
        const id_copying_jira_key_and_title_to_clipboard = "copying-jira-key-and-title-to-clipboard";
        $(".aui-header-primary > .aui-nav").append(
            `
        <li>
            <span
                id="${id_copying_jira_key_and_title_to_clipboard}"
                class="aui-button aui-button-primary aui-style"
                title="Копирование номера джиры и название в буфер-обмена"
            >
                📋📃<span class="info"></span>
            </span>
        </li>
        `
        );
        $(`#${id_copying_jira_key_and_title_to_clipboard}`).click(function() {
            let jiraId = $(`meta[name="ajs-issue-key"]`).attr("content");
            let jiraTitle = $("#summary-val").text();

            let $info = $(this).find(".info");
            $info.text(" - копирование...");
            GM_setClipboard(
                `[${jiraId}] ${jiraTitle}`,
                "text",
                () => {
                    $info.text(" - готово!");
                    setTimeout(() => $info.text(""), 1500);
                }
            );
        });
    }

    const id = "copying-jira-key-to-clipboard";
    $(".aui-header-primary > .aui-nav").append(
        `
        <li>
            <span
                id="${id}"
                class="aui-button aui-button-primary aui-style"
                title="Копирование номера джиры в буфер-обмена"
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

    const className = "copying-jira-key-to-clipboard";
    $(".links-list .issue-link[data-issue-key]").after(
        `
        <span
            class="${className} aui-button aui-style"
            title="Копирование номера джиры в буфер обмена"
            style="padding: 4px; font-size: 10px; margin-left: 5px;"
        >
            📋<span class="info"></span>
        </span>
        `
    );
    $(`.${className}`).click(function() {
        let $this = $(this);
        let text = $this.parent().find("[data-issue-key]").attr("data-issue-key");
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
