import axios from 'axios';

const API_URL = 'https://cesi.elective.fradetaxel.fr/api/order';

class OrderService {
    createOrder(content, prix, id){
      return axios.post(API_URL + '/create', {
        content: content,
        prix: prix,
        id_restaurant: id
      },{withCredentials: true})
      .then(res => {return res.data});
    }

    getOrder(){
        return axios.get(API_URL + '/getAll',{withCredentials: true})
        .then(res => {return res.data});
    }

    deleteOrder(id){
        return axios.delete(API_URL + '/delete/' + id ,{withCredentials: true})
        .then(res => {return res.data});
    }

    payOrder(id){
      return axios.put(API_URL + '/paid/' + id ,{withCredentials: true})
      .then(res => {return res.data});
  }

}

export default new OrderService();