<template>
    <ScrollView>
        <StackLayout class="container">
            <!--        for each order display -->
            <StackLayout row="2" flexDirection="column" orientation="vertical" marginTop="40"> // Add
                marginTop
                property
                with value of 50
                <!-- Add the 'v-if' directive to only display the label when there are products -->
                <Label text="Your wishList" class="title" fontSize="20" fontWeight="bold" />

                <ScrollView>
                    <!-- Add the 'v-if' directive to display products only when there are products -->
                    <StackLayout class="card-body" justifyContent="space-around" alignItems="center"
                        v-if="products && products.length > 0">
                        <ProductBox v-for="product of products" :key="product.id" :product="product" />
                    </StackLayout>
                    <!-- Display a message when there are no products -->
                    <Label v-else class="info" text="No products available" />
                </ScrollView>
            </StackLayout>
        </StackLayout>
    </ScrollView>
</template>

<script>
import { apiUrl } from '../../../config/config';
import { getString } from "@nativescript/core/application-settings";
import ProductBox from "../../ProductBox.vue";

export default {
    data() {
        return {
            products: [],
        }
    },
    components: {
        ProductBox
    },
    methods: {
        async listWishList(token) {
            try {
                const response = await fetch(`${apiUrl}wishlist/${token}`, {
                    method: "GET",
                });
                if (response) {
                    this.products = await response.json();

                } else {
                    alert("Error in fetching data");
                }
            } catch (error) {
                alert(error);
            }
        }
    },
    mounted() {
        try {
            const token = getString('token');
            if (!token || token == "") {
                alert("Please login");
            }
            else {
                this.listWishList(token);
            }
        } catch (error) {
            alert(error)
        }

    },
}

</script>