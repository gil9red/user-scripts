// ==UserScript==
// @name         Steam. HowLongToBeat
// @namespace    gil9red
// @version      2024-12-05
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
    let game = appNameEl ? appNameEl.textContent : null;
    console.log("Game:", game);

    if (!game) {
        return;
    }

    game = game.replace(/[©®]/g, "");
    console.log("Processed game:", game);

    let headerEl = document.querySelector(".apphub_HeaderStandardTop");
    if (!headerEl) {
        return;
    }

    function get_hours(seconds) {
        return Math.ceil(seconds / 3600);
    }

    function get_howlongtobeat_hours_long(obj) {
        let comp_main = get_hours(obj.comp_main);
        let comp_plus = get_hours(obj.comp_plus);
        let comp_100 = get_hours(obj.comp_100);

        let text = `Main Story: ${comp_main}\nMain + Extra: ${comp_plus}\nCompletionist: ${comp_100}`;

        let addional = [];
        if (obj.review_score) {
            addional.push(`${obj.count_comp} Beat`);
        }
        if (obj.count_playing) {
            addional.push(`${obj.count_playing} Playing`);
        }
        if (obj.count_backlog) {
            addional.push(`${obj.count_backlog} Backlogs`);
        }
        if (obj.count_retired) {
            addional.push(`${obj.count_retired} Retired`);
        }
        if (obj.review_score) {
            addional.push(`\n${obj.review_score}% Rating`);
        }

        if (addional.length > 0) {
            text += "\n\n" + addional.join("\n");
        }

        return text;
    }
    function get_howlongtobeat_hours_short(obj) {
        let comp_main = get_hours(obj.comp_main);
        let comp_plus = get_hours(obj.comp_plus);
        let comp_100 = get_hours(obj.comp_100);

        return `HowLongToBeat: ${comp_main}/${comp_plus}/${comp_100} hours`;
    }
    function get_howlongtobeat_game_url(game_id) {
        return `${URL_BASE}/game/${game_id}`;
    }
    function set_howlongtobeat_info(infoEl, obj) {
        infoEl.setAttribute("href", get_howlongtobeat_game_url(obj.game_id));
        infoEl.setAttribute("title", get_howlongtobeat_hours_long(obj));
        infoEl.textContent = get_howlongtobeat_hours_short(obj);
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

    // SOURCE: https://stackoverflow.com/a/66481918/5909792
    function escapeHTML(unsafe) {
        return unsafe.replace(
            /[\u0000-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u00FF]/g,
            c => '&#' + ('000' + c.charCodeAt(0)).slice(-4) + ';'
        )
    }

    function process_error(rs) {
        if (rs instanceof Error) {
            errorEl.innerHTML = `<span title="Неожиданная ошибка:\n${escapeHTML(rs.message)}">⚠️</span>`;
            console.log(rs.message);

        } else {
            function getErrorText(rs) {
                if (rs.status == 404) {
                    return `<span title="Не найдено">🤷</span>`;
                }
                return `<span title="Неожиданная ошибка ${rs.status}">⚠️</span>`;
            }

            errorEl.innerHTML = getErrorText(rs);
        }

        setVisible(loaderEl, false);
        setVisible(errorEl, true);
        setVisible(infoEl, false);
    }

    GM_xmlhttpRequest({
        method: "GET",
        url: `${URL_BASE}/?q=${game}`,
        onload: function (rs) {
            let m = /<script src="([\w/]+_app-[\w/]+\.js)"/gm.exec(rs.responseText);
            if (!m) {
                console.log(m);
                process_error(new Error("<script> не найдено!"));
                return;
            }

            let uri = m[1];
            if (!uri) {
                console.log(uri);
                process_error(new Error("uri from <script> не найдено!"));
                return;
            }

            GM_xmlhttpRequest({
                method: "GET",
                url: `${URL_BASE}${uri}`,
                onload: function (rs) {
                    try {
                        let url_api_search = `${URL_BASE}/api/search`;
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
                                        "genre": "",
                                        "subGenre": "  "
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

                        // NOTE: fetch("/api/search/".concat("foo").concat("bar"),
                        //       fetch("/api/search/".concat("foobar"),
                        let m_concat_search_key = /"\/api\/search\/"(.+?),/g.exec(rs.responseText);
                        if (m_concat_search_key) {
                            let concat_search_key = m_concat_search_key[1];

                            // NOTE: .concat("foo").concat("bar") -> "foobar"
                            //       .concat("foobar") -> "foobar"
                            let search_key = Array.from(
                                concat_search_key.matchAll(/"(\w+)"|'(\w+)'/gm),
                                (m) => m[1]
                            ).join("");

                            console.log(`search_key: ${search_key}`);
                            url_api_search = `${url_api_search}/${search_key}`;
                            console.log(`New url_api_search: ${url_api_search}`);
                        }

                        let m_search_user_id = /,users:\{id:"([a-zA-Z0-9]+)",/g.exec(rs.responseText);
                        if (m_search_user_id) {
                            let search_user_id = m_search_user_id[1];
                            console.log(`search_user_id: ${search_user_id}`);
                            data.searchOptions.users.id = search_user_id;
                        }

                        console.log("POST", url_api_search, data);

                        GM_xmlhttpRequest({
                            method: "POST",
                            url: url_api_search,
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                                "Referer": `${URL_BASE}/?q=${game}`,
                            },
                            data: JSON.stringify(data),
                            onload: function (rs) {
                                console.log(rs.responseText);

                                function is_found_game(game1, game2) {
                                    function process_name(name) {
                                        return name.replace(/\W/g, "").toLowerCase();
                                    }

                                    return process_name(game1) == process_name(game2);
                                }

                                let rsData = null;
                                try {
                                    rsData = JSON.parse(rs.responseText);
                                    console.log(rsData);
                                } catch (error) {
                                    error.message = `${error.message}\n\nresponseText:\n${rs.responseText}`;
                                    process_error(error);
                                    return;
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

                                process_error({status: 404});
                            },
                            onerror: process_error,
                            onabort: process_error,
                        });
                    } catch (error) {
                        error.message = `${error.message}\n\nresponseText:\n${rs.responseText}`;
                        process_error(error);
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
})();
