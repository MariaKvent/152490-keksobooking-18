'use strict';

(function () {
  var main = document.querySelector('main');

  var onPopupClick = function () {
    removePopup();
  };

  var onEscPress = function (evt) {
    window.main.isEsc(evt, removePopup);
  };

  // добавление модального окна
  var addPopup = function (element) {
    main.appendChild(element);
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('mousedown', onPopupClick);
  };

  // удаление моадльного окна
  var removePopup = function () {
    var popup = main.querySelector('.error, .success');
    popup.remove();
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('mousedown', onPopupClick);
  };

  // шаблон окна
  var getPopupTemplate = function (PopupType) {
    var errorTemplate = document.querySelector('#' + PopupType)
      .content
      .querySelector('.' + PopupType);
    var newPopup = errorTemplate.cloneNode(true);
    return newPopup;
  };

  // окно с ошибкой
  var createErrorPopup = function (message) {
    var errorPopup = getPopupTemplate('error');
    errorPopup.querySelector('p').textContent = message;
    addPopup(errorPopup);
  };

  // окно с успешной загрузкой
  var createSuccessPopup = function () {
    addPopup(getPopupTemplate('success'));
  };

  window.popup = {
    error: createErrorPopup,
    success: createSuccessPopup
  };
})();
