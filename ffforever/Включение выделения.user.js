// ==UserScript==
// @name         Включение выделения
// @namespace    gil9red
// @version      0.3
// @description  Отключение выключения выделения текста
// @author       gil9red
// @include      /^https:\/\/(.+\.)?ffforever\.info\/index.cgi.+$/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ffforever.info
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/ffforever/Включение выделения.user.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/ffforever/Включение выделения.user.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Удаление атрибута функции onselectstart
    //     Пример: onselectstart="return false"
    let el_onselectstart = document.querySelector("td[onselectstart]");
    el_onselectstart.removeAttribute("onselectstart");

    // Удаление стилей:
    //     Пример: "*-user-select: none;" из style="padding-top:10px;padding-bottom:10px;padding-left:25px;padding-right:25px;line-height:15px;font-size:12px;-moz-user-select: none;-khtml-user-select: none;"
    for (let style_prop of ['-moz-user-select', '-khtml-user-select']) {
        if (el_onselectstart.style.removeProperty) {
            el_onselectstart.style.removeProperty(style_prop);
            el_onselectstart.style.removeProperty(style_prop);
        } else {
            el_onselectstart.style.removeAttribute(style_prop);
            el_onselectstart.style.removeAttribute(style_prop);
        }
    }

    // Удаление класса "no-touch"
    // Класс не сразу добавляется сайтом, поэтому нужно будет повторить проверку
    var intervalId = setInterval(() => {
        for (let el of document.querySelectorAll(".no-touch")) {
            el.classList.remove("no-touch");
            clearInterval(intervalId);
        }
    }, 1000);

})();
