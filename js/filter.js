'use strict';

(function () {
  var MAX_PRICE = 50000;
  var MIN_PRICE = 10000;
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var mapFilters = document.querySelector('.map__filters');
  var choosenFeatures = [];

  var checkHousingType = function (item) {
    return (housingType.value === item.offer.type ||
    checkAny(housingType.value));
  };

  // удобства
  var getCurrentFeatures = function () {
    choosenFeatures = [];
    var currentFeatures = mapFilters.querySelectorAll('input[type="checkbox"]:checked');
    currentFeatures.forEach(function (element) {
      choosenFeatures.push(element.value);
    });
    return choosenFeatures;
  };

  var checkFeatures = function (item) {
    var checkedFeatures = getCurrentFeatures();
    return checkedFeatures.every(function (element) {
      return item.offer.features.includes(element);
    });
  };

  // цена
  var checkHousingPrice = function (item) {
    return ((housingPrice.value === 'high' && item.offer.price > MAX_PRICE) ||
      (housingPrice.value === 'middle' && item.offer.price < MAX_PRICE && item.offer.price > MIN_PRICE) ||
      (housingPrice.value === 'low' && item.offer.price < MIN_PRICE) ||
      checkAny(housingPrice.value));
  };

  // количество комнат
  var checkHousingRooms = function (item) {
    return ((parseInt(housingRooms.value, 10) === item.offer.rooms) ||
      checkAny(housingRooms.value));
  };

  // количество гостей
  var checkHousingGuests = function (item) {
    return ((parseInt(housingGuests.value, 10) === item.offer.guests) ||
    checkAny(housingGuests.value));
  };

  var checkOffer = function (item) {
    return item.hasOwnProperty('offer');
  };
  var checkAny = function (element) {
    return element === 'any';
  };

  var filter = function (data) {
    var filtredData = data.filter(function (item) {
      return checkHousingType(item) &&
        checkOffer(item) &&
        checkHousingPrice(item) &&
        checkHousingRooms(item) &&
        checkHousingGuests(item) &&
        checkFeatures(item);
    });
    return filtredData;
  };

  document.querySelector('.map__filters').addEventListener('change', function () {
    window.debounce(
        function () {
          window.card.remove();
          window.map.removePins();
          window.map.joinAds();
        }
    );
  });

  window.filter = filter;
})();
