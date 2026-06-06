// ==UserScript==
// @name         Steam. Bad rating indicator in tab title
// @namespace    gil9red
// @version      2026-06-06
// @description  try to take over the world!
// @author       gil9red
// @match        https://store.steampowered.com/app/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @homepage     https://github.com/gil9red/user-scripts/blob/main/steam/Bad%20rating%20indicator%20in%20tab%20title.user.js
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/steam/Bad%20rating%20indicator%20in%20tab%20title.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/steam/Bad%20rating%20indicator%20in%20tab%20title.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // <a class="user_reviews_summary_row" ... itemprop="aggregateRating" itemscope="" itemtype="http://schema.org/AggregateRating">
    //     <span class="game_review_summary positive" itemprop="description">Очень положительные</span>
    //     OR <span class="game_review_summary positive" itemprop="description">В основном положительные</span>
    //     OR <span class="game_review_summary positive" itemprop="description">Положительные</span>
    //     OR <span class="game_review_summary mixed" itemprop="description">Смешанные</span>
    //     OR <span class="game_review_summary " itemprop="description">Крайне отрицательные</span>
    //     OR <span class="game_review_summary " itemprop="description">В основном отрицательные</span>
    //     OR <span class="game_review_summary not_enough_reviews" itemprop="description">Обзоров пользователей: 2</span>
    const gameReviewSummary = document.querySelector(
        '[itemprop="aggregateRating"] .game_review_summary[itemprop="description"]'
    );
    if (
        !gameReviewSummary
        || gameReviewSummary.classList.contains("not_enough_reviews")
        || gameReviewSummary.classList.contains("positive")
    ) {
        return;
    }

    document.title = `💩${document.title}`;
})();
