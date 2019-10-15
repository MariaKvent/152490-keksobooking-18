'use strict';

(function () {
  var DEFAULT_PRICE = 1000;
  var MAX_ROOM = '100';
  var ROOM_NOT_FOR_GUESTS = '0';

  var PriceTypes = {
    'BUNGALO': 0,
    'FLAT': 1000,
    'HOUSE': 5000,
    'PALACE': 10000,
  };

  var adForm = document.querySelector('.ad-form');
  var priceInput = document.querySelector('#price');
  var typeInput = document.querySelector('#type');
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var resetAdressField = function () {
    window.map.getPinMainLocation(false);
  };

  var resetButton = adForm.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function () {
    window.main.disable();
    reset();
  });

  // функция изменения минимальной цены от вида жилья
  function onTypeOfHouseChange() {
    priceInput.min = priceInput.placeholder = PriceTypes[(typeInput.value).toLocaleUpperCase()];
  }

  typeInput.addEventListener('change', onTypeOfHouseChange);

  // связь типа комнаты и количества человек
  function onGuestRoomChange() {
    var capacityMessage = '';
    if (roomNumber.value !== MAX_ROOM) {
      if (capacity.value > roomNumber.value) {
        capacityMessage = 'Выберите количество мест не больше ' + roomNumber.value;
      } else {
        if (capacity.value === ROOM_NOT_FOR_GUESTS) {
          capacityMessage = '"не для гостей" доступно при выборе 100 комнат';
        }
      }
    } else {
      if (capacity.value !== ROOM_NOT_FOR_GUESTS) {
        capacityMessage = 'Выберите "не для гостей"';
      }
    }

    capacity.setCustomValidity(capacityMessage);
  }

  onGuestRoomChange();

  roomNumber.addEventListener('change', onGuestRoomChange);
  capacity.addEventListener('change', onGuestRoomChange);

  // связь времени заезда и выезда
  var setTimeInOut = function (time) {
    timeInInput.value = time;
    timeOutInput.value = time;
  };

  var onTimeClick = function (evt) {
    setTimeInOut(evt.target.value);
  };

  timeInInput.addEventListener('click', onTimeClick);
  timeOutInput.addEventListener('click', onTimeClick);

  // при успешной загрузке
  var doOnSuccess = function () {
    reset();
    window.popup.success();
    window.main.disable();
    window.map.fade();
    window.map.removePins();
    window.map.resetMainPin();
    window.image.resetAvatar();
    window.image.resetPhoto();
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), doOnSuccess, window.popup.error);
  });

  var reset = function () {
    adForm.reset();
    priceInput.placeholder = DEFAULT_PRICE;
    priceInput.min = DEFAULT_PRICE;
    window.map.getPinMainLocation(false);
  };

  var fade = function () {
    adForm.classList.add('ad-form--disabled');
  };

  window.form = {
    resetAdressField: resetAdressField,
    fade: fade,
    reset: reset
  };
})();
