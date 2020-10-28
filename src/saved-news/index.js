import '../pages/saved-news.css';
import {
  headerMenuLinkTemplate, headerButtonTemplate, headerContainer,
  searchResultContainer, isLoadingTemp, notFoundTemp, srvErrTemp, cardsBlockTemp,
  newsCardTemp, savedNewsContainer,
}
  from '../scripts/constants/selectors';
import {
  mainApiConf, headerConf, headerMenuLinks, cardListConf, cardConf,
} from '../scripts/constants/config';

import { Header } from '../scripts/components/Header';
import { NewsCard } from '../scripts/components/NewsCard';
import { NewsCardList } from '../scripts/components/NewsCardList';
import { SavedNews } from '../scripts/components/SavedNews';
import { MainApi } from '../scripts/api/MainApi';

(() => {
  'use strict';
  const mainApi = new MainApi(mainApiConf);
  const getUserData = () => mainApi.getUserData();
  const getSavedNews = () => mainApi.getArticles();
  const header = new Header(headerContainer, getUserData,
    {
      style: headerConf.style.white,
      page: headerConf.page.savedNews,
      menuLinks: headerMenuLinks,
      menuLinkTemplate: headerMenuLinkTemplate,
      menuButtonTemplate: headerButtonTemplate,
    });
  const createNewsCard = (...args) => new NewsCard(newsCardTemp, mainApi,
    cardConf.savedNews).create(...args);
  const newsCardList = new NewsCardList(searchResultContainer, createNewsCard,
    {
      isLoadingTemp, notFoundTemp, srvErrTemp, cardsBlockTemp,
    },
    cardListConf.pageNews);
  const logout = () => mainApi.logout();
  header.setDependencies({ logout });
  const savedNews = new SavedNews(savedNewsContainer, newsCardList, getSavedNews, getUserData);
  savedNews.renderResults();
})();
