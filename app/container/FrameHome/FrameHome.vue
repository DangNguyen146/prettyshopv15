<template>
  <AbsoluteLayout>
    <StackLayout width="100%" height="100%" ref="scrollView">
      <ScrollView>
        <StackLayout>
          <GridLayout rows="*, *, auto">
            <StackLayout row="0">
              <SliderCarousel :myData="myData" />
            </StackLayout>

            <StackLayout
              row="1"
              backgroundColor="white"
              borderRadius="10"
              shadowColor="#000000"
              shadowOffsetHeight="5"
              shadowOpacity="0.5"
            >
              <GridLayout columns="*, auto" alignItems="center">
                <Label
                  text="Top Category"
                  class="title"
                  fontSize="20"
                  fontWeight="bold"
                  margin="12"
                  color="black"
                />
              </GridLayout>
              <ScrollView
                orientation="horizontal"
                showScrollBarIndicator="true"
                horizontalAlignment="end"
              >
                <WrapLayout itemSpacing="5" v-if="categories">
                  <CategoryBoxHome
                    v-for="category of categories"
                    :key="category.id"
                    :category="category"
                    marginLeft="10"
                    marginRight="10"
                  />
                </WrapLayout>
              </ScrollView>
              <Label class="info" text="No category!" v-if="!categories" />
            </StackLayout>

            <StackLayout
              row="2"
              flexDirection="column"
              orientation="vertical"
              marginTop="40"
              marginBottom="70"
            >
              <Label
                text="Top Product"
                class="title"
                fontSize="20"
                fontWeight="bold"
                marginLeft="18"
              />

              <ScrollView>
                <!-- Add the 'v-if' directive to display products only when there are products -->
                <StackLayout
                  class="card-body"
                  justifyContent="space-around"
                  alignItems="center"
                  v-if="products && products.length > 0"
                >
                  <ProductBox
                    v-for="product of products"
                    :key="product.id"
                    :product="product"
                  />
                </StackLayout>

                <!-- Display a message when there are no products -->
                <Label v-else class="info" text="No products available" />

                <!-- <Button
                  text="More"
                  @tap="movescreenHoem"
                  class="btn-more"
                  height="40"
                  width="100"
                  horizontalAlignment="right"
                  backgroundColor="black"
                  color="white"
                  borderRadius="5"
                  boxShadow=" 0 8 15 rgba(0, 0, 0, 0.1)"
                /> -->
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
// import PageNew from "./PageNew";
import FrameProduct from "./FrameProduct";

export default {
  data() {
    return {
      token: null,
      myData:
        "https://i.imgur.com/rlkmBhw.jpg;https://img.freepik.com/free-psd/street-fashion-instagram-post-set-psd_174241-160.jpg?w=740&t=st=1687281972~exp=1687282572~hmac=f85fc9e5d467dd6fd6eb6b6fe82349f1cee79fa5602683a0ac7198a83ab2a8b6;https://img.freepik.com/free-vector/fashion-sale-template-concept_52683-33763.jpg?w=740&t=st=1687282455~exp=1687283055~hmac=314551d66b5d2cbf835fabc9ecdf9145ea6e0f33a34f7b365c0a0fb3c7748813;https://img.freepik.com/premium-psd/urban-fashion-style-instagram-template-premium-psd_641545-13.jpg?w=740",
      categories: null,
      products: null,
    };
  },
  components: {
    SliderCarousel,
    CategoryBoxHome,
    ProductBox,
    CartButton,
    FrameProduct,
  },
  methods: {
    movescreenHoem() {
      this.$navigateTo(FrameProduct, {
        clearHistory: true,
      });
    },
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
      this.token = getString("token");
      if (!this.token || this.token == "") {
        alert("Please login");
      } else {
        this.fetchData();
      }
    } catch (error) {
      alert(error);
    }
  },
};
</script>
