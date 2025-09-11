// ==UserScript==
// @name         Steam. Coming soon indicator in tab title
// @namespace    gil9red
// @version      2025-09-11
// @description  try to take over the world!
// @author       gil9red
// @match        https://store.steampowered.com/app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/steam/Coming%20soon%20indicator%20in%20tab%20title.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/steam/Coming%20soon%20indicator%20in%20tab%20title.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (document.querySelector(".game_area_comingsoon")) {
        document.title = `⛔ ${document.title}`;
    }
})();
