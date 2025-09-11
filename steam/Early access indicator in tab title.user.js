// ==UserScript==
// @name         Steam. Early access indicator in tab title
// @namespace    gil9red
// @version      2025-09-11
// @description  try to take over the world!
// @author       gil9red
// @match        https://store.steampowered.com/app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/steam/Early%20access%20indicator%20in%20tab%20title.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/steam/Early%20access%20indicator%20in%20tab%20title.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let earlyAccessHeaderEl = document.getElementById("earlyAccessHeader");
    if (earlyAccessHeaderEl) {
        document.title = `🚧 ${document.title}`;
    }
})();
