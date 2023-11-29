// ==UserScript==
// @name         Отображение реального значения плюсов и минусов в комментариях
// @namespace    gil9red
// @version      0.3
// @description  try to take over the world!
// @author       gil9red
// @match        https://media.vkplay.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vkplay.ru
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://gil9red.github.io/user-scripts/media.vkplay/Отображение реального значения плюсов и минусов в комментариях.user.js
// @downloadURL  https://gil9red.github.io/user-scripts/media.vkplay/Отображение реального значения плюсов и минусов в комментариях.user.js
// ==/UserScript==

(function() {
    'use strict';

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
                        let comments = json.results || json.response;
                        if (response.url.includes("/comments/") && comments) {
                            for (let comment of comments) {
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        let likesHtml = `<span style="color: green">+${comment.likes}</span>`;
                                        let dislikesHtml = `<span style="color: red">-${comment.dislikes}</span>`;
                                        let newText = `${comment.points} (${likesHtml}${dislikesHtml})`;

                                        let el = document.querySelector(`#comment-${comment.id} .comments__reaction-sum`);
                                        console.log(`Изменение рейтинга комментария #${comment.id}: ${el.textContent} -> ${newText}`);

                                        el.innerHTML = newText;

                                        resolve("ok");
                                    }, 1000);
                                });
                            }
                        }

                        resolve(response);
                    })
                ;
            });
        });
    };

})();