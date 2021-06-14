import axios from 'axios';

const API_LOG = 'fradetaxel.fr:4000/auth/login';
const API_CREAT = 'fradetaxel.fr:3000/login/create';

class AuthService {
  login(user) {
    return axios
      .post(API_LOG, {
        email: user.email,
        password: user.password,
        role: user.role
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_CREAT, {
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role
    });
  }
}

export default new AuthService();