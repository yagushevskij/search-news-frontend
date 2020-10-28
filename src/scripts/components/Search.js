

export class Search {
  constructor(domElement, newsCardList, getNews, getUserData) {
    this._domElement = domElement;
    this._newsCardList = newsCardList;
    this._getNews = getNews;
    this._getUserData = getUserData;
    this._input = domElement.querySelector('input');
  }
  submit = async (evt) => {
    evt.preventDefault();
    this._newsCardList.clearContainer();
    this._newsCardList.renderLoader();
    if (this._validation()) {
      try {
        const keyword = this._input.value;
        const newsObj = await this._getNews(keyword);
        const userData = await this._getUserData();
        this._newsCardList.renderResults(newsObj.articles, {keyword, userData, isSaved: false});
      } catch (err) {
        this._newsCardList.clearContainer();
        this._newsCardList.renderError();
        console.log(err)
      }
    }
  };
  _validation = (event) => {
    // this._input.setCustomValidity = (`Должно быть не менее ${this._input.minLegth} символа`);
    // if (this._input.validity.valueMissing || this._input.validity.tooShort) {
    // }
    return true;
  };
  addEventListener = (...args) => {
    this._domElement.addEventListener(...args);
  };
}
