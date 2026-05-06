// ==UserScript==
// @name         Jira. Добавление кнопок копирования username у Assignee и Reporter
// @version      2026-05-06
// @namespace    gil9red
// @author       gil9red
// @description  try to take over the world!
// @match        https://helpdesk.compassluxe.com/browse/*
// @match        https://helpdesk.compassluxe.com/projects/*/issues/*
// @icon         https://helpdesk.compassluxe.com/s/5krrdz/712004/7fcd86bd1fac8f876f6db741a6132e00/_/images/fav-jsw.png
// @grant        GM_setClipboard
// @homepage     https://github.com/gil9red/user-scripts/blob/main/helpdesk.compassluxe/Добавление%20кнопок%20копирования%20username%20у%20Assignee%20и%20Reporter.user.js
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Добавление%20кнопок%20копирования%20username%20у%20Assignee%20и%20Reporter.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Добавление%20кнопок%20копирования%20username%20у%20Assignee%20и%20Reporter.user.js
// ==/UserScript==

(function() {
    'use strict';

    let $assignee = $("#assignee-val .user-hover[rel]");
    let $reporter = $("#reporter-val .user-hover[rel]");
    if ($assignee.length == 0 || $reporter.length == 0) {
        return;
    }

    const className = "copying-username-to-clipboard";

    function create_button() {
        return `
        <span
            class="${className} aui-button aui-style"
            title="Копирование username в буфер обмена"
            style="padding: 4px; font-size: 10px; margin-left: 5px;"
        >
            📋<span class="info"></span>
        </span>
        `;
    }

    $assignee.append(create_button());
    $reporter.append(create_button());

    $(`.${className}`).click(function(event) {
        let $this = $(this);
        let text = $this.parents("[rel]").attr("rel");
        let $info = $this.find(".info");

        $info.text(" - копирование...");
        GM_setClipboard(
            text,
            "text",
            () => {
                $info.text(` - 👌!`);
                setTimeout(() => $info.text(""), 1500);
            }
        );

        event.stopPropagation(); // Чтобы клик не попал в поле редактора
    });
})();
