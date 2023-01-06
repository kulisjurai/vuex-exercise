const cart = {
  namespaced: true,
  state() {
    return {
      cart: { items: [] },
      supportArray: [],
      producQuantity: [],
    };
  },
  mutations: {
    addToCart(state, payload) {
      if (state.cart.items.findIndex((i) => i.id == payload.id) < 0) {
        state.cart.items.push(payload);
        state.cart.total += payload.price;
      }
      state.supportArray.push(payload);
    },
    removeFromCart(state, payload) {
      let targetIndex = state.cart.items.findIndex((i) => i.id == payload.id);
      state.cart.items.splice(targetIndex, 1);
      state.producQuantity.splice(targetIndex, 1);
      state.supportArray = state.supportArray.filter(
        (item) => item.id !== payload.id
      );
    },

    specificProductQuantity(state, payload) {
      let specificQuantity = state.supportArray.filter(
        (item) => item.id === payload.id
      );
      let targetIndex = state.producQuantity.findIndex(
        (i) => i.id == payload.id
      );
      if (targetIndex > -1) {
        state.producQuantity[targetIndex] = {
          qty: specificQuantity.length,
          id: payload.id,
        };
      } else {
        state.producQuantity.push({
          qty: specificQuantity.length,
          id: payload.id,
        });
      }
    },
  },
  actions: {
    addToCart(context, payload) {
      context.commit('addToCart', payload);
    },
    removeFromCart(context, payload) {
      context.commit('removeFromCart', payload);
    },
    specificProductQuantity(context, payload) {
      context.commit('specificProductQuantity', payload);
    },
  },
  getters: {
    getQuantity: (state) => state.supportArray.length,
    getTotal: (state) => {
      let total = state.supportArray.reduce((acc, cur) => acc + cur.price, 0);
      return total.toFixed(2);
    },
    getProducQuantity: (state) => {
      return state.producQuantity;
    },
    getCartItems: (state) => {
      return state.cart.items;
    },
  },
};

export default cart;
