// HEADER WIDTH

{
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
} // End header width.


// HEADER HEIGHT
// Reduce height on scroll btw width 691px-1000px.
{
  let minWidth691 = window.matchMedia('(min-width: 691px)'),
      maxWidth1000 = window.matchMedia('(max-width: 1000px)'),
      header = document.getElementsByTagName('header')[0];

  // If btw 691-1000px and if site is scrolled past 85px (e.g. on re-fresh).
  if ((minWidth691.matches && maxWidth1000.matches) && (window.scrollY >= 85)) {
    // Reduce height of header.
    header.style.oTransform = 'translateY(-23.5px)';
    header.style.msTransform = 'translateY(-23.5px)';
    header.style.mozTransform = 'translateY(-23.5px)';
    header.style.webkitTransform = 'translateY(-23.5px)';
    header.style.transform = 'translateY(-23.5px)';
  }

  // On scroll.
  window.addEventListener('scroll', () => {
    // If btw 691-1000px and if user scrolls past 85px.
    if ((minWidth691.matches && maxWidth1000.matches) && (window.scrollY >= 85)) {
      // Reduce height of header
      header.style.oTransform = 'translateY(-23.5px)';
      header.style.msTransform = 'translateY(-23.5px)';
      header.style.mozTransform = 'translateY(-23.5px)';
      header.style.webkitTransform = 'translateY(-23.5px)';
      header.style.transform = 'translateY(-23.5px)';
    } else {
      // Cancel height reduction of header if user scrolls back up before 85px.
      header.style.oTransform = 'none';
      header.style.msTransform = 'none';
      header.style.mozTransform = 'none';
      header.style.webkitTransform = 'none';
      header.style.transform = 'none';
    }
  });

  // On resize.
  window.addEventListener('resize', () => {
    // If btw 691-1000px and if site is scrolled past 85px (e.g. on re-fresh).
    if ((minWidth691.matches && maxWidth1000.matches) && (window.scrollY >= 85)) {
      // Reduce height of header.
      header.style.oTransform = 'translateY(-23.5px)';
      header.style.msTransform = 'translateY(-23.5px)';
      header.style.mozTransform = 'translateY(-23.5px)';
      header.style.webkitTransform = 'translateY(-23.5px)';
      header.style.transform = 'translateY(-23.5px)';
    } else {
      // Cancel height reduction of header if user scrolls back up before 85px.
      header.style.oTransform = 'none';
      header.style.msTransform = 'none';
      header.style.mozTransform = 'none';
      header.style.webkitTransform = 'none';
      header.style.transform = 'none';
    }
  });
} // End header height.


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
    fixedContentPos: false, // Makes page scrollable when img open.
    mainClass: 'mfp-zoom-in',
    removalDelay: 200, //delay removal by X to allow out-animation
    showCloseBtn: false, // Hides default close button.
    callbacks: {
      beforeOpen: function() {
        $('#portfolio a').each(function() {
          $(this).attr('title', $(this).find('img').attr('alt'));
        });
      },
      open: function() {
        //overwrite default prev + next function. Add timeout for css3 crossfade animation
        $.magnificPopup.instance.next = function() {
          var self = this;
          self.wrap.removeClass('mfp-image-loaded');
          setTimeout(function() {
            $.magnificPopup.proto.next.call(self);
          }, 120);
        }
        $.magnificPopup.instance.prev = function() {
          var self = this;
          self.wrap.removeClass('mfp-image-loaded');
          setTimeout(function() {
            $.magnificPopup.proto.prev.call(self);
          }, 120);
        }
      },
      imageLoadComplete: function() {
        var self = this;
        setTimeout(function() {
          self.wrap.addClass('mfp-image-loaded');
        }, 16);
      }
    }
  });
}); // End Magnific Popup.


// START MAIN NAVIGATION

