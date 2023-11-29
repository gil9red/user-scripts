// ==UserScript==
// @name         Jenkins. Fix next-executions-plugin
// @namespace    gil9red
// @version      0.5
// @description  try to take over the world!
// @author       gil9red
// @match        http://127.0.0.1:8090/*
// @match        http://localhost:8090/*
// @icon         http://127.0.0.1:8090/static/cfcd6f85/favicon.svg
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://gil9red.github.io/user-scripts/jenkins/Fix next-executions-plugin.user.js
// @downloadURL  https://gil9red.github.io/user-scripts/jenkins/Fix next-executions-plugin.user.js
// ==/UserScript==

(function() {
    'use strict';

    const width = "280px";
    document.head.insertAdjacentHTML(
        "beforeend",
        `
        <style>
            .pane-frame {
                min-width: ${width};
                max-width: ${width};
            }
        </style>
        `
    );
})();