// ==UserScript==
// @name         Google Keep. Ignore Ctrl + S
// @namespace    gil9red
// @version      2025-05-22
// @description  try to take over the world!
// @author       gil9red
// @match        https://keep.google.com/
// @icon         https://ssl.gstatic.com/keep/keep_2023q4.ico
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/google/Google Keep. Ignore Ctrl + S.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/google/Google Keep. Ignore Ctrl + S.user.js
// ==/UserScript==

(function() {
    'use strict';

    // SOURCE: https://stackoverflow.com/a/11362247/5909792
    var isCtrl = false;
    document.onkeyup = function(e) {
        if (e.keyCode == 17) {
            isCtrl = false;
        }
    }

    document.onkeydown = function(e) {
        if (e.keyCode == 17) {
            isCtrl = true;
        }
        if (e.keyCode == 83 && isCtrl == true) {
            console.log("Ctrl+S - captured");
            return false;
        }
    }
})();
