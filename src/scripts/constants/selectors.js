const userButtonElement = document.querySelector('.header__menu-link_type_button');
const popupContainer = document.querySelector('.popup');
const loginPopupTemplate = document.querySelector('#login-popup');
const signupPopupTemplate = document.querySelector('#registration-popup');
const successPopupTemplate = document.querySelector('#reg-success-popup');
const headerMenuLinkTemplate = document.querySelector('#header-menu-link');
const headerButtonTemplate = document.querySelector('#header-menu-button');
const headerContainer = document.querySelector('.header');
const searchForm = document.querySelector('.search__form');
const searchResultContainer = document.querySelector('.search-results');
const isLoadingTemp = document.querySelector('#is-loading');
const notFoundTemp = document.querySelector('#not-found');
const srvErrTemp = document.querySelector('#server-error');
const cardsBlockTemp = document.querySelector('#cards-block');
const newsCardTemp = document.querySelector('#news-card');
const savedNewsContainer = document.querySelector('.saved-news');

export {
  userButtonElement, popupContainer, loginPopupTemplate, signupPopupTemplate,
  successPopupTemplate, headerContainer, headerMenuLinkTemplate, headerButtonTemplate,
  searchForm, searchResultContainer, isLoadingTemp, notFoundTemp, srvErrTemp, cardsBlockTemp,
  newsCardTemp, savedNewsContainer,
};
