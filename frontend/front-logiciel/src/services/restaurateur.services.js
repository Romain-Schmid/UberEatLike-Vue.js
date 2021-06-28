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

  putUpdateRestorer(form, id) {
    return axios
      .put(
        API_URL + id,
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
    return axios
      .get(API_URL + "getMine", { withCredentials: true })
      .then((res) => {
        return res.data;
      });
  }

  getMenus(id) {
    return axios
      .get(API_URL + id + "/menu", { withCredentials: true })
      .then((res) => {
        return res.data;
      });
  }

  getRestaurant(id) {
    return axios
      .get(API_URL + "get/" + id, { withCredentials: true })
      .then((res) => {
        return res.data;
      });
  }

  getOneArticles(id, id2) {
    return axios
      .get(API_URL + id + "/article/" + id2, { withCredentials: true })
      .then((res) => {
        return res.data;
      });
  }

  getArticles(id) {
    return axios
      .get(API_URL + id + "/article", { withCredentials: true })
      .then((res) => {
        return res.data;
      });
  }

  postArticle(form, id) {
    return axios
      .post(
        API_URL + id + "/article",
        {
          titre: form.titre,
          description: form.description,
          type: form.type,
          prix: form.prix,
          picture: form.picture,
        },
        { withCredentials: true }
      )
      .then((response) => {
        return response.data;
      });
  }

  putArticle(form, id, id2) {
    return axios
      .put(
        API_URL + id + "/article/" + id2,
        {
          titre: form.titre,
          description: form.description,
          type: form.type,
          prix: form.prix,
          picture: form.picture,
        },
        { withCredentials: true }
      )
      .then((response) => {
        return response.data;
      });
  }
}

export default new RestorerService();
