import { defineStore, acceptHMRUpdate } from "pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "./AuthUserStore";
import {useLocalStorage} from "@vueuse/core"

export const useCartStore = defineStore("CartStore", {
  state: () => ({
    items: useLocalStorage("CartStore:items",[]),
    historyEnabled: true, 
  }),
  actions: {
    addItems(count, item) {
      count = parseInt(count);
      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },
    setItemCount(item, count) {
      this.items = this.items.filter(i => i.name !== item.name);
      this.addItems(count, item);
    },
    clearItem(name) {
      this.items = this.items.filter(item => item.name !== name);
    },
    checkout() {
      const authUserStore = useAuthUserStore();
      alert(`${authUserStore.username} just bought ${this.count} items at a total of $${this.total}`);
    },
  },
  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.items.length === 0,
    grouped: (state) => groupBy(state.items, item => item.name),
    groupCount: (state) => (name) => state.grouped[name]?.length || 0,
    total: (state) => state.items.reduce((acc, item) => acc + item.price, 0),
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
