Vue.component('basket-item', {
    props: ['basket'],
    
    template: `
        <div class="basket-item">
            <h3>{{ basket.product_name }}</h3>
            <p>{{ basket.price }}</p>
            <button @click = "$root.delToCart" >удалить</button>
        </div>
    `,
    
});