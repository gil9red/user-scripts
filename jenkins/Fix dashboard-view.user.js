// ==UserScript==
// @name         Jenkins. Fix dashboard-view
// @namespace    gil9red
// @version      0.3
// @description  try to take over the world!
// @author       gil9red
// @match        http://127.0.0.1:8090/*
// @match        http://localhost:8090/*
// @icon         http://127.0.0.1:8090/static/cfcd6f85/favicon.svg
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://github.com/gil9red/user-scripts/raw/main/jenkins/Fix dashboard-view.user.js
// @downloadURL  https://github.com/gil9red/user-scripts/raw/main/jenkins/Fix dashboard-view.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Удаление заднего фона для виджетов в плагине https://plugins.jenkins.io/dashboard-view/
    document.querySelectorAll('[id ^= "title-portlet-topPortlets-"').forEach(el => {
        el.style.backgroundColor = null;
    });
})();