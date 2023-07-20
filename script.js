'use strict';

// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// forEach loop
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth scrolling
btnScrollTo.addEventListener('click', e => {
  // const s1coords = section1.getBoundingClientRect(); // get coords
  // console.log(s1coords);

  // New modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});

// creating element
const message = document.createElement('div'); //creates a DOM element
message.classList.add('cookie-message'); // div element with class on cookie-message
// message.textContent = 'We use cookies to improve functionality and analytics'
message.innerHTML =
  'We use cookies to improve functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';
const header = document.querySelector('header');
// Insert element
header.after(message);
// Remove element
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

// Styles
message.style.backgroundColor = '#37383d';

// Attributes (class id all attributes of html element)
const logo = document.querySelector('.nav__logo');
logo.getAttribute('company', 'Bankist');

// Data attributes
console.log(logo.dataset.versionCode); //useful for storing data in the UI

// Classes

logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// only listen to the event once hence remove function
const alertH1 = function (e) {
  // alert('clicked on h1');
  // h1.removeEventListener('mouseenter', alertH1)
};
const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', alertH1);
//remove alert after 3 seconds
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// EVENT DELIGATION (bubbling) EVENTS BUBBLE UP
// Looking e.target property
// we need an event listener to a common parent element among these links
// Determine what element orignated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // MATCHING STRATEGY: need to check if target has this nav__link class
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// TAB COMPONENT
// NEXT FEATURE
// Building tab component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(tab =>
//   tab.addEventListener('click', () => {
//     console.log('clicked');
//   })
// );

// Using event deligation
// e.target
tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active');
  });
  clicked.classList.add('operations__tab--active');
  // Content area
  tabsContent.forEach(content => {
    content.classList.remove('operations__content--active');
  });
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// fading navigation
nav.addEventListener('mouseover', e => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = 0.5;
      } else {
        el.style.opacity = 1;
      }
    });
  }
});

// STICKY NAVIGATION
// Adding the sticky class to the nav bar
// Intersection Observer API
const headerEl = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height; // dynamically calculate the nav height
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(headerEl);

// REVEAL EACH SECTION AS WE SCROLL TO IT
// Intersection Observer API

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target); // no more observe after first time
  }
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, // section revealed when 15% is visible not at the begnining
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// LAZY LOADING IMAGES
// Intersection Observer API
// all images that have this attribute data-src
const imgTargets = document.querySelectorAll('img[data-src]');
const loading = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    //remove the lazy-img once it is loaded
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target); // no more observe after first time
};
const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

// SLIDER COMPONENT
// PART 1/2
// putting all the slides side by side
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

// create a new variable for current slide
let curslide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);
// going to next slide
const nextSlide = function () {
  if (curslide === maxSlide - 1) {
    curslide = 0;
  } else {
    curslide++;
  }
  goToSlide(curslide);
};
// going to prev slide
const prevSlide = function () {
  if (curslide === 0) {
    curslide = maxSlide - 1;
  } else {
    curslide--;
  }
  goToSlide(curslide);
};
// need to change the transport property from 0 to 100
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  //console.log(e);
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide(); // short circutting
});
