

export class SavedNews {
  constructor(container, newsCardList, getSavedNews, getUserData) {
    this._container = container;
    this._greetingContainer = this._container.querySelector('.saved-news__title');
    this._keywordsContainer = this._container.querySelector('.saved-news__keywords');

    this._newsCardList = newsCardList;
    this._getSavedNews = getSavedNews;
    this._getUserData = getUserData;
  }
  renderResults = async () => {
    this._userData = await this._getUserData();
    this._userName = this._userData.username
    this._newsArray = await this._getSavedNews();
    this._renderInfoBlock();
    this._newsCardList.renderResults(this._newsArray, { userData: this._userData, isSaved: true, refreshInfoBlock: this.refreshInfoBlock });
  };
  _renderInfoBlock = () => {
    this._savedNewsCount = this._newsArray.length === 0 ? 'нет' : this._newsArray.length;
    this._greetingContainer.textContent = `${this._userName}, у вас ${this._savedNewsCount} сохраненных статей`
    this._renderKeywords();
  };
  refreshInfoBlock = (deletedObj) => {
    this._newsArray = this._newsArray.filter((el) => !(el === deletedObj))
    this._renderInfoBlock();
  };
  _renderKeywords = () => {
    this._keywordsContainer.textContent = '';
    const maxKeywordsOnPage = 3;
    const keysAmount = this._getSortedKeywords().length
    if (keysAmount > 0) { // Если есть ключевые слова, то будем их показывать
      let hiddenKeywords = false;
      let visibleKeywords = '';
      const spanElement = document.createElement('span');
      spanElement.classList.add('saved-news__span-accent');
      if (keysAmount > maxKeywordsOnPage) {
        hiddenKeywords = keysAmount - 2;
        visibleKeywords = this._getSortedKeywords().splice(0, 2).join(', ');
      } else {
        visibleKeywords = this._getSortedKeywords().join(', ');
      }
      spanElement.textContent = visibleKeywords;
      this._keywordsContainer.append('По ключевым словам: ', spanElement);
      if (hiddenKeywords) {
        const cloneSpanElem = spanElement.cloneNode(true);
        cloneSpanElem.textContent = ` ${hiddenKeywords} другим`;
        this._keywordsContainer.append(' и', cloneSpanElem);
      }
    }
  }
  _getSortedKeywords = () => { // Получаем уникальный отсортированный массив ключевых слов по убыванию количества вхождений
    const keywordsArray = this._newsArray.map((el) => el.keyword);
    const map = keywordsArray.reduce((p, c) => {
      p[c] = (p[c] || 0) + 1;
      return p;
    }, {});
    const result = Object.keys(map).sort((a, b) => {
      return map[b] - map[a];
    });
    return result;
  }
}
