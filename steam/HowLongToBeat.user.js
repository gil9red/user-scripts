// ==UserScript==
// @name         Steam. HowLongToBeat
// @namespace    gil9red
// @version      2024-11-02
// @description  try to take over the world!
// @author       gil9red
// @match        https://store.steampowered.com/app/*
// @connect      howlongtobeat.com
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/steam/HowLongToBeat.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/steam/HowLongToBeat.user.js
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const URL_BASE = "https://howlongtobeat.com";

    let appNameEl = document.getElementById("appHubAppName");
    const game = appNameEl ? appNameEl.textContent : null;
    console.log("game", game);

    if (!game) {
        return;
    }

    let headerEl = document.querySelector(".apphub_HeaderStandardTop");
    if (!headerEl) {
        return;
    }

    function get_howlongtobeat_hours_long(comp_main, comp_plus, comp_100) {
        return `Main Story: ${comp_main}\nMain + Extra: ${comp_plus}\nCompletionist: ${comp_100}`;
    }
    function get_howlongtobeat_hours_short(comp_main, comp_plus, comp_100) {
        return `HowLongToBeat: ${comp_main}/${comp_plus}/${comp_100} hours`;
    }
    function get_howlongtobeat_game_url(game_id) {
        return `${URL_BASE}/game/${game_id}`;
    }
    function set_howlongtobeat_info(infoEl, obj) {
        function get_hours(seconds) {
            return parseInt(seconds / 3600);
        }

        let comp_main = get_hours(obj.comp_main);
        let comp_plus = get_hours(obj.comp_plus);
        let comp_100 = get_hours(obj.comp_100);

        infoEl.setAttribute("href", get_howlongtobeat_game_url(obj.game_id));
        infoEl.setAttribute("title", get_howlongtobeat_hours_long(comp_main, comp_plus, comp_100));
        infoEl.textContent = get_howlongtobeat_hours_short(comp_main, comp_plus, comp_100);
    }

    function setVisible(el, visible) {
        el.style.display = visible ? null : "none";
    }

    headerEl.insertAdjacentHTML(
        'beforeend',
        `<div class="howlongtobeat">
            <span class="loader"></span>
            <span class="error">error</span>
            <a
                class="info"
                href="XXX"
                title="XXX"
                target="_blank"
            >
                XXX
            </a>
        </div>`
    );

    const loaderEl = document.querySelector(".howlongtobeat .loader");
    const errorEl = document.querySelector(".howlongtobeat .error");
    const infoEl = document.querySelector(".howlongtobeat .info");

    setVisible(loaderEl, true);
    setVisible(errorEl, false);
    setVisible(infoEl, false);

    // Example
    set_howlongtobeat_info(infoEl, {game_id: 100500, comp_main: 3600, comp_plus: 7200, comp_100: 10800});


    // SOURCE: https://www.w3schools.com/howto/howto_css_loader.asp
    GM_addStyle(`
.loader {
border: 5px solid #f3f3f3;
border-radius: 50%;
border-top: 5px solid #3498db;
width: 5px;
height: 5px;
-webkit-animation: spin 2s linear infinite; /* Safari */
animation: spin 2s linear infinite;
display: inline-block;
}

/* Safari */
@-webkit-keyframes spin {
0% { -webkit-transform: rotate(0deg); }
100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
}
    `);

    function process_error(rs) {
        function getErrorText(rs) {
            if (rs.status == 404) {
                return `<span title="Не найдено">🤷</span>`;
            }
            return `<span title="Неожиданная ошибка ${rs.status}">⚠️</span>`;
        }

        errorEl.innerHTML = getErrorText(rs);

        setVisible(loaderEl, false);
        setVisible(errorEl, true);
        setVisible(infoEl, false);
    }


    GM_xmlhttpRequest({
        method: "GET",
        url: `${URL_BASE}/?q=${game}`,
        onload: function (rs) {
            let uri = /<script src="([\w/]+_app-[\w/]+\.js)"/gm.exec(rs.responseText)[1];
            console.log(uri);
            if (!uri) {
                return;
            }

            GM_xmlhttpRequest({
                method: "GET",
                url: `${URL_BASE}${uri}`,
                onload: function (rs) {
                    let search_key = /"\/api\/search\/".concat\("([a-zA-Z0-9]+)"\)/g.exec(rs.responseText)[1];
                    console.log(search_key);
                    if (!search_key) {
                        return;
                    }

                    let data = {
                        "searchType": "games",
                        "searchTerms": game.split(" "),
                        "searchPage": 1,
                        "size": 20,
                        "searchOptions": {
                            "games": {
                                "userId": 0,
                                "platform": "PC",
                                "sortCategory": "popular",
                                "rangeCategory": "main",
                                "rangeTime": {
                                    "min": null,
                                    "max": null
                                },
                                "gameplay": {
                                    "perspective": "",
                                    "flow": "",
                                    "genre": ""
                                },
                                "rangeYear": {
                                    "min": "",
                                    "max": ""
                                },
                                "modifier": ""
                            },
                            "users": {
                                "sortCategory": "postcount"
                            },
                            "lists": {
                                "sortCategory": "follows"
                            },
                            "filter": "",
                            "sort": 0,
                            "randomizer": 0
                        },
                        "useCache": false
                    };

                    GM_xmlhttpRequest({
                        method: "POST",
                        url: `${URL_BASE}/api/search/${search_key}`,
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Referer": `${URL_BASE}/?q=${game}`,
                        },
                        data: JSON.stringify(data),
                        onload: function (rs) {
                            let rsData = JSON.parse(rs.responseText);
                            console.log(rsData);

                            function is_found_game(game1, game2) {
                                function process_name(name) {
                                    return name.replace(/\W/g, "").toLowerCase();
                                }

                                return process_name(game1) == process_name(game2);
                            }

                            for (let obj of rsData.data) {
                                if (!is_found_game(game, obj.game_name)) {
                                    continue;
                                }

                                set_howlongtobeat_info(infoEl, obj);
                                setVisible(loaderEl, false);
                                setVisible(errorEl, false);
                                setVisible(infoEl, true);
                                return;
                            }
                        },
                        onerror: process_error,
                        onabort: process_error,
                    });
                },
                onerror: process_error,
                onabort: process_error,
            });


        },
        onerror: process_error,
        onabort: process_error,
    });
})();
