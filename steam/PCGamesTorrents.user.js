// ==UserScript==
// @name         Steam. PCGamesTorrents
// @namespace    gil9red
// @version      2026-04-22
// @description  try to take over the world!
// @author       gil9red
// @match        https://store.steampowered.com/app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @homepage     https://github.com/gil9red/user-scripts/blob/main/steam/PCGamesTorrents.user.js
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/steam/PCGamesTorrents.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/steam/PCGamesTorrents.user.js
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

    const icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAPFBMVEVHcEz/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AABoMJzSAAAAFHRSTlMAOYfI9f9t6WAg4BNJqtKbCVYtubQpfjEAAADnSURBVHgBZZGFEcAwDAMdZt5/116UclTum023GBdSKSk4o7+0VLeM/SBn1Ec+PCyqTezHPI/ORW4+1K1Ej+1KvyLDNNFLYv7JqPNihZdS0kMjEckZk4iCRXxA/PRE7MpeW3hgm6+O+LIhCvEF4aoRns/PytkLFhQikRqV2daaPaFFvdO606aIMm9YR8lC5A80V9jwrhbd56egL0woaLYid6jQSp+P9od6jR5J5Q9WTP6alPhCf280L7N6wwo2zhiQjvWE+JS01BeV44R4OvpSaH1KsKUq3pD8oI9ifsFKfwWdhPeSXjoAxMEMREKb16AAAAAASUVORK5CYII=";
    otherSiteInfoEl.insertAdjacentHTML(
        'afterbegin',
        `<a href="https://pcgamestorrents.com/?s=${encodeURIComponent(game)}" title="PCGamesTorrents" target="_blank">
            <img src="${icon}" width="24" height="24" />
        </a>`
    );
})();
