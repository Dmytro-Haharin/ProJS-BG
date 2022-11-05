const searchComp = Vue.component("search",{
    template :`
        <div class="search">
            <input type="text" class="goods-search"/>
            <button class="search-button" type="button" v-on:click = "$root.filterGoods" >Искать</button>
            <button class="cart-button" type="button" @click = "$root.isVisibleCart = !$root.isVisibleCart" >Корзина</button>
        </div>
    `
})

module.exports = {
    searchComp : searchComp
}