// ==UserScript==
// @name         Jira. Подгрузка иконок из mysite.compassplus.com
// @namespace    gil9red
// @version      0.7
// @description  try to take over the world!
// @author       gil9red
// @match        https://helpdesk.compassluxe.com/secure/ViewProfile.jspa*
// @icon         https://helpdesk.compassluxe.com/s/5krrdz/712004/7fcd86bd1fac8f876f6db741a6132e00/_/images/fav-jsw.png
// @grant        GM_addStyle
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://gil9red.github.io/user-scripts/helpdesk.compassluxe/Подгрузка иконок.user.js
// @downloadURL  https://gil9red.github.io/user-scripts/helpdesk.compassluxe/Подгрузка иконок.user.js
// ==/UserScript==

(function() {
    'use strict';

    const HOST = "http://127.0.0.1:50000";

    let $avatar = $("#up-d-avatar");

    let groupsText = $(".groups").text();
    let isCompassStaff = groupsText.length == 0 || groupsText.includes("compass-staff");
    if (isCompassStaff) {
        let username = $("#up-d-username").text().trim();
        let url = `${HOST}/api/get_profile_image/${username}`;

        // SOURCE: https://www.w3schools.com/howto/howto_css_loader.asp
        GM_addStyle(`
.loader {
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 10px;
  height: 10px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
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

        let $loader = $(`<div class="loader""></div>`);
        $avatar.append($loader);

        console.log("Поиск картинки для " + username);
        $.ajax({
            url: url,
            success: function(data) {
                // Подмена аватарки (останутся еще места с оригинальной - для сравнения)
                let originalSrc = $(".avatar-image").attr("src");
                let newSrc = url; // Использование ссылки на картинку

                let $avatarImage = $(".avatar-image");
                $avatarImage.attr("data-original-src", originalSrc);
                $avatarImage.attr("data-new-src", newSrc);
                $avatarImage.attr("data-src-from", "original");

                let $buttonSwap = $(`<button style="padding: 0; border: none; background: none;">🔄</button>`);
                $buttonSwap.on("click", function() {
                    let srcFrom = $avatarImage.attr("data-src-from");

                    let nextSrc = srcFrom == "new" ? "original" : "new";
                    $avatarImage.attr("data-src-from", nextSrc);

                    let src = $(".avatar-image").attr(`data-${nextSrc}-src`);
                    $(".avatar-image").attr("src", src);
                });

                $avatar.append($buttonSwap);
                $loader.hide();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                let $result = null;
                if (xhr.status == 404) {
                    $result = $(`<div title="Не найдено">🤷</div>`);
                } else {
                    $result = $(`<div title="Неожиданная ошибка ${xhr.status}">⚠️</div>`);
                }
                $avatar.append($result);
                $loader.hide();
            },
        })
    }
})();
