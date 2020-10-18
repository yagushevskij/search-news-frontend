import '../pages/saved-news.css';

const headerIconsContainer = document.querySelector('.header__icons-wrap');

const header = document.querySelector('.header');
const headerMenu = document.querySelector('.header__menu');

headerIconsContainer.addEventListener('click', () => {
  headerIconsContainer.children.forEach((el) => {
    el.classList.toggle('header__nav-icon_is-hidden');
  });
  header.classList.toggle('header_style_fill');
  headerMenu.classList.toggle('header__menu_mobile');
});
