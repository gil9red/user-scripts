// ==UserScript==
// @name         Steam. Rutracker
// @namespace    gil9red
// @version      2025-01-26
// @description  try to take over the world!
// @author       gil9red
// @match        https://store.steampowered.com/app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/steam/Rutracker.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/steam/Rutracker.user.js
// ==/UserScript==

(function() {
    'use strict';

    let appNameEl = document.getElementById("appHubAppName");
    const game = appNameEl ? appNameEl.textContent : null;
    console.log("game", game);

    if (!game) {
        return;
    }

    let otherSiteInfoEl = document.querySelector(".apphub_OtherSiteInfo");
    if (!otherSiteInfoEl) {
        return;
    }

    otherSiteInfoEl.insertAdjacentHTML(
        'afterbegin',
        `<a href="https://rutracker.net/forum/tracker.php?nm=${encodeURIComponent(game)}" title="Rutracker" target="_blank">
            <img src="https://www.google.com/s2/favicons?sz=64&domain=rutracker.org" width="24" height="24" />
        </a>`
    );
})();
