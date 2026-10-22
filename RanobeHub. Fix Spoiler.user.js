// ==UserScript==
// @name         RanobeHub. Fix Spoiler
// @version      2026-10-22
// @description  Скрывает весь тег <small>, если внутри него есть символы ||
// @namespace    gil9red
// @author       gil9red
// @match        https://ranobehub.org/ranobe/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ranobehub.org
// @homepage     https://github.com/gil9red/user-scripts/blob/main/RanobeHub.%20Fix%20Spoiler.user.js
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/RanobeHub.%20Fix%20Spoiler.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/RanobeHub.%20Fix%20Spoiler.user.js
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        small.tm-full-spoiler {
            background-color: rgba(0, 0, 0, 0.05) !important;
            color: transparent !important;
            text-shadow: 0 0 18px rgba(0, 0, 0, 0.95) !important;
            user-select: none !important;
            pointer-events: none !important;
            padding: 2px 6px;
            border-radius: 4px;
            display: inline-block;
        }
    `);

    function checkElement(el) {
        if (el.tagName === 'SMALL') {
            if (el.textContent.includes('||')) {
                el.classList.add('tm-full-spoiler');
            }
        }
    }

    function processElements(nodes) {
        nodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                checkElement(node);
                node.querySelectorAll('small').forEach(checkElement);
            }
        });
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                processElements(mutation.addedNodes);
            }
        });
    });

    const interval = setInterval(() => {
        if (document.documentElement) {
            clearInterval(interval);
            processElements([document.body || document.documentElement]);
            observer.observe(document.documentElement, { childList: true, subtree: true });
        }
    }, 10);
})();
