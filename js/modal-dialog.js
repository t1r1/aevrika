'use strict';

window.modalDialog = (function () {
    var openButton = document.querySelector('.callmeback');
    var popUp = document.querySelector('.callback-window');
    var dialogToClone = document.querySelector('#callback-template').content.querySelector('.callback-content');
    var fadeBlock = document.querySelector('.fade');

    var ESCAPE_KEY_CODE = 27;

    // модальный диалог создается на лету путем создания DOM-узла из шаблона и заполняется данными

    var newDialog = dialogToClone.cloneNode(true);
    var dialogProperties = {
        dialog: newDialog,
        dialogText: newDialog.querySelector('.callback-content'),
        dialogClose: newDialog.querySelector('.callback-cancel')
    };

    // функция закрывает модальное окно по нажатию на иконку "крестик" или по клавише Escape

    var closeDialogAndRemoveFade = function (evt) {
        if (evt.type == 'keydown' && evt.keyCode != ESCAPE_KEY_CODE) {
            return;
        }
        popUp.classList.add('is-hidden');
        fadeBlock.classList.add('is-hidden');
    };

    // функция открывает модальное окно по нажатию на ссылку и делает видимым фон (fade), закрывающий контролы на странице

    var showModalDialog = function () {
        popUp.classList.remove('is-hidden');
        fadeBlock.classList.remove('is-hidden');
        improvePosition();
    };

    // функция центрирует модальное окно относительно высоты и ширины экрана пользователя

    var improvePosition = function () {
        var xCoordinate = window.innerWidth * 0.5 - popUp.clientWidth / 2 + 'px';
        var yCoordinate = window.innerHeight * 0.5 - popUp.clientHeight / 2  + 'px';
        popUp.style.left = xCoordinate;
        popUp.style.top = yCoordinate;
    };

    openButton.addEventListener('click', showModalDialog);
    dialogProperties.dialogClose.addEventListener('click', closeDialogAndRemoveFade);
    window.addEventListener('keydown', closeDialogAndRemoveFade);

    return {
        createDialogFromTemplate: function () {
            popUp.appendChild(dialogProperties.dialog);
        }
    };

})();