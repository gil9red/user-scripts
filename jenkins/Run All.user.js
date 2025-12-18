// ==UserScript==
// @name         Jenkins. Run All
// @namespace    gil9red
// @version      2025-12-18
// @description  try to take over the world!
// @author       gil9red
// @match        http://127.0.0.1:8090/*
// @match        http://localhost:8090/*
// @icon         http://127.0.0.1:8090/static/cfcd6f85/favicon.svg
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/jenkins/Run%20All.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/jenkins/Run%20All.user.js
// ==/UserScript==


(function() {
    'use strict';

    function getElementsBuilds() {
        return document.querySelectorAll('[data-notification="Build scheduled"] ~ a');
    }

    const elements = getElementsBuilds();
    if (elements.length > 0) {
        document.getElementById("tasks").insertAdjacentHTML(
            "beforeend",
            `
            <div class="task">
                <span class="task-link-wrapper ">
                    <a
                        id="link-run-all"
                        data-task-success="Done."
                        data-task-post=""
                        class="task-link task-link-no-confirm"
                    >
                        <span class="task-icon-link">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" height="512" viewBox="0 0 512 512" width="512"><title></title><path d="M112,111V401c0,17.44,17,28.52,31,20.16l247.9-148.37c12.12-7.25,12.12-26.33,0-33.58L143,90.84C129,82.48,112,93.56,112,111Z" style="fill:none;stroke:currentColor;stroke-miterlimit:10;stroke-width:32px"></path></svg>
                        </span>
                        <span class="task-link-text">Run All</span>
                    </a>
                </span>
            </div>
            `
        );
        document.getElementById("link-run-all").onclick = function(event) {
            event.preventDefault();
            elements.forEach(el => el.click());
        };
    }
})();
