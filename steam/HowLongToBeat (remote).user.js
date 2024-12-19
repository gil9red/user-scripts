// ==UserScript==
// @name         Steam. HowLongToBeat (remote)
// @namespace    gil9red
// @version      2024-12-19
// @description  try to take over the world!
// @author       gil9red
// @match        https://store.steampowered.com/app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/steam/HowLongToBeat (remote).user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/steam/HowLongToBeat (remote).user.js
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const URL_SEARCH = "http://127.0.0.1:10017/search-game";

    let appNameEl = document.getElementById("appHubAppName");
    let game = appNameEl ? appNameEl.textContent : null;
    console.log("Game:", game);

    if (!game) {
        return;
    }

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
        return `https://howlongtobeat.com/game/${game_id}`;
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
        `<div class="howlongtobeat" style="margin-bottom: 2px;">
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

    // SOURCE: https://github.com/gil9red/SimplePyScripts/blob/7991b5a0b9c25e24ddb9b85a6f3dedb9dec1f160/howlongtobeat__web_wrapper/main.py
    GM_xmlhttpRequest({
        method: "GET",
        url: `${URL_SEARCH}/${game}`,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        onload: function (rs) {
            try {
                let rsData = JSON.parse(rs.responseText);
                console.log(rsData);

                if (!rsData) {
                    process_error({status: 404});
                    return;
                }

                set_howlongtobeat_info(infoEl, rsData);

                setVisible(loaderEl, false);
                setVisible(errorEl, false);
                setVisible(infoEl, true);

            } catch (error) {
                error.message = `${error.message}\n\nresponseText:\n${rs.responseText}`;
                process_error(error);
                return;
            }
        },
        onerror: process_error,
        onabort: process_error,
    });
})();
