

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


/**
  1. Вынести компоненты интернет-магазина в отдельные модули и настроить сборку. X

  2. Найти в официальной документации способ автоматически перезапускать webpack при изменении файла. X
    Изменить скрипт build, добавив туда этот способ.  watch:true,
    Подсказка: при запуске нужно использовать определённый флаг.  npm run build watch

  3. * Написать приложение-калькулятор, используя подход BDD. Приложение должно состоять из
  четырёх методов для сложения, вычитания, умножения и деления. Каждый метод принимает
  на вход два аргумента и выполняет действие. При написании тестов учесть случаи, когда на
  вход подаются не числа, а строки, null или undefined.
 */