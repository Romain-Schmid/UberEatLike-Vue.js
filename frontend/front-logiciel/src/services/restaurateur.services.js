import axios from "axios";

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

  getMine() {
    return axios.get(API_URL + "getMine", { withCredentials: true });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { withCredentials: true });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { withCredentials: true });
  }
}

export default new RestorerService();
