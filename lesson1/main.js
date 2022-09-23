
    


const goods = {
    items : [
        { title: 'Shirt', price: 150 },
        { title: 'Socks', price: 50 },
        { title: 'Jacket', price: 350 },
        { title: 'Shoes', price: 250 },
    ],
    renderGoodsItem(title, price){
        return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
    },
    renderGoodsList(list){
        let goodsList = list.map(item => this.renderGoodsItem(item.title, item.price));
        document.querySelector('.goods-list').innerHTML = goodsList.join("");
    },
    init(){
       
        if(this.items.length == 0){
            this.items.push({title : "ggggg" , price : 50000000000000})
        }
        this.renderGoodsList(goods.items)
    },
}
goods.init()
/*
1. Добавьте стили для верхнего меню, 
                            товара, 
                    списка товаров 
            и кнопки вызова корзины.

2. Добавьте значения по умолчанию для аргументов функции. Как можно упростить или
    сократить запись функций?

3. * Сейчас после каждого то
    из-за перевода елемента в строку затем обратно , для устранения используют join("")
*/