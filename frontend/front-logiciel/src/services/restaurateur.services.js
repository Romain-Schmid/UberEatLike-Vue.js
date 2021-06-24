import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://cesi.elective.fradetaxel.fr/api/restaurant/";

class RestorerService {
  postNewRestorer(form) {
    return axios
      .post(
        API_URL + "create",
        {
          titre: form.titre,
          description: form.description,
          type: form.type,
          rue: form.rue,
          ville: form.ville,
          pays: form.pays,
          note: form.note,
        },
        { withCredentials: true }
      )
      .then((response) => {
        return response.data;
      });
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new RestorerService();
