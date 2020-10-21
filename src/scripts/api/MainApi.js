export class MainApi {
  constructor(config) {
    this._articlesApiUrl = config.articlesApiUrl;
    this._userApiUrl = config.userApiUrl;
    this._signinApiUrl = config.signinApiUrl;
    this._signupApiUrl = config.signupApiUrl;
    this._headers = config.headers;
  }
  signup = (dataObj) => {
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
  signin = (dataObj) => {
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
  getUserData = () => {
  };
  getArticles = () => {
  };
  createArticle = () => {
  };
  removeArticle = () => {
  };
  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json()
      .then(Promise.reject.bind(Promise))
  };
}

// signUp = (userEmail, userPassword, userName) => {
//   return fetch(`${this.options.myURL}/signup`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     credentials: 'include',
//     body: JSON.stringify({
//       email: userEmail,
//       password: userPassword,
//       name: userName
//     }),
//   })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       const json = res.json();
//       return json.then(Promise.reject.bind(Promise))
//     })
//     .catch((err) => { throw err; })
// }