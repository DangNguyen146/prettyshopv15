<template>
    <StackLayout v-if="countCart > 0">
        <Button :text="'View Cart ' + countCart" @tap="goToViewCart" class="cart-button" style="
        background-color: rgba(9, 173, 255, 0.7); 
        color: white; 
        font-size: 16px; 
        font-weight: bold; 
        padding: 10px;
        border: none;
        border-radius: 5px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
        cursor: pointer;
      " />
    </StackLayout>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getString } from "@nativescript/core/application-settings";
import { apiUrl } from "../config/config"
import PageListCart from "./../components/PayMent/PageListCart.vue";

export default {
    name: "CartButton",
    computed: {
        ...mapState(['countCart']),
        ...mapGetters(['getCountCart']),
    },
    methods: {
        goToViewCart() {
            try {
                this.$navigateTo(PageListCart);
            }
            catch (error) {
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
                    this.$store.commit('incrementCart', { value: 0, callapi: cartCount });
                } else {
                    alert("Error in fetching data");
                }
            } catch (error) {
                alert("Error in fetching data", error);
            }
        },
    },
    mounted() {
        if (getString('token')) {
            this.fetchData(getString('token'));
        }
    }
};
</script>

<style scoped>
.cart-button {
    /* margin: 16; */
    z-index: 999999;
}
</style>
