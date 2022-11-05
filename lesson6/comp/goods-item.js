Vue.component('goods-item', {
    props: ['good'],
    
    template: `
        <div class="goods-item">
            <h3>{{ good.product_name }}</h3>
            <p>{{ good.price }}</p>
            
            <button @click="$root.addProduct">Купить</button>
        </div>
    `,
    
});