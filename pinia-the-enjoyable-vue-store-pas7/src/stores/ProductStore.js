
import { defineStore } from "pinia";
export const useProductStore = defineStore("ProductStore", {
  state: () => {
    return {
      products: [],
    };
  },
  actions: {
    async fill() {
      this.products = (await import("@/data/products.json")).default;
    },
  },
  getters: {
    count: (state) =>{
      return state.items.length;
    },
    isEmpty: (state) => {
      return state.count === 0;
    },
  }
});
