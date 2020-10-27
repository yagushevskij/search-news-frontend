export class NewsApi {
  constructor(config) {
    this._config = config;
  }
  getNews = (query) => {
    return fetch(this._config.getUrl(query), {
      method: 'get',
    })
      .then(res => {
        return this._checkResponse(res);
      })
      .catch((err) => { throw err; })
  };
  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json()
      .then(Promise.reject.bind(Promise))
  };
}
