// ==UserScript==
// @name         Rutube. Заполнение заголовка вкладки из текста поиска
// @namespace    gil9red
// @version      2024-08-20
// @description  try to take over the world!
// @author       gil9red
// @match        https://rutube.ru/channel/*/search/?channelSearchQuery=*
// @match        https://rutube.ru/search/?query=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rutube.ru
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/rutube/Заполнение заголовка вкладки из текста поиска.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/rutube/Заполнение заголовка вкладки из текста поиска.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function process() {
        // Для канала
        if (location.search.includes("channelSearchQuery")) {
            let channelTitleEl = document.querySelector("meta[property='og:profile:username']");
            let searchEl = document.querySelector(".user-channel-search-form-module__input");
            if (!channelTitleEl || !channelTitleEl.content || !searchEl || !searchEl.value) {
                return;
            }

            document.title = `${searchEl.value} - Поиск на канале "${channelTitleEl.content}" - Rutube`;
            return;
        }

        let searchEl = document.querySelector(".wdp-header-search-module__input");
        if (!searchEl || !searchEl.value) {
            return;
        }

        document.title = `${searchEl.value} - Поиск - Rutube`;
    }

    setInterval(process, 2000); // Каждые 2 секунды
})();
