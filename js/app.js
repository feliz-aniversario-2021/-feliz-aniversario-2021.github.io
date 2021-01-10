// Generar thumbnails:
var queryString = window.location.search;
var urlParam = new URLSearchParams(queryString);
var album = urlParam.get('album');
var cant = urlParam.get('cant');

var styleTag = document.querySelector("style");

var thumbnailsContainer = document.querySelector(".carretes-container.thumbnails");


for (var i = 1; i <= cant; i++) {

  let newStyleItem = `
    .item${i}{
      background-image: url('assets/fotos/${album}/${i}.jpg');
    }
  `;

  styleTag.insertAdjacentHTML('beforeend', newStyleItem);

  let newThumbnail = `
    <a href="assets/fotos/${album}/${i}.jpg" class="thumbnailItem">
      <div class="thumbnails-item item${i}">
        <img class="diapo" src="assets/imagenes/diapo.png" alt="Ilustracion de diapositiva.">
        <p>${i}</p>
      </div>
    </a>
  `;

  thumbnailsContainer.insertAdjacentHTML('beforeend', newThumbnail);

}

var preloader = document.querySelector(".preloader");
preloader.style.display = "none";


// Ampliar foto:
var nav = document.querySelector("nav");

var ampliarFoto = document.querySelector(".ampliar-foto");

var slideshowInnerImg = document.querySelector(".slideshow-inner img");

var thumbnailItems = document.querySelectorAll(".thumbnailItem");

thumbnailItems.forEach(function(item){

  item.addEventListener("click", function(){
    event.preventDefault();

    nav.style.display = "none";
    thumbnailsContainer.style.display = "none";
    slideshowInnerImg.src = this.href;
    ampliarFoto.style.display = "block";
  });

});


// Cerrar foto:
var close = document.querySelector(".close a");

close.addEventListener("click", function(){
  event.preventDefault();

  ampliarFoto.style.display = "none";
  nav.style.display = "flex";
  thumbnailsContainer.style.display = "flex";

});



// Pasar diapositiva para adelante:
var right = document.querySelector(".right a");

right.addEventListener("click", function(){
  event.preventDefault();

  var currentImage = document.querySelector(".slideshow-inner img");
  currentImage.style.opacity = "0";

  var nombreImage = currentImage.src.slice(-6, -4).replace("/", "");
  var number = parseInt(nombreImage, 10) + 1;

  if (number <= cant){
    slideshowInnerImg.src = `assets/fotos/${album}/${number}.jpg`;
  } else {
    slideshowInnerImg.src = `assets/fotos/${album}/1.jpg`;
  }

  setTimeout(() => { currentImage.style.opacity = "1"; }, 500);

});


// Pasar diapositiva para atras:
var left = document.querySelector(".left a");

left.addEventListener("click", function(){
  event.preventDefault();

  var currentImage = document.querySelector(".slideshow-inner img");
  currentImage.style.opacity = "0";

  var nombreImage = currentImage.src.slice(-6, -4).replace("/", "");
  var number = parseInt(nombreImage, 10) - 1;

  if (number > 0){
    slideshowInnerImg.src = `assets/fotos/${album}/${number}.jpg`;
  } else {
    slideshowInnerImg.src = `assets/fotos/${album}/${cant}.jpg`;
  }

  setTimeout(() => { currentImage.style.opacity = "1"; }, 500);

});


// Pasar diapositivas con flechas teclado:
// right arrow KeyCode: 39
// left arrow KeyCode: 37
document.onkeydown = function (e) {
  var key = e.charCode || e.keyCode;
  if (key == 39){
    e.preventDefault();

    var currentImage = document.querySelector(".slideshow-inner img");
    currentImage.style.opacity = "0";

    var nombreImage = currentImage.src.slice(-6, -4).replace("/", "");
    var number = parseInt(nombreImage, 10) + 1;

    if (number <= cant){
      slideshowInnerImg.src = `assets/fotos/${album}/${number}.jpg`;
    } else {
      slideshowInnerImg.src = `assets/fotos/${album}/1.jpg`;
    }

    setTimeout(() => { currentImage.style.opacity = "1"; }, 500);
  }

  if (key == 37){
    e.preventDefault();

    var currentImage = document.querySelector(".slideshow-inner img");
    currentImage.style.opacity = "0";

    var nombreImage = currentImage.src.slice(-6, -4).replace("/", "");
    var number = parseInt(nombreImage, 10) - 1;

    if (number > 0){
      slideshowInnerImg.src = `assets/fotos/${album}/${number}.jpg`;
    } else {
      slideshowInnerImg.src = `assets/fotos/${album}/${cant}.jpg`;
    }

    setTimeout(() => { currentImage.style.opacity = "1"; }, 500);
  }
}
