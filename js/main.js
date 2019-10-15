'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var adFormFieldsets = adForm.querySelectorAll('.ad-form fieldset');
  var mapFiltersFieldsets = document.querySelectorAll('.map__filters fieldset');
  var mapFiltersSelects = document.querySelectorAll('.map__filters select');

  // получаем случайное число
  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max - min));
  };

  // получаем индекс из массива
  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var isEsc = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  // блокировка фильтра и формы
  var changeElementDisabled = function (elements, isDisabled) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = isDisabled;
    }
  };

  var makeDisabledAttribute = function (isDisable) {
    changeElementDisabled(adFormFieldsets, isDisable);
    changeElementDisabled(mapFiltersFieldsets, isDisable);
    changeElementDisabled(mapFiltersSelects, isDisable);
  };

  makeDisabledAttribute(true); // заблокированная форма и фильтр при первой загрузке

  var enablePage = function () {
    window.map.getPinMainLocation(true);
    makeDisabledAttribute(false);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.backend.load(window.map.doOnLoad);
  };

  var disablePage = function () {
    window.form.reset();
    window.form.resetAdressField();
    makeDisabledAttribute(true);
    window.form.fade();
    window.card.remove();
    window.map.fade();
    window.map.removePins();
    window.map.resetMainPin();
    window.image.resetAvatar();
    window.image.resetPhoto();
  };

  window.main = {
    isEsc: isEsc,
    enable: enablePage,
    disable: disablePage,
    makeDisabledAttribute: makeDisabledAttribute,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement
  };
})();
