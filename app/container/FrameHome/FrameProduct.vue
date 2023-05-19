<template>
    <AbsoluteLayout>
        <StackLayout width="100%" height="100%">
            <ScrollView @scroll="handleScroll">
                <StackLayout>
                    <GridLayout class="page__content">
                        <StackLayout row="2" flexDirection="column" orientation="vertical">
                            with value of 50
                            <!-- Add the 'v-if' directive to only display the label when there are products -->
                            <Label text="Top Product" class="title" fontSize="20" fontWeight="bold" />
                            <ScrollView>
                                <!-- Add the 'v-if' directive to display products only when there are products -->
                                <StackLayout class="card-body" justifyContent="space-around" alignItems="center"
                                    v-if="products && products.length > 0">
                                    <ProductBox v-for="product of products" :key="product.id" :product="product" />
                                </StackLayout>
                                <!-- Display a message when there are no products -->
                                <Label v-else class="info" text="No products available" />
                                <ActivityIndicator class="loading" :busy="isLoading" :visibility="isLoading ? 'visible' : 'collapsed'" />
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
import ProductBox from "../ProductBox";
import CartButton from "../CartButton";

export default {
    data() {
        return {
            products: null,
            currentPage: 1, // trang hiện tại
            pageSize: 10, // số sản phẩm trên mỗi trang
            totalProducts: 0, // tổng số sản phẩm
            isLoading: false
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalProducts / this.pageSize);
        }
    },
    components: {
        ProductBox, CartButton
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch(`${apiUrl}product/?page=${this.currentPage}&size=${this.pageSize}`, {
                    method: "GET",
                });
                // alert(response3)
                if (response) {
                    const data = await response.json();
                    if (this.products) {
                        this.products = this.products.concat(data.content);
                    } else {
                        this.products = data.content;
                    }
                    this.totalProducts = data.totalElements;
                } else {
                    alert("Error in fetching data");
                }
            } catch (error) {
                alert("Error in fetching data", error);
            }
            finally {
                this.isLoading = false;
            }
        },
        handleScroll(e) {
            const scrollView = e.object;
            const isAtBottom = scrollView.scrollableHeight - scrollView.verticalOffset < 100;
            // alert(isAtBottom)
            if (isAtBottom && this.currentPage < this.totalPages && !this.isLoading) {
                this.currentPage++;
                this.isLoading = true;

                this.fetchData();
            }
        },
    },
    mounted() {
        try {
            this.token = getString('token');
            if (!this.token || this.token == "") {
                // alert("Please login");
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
<style>
.loading{
    width: 100;
    
}
</style>