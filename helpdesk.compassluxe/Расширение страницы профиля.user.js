// ==UserScript==
// @name         Jira. Расширение страницы профиля
// @namespace    gil9red
// @version      0.13
// @description  try to take over the world!
// @author       gil9red
// @match        https://helpdesk.compassluxe.com/secure/ViewProfile.jspa*
// @icon         https://helpdesk.compassluxe.com/s/5krrdz/712004/7fcd86bd1fac8f876f6db741a6132e00/_/images/fav-jsw.png
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @homepage     https://github.com/gil9red/user-scripts
// @updateURL    https://gil9red.github.io/user-scripts/helpdesk.compassluxe/Расширение страницы профиля.user.js
// @downloadURL  https://gil9red.github.io/user-scripts/helpdesk.compassluxe/Расширение страницы профиля.user.js
// ==/UserScript==


// SOURCE: https://dev.to/dailydevtips1/vanilla-javascript-modal-pop-up-2oki
function appendModalDialogForImage(url_img, $parentEl) {
  const HTML_MODAL_DIALOG = `
<div class="modal" id="modal-one">
<div class="modal-bg modal-exit"></div>
<div class="modal-container">
  <h1>Preview</h1>
  <img src="${url_img}" alt="${url_img}"/>
  <button class="modal-close modal-exit">X</button>
</div>
</div>
`
  ;
  GM_addStyle(`
.modal {
position: fixed;
width: 100vw;
height: 100vh;
opacity: 0;
visibility: hidden;
transition: all 0.3s ease;
top: 0;
left: 0;
display: flex;
align-items: center;
justify-content: center;
}
.modal.open {
visibility: visible;
opacity: 1;
transition-delay: 0s;
}
.modal-bg {
position: absolute;
background: #0747a6a8;
width: 100%;
height: 100%;
}
.modal-container {
border-radius: 10px;
background: #fff;
position: relative;
padding: 10px;
max-width: 90vw;
max-height: 90vh;
}
.modal-close {
position: absolute;
right: 15px;
top: 15px;
outline: none;
appearance: none;
color: red;
background: none;
border: 0px;
font-weight: bold;
cursor: pointer;
}
`
  );

  $parentEl.append(
      $(`<button data-modal="modal-one" style="padding: 0; border: none; background: none;">🖼️</button>`)
  );
  $parentEl.append($(HTML_MODAL_DIALOG));

  const modals = document.querySelectorAll("[data-modal]");

  modals.forEach(function (trigger) {
      trigger.addEventListener("click", function (event) {
          event.preventDefault();

          const modal = document.getElementById(trigger.dataset.modal);
          modal.classList.add("open");

          const exits = modal.querySelectorAll(".modal-exit");
          exits.forEach(function (exit) {
              exit.addEventListener("click", function (event) {
                  event.preventDefault();
                  modal.classList.remove("open");
              });
          });
      });
  });
}

