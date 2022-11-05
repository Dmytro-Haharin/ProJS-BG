const API_URL ='https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const promise = new Promise((reslove , reject)=>{
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
      reslove(xhr.responseText);
    }
  }

  xhr.open('GET', `${API_URL}/catalogData.json`, true);
  xhr.send();
})
function makeGETRequest(url, callback){
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
}

class GoodsItem {
  constructor(product_name, price , id){
    this.product_name = product_name;
    this.price = price;
    this.id = id
  }

  render() {
    return `<div class="goods-item" data-id = ${this.id}>
              <h3>${this.product_name}</h3>
              <p>${this.price}</p>
              <button>купить</button>
            </div>`;
  }


}

class GoodsList {
  constructor(){
    this.goods = [];
  }

  fetchGoods(cb){
    // this.goods = [
    //   { product_name: 'Shirt', price: 150 },
    //   { product_name: 'Socks', price: 50 },
    //   { product_name: 'Jacket', price: 350 },
    //   { product_name: 'Shoes', price: 250 },
    // ];
    promise.then((goods) => {
      this.goods = JSON.parse(goods);
      cb();
    })
  }

  render(){
    let listHtml="";
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price , good.id_product);
      listHtml += goodItem.render();
    })
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}


const list = new GoodsList();
list.fetchGoods(() => {
  list.render();
});

class GoodsBasket{
  constructor(){
    this.basket = [];
  }
  addItemBasket(elem){
    if(!this.basket.includes(elem)){
      this.basket.push(elem)
    }
  }
  getItemBasket(){
    return this.basket
  }
  delItemBasket(elem){
    if(this.basket.includes(elem)){
      this.basket.pop(elem)
    }
  }
}
const basket = new GoodsBasket()

document.querySelector(".goods-list").addEventListener("click" , event=>{
  if(event.target.tagName === "BUTTON"){
    const productId = event.target.closest(".goods-item").dataset.id
    list.goods.forEach(elem=>{
      if (elem.id_product == productId) {
        basket.addItemBasket(elem)
      }
    })
  }
})

/*
1. Переделайте makeGETRequest() так, чтобы она использовала промисы.

2. Добавьте в соответствующие классы методы добавления товара в корзину,
    удаления товара из корзины 
    и получения списка товаров корзины.

3. * Переделайте GoodsList так, чтобы fetchGoods() возвращал промис, а render() вызывался в
обработчике этого промиса.
 */