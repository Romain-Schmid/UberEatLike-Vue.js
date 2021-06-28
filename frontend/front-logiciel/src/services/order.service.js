import axios from 'axios';

const API_URL = 'https://cesi.elective.fradetaxel.fr/api/order';

class OrderService {
    createOrder(){
      return axios.post(API_URL + '/create', {
        content: null,
        prix: null,
        id_restaurant: null
      },{withCredentials: true})
      .then(res => {return res.data});
    }
}

export default new OrderService();