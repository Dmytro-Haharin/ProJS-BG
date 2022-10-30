const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

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
    makeGETRequest(url , callback) {
      var xhr;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
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
    addProduct(e){
        this.goods.forEach(elem =>{
            
            if(elem.product_name == e.target.closest(".goods-item").querySelector("h3").textContent){
                this.baskets.push(elem)
            }
        })
    },
      
  },
  
  mounted(){
    this.makeGETRequest(`${API_URL}/catalogData.json` , (goods) => {
      this.goods = JSON.parse(goods);
      this.filteredGoods = JSON.parse(goods);
      // cb();
    })
  },
  

});




/*
    1. Вынести поиск в отдельный компонент. x

    2. Вынести корзину в отдельный компонент.

    3. * Создать компонент с сообщением об ошибке. Компонент должен отображаться, когда не
    удаётся выполнить запрос к серверу

*/

