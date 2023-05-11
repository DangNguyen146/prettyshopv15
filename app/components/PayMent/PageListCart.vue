<template>
    <Page>
        <StackLayout width="100%" height="100%">
            <ScrollView>
                <StackLayout>
                    <GridLayout rows="*, *, auto">
                        <StackLayout row="0">
                            <GridLayout v-for="cartItem of cartItems" :key="cartItem.product.id" columns="auto, *"
                                class="product-box" borderWidth="1" borderColor="#eee" borderRadius="5" padding="10"
                                @tap="goToDetails">
                                <StackLayout col="0" class="product-image" marginRight="5" width="40%">
                                    <Image :src="cartItem.product.imageURL" stretch="aspectFit" />
                                </StackLayout>
                                <StackLayout col="1" class="product-details" width="50%">
                                    <Label :text="cartItem.product.name" fontSize="subtitle" fontWeight="bold"
                                        marginBottom="5" />
                                    <Label :text="'$' + cartItem.product.price" fontSize="subtitle" color="red"
                                        marginBottom="5" />
                                    <Label :text="cartItem.product.description" />
                                    <Label :text="'Quantity: ' + cartItem.quantity" fontSize="subtitle" fontWeight="bold"
                                        marginBottom="5" />
                                    <Button text="Delete"
                                        style=" backgroundColor: rgb(255, 0, 0);  color: white;  fontSize: 16px;  fontWeight: bold;  padding: 10px; border: none; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25); cursor: pointer;"
                                        @tap="delteCart(cartItem.id)" />
                                </StackLayout>
                            </GridLayout>
                        </StackLayout>
                        <StackLayout row="1" backgroundColor="#b3cde0" borderRadius="10" shadowColor="#000000"
                            shadowOffsetHeight="5" shadowOpacity="0.5">

                            <Label :text="'Total : $ ' + totalcost.toFixed(2)" fontWeight="bold" marginBottom="5" />
                            <Button text="Confirm Order"
                                style=" backgroundColor: rgb(255, 0, 0);  color: white;  fontSize: 16px;  fontWeight: bold;  padding: 10px; border: none; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25); cursor: pointer;"
                                @tap="goPayMentPay" />
                        </StackLayout>
                    </GridLayout>
                </StackLayout>
            </ScrollView>
        </StackLayout>
    </Page>
</template>
<script>
import { apiUrl } from '~/config/config';
import { getString } from "@nativescript/core/application-settings";
import MakePayMent from "./MakePayMent.vue";





export default {
    data() {
        return {
            cartItems: [],
            totalcost: 0,
        };
    },
    methods: {
        // fetch all the items in cart
        async listCartItems(token) {
            try {
                const response = await fetch(`${apiUrl}cart/?token=${token}`, {
                    method: "GET",
                });
                if (response) {
                    const data = await response.json();
                    // alert(JSON.stringify(data));
                    // store cartitems and total price in two variables
                    this.cartItems = data.cartItems;
                    this.totalcost = data.totalCost;
                    const cartCount = Object.keys(data.cartItems).length;
                    this.$store.commit('incrementCart', { value: 0, callapi: cartCount });
                }
            }
            catch (error) {
                alert("Error in fetching data", error);
            }
        },
        goPayMentPay() {
            try{
                this.$navigateTo(MakePayMent)
            }
            catch(e)
            {
                alert(e)
            }
        },
        async delteCart(itemId) {
            const response = await fetch(`${apiUrl}cart/delete/${itemId}?token=${getString('token')}`, {
                method: "DELETE",
            });
            if (response) {
                const token = getString('token');
                this.listCartItems(token);
            }
        }
    },
    mounted() {
        const token = getString('token');
        if (token)
            this.listCartItems(token);
    },
}
</script>