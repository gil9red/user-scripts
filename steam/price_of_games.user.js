// ==UserScript==
// @name         Steam. price_of_games
// @namespace    gil9red
// @version      2025-08-21
// @description  Using API https://github.com/gil9red/price_of_games
// @author       gil9red
// @match        https://store.steampowered.com/app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/steam/price_of_games.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/steam/price_of_games.user.js
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // https://github.com/gil9red/price_of_games/blob/ea72f97245918d41d148d39b2204faaf63641ada/app_web/main.py#L434
    const URL_SEARCH = "http://127.0.0.1:5500/api/search";

    let appNameEl = document.getElementById("appHubAppName");
    let game = appNameEl ? appNameEl.textContent : null;
    console.log("Game:", game);

    if (!game) {
        return;
    }

    let otherSiteInfoEl = document.querySelector(".apphub_OtherSiteInfo");
    if (!otherSiteInfoEl) {
        return;
    }

    function setVisible(el, visible) {
        el.style.display = visible ? null : "none";
    }

    otherSiteInfoEl.insertAdjacentHTML(
        'afterbegin',
        `<span class="price_of_games" style="font-size: large;">
            <span class="loader"></span>
            <span class="error"></span>
            <span class="info">💰</span>
        </span>`
    );

    const price_of_gamesEl = document.querySelector(".price_of_games");
    const loaderEl = price_of_gamesEl.querySelector(".loader");
    const errorEl = price_of_gamesEl.querySelector(".error");
    const infoEl = price_of_gamesEl.querySelector(".info");

    setVisible(loaderEl, true);
    setVisible(errorEl, false);
    setVisible(infoEl, false);

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
        url: `${URL_SEARCH}/${encodeURIComponent(game.replace('/', ' '))}`,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        onload: function (rs) {
            try {
                let rsData = JSON.parse(rs.responseText);
                console.log(rsData);

                if (!rsData || rsData.length == 0) {
                    process_error({status: 404});
                    return;
                }

                infoEl.title = rsData
                    .map(
                        (game) => {
                            let kindTitle;
                            switch (game.kind) {
                                case "FINISHED_GAME": {
                                    kindTitle = "Пройдено";
                                    break;
                                }
                                case "FINISHED_WATCHED": {
                                    kindTitle = "Просмотрено";
                                    break;
                                }
                                default: {
                                    kindTitle = game.kind;
                                }
                            }
                            return `#${game.id}. ${game.name}`
                                   + `\nЦена: ${game.price} ₽`
                                   + `\nПлатформа: ${game.platform}`
                                   + `\n${kindTitle}: ${game.append_date}`
                                   + `\nЖанры: ${game.genres.join(", ")}`
                            ;
                        }
                    )
                    .join("\n")
                ;

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

