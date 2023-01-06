import { createStore } from 'vuex';
import products from './modules/products/products.js';
import cart from './modules/cart/cart.js';

const store = createStore({
  modules: {
    cart,
    products,
  },
});

export default store;
