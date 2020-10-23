import './pages/index.css';
import {
  loginPopupTemplate, successPopupTemplate, signupPopupTemplate,
  headerMenuLinkTemplate, headerButtonTemplate, popupContainer, headerContainer,
}
  from './scripts/constants/selectors';
import { config, headerConf, headerMenuLinks } from './scripts/constants/config';
// import { Popup } from './scripts/components/Popup';
import { SigninPopup } from './scripts/components/SigninPopup';
import { SignupPopup } from './scripts/components/SignupPopup';
import { InformPopup } from './scripts/components/InformPopup';
import { Header } from './scripts/components/Header';
import { Form } from './scripts/components/Form';
import { MainApi } from './scripts/api/MainApi';

'use strict';

const mainApi = new MainApi(config);
const getUserData = () => mainApi.getUserData();
const header = new Header(headerContainer, getUserData,
  {
    style: headerConf.style.image, page: headerConf.page.index, menuLinks: headerMenuLinks,
    menuLinkTemplate: headerMenuLinkTemplate, menuButtonTemplate: headerButtonTemplate,
  });

const createForm = (...arg) => new Form(mainApi, ...arg);

const signinPopup = new SigninPopup(loginPopupTemplate, popupContainer, createForm,
  header.render);
const signupPopup = new SignupPopup(signupPopupTemplate, popupContainer, createForm);
const informPopup = new InformPopup(successPopupTemplate, popupContainer);

const signout = () => mainApi.signout();
const openSigninPopup = () => signinPopup.open();

informPopup.setDependencies({ signinPopup });
signinPopup.setDependencies({ signupPopup });
signupPopup.setDependencies({ informPopup, signinPopup });
header.setDependencies({ openSigninPopup, signout });
