// ==UserScript==
// @name         Jira. Добавление кнопок профилей у Assignee и Reporter
// @namespace    gil9red
// @version      2026-06-24
// @description  try to take over the world!
// @author       gil9red
// @match        https://helpdesk.compassluxe.com/browse/*
// @match        https://helpdesk.compassluxe.com/projects/*/issues/*
// @icon         https://helpdesk.compassluxe.com/s/5krrdz/712004/7fcd86bd1fac8f876f6db741a6132e00/_/images/fav-jsw.png
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts/blob/main/helpdesk.compassluxe/Добавление кнопок профилей у Assignee и Reporter.user.js
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Добавление кнопок профилей у Assignee и Reporter.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Добавление кнопок профилей у Assignee и Reporter.user.js
// ==/UserScript==

(function() {
    'use strict';

    const LINK_CLASS = 'tm-profile-link';

    function get_a(username) {
        return `<a href="/secure/ViewProfile.jspa?name=${username}" target="_blank" class="${LINK_CLASS}">➡️</a>`;
    }

    function processUserField(selector) {
        const $el = document.querySelector(selector);
        if (!$el) return;
        if ($el.querySelector(`.${LINK_CLASS}`)) return;

        const username = $el.getAttribute("rel");
        if (!username) return;

        $el.insertAdjacentHTML('beforeend', get_a(username));
    }

    function checkAndApply() {
        processUserField("#assignee-val .user-hover[rel]");
        processUserField("#reporter-val .user-hover[rel]");
    }

    const observer = new MutationObserver(() => {
        checkAndApply();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
