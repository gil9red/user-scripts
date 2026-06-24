// ==UserScript==
// @name         Jira. Добавление кнопок копирования username у Assignee и Reporter
// @version      2026-06-24
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

    const LINK_CLASS = 'copying-username-to-clipboard';

    function create_button() {
        return `
        <span
            class="${LINK_CLASS} aui-button aui-style"
            title="Копирование username в буфер обмена"
            style="padding: 4px; font-size: 10px; margin-left: 5px;"
        >
            📋<span class="info"></span>
        </span>
        `;
    }

    function processUserField(selector) {
        const $el = document.querySelector(selector);
        if (!$el) return;

        if ($el.querySelector(`.${LINK_CLASS}`)) return;

        $el.insertAdjacentHTML('beforeend', create_button());
    }

    function checkAndApply() {
        processUserField("#assignee-val .user-hover[rel]");
        processUserField("#reporter-val .user-hover[rel]");
    }

    document.addEventListener('click', function(event) {
        const button = event.target.closest(`.${LINK_CLASS}`);
        if (!button) return;

        event.stopPropagation();
        event.preventDefault();

        const parentWithRel = button.closest('[rel]');
        if (!parentWithRel) return;

        const text = parentWithRel.getAttribute('rel');
        const info = button.querySelector('.info');

        info.textContent = " - копирование...";

        GM_setClipboard(text, "text", () => {
            info.textContent = " - 👌!";
            setTimeout(() => {
                info.textContent = "";
            }, 1500);
        });
    }, true);

    const observer = new MutationObserver(() => {
        checkAndApply();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
