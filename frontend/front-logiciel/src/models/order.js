export default class Order {

    constructor(){
        this.rest_id = null;
        this.rest_name = null;
        this.orderList = [];
        this.totalPrice = 0;
    }

    getLocalStorage(jsonObject){
        this.rest_id = jsonObject.rest_id;
        this.rest_name = jsonObject.rest_name;
        this.orderList = jsonObject.orderList;
        this.totalPrice = jsonObject.totalPrice;
    }

    setOrder(restaurant_id, name) {
        this.rest_id = restaurant_id;
        this.rest_name = name;
    }

    kevin(id, titre, nb, price){
        var article = this.orderList.find(article => article.id === id)

        if(article != null){
            article.nb += nb;
        }else{
            var feed = {id: id, titre: titre, nb: nb, price: price}
            this.orderList.push(feed)
        }
        this.totalPrice += nb * price;
    }

    deleteArticle(id, nb){
        var article = this.orderList.find(article => article.id === id)
        if(article.nb == nb){
            this.orderList.splice(article)
        }else{
            article.nb -= nb;
        }
        this.totalPrice -= article.nb * article.price;
    }

    test(){
        this.rest_id = null;
        this.rest_name = null;
        this.orderList = [];
        this.totalPrice = 0;
    }

    eraseOrder(){
        this.rest_id = null;
        this.rest_name = null;
        this.orderList = [];
        this.totalPrice = 0;
    }

}