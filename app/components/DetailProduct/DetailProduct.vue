<template>
    <Page>
        <!-- <Image :src="product.imageURL" /> -->

        <StackLayout rows="auto, auto, auto, auto, auto" columns="*, auto">
            <StackLayout row="0" col="0" rowSpan="5" class="product-image-container">
                <!-- Add a check for product.imageURL before rendering the image -->
                <Image :src="product.imageURL" stretch="aspectFit" class="product-image" />

            </StackLayout>
            <Label row="0" col="1" class="product-name" :text="product.name" fontSize="title" fontWeight="bold" />
            <Label row="1" col="1" class="product-description" :text="product.description" fontSize="subtitle" />
            <Label row="2" col="1" class="product-price" :text="'$' + product.price" fontSize="subtitle" />
            <StackLayout row="3" col="1" class="product-quantity-container" orientation="horizontal"
                verticalAlignment="center">
                <Label class="product-quantity-label" text="Số lượng: " fontSize="subtitle" />
                <Label class="product-quantity" :text="quantity.toString()" fontSize="subtitle" />
                <Button class="product-quantity-increase" text="+" @tap="increaseQuantity" />
                <Button class="product-quantity-decrease" text="-" @tap="decreaseQuantity" />
            </StackLayout>
            <Button row="4" col="1" text="Add cart" class="add-to-cart-button" @tap="btnAddCart(product.id, quantity)" />
            <Button row="5" col="1" text="Add to wishlist" class="add-to-cart-button" />
            <StackLayout row="6" col="1" orientation="horizontal">
                <Label class="comment-product-name" text="Comment" fontSize="title" fontWeight="bold" />
                <!-- <CommentBox :id="product.id" :product="product" :productId="product.id" /> -->
            </StackLayout>
        </StackLayout>
    </Page>
</template>


<script>
// import CommentBox from "./CommentBox.vue"
import { getString } from "@nativescript/core/application-settings";
import { apiUrl } from "../../config/config"

export default {
    props: ["id"],
    name: "DetailProduct",
    components: {
        // CommentBox 
    },
    data() {
        return {
            product: {},
            quantity: 1
        };
    },
    methods: {
        async fetchData5() {
            try {
                const response = await fetch(`${apiUrl}product/getproduct/${this.id}`, {
                    method: "GET",
                });
                if (response) {
                    const data = await response.json();
                    this.product = data;
                }
                else {
                    alert("Error in fetching data");
                }
            }
            catch (error) {
                alert("Error in fetching data", error);
            }
        },
        increaseQuantity() {
            if (this.quantity < 10) {
                // Fix the issue by assigning the new quantity to the data property
                this.quantity = this.quantity + 1;
            }
        },
        decreaseQuantity() {
            if (this.quantity > 1) {
                // Fix the issue by assigning the new quantity to the data property
                this.quantity = this.quantity - 1;
            }
        },
        async btnAddCart(productId, quantity) {
            try {
                const response = await fetch(`${apiUrl}cart/add?token=${getString('token')}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        productId: productId,
                        quantity: quantity,
                    })
                });

                if (response) {
                    const data = await response.json();
                    alert('Add cart success, please back home to pay');
                } else {
                    alert('error');
                }
            } catch (error) {
                console.error(error);
                if (error.message === 'Failed to fetch') {
                    alert('Unable to connect to server. Please check your internet connection and try again.');
                } else {
                    alert('An error occurred. Please try again later.');
                }
            }
        }
    },
    mounted() {
        try {
            const token = getString('token');
            if (token)
                this.fetchData5();
        } catch (error) {
            alert(error);
        }
    },
};
</script>




<style scoped>
.product-image-container {
    width: 100%;
    height: 300;
    overflow: hidden;
    background-color: #00e5f6;
}

.product-image {
    width: 500;
}

.product-name {
    margin-top: 20;
    text-align: center;
    font-weight: 700;
    font-size: 2rem;
}

.product-description {
    margin: 0 10;
}

.product-price {
    margin-top: 10;
}

.product-quantity-container {
    margin: 0 20;
}

.product-quantity-label {
    margin-right: 10;
}

.product-quantity {
    margin: 0 10;
}

.add-to-cart-button {
    width: 100%;
    height: 50;
    background-color: rgb(255, 0, 0);
    color: white;
    font-weight: semibold;
}
</style>