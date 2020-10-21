const MAIN_API_URL = NODE_ENV === 'production' ? 'https://api.turbomegapro.ru' : 'http://localhost:3000';
const config = {
  articlesApiUrl: `${MAIN_API_URL}/articles`,
  userApiUrl: `${MAIN_API_URL}/users/me`,
  signinApiUrl: `${MAIN_API_URL}/signin`,
  signupApiUrl: `${MAIN_API_URL}/signup`,
  headers: {
    'Content-Type': 'application/json',
  },
};

export default config;
