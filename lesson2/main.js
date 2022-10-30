"use strict"
class GoodsItem {
    constructor(title, price) {
    this.title = title;
    this.price = price;
    }
    render() {
        return `<div
            class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>
            `;
    }
}
    


class GoodsList { 
    constructor() {
    this.goods = [];
    }
    fetchGoods() {
    this.goods = [
        { title: 'Shirt', price: 150 },
        { title: 'Socks', price: 50 },
        { title: 'Jacket', price: 350 },
        { title: 'Shoes', price: 250 },
        ];
    };
    render() {
    let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
    document.querySelector('.goods-list').innerHTML = listHtml;
    }
    getAllPrice(){ // 2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
        let allPrice = null;
        this.goods.forEach( item => {
            
            allPrice += item.price
            
        });
        return allPrice;
    }
    
}
const list = new GoodsList();
list.fetchGoods();
list.render();
list.getAllPrice(); // 2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.


/*
    1. Добавьте пустые классы для Корзины товаров и Элемента корзины товаров.
       Продумайте,какие методы понадобятся для работы с этими сущностями. 
*/

class productBasket{
    constructor(productList){
        this.productList = productCard;
    }
    renderBasket(){

    }

}
class productCard{
    constructor(price , count , img , title , description , rating){
        this.price = price
        this.count = count
        this.img = img
        this.title = title
        this.description = description
        this.rating = rating
    }
    renderProduct(){

    }
    renderProductList(){
        
    }
}
/*
    


    3. * Некая сеть фастфуда предлагает несколько видов гамбургеров:
        a. Маленький (50 рублей, 20 калорий).
        b. Большой (100 рублей, 40 калорий).
    Гамбургер может быть с одним из нескольких видов начинок (обязательно):
        a. С сыром (+10 рублей, +20 калорий).
        b. С салатом (+20 рублей, +5 калорий).
        c. С картофелем (+15 рублей, +10 калорий).
    Дополнительно гамбургер можно посыпать приправой 
        (+15 рублей, +0 калорий) и полить
        майонезом (+20 рублей, +5 калорий).
    Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно
    использовать примерную архитектуру класса со следующей страницы, но можно использовать
    и свою.
*/
class Humburger{
    constructor(size , filling , seasoning ){
        this.size = size
        this.filling = filling
        this.price = null
        this.calories = null
        this.seasoning  = seasoning 
    }
    
    
    
    getSize(){
        const sizeList = [
            {size:"small" , price:50 , calories: 20 },
            {size:"big" , price:100 , calories: 40 },
        ]
        sizeList.forEach(elem =>{
            if(elem.size == this.size){
                this.price += elem.price
                this.calories += elem.calories
            }
        })
    }
    getFilling(){
        const fillingList = [
            {name:"cheese" , price:10 , calories: 20 },
            {name:"salad" , price:20 , calories: 5 },
            {name:"potato" , price:15 , calories: 10 },
        ]
        if(this.filling == undefined){
            console.log("error , need filling");
        }else{
            fillingList.forEach(elem=>{
                if(elem.name == this.filling){
                    this.price += elem.price
                    this.calories += elem.calories
                }
            })
        }
        
    }
    getSeasoning(){
        const seasoningList = [
            {name:"mayonnaise" , price:20 , calories: 5 },
            {name:"seasoning" , price:15 , calories: 0 },
        ]
        seasoningList.forEach(elem=>{
            if(elem.name == this.seasoning){
                this.price += elem.price
                this.calories += elem.calories
            }
        })
    }

}

const burger = new Humburger("big" , "salad")
burger.getSize()
burger.getFilling()
burger.getSeasoning()

console.log(burger.price , burger.calories);