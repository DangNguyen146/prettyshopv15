<template>
    <AbsoluteLayout>
        <StackLayout width="100%" height="100%">
            <ScrollView>
                <StackLayout>
                    <GridLayout rows="*, *, auto">
                        <StackLayout row="0">
                            <SliderCarousel :myData="myData" />
                        </StackLayout>

                        <StackLayout row="1" backgroundColor="#b3cde0" borderRadius="10" shadowColor="#000000"
                            shadowOffsetHeight="5" shadowOpacity="0.5">
                            <GridLayout columns="*, auto" alignItems="center">
                                <Label text="Top Category" class="title" fontSize="20" fontWeight="bold" margin="12"
                                    color="#FFFFFF" />
                            </GridLayout>
                            <ScrollView orientation="horizontal" showScrollBarIndicator="true" horizontalAlignment="end">
                                <WrapLayout itemSpacing="12" v-if="categories">
                                    <CategoryBoxHome v-for="category of categories" :key="category.id"
                                        :category="category" />
                                </WrapLayout>
                            </ScrollView>
                            <Label class="info" text="No category!" v-if="!categories" />
                        </StackLayout>

                        <StackLayout row="2" flexDirection="column" orientation="vertical" marginTop="40"> // Add
                            <!-- marginTop
                            property
                            with value of 50 -->
                            <!-- Add the 'v-if' directive to only display the label when there are products -->
                            <Label text="Top Product" class="title" fontSize="20" fontWeight="bold" />
                            <Button text="View product more" class="btn-more" height="40" width="100"
                                horizontalAlignment="right" />
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
                    </GridLayout>
                </StackLayout>
            </ScrollView>
        </StackLayout>
        <StackLayout width="100%" height="100%">
            <DockLayout width="100%" height="100%" stretchLastChild="false">
                <StackLayout text="bottom" dock="bottom" height="60">
                    <CartButton />
                </StackLayout>
            </DockLayout>
        </StackLayout>
    </AbsoluteLayout>
</template>
<script>
import { getString } from "@nativescript/core/application-settings";
import { apiUrl } from "~/config/config";

import CategoryBoxHome from "../CategoryBoxHome";
import ProductBox from "../ProductBox";
import CartButton from "../CartButton";
import SliderCarousel from "../SliderCarousel";

export default {
    data() {
        return {
            token: null,
            myData: "https://img.freepik.com/premium-vector/modern-fashion-sale-banner_1340-15693.jpg?size=626&ext=jpg&ga=GA1.2.284055043.1685365997&semt=ais;https://prettyshopfe.vercel.app/img/cover1.f5a6905e.jpg;https://prettyshopfe.vercel.app/img/cover1.f5a6905e.jpg;https://prettyshopfe.vercel.app/img/cover1.f5a6905e.jpg",
            categories: null,
            products: null,
        }
    },
    components: {
        SliderCarousel, CategoryBoxHome, ProductBox, CartButton
    },
    methods: {

        async fetchData() {
            try {
                const response = await fetch(`${apiUrl}category/`, {
                    method: "GET",
                });

                if (response.ok) {
                    const data = await response.json();
                    this.categories = data;
                } else {
                    alert("Error in fetching data");
                }
            } catch (error) {
                console.log("Error in fetching data", error);
            }

            try {
                const response2 = await fetch(`${apiUrl}product/`, {
                    method: "GET",
                });

                if (response2.ok) {
                    const data = await response2.json();
                    this.products = data.content;
                } else {
                    alert("Error in fetching data");
                }
            } catch (error) {
                console.log("Error in fetching data", error);
            }
        },
    },
    mounted() {
        try {
            this.token = getString('token');
            if (!this.token || this.token == "") {
                alert("Please login");
            }
            else {
                this.fetchData();
            }
        } catch (error) {
            alert(error)
        }

    },
}
</script>