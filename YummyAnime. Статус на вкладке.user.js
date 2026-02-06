// ==UserScript==
// @name         YummyAnime. Статус на вкладке
// @namespace    gil9red
// @version      2026-02-07
// @description  try to take over the world!
// @author       gil9red
// @match        https://*.yummyani.me/catalog/item/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yummyani.me
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/YummyAnime.%20Статус%20на%20вкладке.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/YummyAnime.%20Статус%20на%20вкладке.user.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    const PREFIX_LOG = "[YummyAnime. Статус в заголовок вкладки] ";
    const ERROR_EMOJI = "⚠️";
    const UNKNOWN_EMOJI = "🤷";
    const STATUS_BY_EMOJI = new Map([
        ["will", "💭"], // В планах
        ["watch_now", "👀"], // Смотрю
        ["watched", "🏁"], // Просмотрено
        ["postpone", "⌛"], // Отложено
        ["lost", "❌"], // Брошено
    ]);

    const SLUG = location.pathname.split("/").pop();
    console.log(PREFIX_LOG + "name:", SLUG);

    function processError(rs) {
        console.log(PREFIX_LOG + "rs.message:", rs.message);

        if (!document.title.includes(ERROR_EMOJI)) {
            document.title = `${ERROR_EMOJI} ${document.title}`;
        }
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
            onerror: processError,
            onabort: processError,
        });
    }

    function process() {
        document.title = document.title.replace(ERROR_EMOJI, "").trim();
        
        doGetJson(
            `/api/anime/${SLUG}`,
            function (rs) {
                try {
                    let rsData = JSON.parse(rs.responseText);
                    console.log(PREFIX_LOG + "rsData:", rsData);

                    let name = rsData.response.title;
                    console.log(PREFIX_LOG + "name:", name);

                    let status = rsData.response?.user?.list?.list?.href;
                    console.log(PREFIX_LOG + "status:", status);

                    if (status) {
                        let status_emoji = STATUS_BY_EMOJI.get(status) ?? UNKNOWN_EMOJI;
                        document.title = `${status_emoji} ${name} - YummyAnime`;
                    }

                } catch (error) {
                    error.message = `${error.message}\n\nresponseText:\n${rs.responseText}`;
                    processError(error);
                    return;
                }
            }
        );
    }

    process();

    // Сайт обновляет текст на вкладке
    setInterval(process, 5000);
})();
