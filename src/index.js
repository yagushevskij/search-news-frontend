import './pages/index.css';

const button = document.querySelector('.header__menu-link_type_button');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');
const headerIconsContainer = document.querySelector('.header__icons-wrap');

const header = document.querySelector('.header');
const headerMenu = document.querySelector('.header__menu');

button.addEventListener('click', () => {
  popups.forEach((el) => {
    el.classList.add('popup_is-opened');
  });
});

closeButtons.forEach((el) => {
  el.addEventListener('click', () => {
    el.parentElement.parentElement.classList.remove('popup_is-opened');
  });
});

headerIconsContainer.addEventListener('click', () => {
  headerIconsContainer.children.forEach((el) => {
    el.classList.toggle('header__nav-icon_is-hidden');
  });
  header.classList.toggle('header_style_fill');
  headerMenu.classList.toggle('header__menu_mobile');
});