{
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
        let triggerClass = e.target.classList[0]; // Get class that links to sub-menu content.
        document.getElementsByClassName(triggerClass)[1].classList.remove('js-hide'); // Get 2nd elem w/that class, which is the sub-menu content, and display it.

        // Shift drop down into place.

        // Get a-tag position.
        let rectTarget = e.target.getBoundingClientRect();
        let leftEdgeOfTarget = rectTarget.left;
        // Find drop down postion same as left edge of a-tag.
        let headerOffsetLeft = document.getElementsByClassName('js-header')[0].offsetLeft;
        let subMenuLeftPosition = leftEdgeOfTarget - headerOffsetLeft;
        // Find length of drop down to center it under respective a-tag.
        let subMenuWidth = subMenu.offsetWidth; // This has to run after we display both submenu and its child divs.
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

  // Loop over all class-names 'nav-open' and add eventlistener to them.
  let navOpenArr = document.getElementsByClassName('js-nav-open');
  for (let i = 0; i < navOpenArr.length; i++) {
    navOpenArr[i].addEventListener('mouseleave', function (e) {
      hideDropdown(e);
    }, false);
  };

  // Dynamic active-menu indicator for main-nav.
  (function () {
    let currentPath = location.pathname,
        aArr = document.querySelectorAll('nav a');

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
    let currentPath = location.pathname,
        subMenu = document.getElementsByClassName('nav-sub-menu')[0],
        aArr = subMenu.getElementsByTagName('a');

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

    // If hovering over sub menu, mark respective nav item.
    subMenu.addEventListener('mousemove', function () {
      // Add event listener to all divs in sub menu.
      for (let i = 0; i < divArr.length; i++) {
        // Mark respective main nav item as active.
        if (!divArr[i].classList.contains('js-hide')) {
          let firstClassName = divArr[i].classList[0];
          let mainNavItem = document.getElementsByClassName(firstClassName)[0];
          mainNavItem.classList.add('js-nav-a-active');
        }
      }
    }, false);

    // If sub menu doesn't show, un-mark respective nav item.
    subMenu.addEventListener('mouseleave', function (e) {
      // Get number of active main-nav-items.
      let activeArr = document.getElementsByClassName('js-nav-a-active');

      for (let i = 0; i < divArr.length; i++) {
        // Target respective sub nav div.
        // If respective sub-nav-div contains class js-hide and
        // if the number of active main-nav-items > 1, or
        // if on home-page.
        if (((!divArr[i].classList.contains('js-hide')) && (activeArr.length > 1)) || (window.location.href === 'file:///D:/Google%20Drive/it/1%20webdev/projects/scott/appScott/index.html')) { // TODO: Change href to corret url.
          let firstClassName = divArr[i].classList[0];
          let mainNavItem = document.getElementsByClassName(firstClassName)[0];
          // Un-mark respective main nav with a delay.
          let removeActive = () => {
            mainNavItem.classList.remove('js-nav-a-active');
          };
          let delayRemoveActive = setTimeout(removeActive, 600);
        }
      }
    }, false);
  }());

  // Hover logic for main nav-items.
  {
    let navAtagArr = document.querySelectorAll('nav li a'),
        activeArr = document.getElementsByClassName('js-nav-a-active');
    
    // Loop over all nav a-tags.
    for (let i = 0; i < navAtagArr.length; i++) {

      // When hovering over main nav item with a sub-nav, mark item as active.

      // Add eventlisteners to all a-tags, on mouse-enter.
      navAtagArr[i].addEventListener('mouseenter', (e) => {
        // If a-tag has a sub-menu
        if (e.target.classList.contains('js-nav-open')) {
          // Mark a-tag as active.
          e.target.classList.add('js-nav-a-active');
        }
      });

      // When un-hover main nav item with a sub-nav, deactivate w/delay, unless related-target is another nav item with a sub-nav.

      // Add eventlisteners to all a-tags, on mouse-leave.
      navAtagArr[i].addEventListener('mouseleave', (e) => {
        // If a-tag has a sub-menu, and is not the only active item, and mouse does not hover over another a-tag w/submenu next.
        // Or current page is the index-page, and mouse does not hover over another a-tag w/submenu next.
        if ((e.target.classList.contains('js-nav-open')) && (activeArr.length > 1) && (!e.relatedTarget.classList.contains('js-nav-open')) || ((window.location.href === 'file:///D:/Google%20Drive/it/1%20webdev/projects/scott/appScott/index.html') && (!e.relatedTarget.classList.contains('js-nav-open')))) {
          // Un-mark respective main nav with a delay.
          let removeActive = () => {
            e.target.classList.remove('js-nav-a-active');
          };
          let delayRemoveActive = setTimeout(removeActive, 600);
          // If a-tag has a sub-menu, and is not the only active item, or current page is the index-page.
        } else if (((e.target.classList.contains('js-nav-open')) && (activeArr.length > 1)) || (window.location.href === 'file:///D:/Google%20Drive/it/1%20webdev/projects/scott/appScott/index.html')) {
          // Un-mark respective main nav without delay.
          let removeActive = () => {
            e.target.classList.remove('js-nav-a-active');
          };
          removeActive();
        }
      });
    }
  } // End hover logic for main nav-items.


  // On screen re-size, hide main nav, as long mobile nav is open.
  // Note: One additional line of code for this module under 'move mobile navigation container'.
  {
    window.addEventListener('resize', () => {
      let mobNavContainer = document.getElementsByClassName('js-mobNav-container')[0];
          navUl = document.querySelector('nav ul');

      if (mobNavContainer.classList.contains('js-mobNav-slideIn')) {
        navUl.style.display = 'none';
      } else {
        navUl.style.display = '';
      }
    });
  }
} // End main navigation.


