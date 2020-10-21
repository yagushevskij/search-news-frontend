import './pages/index.css';
import {
  userButtonElement, loginPopupTemplate, successPopupTemplate, signupPopupTemplate,
  popupContainer,
}
  from './scripts/constants/selectors';
import config from './scripts/constants/config';
import { UserButton } from './scripts/components/UserButton';
// import { Popup } from './scripts/components/Popup';
import { SigninPopup } from './scripts/components/SigninPopup';
import { SignupPopup } from './scripts/components/SignupPopup';
import { InformPopup } from './scripts/components/InformPopup';
import { Header } from './scripts/components/Header';
import { Form } from './scripts/components/Form';
import { MainApi } from './scripts/api/MainApi';

'use strict';

const mainApi = new MainApi(config);
const createForm = (...arg) => new Form(...arg);

const signinPopup = new SigninPopup(loginPopupTemplate, popupContainer, createForm, mainApi);
const signupPopup = new SignupPopup(signupPopupTemplate, popupContainer, createForm, mainApi);
const informPopup = new InformPopup(successPopupTemplate, popupContainer);

informPopup.setDependencies({ signinPopup });
signinPopup.setDependencies({ signupPopup });
signupPopup.setDependencies({ informPopup, signinPopup });

// const header = new Header({color: 'white'})

const userButton = new UserButton(userButtonElement);
userButton.addEventListener('click', () => {
  signinPopup.open();
});

// const button = document.querySelector('.header__menu-link_type_button');
// const popups = document.querySelectorAll('.popup');
// const closeButtons = document.querySelectorAll('.popup__close');
// const headerIconsContainer = document.querySelector('.header__icons-wrap');

// const header = document.querySelector('.header');
// const headerMenu = document.querySelector('.header__menu');

// button.addEventListener('click', () => {
//   popups.forEach((el) => {
//     el.classList.add('popup_is-opened');
//   });
// });

// closeButtons.forEach((el) => {
//   el.addEventListener('click', () => {
//     el.parentElement.parentElement.classList.remove('popup_is-opened');
//   });
// });

// headerIconsContainer.addEventListener('click', () => {
//   headerIconsContainer.children.forEach((el) => {
//     el.classList.toggle('header__nav-icon_is-hidden');
//   });
//   header.classList.toggle('header_style_fill');
//   headerMenu.classList.toggle('header__menu_mobile');
// });
