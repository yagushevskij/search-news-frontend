export class MainApi {
  constructor(config) {
    this._articlesApiUrl = config.articlesApiUrl;
    this._userApiUrl = config.userApiUrl;
    this._signinApiUrl = config.signinApiUrl;
    this._signupApiUrl = config.signupApiUrl;
    this._signoutApiUrl = config.signoutApiUrl;
    this._headers = config.headers;
  }
  register = (dataObj) => {
    return fetch(this._signupApiUrl, {
      method: 'post',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(dataObj)
    })
      .then(res => {
        return this._checkResponse(res);
      })
      .catch((err) => { throw err; })
  };
  login = (dataObj) => {
    return fetch(this._signinApiUrl, {
      method: 'post',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(dataObj)
    })
      .then(res => {
        return this._checkResponse(res);
      })
      .catch((err) => { throw err; })
  };
  logout = () => {
    return fetch(this._signoutApiUrl, {
      method: 'get',
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => {
        return this._checkResponse(res);
      })
      .catch((err) => { throw err; })
  };
  getUserData = () => {
    return fetch(this._userApiUrl, {
      method: 'get',
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return false;
      })
      .catch((err) => { throw err; })
  };
  getArticles = () => {
    return fetch(this._articlesApiUrl, {
      method: 'get',
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => {
        return this._checkResponse(res);
      })
      .catch((err) => { throw err; })
  };
  createArticle = (dataObj) => {
    return fetch(this._articlesApiUrl, {
      method: 'post',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(dataObj)
    })
      .then(res => {
        return this._checkResponse(res);
      })
      .catch((err) => { throw err; })
  };
  removeArticle = (id) => {
    return fetch(this._articlesApiUrl + '/' + id, {
      method: 'delete',
      headers: this._headers,
      credentials: 'include',
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
