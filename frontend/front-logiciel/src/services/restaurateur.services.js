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
          code_postale: form.code_postale,
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
          code_postale: form.code_postale,
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
          specific: form.specific,
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
          specific: form.specific,
        },
        { withCredentials: true }
      )
      .then((response) => {
        return response.data;
      });
  }

  delArticle(id, id2) {
    return axios
      .delete(API_URL + id + "/article/" + id2, { withCredentials: true })
      .then((response) => {
        return response.data;
      });
  }

  delRestorer(id) {
    return axios
      .delete(API_URL + id, { withCredentials: true })
      .then((response) => {
        return response.data;
      });
  }

  postMenu(form, feed, id) {
    return axios
      .post(
        API_URL + id + "/menu",
        {
          titre: form.titre,
          description: form.description,
          prix: form.prix,
          article: feed,
        },
        { withCredentials: true }
      )
      .then((response) => {
        return response.data;
      });
  }

  putMenu(form, feed, id, id2) {
    return axios
      .put(
        API_URL + id + "/menu/" + id2,
        {
          titre: form.titre,
          description: form.description,
          prix: form.prix,
          article: feed,
        },
        { withCredentials: true }
      )
      .then((response) => {
        return response.data;
      });
  }

  getOneMenu(id, id2) {
    return axios
      .get(API_URL + id + "/menu/" + id2, { withCredentials: true })
      .then((res) => {
        return res.data;
      });
  }

  delMenu(id, id2) {
    return axios
      .delete(API_URL + id + "/menu/" + id2, { withCredentials: true })
      .then((response) => {
        return response.data;
      });
  }
}

export default new RestorerService();
