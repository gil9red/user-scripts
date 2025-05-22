// ==UserScript==
// @name         Google Keep. Ignore Ctrl + S
// @namespace    gil9red
// @version      2025-05-22
// @description  try to take over the world!
// @author       gil9red
// @match        https://keep.google.com/u/0/
// @icon         https://ssl.gstatic.com/keep/keep_2023q4.ico
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/google/Google Keep. Ignore Ctrl + S.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/google/Google Keep. Ignore Ctrl + S.user.js
// ==/UserScript==

(function() {
    'use strict';

    // SOURCE: https://stackoverflow.com/a/11001012/5909792
    document.addEventListener(
        "keydown",
        function(e) {
            if (e.key === 's' && (navigator.userAgent.includes('Mac') ? e.metaKey : e.ctrlKey)) {
                e.preventDefault();
                // alert('captured');
            }
        },
        false,
    );
})();
