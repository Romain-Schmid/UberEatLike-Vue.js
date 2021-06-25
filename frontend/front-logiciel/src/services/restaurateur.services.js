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
    return axios.get(API_URL + "getMine", { withCredentials: true })
    .then(res => {return res.data});
  }

  getMenus(id){
    return axios.get(API_URL +  id + "/menu", {withCredentials: true})
    .then(res => {return res.data})
  }

  getArticles(id){
    return axios.get(API_URL +  id + "/article", {withCredentials: true})
    .then(res => {return res.data})
  }
}

export default new RestorerService();
