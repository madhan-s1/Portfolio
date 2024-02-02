'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLink = document.querySelectorAll('.nav__link');
const navLinks = document.querySelector('.nav__links');
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

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Note: Smooth scrolling:
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
  console.log('working');
});

// Note:Event Delegation_ Implementing Page Navigation
// !Method : 01
navLink.forEach(function (el) {
  console.log(el);

  el.addEventListener('click', function (e) {
    e.preventDefault();
    let id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

// ! Method:02
navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e);

  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    let id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    console.log('working');
  }
});

// Note: Building Tabbed compenents

const container = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

container.addEventListener('click', function (e) {
  console.log('working');
  // Matching strategy
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;
  console.log(clicked.dataset.tab);

  // remove tabs and content
  tabs.forEach(t => t.classList.remove(`operations__tab--active`));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // add tabs and content
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Note: Menu fade animation:

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    // console.log('work');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
      // console.log('w');
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//Note: Sticky Navigation / / Intersection observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const headerCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(headerCallback, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Note: Revelling elements on scroll

const allsection = document.querySelectorAll('.section');

const sectionCallBack = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  else entry.target.classList.remove('section--hidden');
  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionCallBack, {
  root: null,
  threshold: 0.15,
});

allsection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Note: Lazy Loading:

const imgTargets = document.querySelectorAll('img[data-src]');

const imgCallback = function (entries) {
  const [entry] = entries;
  console.log(entry);
  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove('lazy-img');

  imageObserver.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(imgCallback, {
  root: null,
  threshold: 0.15,
  rootMargin: '200px',
});

imgTargets.forEach(img => imageObserver.observe(img));

///////////////////////////////////////////////////////
// !Work Note
///////////////////////////////////////////////////////
// const message = document.createElement('div');

// message.classList.add('cookie-message');

// message.innerHTML =
//   'The cookie is used for some reason <button class = "btn btn--close-cookie"> Got it! </button>';

// document.querySelector('.header').append(message);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });
// console.log(document.querySelector('.header', message));

// !Mouseenter function:
// const h1 = document.querySelector('h1');
// const alertH1 = function () {
//   alert('Hey, Currently you are reading h1 tag');
//   console.log('working');
// };
// // h1.addEventListener('mouseenter', alertH1);
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// ! bubbling

// const randomInt = function (min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// navLink.addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('link', e.target, e.currentTarget);
// });

// navLinks.addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('links', e.target, e.currentTarget);
// });

// nav.addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('Nav', e.target, e.currentTarget);
//   },
//   true
// );
// ==================================================================

// Sticky Navigation / Intersection observer API

// const obscallback = function (entries) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: 0.1,
// };

// const observer = new IntersectionObserver(obscallback, obsOptions);
// observer.observe(section1);
