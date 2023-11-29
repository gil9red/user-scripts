// ==UserScript==
// @name         Включение выделения
// @namespace    gil9red
// @version      0.1
// @description  Отключение выключения выделения текста
// @author       gil9red
// @match        https://ffforever.info/index.cgi*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ffforever.info
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://gil9red.github.io/user-scripts/ffforever/Включение выделения.user.js
// @downloadURL  https://gil9red.github.io/user-scripts/ffforever/Включение выделения.user.js
// ==/UserScript==

(function() {
    'use strict';

    // NOTE: Нужно удалить:
    //    Из <html>:
    //        Класс "no-touch"
    //
    //    Из одного единственного <td>:
    //        Значения "*-user-select: none;" из style="padding-top:10px;padding-bottom:10px;padding-left:25px;padding-right:25px;line-height:15px;font-size:12px;-moz-user-select: none;-khtml-user-select: none;"
    //        Атрибут: onselectstart="return false"

    let el_onselectstart = document.querySelector("td[onselectstart]");
    el_onselectstart.removeAttribute("onselectstart");

    for (let style_prop of ['-moz-user-select', '-khtml-user-select']) {
        if (el_onselectstart.style.removeProperty) {
            el_onselectstart.style.removeProperty(style_prop);
            el_onselectstart.style.removeProperty(style_prop);
        } else {
            el_onselectstart.style.removeAttribute(style_prop);
            el_onselectstart.style.removeAttribute(style_prop);
        }
    }

    // Класс не сразу добавляется сайтом, поэтому нужно будет повторить проверку
    var intervalId = setInterval(() => {
        let el_not_touch = document.querySelector(".no-touch");
        if (el_not_touch) {
            el_not_touch.classList.remove("no-touch");
            clearInterval(intervalId);
        }
    }, 1000);

})();