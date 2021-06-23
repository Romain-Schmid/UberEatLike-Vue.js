import axios from "axios";

const API_LOG = "https://cesi.elective.fradetaxel.fr/auth/auth/login";
const API_CREAT = "https://cesi.elective.fradetaxel.fr/api/login/create";

class AuthService {
  login(user) {
    return axios
      .post(
        API_LOG,
        {
          email: user.email,
          password: user.password,
          role: user.role,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(user));
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios({
      method: "post",
      url: API_CREAT,
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
      },
    });
  }
}

export default new AuthService();
