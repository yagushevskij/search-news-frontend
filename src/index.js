import './pages/index.css';
import {
  loginPopupTemplate, successPopupTemplate, signupPopupTemplate,
  headerMenuLinkTemplate, headerButtonTemplate, popupContainer, headerContainer,
  searchForm, searchResultContainer, isLoadingTemp, notFoundTemp, srvErrTemp, cardsBlockTemp,
  newsCardTemp, showMoreBtnTemp,
}
  from './scripts/constants/selectors';
import {
  mainApiConf, newsApiConf, headerConf, headerMenuLinks, cardListConf,
} from './scripts/constants/config';

import { SigninPopup } from './scripts/components/SigninPopup';
import { SignupPopup } from './scripts/components/SignupPopup';
import { InformPopup } from './scripts/components/InformPopup';
import { Header } from './scripts/components/Header';
import { Form } from './scripts/components/Form';
import { Search } from './scripts/components/Search';
import { NewsCard } from './scripts/components/NewsCard';
import { NewsCardList } from './scripts/components/NewsCardList';
import { MainApi } from './scripts/api/MainApi';
import { NewsApi } from './scripts/api/NewsApi';

// (function () {
'use strict';
const mainApi = new MainApi(mainApiConf);
const newsApi = new NewsApi(newsApiConf);
const getUserData = () => mainApi.getUserData();
const header = new Header(headerContainer, getUserData,
  {
    style: headerConf.style.image,
    page: headerConf.page.index,
    menuLinks: headerMenuLinks,
    menuLinkTemplate: headerMenuLinkTemplate,
    menuButtonTemplate: headerButtonTemplate,
  });
const createNewsCard = (...args) => new NewsCard(newsCardTemp, mainApi).create(...args);
const newsCardList = new NewsCardList(searchResultContainer, createNewsCard,
  {
    isLoadingTemp, notFoundTemp, srvErrTemp, cardsBlockTemp,
  },
  cardListConf);
const search = new Search(searchForm, newsCardList, newsApi.getNews, getUserData);

const createForm = (form, backendErrorEl, ...args) => new Form(form, backendErrorEl, ...args);

const signinPopup = new SigninPopup(loginPopupTemplate, popupContainer, mainApi.login, createForm,
  header.render);
const signupPopup = new SignupPopup(signupPopupTemplate, popupContainer, mainApi.register,
  createForm);
const informPopup = new InformPopup(successPopupTemplate, popupContainer);

const logout = () => mainApi.logout();
const openSigninPopup = () => signinPopup.open();

informPopup.setDependencies({ signinPopup });
signinPopup.setDependencies({ signupPopup });
signupPopup.setDependencies({ informPopup, signinPopup });
header.setDependencies({ openSigninPopup, logout });

search.addEventListener('submit', search.submit);

// const searchForm = document.querySelector('.search__form');
// searchForm.addEventListener('submit', () => {
//   event.preventDefault();
//   createForm(searchForm, document.querySelector('.search-results__description'))
// });
// })();

// console.log(newsApiConf.getUrl('Россия'))
// console.log(newsApi.getNews('Россия'))

// import { getFormatedDate } from './scripts/utils';
// console.dir(getFormatedDate('2020-10-21T12:47:58Z'))