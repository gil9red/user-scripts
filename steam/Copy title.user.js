// ==UserScript==
// @name         Steam. Copy title
// @namespace    gil9red
// @version      2025-09-11
// @description  try to take over the world!
// @author       gil9red
// @match        https://store.steampowered.com/app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/steam/Copy%20title.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/steam/Copy%20title.user.js
// @grant        GM_setClipboard
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

    const id = "copying-title-to-clipboard";

    otherSiteInfoEl.insertAdjacentHTML(
        'afterbegin',
        `
        <span
            id="${id}"
            title='Copying "${game}" to clipboard'
            style="cursor: pointer; font-size: 16px"
        >
            📋<span class="info"></span>
        </span>
        `
    );
    const el = document.getElementById(id);
    const elInfo = el.querySelector(".info");

    el.onclick = function() {
        GM_setClipboard(
            game,
            "text",
            () => {
                elInfo.textContent = " - 👌!";
                setTimeout(
                    () => {
                        elInfo.textContent = "";
                    },
                    1500
                );
            }
        );
    };

})();
