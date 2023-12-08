// ==UserScript==
// @name         Google Keep. Заголовок вкладки из заголовка заметок
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://keep.google.com/*
// @icon         https://ssl.gstatic.com/keep/keep_2023q4.ico
// @grant        none
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://gil9red.github.io/user-scripts/google/Google Keep. Заголовок вкладки из заголовка заметок.user.js
// @downloadURL  https://gil9red.github.io/user-scripts/google/Google Keep. Заголовок вкладки из заголовка заметок.user.js
// ==/UserScript==

(function() {
    'use strict';

    const serverId = location.href.split("#LIST/")[1];
    if (!serverId) {
        return;
    }

    let chunkJsonText = null;

    let scripts = document.querySelectorAll("script");
    for (let i = 0; i < scripts.length; i++) {
        let scriptText = scripts[i].innerText;
        let m = scriptText.match(/loadChunk\(JSON\.parse\(['"](.+?)['"]\)/);
        if (m) {
            // Символы экранированы в ASCII
            chunkJsonText = eval('"' + m[1] + '"');
            break;
        }
    }

    if (!chunkJsonText) {
        alert("Не удалось найти JSON из loadChunk!");
        return;
    }

    let chunkData = JSON.parse(chunkJsonText);
    for (let data of chunkData) {
        if (data.serverId == serverId) {
            document.title = data.title;
            break;
        }
    }
})();