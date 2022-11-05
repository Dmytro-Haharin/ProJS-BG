const API_URL ='http://localhost:3000';

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: "",
    isVisibleCart: false,
    baskets:[],
  },
  methods: {

    makeGETRequest(url, callback){
      var xhr;
      if (window.XMLHttpRequest) {
        // Chrome, Mozilla, Opera, Safari
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        // Internet Explorer
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      }

      xhr.open('GET', url, true);
      xhr.send();
    },


    makePOSTRequest(url, data, callback){
      var xhr;
      if (window.XMLHttpRequest) {
        // Chrome, Mozilla, Opera, Safari
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        // Internet Explorer
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      }

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      xhr.send(data);
    },

    addProduct(e){
      this.goods.forEach(elem =>{
          if(elem.product_name == e.target.closest(".goods-item").querySelector("h3").textContent){
              if(!this.baskets.includes(elem)){
                this.baskets.push(elem)
                this.makePOSTRequest(`${API_URL}/addToCart`, JSON.stringify(elem) , (goods) => {})


                elem.time = new Date()
                elem.status = "adding"
                this.makePOSTRequest(`${API_URL}/status`, JSON.stringify(elem) , (goods) => {})
              }
          }
      })
    },
    filterGoods(){
      this.searchLine = document.querySelector(".goods-search").value.toUpperCase();
  
      if(this.searchLine != 0){
        this.filteredGoods = [];
        this.goods.forEach(elem => {
          if(elem.product_name.toUpperCase().includes(this.searchLine)){
            this.filteredGoods.push(elem)
          }
        });
      }else{
        this.filteredGoods = this.goods;
      }
    },
    delToCart(e){
      this.baskets.forEach(elem =>{
        if(elem.product_name == e.target.closest(".basket-item").querySelector("h3").textContent){
            if(this.baskets.includes(elem)){

              this.makePOSTRequest(`${API_URL}/delToCart`, JSON.stringify(elem) , (goods) => {
                this.makeGETRequest(`${API_URL}/cart`, (goods) => {
                  this.baskets = JSON.parse(goods);
                })
              })

              elem.time = new Date()
              elem.status = "delete"
              this.makePOSTRequest(`${API_URL}/status`, JSON.stringify(elem) , (goods) => {})
            }
        }
      })
    }
  },

  mounted() {
    this.makeGETRequest(`${API_URL}/catalog`, (goods) => { // запрашиваю каталог по адресу localhost:3000/catalog
          this.goods = JSON.parse(goods);
          this.filteredGoods = JSON.parse(goods);
          // cb();
    })
    this.makeGETRequest(`${API_URL}/cart`, (goods) => { // запрашиваю каталог по адресу localhost:3000/catalog
          this.baskets = JSON.parse(goods);
          
          // cb();
    })
  },
  
});




/*
1. Привязать добавление товара в корзину к реальному API.
2. Добавить API для удаления товара из корзины.
3. *Добавить файл stats.json, в котором будет храниться статистика действий пользователя с
    корзиной. В файле должны быть поля с названием действия (добавлено/удалено), названием
    товара, с которым производилось действие и временем, когда оно было совершено.
 */


