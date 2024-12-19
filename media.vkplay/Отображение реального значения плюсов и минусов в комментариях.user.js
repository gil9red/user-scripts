// ==UserScript==
// @name         Отображение реального значения плюсов и минусов в комментариях
// @namespace    gil9red
// @version      0.5
// @description  try to take over the world!
// @author       gil9red
// @match        https://media.vkplay.ru/*
// @match        https://vkplay.ru/media/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vkplay.ru
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/media.vkplay/Отображение реального значения плюсов и минусов в комментариях.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/media.vkplay/Отображение реального значения плюсов и минусов в комментариях.user.js
// ==/UserScript==

(function() {
    'use strict';

    function processComment(comment) {
        let likesHtml = `<span style="color: green">+${comment.likes}</span>`;
        let dislikesHtml = `<span style="color: red">-${comment.dislikes}</span>`;
        let newText = `${comment.points} (${likesHtml}${dislikesHtml})`;

        let el = document.querySelector(`#comment-${comment.id} .comments__reaction-sum`);
        console.log(`Изменение рейтинга комментария #${comment.id}: ${el.textContent} -> ${newText}`);

        el.innerHTML = newText;
    }

    function promiseProcessComment(comment, timeoutMs=100) {
        new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    processComment(comment);
                    resolve("ok");
                },
                timeoutMs
            );
        });
    }

    // SOURCE: https://stackoverflow.com/a/59500532/5909792
    var originalFetch = fetch;
    fetch = (input, init) => {
        return originalFetch(input, init).then(response => {
            // it is not important to create new Promise in ctor, we can await existing one, then wrap result into new one
            return new Promise(resolve => {
                response
                    .clone() // we can invoke `json()` only once, but clone do the trick
                    .json()
                    .then(json => {
                        const url = response.url;
                        if (url.includes("/comments/")) {
                            // Лайк/дизлайк комментария
                            if (url.includes("/react")) {
                                promiseProcessComment(json);

                            } else { // Подгрузка комментариев
                                let comments = json.results || json.response || [];
                                for (let comment of comments) {
                                    promiseProcessComment(comment);
                                }
                            }
                        }

                        resolve(response);
                    })
                ;
            });
        });
    };
})();
