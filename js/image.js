'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarParameters = {
    width: '40',
    height: '44',
    path: 'img/muffin-grey.svg'
  };

  var photoParameters = {
    width: '70',
    height: '70',
    marginRight: '3px',
    borderRadius: '3px'
  };

  var PhotoPreview = {
    WIDTH_LOAD: 'auto',
    WIDTH_RESET: '70px'
  };

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreviewImg = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoUploadPreview = document.querySelector('.ad-form__photo');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          avatarPreviewImg.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  });

  photoChooser.addEventListener('change', function () {
    var file = photoChooser.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var imgElement = document.createElement('img');
        photoUploadPreview.appendChild(imgElement);

        var reader = new FileReader();

        reader.addEventListener('load', function () {
          photoUploadPreview.style.width = PhotoPreview.WIDTH_LOAD;
          imgElement.src = reader.result;
          imgElement.width = photoParameters.width;
          imgElement.height = photoParameters.height;
          imgElement.style.marginRight = photoParameters.marginRight;
          imgElement.style.borderRadius = photoParameters.borderRadius;
        });

        reader.readAsDataURL(file);
      }
    }
  });

  // сброс загруженных изображений

  var resetAvatar = function () {
    avatarPreviewImg.src = avatarParameters.path;
    avatarPreviewImg.width = avatarParameters.width;
    avatarPreviewImg.height = avatarParameters.height;
  };

  var resetPhoto = function () {
    var photoPreviewList = photoUploadPreview.querySelectorAll('img');
    photoPreviewList.forEach(function (element) {
      element.remove();
      photoUploadPreview.style.width = PhotoPreview.WIDTH_RESET;
    });
  };

  window.image = {
    resetAvatar: resetAvatar,
    resetPhoto: resetPhoto
  };
})();
