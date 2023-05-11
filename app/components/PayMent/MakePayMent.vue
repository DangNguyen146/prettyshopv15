<template>
    <Page>
        <ActionBar class="action-bar">
            <NavigationButton visibility="hidden" />
            <GridLayout columns="50, *">
                <Label class="action-bar-title" text="Home" colSpan="2" />

                <Label class="fas" text.decode="&#xf00c;" @tap="onBackHome" />
            </GridLayout>
        </ActionBar>
        <StackLayout>
            <Button class="submit-button" text="GetSession" @tap="getSection" />
        </StackLayout>

    </Page>
</template>

<script>
import Home from "../Home.vue";
import { setString, getString } from "@nativescript/core/application-settings";
import { apiUrl } from "~/config/config";
import WebPayMent from './WebPayMent';
import PaySuccess from './PaySuccess';

export default {
    data() {
        return {
            url: "https://prettyshopfemobilev2.vercel.app/checkoutmobile/" + getString('token'),
            checkoutBodyArray: []
        }
    },
    methods: {
        onBackHome() {
            this.$navigateTo(PaySuccess);
        },
        async getAllItems() {
            try {
                const response = await fetch(`${apiUrl}cart/?token=${getString('token')}`, {
                    method: "GET",
                });
                if (response) {
                    const data = await response.json();

                    let products = data;
                    let len = Object.keys(products.cartItems).length;
                    for (let i = 0; i < len; i++)
                        this.checkoutBodyArray.push({
                            imageUrl: products.cartItems[i].product.imageURL,
                            productName: products.cartItems[i].product.name,
                            quantity: products.cartItems[i].quantity,
                            price: products.cartItems[i].product.price,
                            productId: products.cartItems[i].product.id,
                            userId: products.cartItems[i].userId,
                        });
                }
                else {
                    alert("error");
                }
            }
            catch (error) {
                alert(error);
                if (error.message === "Failed to fetch") {
                    alert("Unable to connect to server. Please check your internet connection and try again.");
                }
                else {
                    alert("An error occurred. Please try again later.");
                }
            }

        },
        async getSection() {
            try {
                const response = await fetch(`${apiUrl}order/create-checkout-session`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.checkoutBodyArray)
                });
                if (response) {
                    const data = await response.json();
                    alert(data.sessionId);
                    setString('sessionId', data.sessionId);
                    alert(getString('sessionId'));
                    this.$navigateTo(WebPayMent);
                }
                else {
                    alert("error");
                }
            }
            catch (error) {
                alert(error);
                if (error.message === "Failed to fetch") {
                    alert("Unable to connect to server. Please check your internet connection and try again.");
                }
                else {
                    alert("An error occurred. Please try again later.");
                }
            }


        }
    },
    mounted() {
        this.getAllItems();
    }
}
</script>