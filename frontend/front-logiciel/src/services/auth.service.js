import axios from 'axios';

const API_LOG = 'http://fradetaxel.fr:4567/auth/login';
const API_CREAT = 'http://fradetaxel.fr:3456/login/create';

class AuthService {
  login(user) {
    return axios
      .post(API_LOG, {
        email: user.email,
        password: user.password,
        role: user.role
      })
      .then(headers => {
        console.log(headers)
        if (headers.accessToken) {
          console.log(headers.accessToken)
          localStorage.setItem('user', JSON.stringify(headers.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios({
      method: 'post',
      url: API_CREAT,
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role
      }
  });
  }
}

export default new AuthService();