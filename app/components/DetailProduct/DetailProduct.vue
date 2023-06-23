<template>
  <Page>
    <AbsoluteLayout >
      <StackLayout width="100%" height="100%">
        <ScrollView marginBottom="70">
          <StackLayout rows="auto, auto, auto, auto, auto" columns="*, auto">
            <StackLayout
              row="0"
              col="0"
              rowSpan="5"
              class="product-image-container"
            >
              <!-- <SliderCarousel :myData="myData"></SliderCarousel> -->
              <Image
                :src="product.imageURL"
                stretch="aspectFit"
                class="product-image"
              />
            </StackLayout>
            <GridLayout
              row="0"
              col="1"
              marginTop="10"
              columns="4*, *"
              rows="auto"
            >
              <Label
                row="0"
                col="0"
                class="product-name"
                :text="product.name"
                marginLeft="20"
                textWrap="true"
              />
              <Label
                row="0"
                col="1"
                class="product-price"
                :text="'$' + product.price"
                fontSize=""
                fontWeight="bold"
                color="red"
                
              />
            </GridLayout>
            <Label
              row="1"
              col="1"
              class="product-description"
              :text="'Purchases:' + product.accessCount"
              marginLeft="20"
              marginRight="20"
              fontSize="20"
            />
            <Label
              class="product-description"
              :text="product.description"
              marginLeft="20"
              marginRight="20"
              fontSize="20"
            />
            <StackLayout
              orientation="horizontal"
              marginLeft="15"
              marginTop="10"
            >
              <Button
                v-for="(size, index) in availableSizes"
                :key="index"
                :class="{
                  selected: size.label === sizeQuality,
                  unselected: size.label !== sizeQuality,
                }"
                :text="size.label"
                @tap="onUpdateSelectedItem(size)"
              />
            </StackLayout>
            <Label
              marginLeft="20"
              fontSize="15"
              v-if="selectedSize"
              :text="'Warehouse: ' + selectedSize.value"
            />
            <StackLayout
              marginLeft="15"
              marginTop="10"
              orientation="horizontal"
            >
              <Button class="blackColor" />
              <Button class="whiteColor" />
              <Button class="greenColor" />
            </StackLayout>
            <StackLayout
              row="3"
              col="1"
              class="product-quantity-container"
              orientation="horizontal"
              verticalAlignment="center"
            >
              <Label
                class="product-quantity-label"
                :text="'Quatity: '"
                fontSize="15"
              />

              <Button
                class="borderless-button"
                fontSize="15"
                text="-"
                paddingLeft="10"
                paddingRight="10"
                @tap="decreaseQuantity"
              />

              <Label :text="quantity.toString()" fontSize="20" />
              <Button
                class="borderless-button"
                fontSize="15"
                text="+"
                @tap="increaseQuantity"
                paddingLeft="10"
                paddingRight="10"
              />
            </StackLayout>

            <WrapLayout row="5" col="1">
              <Button
                width="15%"
                text="♡"
                class="add-to-favorite"
                @tap="btnAddWishList()"
                marginLeft="20"
              />
              <Button
                width="70%"
                margin="10"
                text="Buy now"
                class="add-to-cart-button"
                @tap="btnAddCart(product.id, quantity)"
              />
            </WrapLayout>

            <Label
              row="5"
              col="1"
              class="product-description"
              textWrap="true"
              :text="'Information: \nPattern: Rubber Logo\nSize: M/L/XL\nMaterial: Premium Cotton Tici Spandex.\nParameter:\nSize M: Length 71cm, Width 54cm\nSize L: Length 71cm, Width 54cm\nSize XL: Length 71cm, Width 54cm'"
              marginLeft="20"
              marginRight="20"
              fontSize="20"
            />
            <Image
              :src="'https://pos.nvncdn.net/05016d-25618/ps/20230417_lbkxrVEz.jpg'"
              marginTop="20"
              class="product-image"
            />

            <Label
              row="4"
              text="Product you may like"
              class="title"
              fontSize="20"
              fontWeight="bold"
              marginLeft="20"
              color="#0c0c0c"
              marginTop="20"
            />
            <StackLayout
              row="4"
              borderRadius="10"
              shadowColor="#000000"
              shadowOffsetHeight="5"
              shadowOpacity="0.5"
            >
              <GridLayout columns="*, auto" alignItems="center"> </GridLayout>
              <ScrollView
                orientation="horizontal"
                showScrollBarIndicator="true"
                horizontalAlignment="end"
              >
                <WrapLayout margin-top="10" itemSpacing="12">
                  <StackLayout
                    margin="10"
                    class="item-product"
                    @tap="goToDetails(product3.id)"
                  >
                    <Image
                      :src="product1.imageURL"
                      class="card-img-top"
                      stretch="aspectFit"
                      width="200"
                      height="200"
                      borderRadius="10"
                      border-radius="50"
                    />
                    <Label
                      :text="product1.name"
                      fontSize="15"
                      margin="12"
                      textAlign="center"
                    />
                  </StackLayout>

                  <StackLayout
                    margin="10"
                    class="item-product"
                    @tap="goToDetails(product2.id)"
                  >
                    <Image
                      :src="product2.imageURL"
                      class="card-img-top"
                      stretch="aspectFit"
                      width="200"
                      height="200"
                      border-radius="50"
                    />
                    <Label :text="product2.name" fontSize="15" margin="12" />
                  </StackLayout>
                  <StackLayout
                    margin="10"
                    class="item-product"
                    @tap="goToDetails(product3.id)"
                  >
                    <Image
                      :src="product3.imageURL"
                      class="card-img-top"
                      stretch="aspectFit"
                      width="200"
                      height="200"
                      border-radius="50"
                    />
                    <Label :text="product3.name" fontSize="15" margin="12" />
                  </StackLayout>
                  <StackLayout
                    margin="10"
                    class="item-product"
                    @tap="goToDetails(product4.id)"
                  >
                    <Image
                      :src="product4.imageURL"
                      class="card-img-top"
                      stretch="aspectFit"
                      width="200"
                      height="200"
                      border-radius="50"
                    />
                    <Label :text="product4.name" fontSize="15" margin="12" />
                  </StackLayout>
                </WrapLayout>
              </ScrollView>
            </StackLayout>

            >
            <Label
              class="comment-product-name"
              text=""
              fontSize="title"
              fontWeight="bold"
            />
            <StackLayout rows="auto, auto, auto, auto, auto" columns="*, auto">
              <StackLayout row="0" col="0" rowSpan="5" @loaded="initRating">
                <Label
                  text="Rating:"
                  class="rating-label"
                  marginLeft="20"
                  fontSize="20"
                />
                <WrapLayout
                  itemSpacing="12"
                  class="star-container"
                  marginLeft="30"
                >
                  <Label
                    row="0"
                    col="1"
                    class="star"
                    @tap="selectRating(1)"
                    borderColor="#eee"
                    borderRadius="5"
                    padding="10"
                    fontSize="24"
                    :text="selectedRating >= 1 ? ' ❤ ' : ' 🤍 '"
                  />
                  <Label
                    row="1"
                    col="1"
                    class="star"
                    @tap="selectRating(2)"
                    borderColor="#eee"
                    borderRadius="5"
                    padding="10"
                    fontSize="24"
                    :text="selectedRating >= 2 ? ' ❤ ' : ' 🤍 '"
                  />
                  <Label
                    row="2"
                    col="1"
                    class="star"
                    @tap="selectRating(3)"
                    borderColor="#eee"
                    borderRadius="5"
                    padding="10"
                    fontSize="24"
                    :text="selectedRating >= 3 ? ' ❤ ' : ' 🤍 '"
                  />
                  <Label
                    row="3"
                    col="1"
                    class="star"
                    @tap="selectRating(4)"
                    borderColor="#eee"
                    borderRadius="5"
                    padding="10"
                    fontSize="24"
                    :text="selectedRating >= 4 ? ' ❤ ' : ' 🤍 '"
                  />
                  <Label
                    row="4"
                    col="1"
                    class="star"
                    @tap="selectRating(5)"
                    borderColor="#eee"
                    borderRadius="5"
                    padding="10"
                    fontSize="24"
                    :text="selectedRating >= 5 ? ' ❤ ' : ' 🤍 '"
                  />
                </WrapLayout>
              </StackLayout>
              <StackLayout
                row="1"
                col="1"
                class="comment-container"
                @loaded="initComment"
              >
                <Label
                  text="Comment:"
                  class="comment-label"
                  marginLeft="20"
                  marginTop="30"
                  fontSize="20"
                />
                <TextField
                  class="comment-field"
                  hint="Type your comment here"
                  returnKeyType="done"
                  :text="commentINput"
                  @textChange="onCommentChange"
                  marginLeft="20"
                />
              </StackLayout>
              <Button
                row="2"
                col="1"
                text="Submit"
                @tap="addComment"
                marginTop="20"
                class="add-to-cart-button"
                color="white"
              />
              <ActivityIndicator
                row="3"
                col="1"
                class="activity-indicator"
                :busy="isLoading"
              />
            </StackLayout>
            <StackLayout row="7" col="1" orientation="horizontal">
              <StackLayout width="100%" height="100%">
                <GridLayout rows="*, *, auto">
                  <StackLayout
                    row="2"
                    flexDirection="column"
                    orientation="vertical"
                    marginTop="40"
                  >
                    <ScrollView>
                      <StackLayout
                        class="card-body"
                        justifyContent="space-around"
                        alignItems="center"
                        v-if="comments && comments.length > 0"
                      >
                        <CommentBox
                          v-for="comment of comments"
                          :key="comment.id"
                          :comment="comment"
                          :product="product"
                          :userID="userID"
                        />
                      </StackLayout>

                      <Label v-else class="info" text="No comment available" />
                    </ScrollView>
                  </StackLayout>
                </GridLayout>
              </StackLayout>
            </StackLayout>
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
  </Page>
