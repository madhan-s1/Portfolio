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

//! Button open and close Modal:
const open = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const close = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', open));
btnCloseModal.addEventListener('click', close);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
});
overlay.addEventListener('click', function () {
  if (!modal.classList.contains('hidden')) close();
});

// ! Smooth scroling:
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// ! Page Navigation(Smooth Scroling):
navLink.forEach(function (el) {
  console.log(el);
  el.addEventListener('click', function (e) {
    e.preventDefault();
    let id = this.getAttribute('href');
    // console.log(id);
    if (id !== '#') {
      document.querySelector(`${id}`).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// !Menu fade animation:

const handleHover = function (el) {
  if (el.target.classList.contains('nav__link')) {
    const link = el.target;
    // console.log(link);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // console.log(siblings);
    const logo = link.closest('.nav').querySelector('#logo');
    // console.log(logo);

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
        // console.log('working');
        logo.style.opacity = this;
      }
    });
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// ! Tabbed container:
const containers = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

containers.addEventListener('click', function (e) {
  if (e.target.classList.contains('operations__tab')) {
    const clicked = e.target.closest('.operations__tab');
    console.log(clicked);

    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(t => t.classList.remove('operations__content--active'));

    clicked.classList.add('operations__tab--active');
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  }
});

// getBoundingClientRect

// !Sticky Navigation:
const header = document.querySelector('.header');
const headerHeight = nav.getBoundingClientRect().height;
// console.log(headerHeight);

const headerCallBack = function (entires) {
  const [entry] = entires;
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(headerCallBack, {
  root: null,
  threshold: 0,
  rootMargin: `${headerHeight}px`,
});

headerObserver.observe(header);

// !Revealing Elements:

const allSections = document.querySelectorAll('.section');
const elementCallBack = function (entires) {
  const [entry] = entires;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  else {
    entry.target.classList.remove('section--hidden');
    elementsObserver.unobserve(entry.target);
  }
};

const elementsObserver = new IntersectionObserver(elementCallBack, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  elementsObserver.observe(section);
  section.classList.add('section--hidden');
});

// ! Lazy Loading
const imgTarget = document.querySelectorAll('img[data-src]');

const imgCallback = function (entires) {
  const [entry] = entires;
  // console.log(entry);
  if (entry.isIntersecting) {
    entry.target.classList.remove('lazy-img');
    imgObservor.unobserve(entry.target);
  }
};

const imgObservor = new IntersectionObserver(imgCallback, {
  root: null,
  threshold: 0.15,
  rootMargin: '200px',
});

imgTarget.forEach(img => imgObservor.observe(img));

// !Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;
  console.log(slides);

  slides.forEach(function (s, i) {
    if (i != curSlide) {
      s.style.transform = 'translateX(100%)';
    }
  });
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else curSlide++;
    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else curSlide--;
    goToSlide(curSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
};
slider();

const sendMail = function () {
  var params = {
    name: document.getElementById('fullname').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  emailjs
    .send('service_f902xwx', 'template_6dzivql', params)
    .then(function (res) {
      console.log(res);
      alert('Success!' + res.status);
    })
    .catch(function (error) {
      console.error('Error:', error);
      alert('Failed to send email. Please try again.');
    });
};

// const submit = document.querySelector('.submit');
// submit.addEventListener('click', sendMail);
