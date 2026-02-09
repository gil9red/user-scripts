// ==UserScript==
// @name         YummyAnime. Статус на вкладке
// @namespace    gil9red
// @version      2026-02-09v2
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

    function processError(rs) {
        console.log(PREFIX_LOG + "rs.message:", rs.message);

        if (!document.title.includes(ERROR_EMOJI)) {
            document.title = `${ERROR_EMOJI} ${document.title}`;
        }
    }

    const fetchAsync = (url) => new Promise((resolve, reject) => {
        console.log(PREFIX_LOG + "url:", url);

        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            onload: resolve, // Весь объект ответа пойдет в resolve
            onerror: reject, // Ошибка пойдет в reject
            onabort: () => reject(new Error("Request aborted")), // Обрабатываем отмену
            ontimeout: () => reject(new Error("Request timeout")) // Желательно и таймаут
        });
    });

    async function mainLoop() {
        while (true) {
            let responseText = null;
            try {
                const slug = location.pathname.split("/").pop();
                document.title = document.title.replace(ERROR_EMOJI, "").trim(); // Удаление символа ошибки

                const rs = await fetchAsync(`/api/anime/${slug}`);
                responseText = rs.responseText;

                const rsData = JSON.parse(responseText);
                console.log(PREFIX_LOG + "rsData:", rsData);

                const name = rsData.response.title;
                console.log(PREFIX_LOG + "name:", name);

                const status = rsData.response?.user?.list?.list?.href;
                console.log(PREFIX_LOG + "status:", status);

                if (status) {
                    let status_emoji = STATUS_BY_EMOJI.get(status) ?? UNKNOWN_EMOJI;
                    document.title = `${status_emoji} ${name} - YummyAnime`;
                }

            } catch (error) {
                error.message = `${error.message}\n\nresponseText:\n${responseText}`;
                processError(error);
            }

            // Ждем перед следующей итерацией в любом случае
            await new Promise(r => setTimeout(r, 5000));
        }
    }

    mainLoop();
})();
