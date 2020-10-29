import './pages/index.css';
import {
  loginPopupTemplate, successPopupTemplate, signupPopupTemplate,
  headerMenuLinkTemplate, headerButtonTemplate, popupContainer, headerContainer,
  searchForm, searchResultContainer, isLoadingTemp, notFoundTemp, srvErrTemp, cardsBlockTemp,
  newsCardTemp,
}
  from './scripts/constants/selectors';
import { config } from './scripts/constants/config';

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

(() => {
  'use strict';
  const mainApi = new MainApi(config.mainApi);
  const newsApi = new NewsApi(config.newsApi);
  const getUserData = () => mainApi.getUserData();
  const header = new Header(headerContainer, getUserData,
    {
      page: config.header.pages.index,
      menuLinks: config.header.menuLinks,
      text: config.header.text,
      menuLinkTemplate: headerMenuLinkTemplate,
      menuButtonTemplate: headerButtonTemplate,
    });
  const createNewsCard = (...args) => new NewsCard(newsCardTemp, mainApi,
    config.card.pages.index).create(...args);
  const newsCardList = new NewsCardList(searchResultContainer, createNewsCard,
    {
      isLoadingTemp, notFoundTemp, srvErrTemp, cardsBlockTemp,
    },
    config.cardList.pages.index);
  const search = new Search(searchForm, newsCardList, newsApi.getNews, getUserData, config.search);

  const createForm = (form, backendErrorEl, ...args) => new Form(
    form, backendErrorEl, config.form, ...args,
  );

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
})();