// START MOBILE NAVIGATION
{
  // Move slides inside navigation container.
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
      idName = e.target.id; // Id on link.
      shiftLinkedSlideLeft(idName);

      // If back link is clicked.
    } else if (e.target.classList.contains('js-mobNav-prev')) {
      shiftCurrentSlide('js-mobNav-right');
      shiftLinkedSlideRight();
    }
  };

  document.getElementsByClassName('js-mobNav-container')[0].addEventListener('click', function(e) {
    shiftSlide(e);
  }, false);


  // Move mobile navigation container.
  let shiftMobNav = (e) => {

    let mobNavContainer = document.getElementsByClassName('js-mobNav-container')[0],
      header = document.getElementsByClassName('js-header')[0],
      pageLayover = document.getElementsByClassName('js-mobNav-pageLayover')[0];
      navUl = document.querySelector('nav ul');

    // If open buttons clicked, move mobile-nav-container in viewport and add page layover.
    if (e.target.id === 'js-mobNav-open') {
      mobNavContainer.classList.add('js-mobNav-slideIn');
      pageLayover.classList.add('js-pageLayover-show');
      // If close buttons clicked, or click outside header and outside mobile-nav-container move it out viewport.
    } else if ((e.target.id === 'js-mobNav-close') || ((!header.contains(e.target)) && (!mobNavContainer.contains(e.target)))) {
      mobNavContainer.classList.remove('js-mobNav-slideIn');
      pageLayover.classList.remove('js-pageLayover-show');
      navUl.style.display = ''; // Remove display-none from main-nav-ul. Needed for module: 'On screen re-size, hide main nav, as long mobile nav is open.'
    }
  };

  document.body.addEventListener('click', function(e) {
    shiftMobNav(e);
  }, false);

} // End mobile navigation.


// SCROLL TO TOP BUTTON

{
  let upButton = document.getElementById('js-button-to-top');

  // Display up-button if site is scrolled past 1300px (e.g. on re-fresh).
  if (window.scrollY >= 425) {
    upButton.style.bottom = '17px';
  } else {
    upButton.style.bottom = '-30px';
  }

  // Display up-button if user scrolls past 1300px.
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 425) {
      upButton.style.bottom = '17px';
    } else {
      upButton.style.bottom = '-30px';
    }
  });

  // Smooth scroll function.
  let smoothScroll = () => {
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.scrollTo(0, currentScroll - (currentScroll / 13));
      window.requestAnimationFrame(smoothScroll);
    }
  };

  upButton.addEventListener('click', smoothScroll, false);

} // End scroll to top button.


// START FADE IN MAIN IMAGES IN INTRO SECTIONS.

{
  let imgWrap = document.getElementsByClassName('intro-img-wrap')[0];

  if (imgWrap) {
    window.addEventListener('load', () => {
      imgWrap.classList.add('js-intro-img-wrap-show');
    });
  }
} // End fade in main images in intro sections.


// DYNAMIC YEAR.

{
  let yearSpan = document.getElementById('year'),
      currentYear = document.createTextNode(new Date().getFullYear());
  yearSpan.appendChild(currentYear);
} // End dynamic year.


// START FADE IN MAIN NAV.

{
  let header = document.getElementsByTagName('header')[0];

  if (header) {
    window.addEventListener('load', () => {
      header.classList.add('js-header-show');
    });
  }
} // End fade in main nav.