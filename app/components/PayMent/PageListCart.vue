<template>
    <Page>
        <StackLayout width="100%" height="100%">
            <ScrollView>
                <StackLayout>
                    <GridLayout rows="*, *, auto">
                        <StackLayout row="0">
                            <GridLayout v-for="cartItem of cartItems" :key="cartItem.product.id"
                                :class="{ 'product-box': true, 'selected': cartItem.isSelected }" columns="auto, *"
                                borderWidth="1" borderColor="#eee" borderRadius="5" padding="10"
                                @tap="toggleSelection(cartItem)">

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
                        <StackLayout row="2" backgroundColor="#b3cde0" borderRadius="10" shadowColor="#000000"
                            shadowOffsetHeight="5" shadowOpacity="0.5" v-if="cartItemsSelect.length > 0">
                            <Label :text="'Selected ' + cartItemsSelect.length + ' items'" fontWeight="bold"
                                marginBottom="5" />
                            <Button text="Delete selected items"
                                style=" backgroundColor: rgb(255, 0, 0);  color: white;  fontSize: 16px;  fontWeight: bold;  padding: 10px; border: none; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25); cursor: pointer;"
                                @tap="deleteSelectedItems" />
                        </StackLayout>
                    </GridLayout>
                </StackLayout>
            </ScrollView>
        </StackLayout>
    </Page>
</template>

<script>
import { apiUrl } from '~/config/config';
import MakePayMent from "./MakePayMent.vue";
import { setString, getString } from "@nativescript/core/application-settings";

export default {
    data() {
        return {
            cartItems: [],
            totalcost: 0,
            cartItemsSelect: [], // mảng các cartItem được chọn
            checkoutBodyArray: []
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

        toggleSelection(cartItem) {
            cartItem.isSelected = !cartItem.isSelected; // đảo ngược trạng thái của thuộc tính isSelected
            if (cartItem.isSelected) {
                this.cartItemsSelect.push(cartItem); // thêm cartItem vào mảng cartItemsSelect
            } else {
                this.cartItemsSelect = this.cartItemsSelect.filter(item => item.id !== cartItem.id); // xóa cartItem khỏi mảng cartItemsSelect
            }
        },
        deleteSelectedItems() {
            for (let i = 0; i < this.cartItemsSelect.length; i++) {
                const cartItem = this.cartItemsSelect[i];
                this.deleteFromCart(cartItem.id);
            }
            this.cartItemsSelect = []; // xóa toàn bộ mục đã chọn
        },
        async deleteFromCart(itemId) {
            const response = await fetch(`${apiUrl}cart/delete/${itemId}?token=${getString('token')}`, {
                method: "DELETE",
            });
            if (response) {
                const token = getString('token');
                this.listCartItems(token);
            }
        },








        async getAllItems() {



        },

        async getSection() {

        },




        async goPayMentPay() {
            alert(JSON.stringify(this.cartItemsSelect))
            try {
                let products = this.cartItemsSelect;
                let len = Object.keys(products).length;
                for (let i = 0; i < len; i++)
                    this.checkoutBodyArray.push({
                        imageUrl: products[i].product.imageURL,
                        productName: products[i].product.name,
                        quantity: products[i].quantity,
                        price: products[i].product.price,
                        productId: products[i].product.id,
                        userId: products[i].userId,
                    });
                try {
                    try {
                        const response = await fetch(`${apiUrl}order/create-checkout-session/mobile`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(this.checkoutBodyArray)
                        });
                        if (response) {
                            const data = await response.json();
                            setString('sessionId', data.sessionId);
                            // alert(data.sessionId);
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
                } catch (error) {
                    alert(error);
                }
            }
            catch (e) {
                alert(e)
            }
            this.$navigateTo(MakePayMent)
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

<style>
.product-box.selected {
    background-color: rgba(255, 255, 0, 0.2);
}
</style>