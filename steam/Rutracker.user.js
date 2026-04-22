// ==UserScript==
// @name         Steam. Rutracker
// @namespace    gil9red
// @version      2026-04-22
// @description  try to take over the world!
// @author       gil9red
// @match        https://store.steampowered.com/app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @homepage     https://github.com/gil9red/user-scripts/blob/main/steam/Rutracker.user.js
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

    const icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD4UlEQVR4Ab3WA3AkWQDG8Y7Ptu/W9sa2nTXDs23bviud79a2reCsjW07k7f/rupUverNzHbYVb84832PNcpgPgUjA1T2uAyKatgeLdAK92MFLsUwhgP+qEAdHDGs4XfgJITmPigYlvBr8AuEZCVsMWhrez7Ogx2sNZfAB1thgpDkY8xgFZiM7diNTViBX3AE9RBmvANbDLjAzUiH6KNGPIwLDO8Hu1OJMnmdQ1HTjxKtWIMYXA9rnDN8HtJwsVTCBq+g20JYWdEIP3WZiiB02vEXPkUQHNBrASt8i26swEQof08KVEtci8MQeqj5a0x0fHjwnzMzx80LLhzpn2eh6F+4DWZn4DMIzf9IxlVCcVVL3AOhVzzCd0tMUJa3c0RZ3uzIyhS+T9NGLSQmHIAvrC0VeAtC0o4s5dekZ447BqvHrgFCVjLC52GCH3eJKBWUyI0PPOVOiW+lv6nCy7gGCizugWch9KwzE4+uCwn3LhwhbUYUjgyoPjxhubdjZMUOtYDKMbJ83capD85mKbL4m0JEwBqGTsArEHpKVtJ3/0wIjNFPLSPdPj/gmBcjr+wpgC4KvZoxbp5bxR0efsJOUZpumWroCDpgHYROx3knEueX3ub/kRyOuuIRfrGEvaQFy9qcIsu/nh5VO4XP57tGlFjzM5lVb6N3QyWEzCYjMf3dpGg3pj9bCzYVjQj4j+8Tlzz8/EW82CoIM8qxGz/hR83PeE0ffgt2mZn+77PHBoaooczCiuI7AhLfTItxss1IfMgmc1msa2jFO1qYUd34Tg6fgb0QvbHlOI7euCTopXtjHa/ZuyyUE/Ems5LJ77ptM5d+55iQG8oL1kMYtBM3qcF2mItsCEsoUU7o33zdBCGpPv/Q3aHMwuu8qMlAeDZmQVELPI1GiAFJX37q6h/fnu0aVr7iHOFtWAalp8ASbEYe2iH6yzZj2ZqxT22f7RJedsxCgQO4FGcdvdsRgbfxL7r7VSJzyduOcfnRBDRD6OFNKLB4EY3A9zBZCDOhgqn/jZEfx0Hss/lt0VvTl/3uRUAthB4egaHb8EpshNBDHp60TV8+6fY3V0ycdO8Rz6mp6d4E+zrG54URsB7C2AxYLuGFOgjJn3C1P56iOEcXKqx3Eqq1ETegDcKCfbgIhq7lC7ETQlOHCCgqbSRh6IAwqAazjRUAHoDQfARbKDw9BYLQDiExoQr/IBtNEJInoRgtMQFl+A23Q9EeczOQiycxFdfhJnjjDaSjA1vgYLSAPR6Xpl5fIAqdMGErpkOB/u+scCVCEAYbGH6XbKUPl144FCV4FVdCUQ3Lo4Vdjtlw6E/wGcg6dtlMDXHnAAAAAElFTkSuQmCC";
    otherSiteInfoEl.insertAdjacentHTML(
        'afterbegin',
        `<a href="https://rutracker.net/forum/tracker.php?nm=${encodeURIComponent(game)}" title="Rutracker" target="_blank">
            <img src="${icon}" width="24" height="24" />
        </a>`
    );
})();

