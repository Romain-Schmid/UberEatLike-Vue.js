import axios from 'axios';

const API_URL = 'https://cesi.elective.fradetaxel.fr/api/restaurant';

class RestaurantService {

    getAllRestaurants(){
      return axios.get(API_URL + '/getAll', {withCredentials: true});
    }
}

export default new RestaurantService();