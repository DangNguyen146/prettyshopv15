<template>
    <Page>
        <StackLayout row="2" flexDirection="column" orientation="vertical"> // Add marginTop property
            with value of 50
            <!-- Add the 'v-if' directive to only display the label when there are products -->
            <Label :text="categoryName" class="title" fontSize="20" fontWeight="bold" />
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
    </Page>
</template>
  
<script>
import ProductBox from "../../container/ProductBox.vue";
import { getString } from "@nativescript/core/application-settings";

export default {
    name: "ListCategoryProducts",
    components: { ProductBox },
    props: ["id", "categoryName"],
    data() {
        return {
            products: []
        };
    },

    methods: {
        async getProducts() {
            const response = await fetch(`https://prettyshopbe-production.up.railway.app/product/${this.id}?page=0&size=10`, {
                method: 'GET',
            });
            if (response) {
                const data = await response.json();
                this.products = data.content;
            } else {
                alert("Error in fetching data");
            }
        }
    },
    mounted() {
        try {
            const token = getString('token');
            if (token)
                this.getProducts();
        } catch (error) {
            alert(error);
        }
    },
};
</script>
  
  