'use strict';

(function () {
  var PIN_WIDTH = 50;
  var MAP_WIDTH = 1200;

  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var PIN_NUMBER = 5;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;

  var startCoords = {
    x: 0,
    y: 0
  };

  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var address = adForm.querySelector('#address');
  var similarPin = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  // получаем координаты главной метки
  var getPinMainLocation = function (isActive) {
    var xPinLocation = mapPinMain.offsetLeft;
    var yPinLocation = mapPinMain.offsetTop;
    var location;
    if (isActive) { // если карта активна
      location = Math.floor(xPinLocation + (MAIN_PIN_WIDTH / 2)) + ', ' + Math.floor(yPinLocation + (1.2 * MAIN_PIN_HEIGHT));
    } else { // если карта не активна
      location = Math.floor(xPinLocation + (MAIN_PIN_WIDTH / 2)) + ', ' + Math.floor(yPinLocation + (MAIN_PIN_HEIGHT / 2));
    }
    address.value = location;
  };

  getPinMainLocation(false); // координаты главной метки при первой загрузке

  // перемещение метки
  // функция при нажатии на кнопку мыши
  var onMouseDown = function (evtDown) {
    evtDown.preventDefault();
    if (map.classList.contains('map--faded')) {
      window.main.enable();
      showMap();
    }
    startCoords = {
      x: evtDown.clientX,
      y: evtDown.clientY
    };
    return startCoords;
  };

  // функция при перемещении мыши
  var onMouseMove = function (evtMove) {
    evtMove.preventDefault();

    // cмещение по осям
    var shift = {
      x: startCoords.x - evtMove.clientX,
      y: startCoords.y - evtMove.clientY
    };

    startCoords = {
      x: evtMove.clientX,
      y: evtMove.clientY
    };

    // координаты после смещения
    mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

    // ограничение перемещения метки
    if ((mapPinMain.offsetLeft - shift.x) < 0) {
      mapPinMain.style.left = 0 + 'px';
    }
    if ((mapPinMain.offsetLeft - shift.x) > MAP_WIDTH - PIN_WIDTH) {
      mapPinMain.style.left = (MAP_WIDTH - PIN_WIDTH) + 'px';
    }
    if ((mapPinMain.offsetTop - shift.y) < LOCATION_Y_MIN) {
      mapPinMain.style.top = LOCATION_Y_MIN + 'px';
    }
    if ((mapPinMain.offsetTop - shift.y) > LOCATION_Y_MAX) {
      mapPinMain.style.top = LOCATION_Y_MAX + 'px';
    }

    getPinMainLocation(true);
  };

  // функция при отпускании кнопки мыши
  var onMouseUp = function (evtUp) {
    evtUp.preventDefault();
    if (map.classList.contains('map--faded')) {
      window.main.enable();
      showMap();
      getPinMainLocation(true);
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  mapPinMain.addEventListener('mousedown', function (evtDown) {
    evtDown.preventDefault();
    onMouseDown(evtDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var checkIfPinIsActive = function (pin) {
    return pin.classList.contains('map__pin--active');
  };

  // отрисовываем и заполняем метками

  var renderPin = function (pin) {
    var pinElement = similarPin.cloneNode(true);
    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = 'Заголовок объявления';
    pinElement.addEventListener('click', function (evt) {
      if (!checkIfPinIsActive(evt.currentTarget)) {
        window.card.remove();
        window.card.add(pin);
        activatePin(pinElement);
      }
    });
    return pinElement;
  };

  var addFragment = function (ads) {
    var fragment = document.createDocumentFragment();
    if (ads.length > PIN_NUMBER) {
      var countPins = PIN_NUMBER;
    } else {
      countPins = ads.length;
    }
    for (var i = 0; i < countPins; i++) {
      fragment.appendChild(renderPin(ads[i]));
    }
    return fragment;
  };

  var showMap = function () {
    map.classList.remove('map--faded');
  };

  var fadeMap = function () {
    map.classList.add('map--faded');
  };

  // Карта добавить пины
  var joinAds = function () {
    mapPins.appendChild(addFragment(window.filter(window.data.getAds())));
  };

  var removePinsFromMap = function () {
    var renderedPins = mapPins.querySelectorAll('button:not(.map__pin--main)');
    renderedPins.forEach(function (element) {
      mapPins.removeChild(element);
    });
  };

  var resetMainPin = function () {
    mapPinMain.style.left = '570px';
    mapPinMain.style.top = '375px';
    getPinMainLocation(false);
  };

  var doOnLoad = function (ads) {
    window.data.saveAds(ads);
    joinAds();
  };

  var deactivatePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var activatePin = function (pin) {
    pin.classList.add('map__pin--active');
  };

  window.map = {
    fade: fadeMap,
    show: showMap,
    removePins: removePinsFromMap,
    resetMainPin: resetMainPin,
    joinAds: joinAds,
    deactivatePin: deactivatePin,
    activatePin: activatePin,
    doOnLoad: doOnLoad,
    getPinMainLocation: getPinMainLocation
  };
})();
