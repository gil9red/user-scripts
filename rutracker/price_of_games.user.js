// ==UserScript==
// @name         Rutracker. price_of_games
// @namespace    gil9red
// @version      2026-01-09
// @description  try to take over the world!
// @author       You
// @match        https://rutracker.org/forum/viewtopic.php?t=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rutracker.org
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/rutracker/price_of_games.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/rutracker/price_of_games.user.js
// ==/UserScript==

(function() {
    'use strict';

    // NOTE: Аналог https://github.com/gil9red/user-scripts/raw/main/steam/price_of_games.user.js
  
    const PREFIX_LOG = "[price_of_games] ";

    // https://github.com/gil9red/price_of_games/blob/ea72f97245918d41d148d39b2204faaf63641ada/app_web/main.py#L434
    const URL_SEARCH = "http://127.0.0.1:5500/api/search";

    const titleEl = document.querySelector("#topic-title");
    if (!titleEl) {
        alert("Не найдено #topic-title!");
        return;
    }

    const title = titleEl.text;
    console.log(PREFIX_LOG + "Title:", title);

    if (!titleEl.text || !titleEl.text.trim()) {
        alert("Пустой текст #topic-title!");
        return;
    }

    const processedTitle = title.replace(/\[.+?\]/mg, "").replace(/\(.+?\)/mg, "").trim();
    console.log(PREFIX_LOG + "Processed title:", processedTitle);

    let maintitleEl = document.querySelector(".maintitle");
    if (!maintitleEl) {
        return;
    }

    function setVisible(el, visible) {
        el.style.display = visible ? null : "none";
    }

    maintitleEl.insertAdjacentHTML(
        'beforeend',
        `<span class="price_of_games" style="font-size: large;">
            <span class="loader"></span>
            <span class="error"></span>
            <span class="info" style="cursor: help">💰</span>
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
            console.log(PREFIX_LOG + "rs.message:", rs.message);

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

    function process_game(rsData) {
        document.title = `💰 ${document.title}`;

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
            .join("\n\n")
        ;

        setVisible(loaderEl, false);
        setVisible(errorEl, false);
        setVisible(infoEl, true);
    }

    function doGetJson(url, onload) {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            onload: onload,
            onerror: process_error,
            onabort: process_error,
        });
    }

    function processGameForUri(game) {
        return encodeURIComponent(game.replace('/', ' '));
    }

    doGetJson(
        `${URL_SEARCH}/${processGameForUri(processedTitle)}`,
        function (rs) {
            try {
                let rsData = JSON.parse(rs.responseText);
                console.log(PREFIX_LOG + "search rsData:", rsData);

                if (!rsData || rsData.length == 0) {
                    process_error({status: 404});
                    return;
                }

                process_game(rsData);

            } catch (error) {
                error.message = `${error.message}\n\nresponseText:\n${rs.responseText}`;
                process_error(error);
                return;
            }
        }
    );
})();
