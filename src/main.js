document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.tab-link');
  const panels = document.querySelectorAll('.tab-panel');

  links.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = e.currentTarget.getAttribute('data-target');

      panels.forEach(p => (p.style.display = 'none'));
      links.forEach(l => l.classList.remove('active'));
      document.getElementById(targetId).style.display = 'block';
      e.currentTarget.classList.add('active');
    });
  });
});

// mobile menu
const openMenuBtn = document.querySelector('.menu-open-btn');
const closeMenuBtn = document.querySelector('.header-close-btn');
const menuBackdrop = document.querySelector('.header-burger-backdrop');

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

// Form

const modal = document.getElementById('formModal');
const openBtns = document.querySelectorAll('.js-open-form');
const closeBtn = document.getElementById('closeFormBtn');
const form = document.getElementById('ajaxForm');
const successBlock = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');

openBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('is-open');
    document.body.classList.add('no-scroll');
  });
});

const closeModal = () => {
  modal.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  setTimeout(() => {
    form.style.display = 'flex';
    successBlock.style.display = 'none';
    form.reset();
  }, 300);
};

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

form.addEventListener('submit', function(e) {
  e.preventDefault();

  submitBtn.textContent = "Wird gesendet...";
  submitBtn.disabled = true;

  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  fetch('https://web3forms.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
  .then(async (response) => {
    let res = await response.json();
    if (response.status == 200) {
      form.style.display = 'none';
      successBlock.style.display = 'flex';
    } else {
      alert(res.message);
    }
  })
  .catch(error => {
    console.log(error);
    alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
  })
  .then(function() {
    submitBtn.textContent = "Nachricht senden";
    submitBtn.disabled = false;
  });
});