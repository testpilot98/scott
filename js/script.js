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
