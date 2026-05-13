document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.tab-link');
  const panels = document.querySelectorAll('.tab-panel');

  links.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = e.currentTarget.getAttribute('data-target');

      // Ховаємо всі панелі
      panels.forEach(p => (p.style.display = 'none'));
      // Прибираємо активний клас
      links.forEach(l => l.classList.remove('active'));

      // Показуємо потрібну
      document.getElementById(targetId).style.display = 'block';
      e.currentTarget.classList.add('active');
    });
  });
});

// mobile menu
const openMenuBtn = document.querySelector('.menu-open-btn');
const closeMenuBtn = document.querySelector('.header-close-btn');
const menuBackdrop = document.querySelector('.header-burger-backdrop');

// Функція для перемикання меню
const toggleMenu = () => {
  menuBackdrop.classList.toggle('is-open');
  document.body.classList.toggle('no-scroll');
};

openMenuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);

const links = document.querySelectorAll('.header-burger-list-item-link');
links.forEach(link => {
  link.addEventListener('click', toggleMenu);
});

// Gallery - swiper

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiper = new Swiper('.mySwiper', {
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  grabCursor: true,

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 10
    }
  }
});