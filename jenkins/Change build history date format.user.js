// ==UserScript==
// @name         Jenkins. Change build history date format
// @namespace    gil9red
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        http://127.0.0.1:8090/*
// @match        http://localhost:8090/*
// @icon         http://127.0.0.1:8090/static/cfcd6f85/favicon.svg
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://gil9red.github.io/user-scripts/jenkins/Change build history date format.user.js
// @downloadURL  https://gil9red.github.io/user-scripts/jenkins/Change build history date format.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Change to dd/MM/yyyy HH:mm
    document.querySelectorAll("#buildHistory .build-details[time]").forEach(el => {
        let timestamp = parseInt(el.getAttribute("time"));
        let timezoneTimestamp = new Date().getTimezoneOffset() * 60 * 1000;
        let newDateTime = new Date(timestamp - timezoneTimestamp)
            .toISOString()
            .replace(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}).+/, "$3/$2/$1 $4:$5")
        ;
        el.querySelector("a").innerText = newDateTime;
    });
})();