import axios from 'axios';

const API_URL = 'https://cesi.elective.fradetaxel.fr/api/restaurant';

class RestaurantService {

    getAllRestaurants(){
      return axios.get(API_URL + '/getAll', {withCredentials: true})
      .then(res => {return res.data});
    }

    getOneRestaurant(id){
      return axios.get(API_URL + "/get/" + id, {withCredentials: true})
      .then(res => {return res.data})
    }

    getMenus(id){
      return axios.get(API_URL + "/" + id + "/menu", {withCredentials: true})
      .then(res => {return res.data})
    }

    getArticles(id){
      return axios.get(API_URL + "/" + id + "/article", {withCredentials: true})
      .then(res => {return res.data})
    }
}

export default new RestaurantService();