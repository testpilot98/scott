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


// START MAIN NAVIGATION

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

      // Shift drop down into place.

      // Get a-tag position.
      let rectTarget = e.target.getBoundingClientRect();
      let leftEdgeOfTarget = rectTarget.left;
      // Find drop down postion same as left edge of a-tag.
      let headerOffsetLeft = document.getElementsByClassName('js-header')[0].offsetLeft;
      let subMenuLeftPosition = leftEdgeOfTarget - headerOffsetLeft;
      // Find length of drop down to center it under respective a-tag.
      let subMenuWidth = subMenu.offsetWidth;  // This has to run after we display both submenu and its child divs.
      let aTagWidth = e.target.offsetWidth;
      let adjustSubMenuPosition = (subMenuWidth - aTagWidth) / 2
      // Set drop down position
      subMenu.style.left = (subMenuLeftPosition - adjustSubMenuPosition) + 'px';
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


// Loop over all class-names 'nav-open' and add eventlistener to them. And call 2 functions.
let navOpenArr = document.getElementsByClassName('js-nav-open');
for (let i = 0; i < navOpenArr.length; i++) {
  navOpenArr[i].addEventListener('mouseleave', function (e) {
    hideDropdown(e);
  }, false);
};


// Dynamic active-menu indicator for main-nav
(function () {
  let currentPath = location.pathname;

  // let subMenu = document.getElementsByClassName('nav-sub-menu')[0];

  let aArr = document.querySelectorAll('nav a');

  for (let i = 0; i < aArr.length; i++) {
    // Get href of a tag.
    let href = aArr[i].getAttribute('href');
    // Get index position of href inside current path. If not -1 execute code.
    if (currentPath.indexOf(href) !== -1) {
      // Add active class to a elem.
      aArr[i].classList.add('js-nav-a-active');
    }
  }
}());

// Dynamic active-menu indicator for sub-nav. And also for main nav.
(function () {
  let currentPath = location.pathname;

  let subMenu = document.getElementsByClassName('nav-sub-menu')[0];

  let aArr = subMenu.getElementsByTagName('a');

  for (let i = 0; i < aArr.length; i++) {
    // Get href of a tag.
    let href = aArr[i].getAttribute('href');
    // Get index position of href inside current path. If not -1 execute code.
    if (currentPath.indexOf(href) !== -1) {
      // Add active class to a elem.
      aArr[i].classList.add('js-nav-sub-menu-active');

      // Apply active-menu indicator to parent main-nav items.
      // Get a-tags parents first class name.
      let firstClassNameOfParent = aArr[i].parentNode.classList[0];
      // Apply active nav css to main nav item.
      document.getElementsByClassName(firstClassNameOfParent)[0].classList.add('js-nav-a-active');
    }
  }
}());


// If hover/leave sub nav mark/un-markt respective main nav item.
(function () {
  let subMenu = document.getElementById('js-sub-menu');
  let divArr = subMenu.getElementsByTagName('div');

  // If sub menu shows, mark respective nav item.
  subMenu.addEventListener('mousemove', function () {
    // if (!subMenu.classList.contains('js-hide')) {
      // Add event listener to all divs in sub menu.
      for (let i = 0; i < divArr.length; i++) {
        // Mark respective main nav item as active.
        if (!divArr[i].classList.contains('js-hide')) {
          let firstClassName = divArr[i].classList[0];
          let mainNavItem = document.getElementsByClassName(firstClassName)[0];
          mainNavItem.classList.add('js-nav-a-active');
        }
      }
    // }
  }, false);

  // If sub menu doens't show, un-mark respective nav item.
  subMenu.addEventListener('mouseleave', function (e) {
    for (let i = 0; i < divArr.length; i++) {
      // Target respective sub nav div.
      if (!divArr[i].classList.contains('js-hide')) {
        let firstClassName = divArr[i].classList[0];
        console.log(firstClassName);
        let mainNavItem = document.getElementsByClassName(firstClassName)[0];
        // Un-mark respective main nav with a delay.
        console.log('RELATED TARGET: ' + e.relatedTarget);
        let removeActive = () => {
          mainNavItem.classList.remove('js-nav-a-active');
        };
        let delayRemoveActive = setTimeout(removeActive, 600);
      }
    }
  }, false);

}());


