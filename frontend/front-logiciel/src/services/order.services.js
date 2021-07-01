import axios from "axios";

const API_URL = "https://cesi.elective.fradetaxel.fr/api/order";

class OrderService {
  createOrder(content, prix, id, code_postale, ville, rue) {
    return axios
      .post(
        API_URL + "/create",
        {
          content: content,
          prix: prix,
          id_restaurant: id,
          code_postale: code_postale,
          ville: ville,
          rue: rue,
        },
        { withCredentials: true }
      )
      .then((res) => {
        return res.data;
      });
  }

  getOrder() {
    return axios
      .get(API_URL + "/getAll", { withCredentials: true })
      .then((res) => {
        return res.data;
      });
  }

  deleteOrder(id) {
    return axios
      .delete(API_URL + "/delete/" + id, { withCredentials: true })
      .then((res) => {
        return res.data;
      });
  }

  payOrder(id) {
    return axios
      .put(API_URL + "/paid/" + id, {}, { withCredentials: true })
      .then((res) => {
        return res.data;
      });
  }

  getAllOrderRestaurant(id) {
    return axios
      .get(API_URL + "/" + id + "/getAll", { withCredentials: true })
      .then((res) => {
        return res.data;
      });
  }

  orderIsReady(id, orderId) {
    return axios
      .put(
        API_URL + "/" + id + "/ready/" + orderId,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        return res.data;
      });
  }

  getOrderready() {
    return axios
      .get(API_URL + "/getAll", { withCredentials: true })
      .then((res) => {
        return res.data;
      });
  }

  getMyOrder() {
    return axios
      .get(API_URL + "/getMine", { withCredentials: true })
      .then((res) => {
        return res.data;
      });
  }

  validateOrder(id) {
    return axios
      .put(API_URL + "/valider/" + id, {}, { withCredentials: true })
      .then((res) => {
        return res.data;
      });
  }

  startOrder(id) {
    return axios
      .put(API_URL + "/start/" + id, {}, { withCredentials: true })
      .then((res) => {
        return res.data;
      });
  }

  finishOrder(id) {
    return axios
      .put(API_URL + "/finish/" + id, {}, { withCredentials: true })
      .then((res) => {
        return res.data;
      });
  }
}

export default new OrderService();
