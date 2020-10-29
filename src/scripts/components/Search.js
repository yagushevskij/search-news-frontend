

export class Search {
  constructor(domElement, newsCardList, getNews, getUserData, config) {
    this._domElement = domElement;
    this._newsCardList = newsCardList;
    this._getNews = getNews;
    this._getUserData = getUserData;
    this._input = domElement.querySelector('.search__input');
    this._submitButton = domElement.querySelector('.button');
    this._text = config.text;
  }
  submit = async (evt) => {
    evt.preventDefault();
    if (this._validation()) {
      try {
        this._disableButton();
        this._newsCardList.clearContainer();
        this._newsCardList.renderLoader();
        const keyword = this._input.value;
        const newsObj = await this._getNews(keyword);
        const userData = await this._getUserData();
        this._newsCardList.renderResults(newsObj.articles, { keyword, userData, isSaved: false });
        this._clearInput();
        this._enableButton();
      } catch (err) {
        this._newsCardList.clearContainer();
        this._newsCardList.renderError();
        this._enableButton();
        console.log(err)
      }
    }
  };
  _validation = () => {
    if (this._input.value.trim().length > 0) {
      return true;
    }
    this._clearInput();
    this._input.setAttribute('placeholder', this._text.required)
    return false;
  };
  _clearInput = () => {
    this._input.value = '';
  };
  _disableButton = () => {
    this._submitButton.setAttribute('disabled', 'true');
  }
  _enableButton = () => {
    this._submitButton.removeAttribute('disabled');
  }
  addEventListener = (...args) => {
    this._domElement.addEventListener(...args);
  };
}
