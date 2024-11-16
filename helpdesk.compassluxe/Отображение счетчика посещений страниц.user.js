// ==UserScript==
// @name         Jira. Отображение счетчика посещений страниц
// @namespace    gil9red
// @version      2024-09-11
// @description  try to take over the world!
// @author       gil9red
// @match        https://helpdesk.compassluxe.com/browse/*
// @match        https://helpdesk.compassluxe.com/projects/*/issues/*
// @match        https://helpdesk.compassluxe.com/secure/ViewProfile.jspa*
// @icon         https://helpdesk.compassluxe.com/s/5krrdz/712004/7fcd86bd1fac8f876f6db741a6132e00/_/images/fav-jsw.png
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Отображение счетчика посещений страниц.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/helpdesk.compassluxe/Отображение счетчика посещений страниц.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Спиннер
    let $loader = $(`<div class="loader"></div>`);

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

    GM_addStyle(`
.my-counter, .my-counter > .value {
    font-size: 0.9em;
    color: gray;
}
    `);

    function getErrorText(rs) {
        if (rs.status == 404) {
            return `<span title="Не найдено">🤷</span>`;
        }
        return `<span title="Неожиданная ошибка ${rs.status}">⚠️</span>`;
    }

    function doGetCounter(name, $myCounter, $loader) {
        console.log(`Запрос увеличения счетчика для ${name}`);

        function process_error(rs) {
            $myCounter.html(getErrorText(rs));
            $loader.hide();
        }

        function process_rs(data) {
            $myCounter.text(data);
            $myCounter.attr("title", `Количество посещений: ${data}`);
            $loader.hide();
        }

        GM_xmlhttpRequest({
            method: "GET",
            url: `http://127.0.0.1:50001/increment/${name}`,
            onload: function (rs) {
                // NOTE: Почему-то на 404 сюда попало
                let firstDigit = `${rs.status}`[0];
                if (firstDigit == "4" || firstDigit == "5") {
                    process_error(rs);
                } else {
                    let data = JSON.parse(rs.responseText);
                    process_rs(data);
                }
            },
            onerror: process_error,
            onabort: process_error,
        });
    }

    // Относится к странице профиля
    let $userTitleName = $("#up-user-title-name");
    let userTitleName = $userTitleName.text();
    if (userTitleName) {
        $userTitleName.html(`${$userTitleName.html()} <span class="my-counter">(<span class="value"></span>)</span>`);
        let $myCounter = $(".my-counter > .value");
        $myCounter.append($loader);

        doGetCounter(userTitleName, $myCounter, $loader);
    }

    // Относится к странице задач
    let $jiraId = $("#key-val");
    let jiraId = $jiraId.text();
    if (jiraId) {
        $jiraId.html(`${$jiraId.html()} <span class="my-counter">(<span class="value"></span>)</span>`);
        let $myCounter = $(".my-counter > .value");
        $myCounter.append($loader);

        doGetCounter(jiraId, $myCounter, $loader);
    }
})();
