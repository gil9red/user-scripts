// ==UserScript==
// @name         Jira. Добавление кнопок профилей у Assignee и Reporter
// @namespace    gil9red
// @version      2024-10-23
// @description  try to take over the world!
// @author       gil9red
// @match        https://helpdesk.compassluxe.com/browse/*
// @icon         https://helpdesk.compassluxe.com/s/5krrdz/712004/7fcd86bd1fac8f876f6db741a6132e00/_/images/fav-jsw.png
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Добавление кнопок профилей у Assignee и Reporter.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Добавление кнопок профилей у Assignee и Reporter.user.js
// ==/UserScript==

(function() {
    'use strict';

    let $assignee = $("#assignee-val .user-hover[rel]");
    let $reporter = $("#reporter-val .user-hover[rel]");
    if ($assignee.length == 0 || $reporter.length == 0) {
        return;
    }

    function get_a(username) {
        return `<a href="/secure/ViewProfile.jspa?name=${username}" target="_blank">➡️</a>`;
    }

    $assignee.append(get_a($assignee.attr("rel")));
    $reporter.append(get_a($reporter.attr("rel")));
})();