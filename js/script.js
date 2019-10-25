// HEADER WIDTH

let onLoad = function () {
  setHeaderWidth();
};

window.addEventListener('load', onLoad);

let onResize = function () {
  setHeaderWidth();
}

window.addEventListener('resize', onResize);

let setHeaderWidth = function () {
  let header = document.getElementsByClassName('js-header')[0],
      containerWidth = document.getElementsByClassName('container')[0].offsetWidth;

  header.style.width = containerWidth + 'px';
};


// MAGNIFIC POPUP

$(document).ready(function() {
  $('#mfp-portfolio').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: '',
    gallery: {
      enabled: true,
    },
    image: {
      titleSrc: 'title'
    },
    fixedContentPos: false,  // Makes page scrollable when img open.
    mainClass: 'mfp-zoom-in',
    removalDelay: 200, //delay removal by X to allow out-animation
    showCloseBtn: false, // Hides default close button.
    callbacks: {
        beforeOpen: function() {
            $('#portfolio a').each(function(){
                $(this).attr('title', $(this).find('img').attr('alt'));
            });
        },
        open: function() {
            //overwrite default prev + next function. Add timeout for css3 crossfade animation
            $.magnificPopup.instance.next = function() {
                var self = this;
                self.wrap.removeClass('mfp-image-loaded');
                setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
            }
            $.magnificPopup.instance.prev = function() {
                var self = this;
                self.wrap.removeClass('mfp-image-loaded');
                setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
            }
        },
        imageLoadComplete: function() {
            var self = this;
            setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
        }
    }
  });
});


// MAIN NAVIGATION

let showDropdown = (e) => {
  if (e.target.classList.contains('js-nav-open')) {
    clearTimeout(delayHide);

    let show = () => {
      let subMenu = document.getElementById('js-sub-menu');

      // Hide all sub-menu content when hovering over menu-items.
      let divArr = subMenu.querySelectorAll('div'); // Get all sub-menu divs.
      for (let i = 0; i < divArr.length; i++) { // Add js-hide to all divs.
        divArr[i].classList.add('js-hide');
      }

      // Show drop down container.
      subMenu.classList.remove('js-hide');

      // Show content-e.target
      let triggerClass =  e.target.classList[0]; // Get class that links to sub-menu content.
      document.getElementsByClassName(triggerClass)[1].classList.remove('js-hide'); // Get 2nd elem w/that class, which is the sub-menu content, and display it.
    };

    let delayShow = setTimeout(show, 200);
  }
};

document.getElementsByTagName('nav')[0].addEventListener('mouseover', function (e) {
  showDropdown(e);
}, false);


// If mouseenter on drop down cancel timeout for closing it.
document.getElementById('js-sub-menu').addEventListener('mouseover', function () {
  clearTimeout(delayHide);
}, false);

let delayHide;

let hideDropdown = (e) => {
  if (!e.relatedTarget.classList.contains('js-nav-open')) {
    let hide = () => {
      let subMenu = document.getElementById('js-sub-menu');
      // Hide drop down container.
      subMenu.classList.add('js-hide');
    };

    delayHide = setTimeout(hide, 600);
  }
};

// Loop over all class-names 'nav-open' and add eventlistener to them.
let navOpenArr = document.getElementsByClassName('js-nav-open');
for (let i = 0; i < navOpenArr.length; i++) {
  navOpenArr[i].addEventListener('mouseleave', function (e) {
    hideDropdown(e);
  }, false);
};
