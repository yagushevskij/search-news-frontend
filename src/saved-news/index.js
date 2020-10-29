import '../pages/saved-news.css';
import {
  headerMenuLinkTemplate, headerButtonTemplate, headerContainer,
  searchResultContainer, isLoadingTemp, notFoundTemp, srvErrTemp, cardsBlockTemp,
  newsCardTemp, savedNewsContainer,
}
  from '../scripts/constants/selectors';
import { config } from '../scripts/constants/config';

import { Header } from '../scripts/components/Header';
import { NewsCard } from '../scripts/components/NewsCard';
import { NewsCardList } from '../scripts/components/NewsCardList';
import { SavedNews } from '../scripts/components/SavedNews';
import { MainApi } from '../scripts/api/MainApi';

(() => {
  'use strict';
  const mainApi = new MainApi(config.mainApi);
  const getUserData = () => mainApi.getUserData();
  const getSavedNews = () => mainApi.getArticles();
  const header = new Header(headerContainer, getUserData,
    {
      page: config.header.pages.savedNews,
      menuLinks: config.header.menuLinks,
      text: config.header.text,
      menuLinkTemplate: headerMenuLinkTemplate,
      menuButtonTemplate: headerButtonTemplate,
    });
  const createNewsCard = (...args) => new NewsCard(newsCardTemp, mainApi,
    config.card.pages.savedNews).create(...args);
  const newsCardList = new NewsCardList(searchResultContainer, createNewsCard,
    {
      isLoadingTemp, notFoundTemp, srvErrTemp, cardsBlockTemp,
    },
    config.cardList.pages.savedNews);
  const logout = () => mainApi.logout();
  header.setDependencies({ logout });
  const savedNews = new SavedNews(savedNewsContainer, newsCardList, getSavedNews, getUserData);
  savedNews.renderResults();
})();
