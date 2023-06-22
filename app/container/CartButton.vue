<template>
  <StackLayout v-if="countCart > 0">
    <Button
      :text="countCart + ' 🛒 '"
      @tap="goToViewCart"
      class="cart-button"
      style="
        background-color: BLACK;

        color: white;
        font-size: 25px;
        font-weight: bold;
        padding: 10px;
        border: none;
        border-radius: 20px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
        
      "
    />
  </StackLayout>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getString } from "@nativescript/core/application-settings";
import { apiUrl } from "../config/config";
import PageListCart from "./../components/PayMent/PageListCart.vue";

export default {
  name: "CartButton",
  computed: {
    ...mapState(["countCart"]),
    ...mapGetters(["getCountCart"]),
  },
  methods: {
    goToViewCart() {
      try {
        this.$navigateTo(PageListCart);
      } catch (error) {
        alert(error);
      }
    },
    async fetchData(token) {
      //fetch cart items
      try {
        const response = await fetch(`${apiUrl}cart/?token=${token}`, {
          method: "GET",
        });
        if (response) {
          const data = await response.json();
          const cartCount = Object.keys(data.cartItems).length;
          this.$store.commit("incrementCart", { value: 0, callapi: cartCount });
        } else {
          alert("Error in fetching data");
        }
      } catch (error) {
        alert("Error in fetching data", error);
      }
    },
  },
  mounted() {
    if (getString("token")) {
      this.fetchData(getString("token"));
    }
  },
};
</script>

<style scoped>
.cart-button {
  /* margin: 16; */
  z-index: 999999;
}
</style>
