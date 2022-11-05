const basketListComp = Vue.component('basket-list', {
    props: ['baskets'],
    
    template: `
        <div class="basket-list ">
            <basket-item v-for="basket in baskets" :basket="basket"></basket-item>
        </div>
    `
});
module.exports={
    basketListComp : basketListComp
}