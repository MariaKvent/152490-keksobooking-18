'use strict';

(function () {
  var saveAds = function (ads) {
    window.data.ads = ads;
  };

  var getAds = function () {
    return window.data.ads;
  };

  var housingType = {
    palace: {price: 10000, name: 'Дворец'},
    flat: {price: 1000, name: 'Квартира'},
    house: {price: 5000, name: 'Дом'},
    bungalo: {price: 0, name: 'Бунгало'}
  };

  window.data = {
    saveAds: saveAds,
    getAds: getAds,
    housingType: housingType
  };
})();
