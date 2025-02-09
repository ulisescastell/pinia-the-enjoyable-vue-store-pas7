<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "@/stores/ProductStore";
import { useCartStore } from "@/stores/CartStore";

const productStore = useProductStore();
const cartStore = useCartStore(); 

cartStore.$onAction(({ name, args, after, onError }) => {
  if (name === "addItems") {
    after(() => {
      console.log(`Se agregaron ${args[0]} items`);
    });
    onError((error) => {
      console.log("Hello error:", error.message);
    });
  }
});


const addToCart = (count, product) => {
  count = parseInt(count);
  cartStore.$patch((state) => {
    for (let index = 0; index < count; index++) {
      state.items.push(product);
    }
  });
};

productStore.fill();
</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton class="ml-2" @click="cartStore.redo">Redo</AppButton>
    </div>

    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="addToCart($event, product)"
      />
    </ul>
  </div>
</template>
