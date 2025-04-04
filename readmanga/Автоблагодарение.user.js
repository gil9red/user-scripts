// ==UserScript==
// @name         Автоблагодарение
// @namespace    gil9red
// @version      0.9
// @description  Скрипт автоматически нажимает на кнопку "Сказать спасибо переводчику"
// @author       gil9red
// @include      /^https:\/\/(.+\.)?(readmanga|mintmanga|seimanga|usagi)\..+\/.+$/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=readmanga.live
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/readmanga/Автоблагодарение.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/readmanga/Автоблагодарение.user.js
// ==/UserScript==

(function() {
    'use strict';

    function isLastPage() {
        let queryPageSelector = '.page-selector';
        return $(queryPageSelector + ' option:selected').val() == $(queryPageSelector + ' option:last').val();
    }

    let sayThanksEl = $('a[onclick*="ajax/thanks"]')[0];
    if (!sayThanksEl) {
        sayThanksEl = $('a[href*="ajax/thanks"]')[0];
    }

    if (sayThanksEl) {
        var intervalId = setInterval(() => {
            let ok = isLastPage();
            console.log("Последняя страница:", ok);
            if (ok) {
                sayThanksEl.click();
                console.log("Говорю спасибо!");
                clearInterval(intervalId);
            }
        }, 1000);
    } else {
        console.log("Похоже, переводчика тут нет");
    }

})();
