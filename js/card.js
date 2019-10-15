'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');

  // удобства
  var addFeatures = function (currentAds, cardElement) {
    var features = cardElement.querySelector('.popup__features');
    features.innerHTML = '';
    currentAds.offer.features.forEach(function (element) {
      var newFeature = document.createElement('li');
      newFeature.classList.add('popup__feature', 'popup__feature--' + element);
      features.appendChild(newFeature);
    });
  };

  // фото
  var addPhotos = function (currentAds, cardElement) {
    var photos = cardElement.querySelector('.popup__photos');
    photos.innerHTML = '';
    currentAds.offer.photos.forEach(function (element) {
      var photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.src = element;
      photo.style.height = '40px';
      photo.style.width = '45px';
      photo.alt = 'Фотография жилья';
      photos.appendChild(photo);
    });
  };

  // отрисовка объявления
  var renderCard = function (currentAds) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = currentAds.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = currentAds.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = currentAds.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__text--capacity').textContent = currentAds.offer.rooms + ' комнаты для ' + currentAds.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + currentAds.offer.checkin + ', выезд до ' + currentAds.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = currentAds.offer.description;
    cardElement.querySelector('.popup__avatar').src = currentAds.author.avatar;
    cardElement.querySelector('.popup__type').textContent = window.data.housingType[currentAds.offer.type].name;
    addFeatures(currentAds, cardElement);
    addPhotos(currentAds, cardElement);
    cardElement.querySelector('.popup__close').addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onEscClick);
    return cardElement;
  };

  // закрытие
  var onCloseClick = function () {
    removeCard();
  };

  var onEscClick = function (evt) {
    window.main.isEsc(evt, function () {
      removeCard();
    });
  };

  // добавление на страницу
  var addCard = function (cardToAdd) {
    map.insertBefore(cardToAdd, mapFiltersContainer);
  };
  var addNewCard = function (currentAds) {
    if (currentAds) {
      addCard(renderCard(currentAds));
    }
  };

  // закрытие на странице
  var removeCard = function () {
    var openedCard = document.querySelector('.map__card');
    if (openedCard) {
      openedCard.remove();
      window.map.deactivatePin();
      document.removeEventListener('keydown', onEscClick);
    }
  };

  window.card = {
    add: addNewCard,
    remove: removeCard
  };
})();