</template>

<script>
import { getString } from "@nativescript/core/application-settings";
import { apiUrl } from "../../config/config";
import ListCommentBox from "./../../container/ListCommentBox";
import CommentBox from "./../../container/CommentBox";
import Dropdown from "~/container/Dropdown";
import CartButton from "~/container/CartButton.vue";
import ProductBoxHome from "./ProductBoxHome";
import DetailProduct from "./DetailProduct.vue";
import SliderCarousel from "~/container/SliderCarousel.vue";

export default {
  props: ["id"],
  name: "DetailProduct",
  components: {
    ListCommentBox,
    CommentBox,
    Dropdown,
    ProductBoxHome,
    SliderCarousel,
    CartButton,
  },

  data() {
    return {
      product: {},
      quantity: 1,
      selectedRating: 0,
      commentINput: "",
      comments: [],
      newcomment: null,
      userID: null,
      availableSizes: [],
      tags: [],
      size: null,
      quantityBySizes: {},
      sizeQuality: "",
      products: null,
      product1: {
        id: null,
        imageURL: null,
        name: null,
      },
      product2: {
        id: null,
        imageURL: null,
        name: null,
      },
      product3: {
        id: null,
        imageURL: null,
        name: null,
      },
      product4: {
        id: null,
        imageURL: null,
        name: null,
      },
      listTag: [],
      selectedSize: null,
    };
  },
  methods: {
    async fetchUser(token) {
      try {
        const response = await fetch(
          `${apiUrl}user/getprofile?token=${token}`,
          {
            method: "GET",
          }
        );

        if (response) {
          const data = await response.json();
          this.userID = data.id;
        } else {
          alert("error");
        }
      } catch (error) {
        console.error(error);
        if (error.message === "Failed to fetch") {
          alert(
            "Unable to connect to server. Please check your internet connection and try again."
          );
        } else {
          alert("An error occurred. Please try again later.");
        }
      }
    },
    handleTagPress(id) {
      this.$navigateTo(SearchPage, {
        id: id,
      });
    },
    async fetchData5() {
      try {
        const response = await fetch(`${apiUrl}product/getproduct/${this.id}`, {
          method: "GET",
        });
        if (response) {
          const data = await response.json();
          this.product = data;

          this.availableSizes = data.size
            .map((size, index) => {
              return {
                label: size,
                value: data.quantityBySizes[index],
              };
            })
            .filter((size) => size.value !== "0");

          console.log(this.availableSizes.toString());
        } else {
          alert("Error in fetching data");
        }
      } catch (error) {
        alert("Error in fetching data", error);
      }
    },
    async fetchData6() {
      try {
        const response1 = await fetch(`${apiUrl}tag/random`, {
          method: "GET",
        });
        if (response1) {
          const data1 = await response1.json();
          this.product1.imageURL = data1.product.imageURL;
          this.product1.id = data1.product.id;
          this.product1.name = data1.product.name;
        } else {
          alert("Error in fetching data");
        }
      } catch (error) {
        alert("Error in fetching data", error);
      }
    },
    async fetchData8() {
      try {
        const response2 = await fetch(`${apiUrl}color/random`, {
          method: "GET",
        });
        if (response2) {
          const data2 = await response2.json();
          this.product2.imageURL = data2.product.imageURL;
          this.product2.id = data2.product.id;
          this.product2.name = data2.product.name;
        } else {
          alert("Error in fetching data");
        }
      } catch (error) {
        alert("Error in fetching data", error);
      }
    },
    async fetchData9() {
      try {
        const response1 = await fetch(`${apiUrl}tag/random`, {
          method: "GET",
        });
        if (response1) {
          const data1 = await response1.json();
          this.product3.imageURL = data1.product.imageURL;
          this.product3.id = data1.product.id;
          this.product3.name = data1.product.name;
        } else {
          alert("Error in fetching data");
        }
      } catch (error) {
        alert("Error in fetching data", error);
      }
    },
    async fetchData7() {
      try {
        const response2 = await fetch(`${apiUrl}color/random`, {
          method: "GET",
        });
        if (response2) {
          const data2 = await response2.json();
          this.product4.imageURL = data2.product.imageURL;
          this.product4.id = data2.product.id;
          this.product4.name = data2.product.name;
        } else {
          alert("Error in fetching data");
        }
      } catch (error) {
        alert("Error in fetching data", error);
      }
    },

    async fetchData10() {
      try {
        const response2 = await fetch(`${apiUrl}tag/product/${this.id}/tags`, {
          method: "GET",
        });
        if (response2) {
          const data2 = await response2.json();
          this.listTag = data2;
        } else {
          alert("Error in fetching data");
        }
      } catch (error) {
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
      if (this.sizeQuality) {
        try {
          const response = await fetch(
            `${apiUrl}cart/add?token=${getString("token")}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                productId: productId,
                quantity: quantity,
                quantityBySizes: { [this.sizeQuality]: quantity },
              }),
            }
          );

          if (response) {
            const data = await response.json();
            this.$store.commit("incrementCart", {
              value: this.quantity,
              callapi: -1,
            });
            alert("Add cart success, please back home to pay");
          } else {
            alert("error");
          }
        } catch (error) {
          console.error(error);
          if (error.message === "Failed to fetch") {
            alert(
              "Unable to connect to server. Please check your internet connection and try again."
            );
          } else {
            alert("Please select size.");
          }
        }
      } else {
        alert("Please choose size");
      }
    },
    async btnAddWishList() {
      try {
        const response = await fetch(
          `${apiUrl}wishlist/add?token=${getString("token")}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: this.product.id,
              name: this.product.name,
              imageURL: this.product.imageURL,
              price: this.product.price,
              description: this.product.description,
              categoryId: this.product.categoryId,
            }),
          }
        );
        if (response) {
          alert("Add wish list success");
        } else {
          alert("Error in fetching data");
        }
      } catch (error) {
        alert("Error in fetching data", error);
      }
    },
    initRating(args) {
      // Reset selected rating
      this.selectedRating = 0;
    },
    initComment(args) {
      // Reset comment
      this.comment = "";
    },
    selectRating(value) {
      // Select the rating value
      this.selectedRating = value;
    },
    onCommentChange(args) {
      const textField = args.object;
      this.commentINput = textField.text;
    },
    async addComment() {
      // Submit comment using this.selectedRating and this.comment
      try {
        const token = getString("token");

        const response = await fetch(
          `${apiUrl}products/${this.product.id}/comments?token=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: this.commentINput,
              rating: this.selectedRating,
              product: {},
            }),
          }
        );

        if (response) {
          if (response) {
            this.newcomment = response.json();
          } else {
          }
        } else {
          alert("Error in fetching data 2");
        }
      } catch (error) {
        alert("Error in fetching data" + error);
      }
    },
    async loadComments() {
      try {
        const response = await fetch(`${apiUrl}products/${this.id}/comments/`, {
          method: "GET",
        });
        if (response) {
          this.comments = await response.json();
        } else {
          console.log("Error in fetching data");
        }
      } catch (error) {
        console.log(error);
      }
    },
    onUpdateSelectedItem(selectedItem) {
      this.sizeQuality = selectedItem.label;
      this.selectedSize = selectedItem;
    },
    updateColor(color) {},
    goToDetails(id) {
      try {
        this.$navigateTo(DetailProduct, {
          props: {
            id,
          },
        });
      } catch (error) {
        alert(error);
      }
    },
  },
  mounted() {
    try {
      const token = getString("token");
      if (token) {
        this.fetchUser(token);
        this.fetchData5();
        this.fetchData6();
        this.fetchData7();
        this.fetchData8();
        this.fetchData9();
        this.fetchData10();
        this.loadComments();
      }
    } catch (error) {
      alert(error);
    }
  },
  watch: {
    newcomment: {
      immediate: true, // This ensures that the loadComments() function is called when the component is first mounted
      handler() {
        this.loadComments();
      },
    },
  },
};
</script>

<style scoped>
.product-image-container {
  width: 100%;
  height: 300;
  overflow: hidden;
  background-color: rgb(220, 220, 220);
}

.product-image {
  width: 500;
}

.borderless-button {
  border-color: transparent;
  border-width: 1;
  z-index: 0;
}

.product-name {
  text-align: left;
  font-weight: 500;
  color: black;
  font-size: 20;
}

.product-description {
  color: grey;
  margin: 0 10;
}

.product-price {
  /* margin-top: 10;
  color: red;
  margin-left: 20; */
  margin-left: 20;
  align-items: end;
  font-size: 20;
}
.selected {
  width: 50;
  height: 35;
  background-color: black;
  color: white;
  border-width: 2;
  border-color: black;
}
.unselected {
  width: 50;
  height: 35;
  border-width: 2;
  border-color: black;
}
.blackColor {
  border-width: 1;
  border-color: blue;
  margin-right: 10;
  width: 20;
  height: 20;
  border-radius: 100;
  background-color: black;
}
.whiteColor {
  margin-right: 10;
  width: 20;
  height: 20;
  border-radius: 100;
  background-color: white;
}
.greenColor {
  margin-right: 10;
  width: 20;
  height: 20;
  border-radius: 100;
  background-color: green;
}
.product-quantity-container {
  font-size: 20;
}

.product-quantity-label {
  margin-left: 20;
}

.product-quantity {
}

.add-to-cart-button {
  background-color: black;
  color: white;
  font-size: 15px;
  font-weight: 400;
  padding: 10px;
  border: none;
  border-radius: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}
.add-to-favorite {
  background-color: gainsboro;

  color: black;
  font-size: 23px;
  font-weight: 400;
  padding: 10px;
  border: none;
  border-radius: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}
</style>
