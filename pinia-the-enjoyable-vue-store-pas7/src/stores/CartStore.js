import { defineStore, acceptHMRUpdate } from "pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "./AuthUserStore";


export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
    };
  },
  actions: {
    addItems(count, item) {
      count = parseInt(count);
      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },
    setItemCount(item, count) {
      this.items = this.items.filter(i => i.name !== item.name); // Remueve todas las instancias del item
      this.addItems(count, item); 
    },
    clearItem(name) {
      this.items = this.items.filter(item => item.name !== name);
    },
    checkout(){
      const authUserStore=useAuthUserStore();


      alert(`${authUserStore.username} name just bought ${this.count} items at a total of $${this.total}`)
  },

    
  },
  getters: {
    count: (state) =>{
      return state.items.length;
    },
    isEmpty: (state) => {
      return state.count === 0;
    },
    grouped: state => {
      return groupBy(state.items, item => item.name);
    },
    groupCount: (state) => (name) => {
      return state.grouped[name]?.length  || 0
    },
    total: (state) => {
      return state.items.reduce((acc, item) => acc + item.price, 0);
    }
    ,
  }
});