(function() {
  'use strict';

  const HOST = "http://10.7.8.31:50000";

  let $avatar = $("#up-d-avatar");
  let $items = $("#details-profile-fragment ul.item-details > li");

  let groupsText = $(".groups").text();
  let isCompassStaff = groupsText.length == 0 || groupsText.includes("compass-staff");
  if (isCompassStaff) {
      let username = $("#up-d-username").text().trim();
      let url = `${HOST}/api/get_all_person_info/${username}`;

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

      console.log("Запрос дополнительной информации по " + username);

      function process_response(data) {
          console.log("Person all info:", data);

          function get_actual_img(personData, data) {
              // "=0" - значит данные нужно брать из первого элемента в data
              let m = personData.img.match(/=(\d+)/);
              if (m == null) { // Значит, это не указание на другой набор данных
                  return personData.img;
              }

              let idx = parseInt(m[1]);
              return data[idx].img;
          }

          let personData = data[0];

          // Подмена аватарки (останутся еще места с оригинальной - для сравнения)
          let originalSrc = $(".avatar-image").attr("src");
          let newSrc = get_actual_img(personData, data);

          let $avatarImage = $(".avatar-image");
          $avatarImage.attr("data-original-src", originalSrc);
          $avatarImage.attr("data-new-src", newSrc);
          $avatarImage.attr("data-src-from", "original");

          function switch_img() {
              let srcFrom = $avatarImage.attr("data-src-from");

              let nextSrc = srcFrom == "new" ? "original" : "new";
              $avatarImage.attr("data-src-from", nextSrc);

              let src = $(".avatar-image").attr(`data-${nextSrc}-src`);
              $(".avatar-image").attr("src", src);
          }

          // Отображение другой аватарки
          switch_img();

          let $buttonSwap = $(`<button style="padding: 0; border: none; background: none;">🔄</button>`);
          $buttonSwap.on("click", switch_img);

          $avatar.append($buttonSwap);
          $loader.hide();

          appendModalDialogForImage(newSrc, $avatar);

          $items.append($(`
                <dl>
                  <dt>Position:</dt>
                  <dd>${personData.position}</dd>
                </dl>
              `));
          $items.append($(`
                <dl>
                  <dt>Department:</dt>
                  <dd>${personData.department}</dd>
                </dl>
              `));
          $items.append($(`
                <dl>
                  <dt>Location:</dt>
                  <dd>${personData.location}</dd>
                </dl>
              `));
          $items.append($(`
                <dl>
                  <dt>Birthday:</dt>
                  <dd>${personData.birthday}</dd>
                </dl>
              `));

          // More info
          let personDataKeys = Object
          .keys(personData)
          .filter(item => item != "name") // Нет смысла показывать ник в таблице
          ;
          let contentMoreInfo = data.map(JSON.stringify).map((item) => `<div>${item}</div>`).join("<hr>");
          function get_tr_td(row) {
              function get_td(key) {
                  let value = row[key];
                  if (key == "img") {
                      value = `<img src="${get_actual_img(row, data)}"/>`;
                  }
                  return `<td>${value}</td>`;
              }

              return `<tr>${personDataKeys.map(get_td).join("")}</tr>`;
          }
          contentMoreInfo = `
<table>
<thead>
    <tr>${personDataKeys.map((item) => `<th>${item.toUpperCase()}</th>`).join("")}<tr>
</thead>
<tbody>
    ${data.map(get_tr_td).join("\n")}
</tbody>
</table>
`

          // SOURCE: https://www.w3schools.com/howto/howto_css_loader.asp
          GM_addStyle(`
#content-more-info {
    overflow: hidden;
    transition: max-height 300ms;
    max-height: 0;
}

#content-more-info.open {
    max-height: 200px;
    overflow: scroll;
}

#content-more-info table,
#content-more-info td,
#content-more-info th {
    border: 1px solid black;
    border-collapse: collapse;
}

#content-more-info table th {
    color: white;
    background: gray;
}

#content-more-info table th, #content-more-info table  td {
  padding: 4px;
}

#content-more-info table img {
    width: 48px;
    height: 48px;
}
`);
          $(document).on("click", "#show-more-info", function() {
              $("#content-more-info").toggleClass('open');
          });
          $items.append($(`
                <dl>
                  <dt>More:</dt>
                  <dd>
                      <button id="show-more-info">Show (${data.length})</button>
                      <div id="content-more-info">
                          ${contentMoreInfo}
                      </div>
                  </dd>
                </dl>
          `));
      }

      function process_error(rs) {
          let $result = null;
          if (rs.status == 404) {
              $result = $(`<div title="Не найдено">🤷</div>`);
          } else {
              $result = $(`<div title="Неожиданная ошибка ${rs.status}">⚠️</div>`);
          }
          $avatar.append($result);
          $loader.hide();
      }

      GM_xmlhttpRequest({
          method: "GET",
          url: url,
          onload: function (rs) {
              // NOTE: Почему-то на 404 сюда попало
              let firstDigit = `${rs.status}`[0];
              if (firstDigit == "4" || firstDigit == "5") {
                  process_error(rs);
              } else {
                  let data = JSON.parse(rs.responseText);
                  process_response(data);
              }
          },
          onerror: process_error,
          onabort: process_error,
      });
  }
})();
