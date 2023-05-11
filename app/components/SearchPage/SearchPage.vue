<template>
    <Page>
        <ActionBar class="action-bar">
            <NavigationButton visibility="hidden" />
            <GridLayout columns="*, auto, auto">
                <!-- <Label text.decode="&#xf0c9;" @tap="onDrawerButtonTap" class="fas " col="2" /> -->
                <Label class="action-bar-title" text="PrettyShop" colSpan="2" />
                <Label class="fas right-aligned" text.decode="&#xf015;" @tap="onBackHome" />
            </GridLayout>


        </ActionBar>
        <StackLayout width="100%" height="100%">
            <ScrollView>
                <StackLayout>
                    <GridLayout rows="*, *, auto">

                        <StackLayout row="0">
                            <TextField v-model="searchQuery" @input="search" placeholder="Search...">
                            </TextField>
                            <Label v-if="searchResults.length === 0" text="No results found!" fontSize="20"
                                fontWeight="bold" margin="12"></Label>
                        </StackLayout>

                        <StackLayout v-if="searchResults.length != 0" row="1" backgroundColor="#b3cde0" borderRadius="10"
                            shadowColor="#000000" shadowOffsetHeight="5" shadowOpacity="0.5">
                            <GridLayout columns="*, auto" alignItems="center">
                                <Label :text="'Search category for ' + searchQuery" class="title" fontSize="20"
                                    fontWeight="bold" margin="12" color="#FFFFFF" />
                            </GridLayout>
                            <ScrollView orientation="horizontal" showScrollBarIndicator="true" horizontalAlignment="end">
                                <WrapLayout itemSpacing="12" v-if="categories">
                                    <CategoryBoxHome v-for="category of categories" :key="category.id"
                                        :category="category" />
                                </WrapLayout>
                            </ScrollView>
                            <Label class="info" text="No category!" v-if="!categories" />
                        </StackLayout>

                        <StackLayout v-if="searchResults.length != 0" row="2" flexDirection="column" orientation="vertical"
                            marginTop="10">
                            <Label :text="'Search product for ' + searchQuery" class="title" fontSize="20" fontWeight="bold"
                                margin="12" />                         
                            <ScrollView>
                                <StackLayout class="card-body" justifyContent="space-around" alignItems="center"
                                    v-if="products && products.length > 0">
                                    <ProductBox v-for="product of products" :key="product.id" :product="product" />
                                </StackLayout>
                                <Label v-else class="info" text="No products available" />
                            </ScrollView>
                        </StackLayout>

                    </GridLayout>
                </StackLayout>
            </ScrollView>
        </StackLayout>
    </Page>
</template>
  
<script>
import Home from "./../Home.vue";
import CategoryBoxHome from "../../container/CategoryBoxHome.vue";
import ProductBox from "~/container/ProductBox.vue";
import { apiUrl } from "~/config/config";

export default {
    data() {
        return {
            searchQuery: '',
            searchResults: '',
            categories: null,
            products: null,
        }
    },
    components: {
        CategoryBoxHome, ProductBox
    },
    methods: {
        async search() {
            this.searchResults = this.searchQuery;

            try {
                const response = await fetch(`${apiUrl}category/search?categoryName=${this.searchResults}&page=0&size=10`, {
                    method: "GET",
                });

                if (response.ok) {
                    const data = await response.json();
                    this.categories = data.content;
                } else {
                    alert("Error in fetching data");
                }
            } catch (error) {
                alert("Error in fetching data", error);
            }

            try {
                const response2 = await fetch(`${apiUrl}product/search?keyword=${this.searchResults}&page=0&size=10`, {
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

        onBackHome() {
            this.$navigateTo(Home, {
                clearHistory: true
            })
        }
    },
    watch: {
        searchQuery: {
            immediate: true, // This ensures that the loadComments() function is called when the component is first mounted
            handler() {
                this.search();
            }

        },
    }
}
</script>
  
<style scoped lang="scss">
.fas {
    font-size: 24;
    vertical-align: center;
}

.action-bar-title {
    font-size: 20;
    text-align: center;
    vertical-align: center;
}

.right-aligned {
    font-size: 24;
    text-align: left;
    vertical-align: center;
}</style>