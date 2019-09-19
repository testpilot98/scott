let onLoad = function () {
  setHeaderWidth();
};

window.addEventListener('load', onLoad);

let onResize = function () {
  setHeaderWidth();
}

window.addEventListener('resize', onResize);

let setHeaderWidth = function () {
  let header = document.getElementsByTagName('header')[0],
      containerWidth = document.getElementsByClassName('container')[0].offsetWidth;

  header.style.width = containerWidth + 'px';
};