// END MAIN NAVIGATION


// START MOBILE NAVIGATION

// MOVE SLIDES INSIDE NAVIGATION CONTAINER

let shiftSlide = (e) => {

  // Move clicked slide left/right depending on if prev/next button was clicked.
  let shiftCurrentSlide = (shiftDir) => {
    e.target.parentNode.classList.add(shiftDir);
  };

  // Move linked slide left
  let shiftLinkedSlideLeft = (className) => {
    // Get all elems with class name.
    let classCollection = document.getElementsByClassName(className);
    // Loop over all elems and remove class that holds them right.
    for (let i = 0; i < classCollection.length; i++) {
      classCollection[i].classList.remove('js-mobNav-right');
    }
  };

  // Move linked slides on left to center
  let shiftLinkedSlideRight = () => {
    let slidesOnLeft = document.getElementsByClassName('js-mobNav-left'),
        topSlide = slidesOnLeft.length - 1;

    slidesOnLeft[topSlide].classList.remove('js-mobNav-left');
  };

  // Logic
  let shiftDir, className, idName;
  // If link to new slide is clicked.
  if (e.target.classList.contains('js-mobNav-next')) {
    shiftCurrentSlide('js-mobNav-left');
    idName = e.target.id; // Id on link
    shiftLinkedSlideLeft(idName);

    // If back link is clicked.
  } else if (e.target.classList.contains('js-mobNav-prev')) {
    shiftCurrentSlide('js-mobNav-right');
    shiftLinkedSlideRight();
  }

};

document.getElementsByClassName('js-mobNav-container')[0].addEventListener('click', function (e) {
  shiftSlide(e);
}, false);


// MOVE MOBILE NAVIGATION CONTAINER

let shiftMobNav = (e) => {

  let mobNavContainer = document.getElementsByClassName('js-mobNav-container')[0],
      header = document.getElementsByClassName('js-header')[0],
      pageLayover = document.getElementsByClassName('js-mobNav-pageLayover')[0];

  // If open buttons clicked, move mobile-nav-container in viewport and add page layover.
  if (e.target.id === 'js-mobNav-open') {
    mobNavContainer.classList.add('js-mobNav-slideIn');
    pageLayover.classList.add('js-pageLayover-show');
  // If close buttons clicked, or click outside mobile-nav-container move it out viewport.
} else if ((e.target.id === 'js-mobNav-close') || (!header.contains(e.target))) {
    mobNavContainer.classList.remove('js-mobNav-slideIn');
    pageLayover.classList.remove('js-pageLayover-show');
  }

};

document.body.addEventListener('click', function (e) {
  shiftMobNav(e);
}, false);

// END MOBILE NAVIGATION


// SCROLL TO TOP BUTTON

{ // Start smooth scroll module.
  let upButton = document.getElementById('js-button-to-top');

  // Display up-button if site is scrolled past 1300px (e.g. on re-fresh).
  if (window.scrollY >= 1300) {
    upButton.style.bottom = '17px';
  } else {
    upButton.style.bottom = '-30px';
  }

  // Display up-button if user scrolls past 1300px.
  window.onscroll = () => {
    if (window.scrollY >= 1300) {
      upButton.style.bottom = '17px';
      upButton.style.transition = '0.3s'; // Optional transition.
    } else {
      upButton.style.bottom = '-30px';
    }
  };

  // Smooth scroll function.
  let smoothScroll = () => {
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.scrollTo(0, currentScroll - (currentScroll / 13));
      window.requestAnimationFrame(smoothScroll);
    }
  };

  upButton.addEventListener('click', smoothScroll, false);

} // End smooth scroll module.


// START FADE IN MAIN IMAGES IN INTRO SECTIONS.

{
  let imgWrap = document.getElementsByClassName('intro-img-wrap')[0];

  if (imgWrap) {
    window.addEventListener('load', () => {
      imgWrap.classList.add('js-intro-img-wrap-show');
    });
  }
}

// END FADE IN MAIN IMAGES IN INTRO SECTIONS.
