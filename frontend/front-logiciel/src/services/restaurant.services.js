import axios from "axios";

const API_URL = "http://fradetaxel.fr:3456/restaurant";

class RestaurantService {
  getAllRestaurants() {
    return axios.get(API_URL + "all");
  }
}

export default new RestaurantService();
