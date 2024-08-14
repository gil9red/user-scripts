// ==UserScript==
// @name         Своя компания. Кнопка отображения выгодных блюд бизнес ланча
// @namespace    gil9red
// @version      0.3
// @description  try to take over the world!
// @author       gil9red
// @match        https://*.svoya-kompaniya.ru/menu/biznes-lanchi*
// @require      https://gist.githubusercontent.com/mjblay/18d34d861e981b7785e407c3b443b99b/raw/debc0e6d4d537ac228d1d71f44b1162979a5278c/waitForKeyElements.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=svoya-kompaniya.ru
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/svoya-kompaniya/Кнопка отображения выгодных блюд бизнес ланча.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/svoya-kompaniya/Кнопка отображения выгодных блюд бизнес ланча.user.js
// ==/UserScript==

(function() {
    'use strict';

    const CATEGORY_BY_COLOR = new Map(Object.entries({
        "горячее": "red",
        "суп": "blue",
        "салат": "green",
    }));

    const BUTTON_ID = "tampermonkey__button";
    const HTML_BUTTON = `
        <button id="${BUTTON_ID}" class="filter-item active" style="margin-left: 10px;">
            💰 Показать выгодные!
        </button>
    `;

    function doFound() {
        let categoryByMinPrice = new Map();
        for (let category of CATEGORY_BY_COLOR.keys()) {
            categoryByMinPrice.set(
                category,
                {
                    value: Infinity,
                    elements: [],
                }
            );
        }

        document.querySelectorAll(".product-list > .product-item").forEach((itemEl) => {
            let price = parseInt(itemEl.querySelector(".product__sum").innerText.replace(/[^\d.,]/, ""));

            let labels = [];
            itemEl.querySelectorAll(".product__labels > .label").forEach((item) => {
                let label = item.innerText.toLowerCase();
                labels.push(label);
            });

            for (let label of labels) {
                if (!categoryByMinPrice.has(label)) {
                    continue;
                }

                let minPrice = categoryByMinPrice.get(label);
                if (minPrice.value > price) {
                    minPrice.value = price;
                    minPrice.elements = [];
                }

                // Собираем товары с одинаковой ценой
                if (minPrice.value == price) {
                    minPrice.elements.push(itemEl);
                }
            }
        });

        document.querySelectorAll(".product-list > .product-item").forEach((itemEl) => {
            let found = false;
            for (let [category, minPrice] of categoryByMinPrice.entries()) {
                for (let product of minPrice.elements) {
                    if (product == itemEl) {
                        let color = CATEGORY_BY_COLOR.get(category);
                        itemEl.style.boxShadow = `0px 0px 12px ${color}`;
                        found = true;
                        break;
                    }
                }
                if (found) {
                    break;
                }
            }
            if (!found) {
                itemEl.style.display = "none";
            }
        });
    }

    waitForKeyElements(
        ".filter-list",
        (el) => {
            el.insertAdjacentHTML('beforeend', HTML_BUTTON);
            let button = document.getElementById(BUTTON_ID);
            button.onclick = doFound;
        }
    );

})();