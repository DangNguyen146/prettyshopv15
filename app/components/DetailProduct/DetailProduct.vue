<template>
    <Page>
        <!-- <Image :src="product.imageURL" /> -->

        <ScrollView>
            <StackLayout rows="auto, auto, auto, auto, auto" columns="*, auto">
                <StackLayout row="0" col="0" rowSpan="5" class="product-image-container">
                    <!-- Add a check for product.imageURL before rendering the image -->
                    <Image :src="product.imageURL" stretch="aspectFit" class="product-image" />

                </StackLayout>
                <Label row="0" col="1" class="product-name" :text="product.name" fontSize="title" fontWeight="bold" />
                <Label row="1" col="1" class="product-description" :text="product.description" fontSize="subtitle" />
                <Label row="2" col="1" class="product-price" :text="'Price: $' + product.price" fontSize="subtitle" />
                <StackLayout row="3" col="1" class="product-quantity-container" orientation="horizontal"
                    verticalAlignment="center">
                    <Label class="product-quantity-label" text="Số lượng: " fontSize="subtitle" />
                    <Label class="product-quantity" :text="quantity.toString() + 'size: ' + sizeQuality" fontSize="subtitle" />
                    <Button class="product-quantity-increase" text="+" @tap="increaseQuantity" />
                    <Button class="product-quantity-decrease" text="-" @tap="decreaseQuantity" />
                </StackLayout>
                <StackLayout row="3" col="1">
                    <Label text="Size:" class="size-label" />
                    <Dropdown :items="availableSizes" class="size-dropdown" v-model="size"
                        @update:selectedItem="onUpdateSelectedItem" />
                </StackLayout>
                <Button row="4" col="1" text="Add cart" class="add-to-cart-button"
                    @tap="btnAddCart(product.id, quantity)" />
                <Button row="5" col="1" text="Add to wishlist" class="add-to-cart-button" @tap="btnAddWishList()" />
                <Label class="comment-product-name" text="Comment" fontSize="title" fontWeight="bold" />
                <StackLayout rows="auto, auto, auto, auto, auto" columns="*, auto">
                    <StackLayout row="0" col="0" rowSpan="5" @loaded="initRating">
                        <Label text="Rating:" class="rating-label" />
                        <WrapLayout itemSpacing="12" class="star-container">
                            <Label row="0" col="1" class="star" @tap="selectRating(1)" borderColor="#eee" borderRadius="5"
                                padding="10" fontSize="24" :text="selectedRating >= 1 ? ' ⭐ ' : ' 🤍 '" />
                            <Label row="1" col="1" class="star" @tap="selectRating(2)" borderColor="#eee" borderRadius="5"
                                padding="10" fontSize="24" :text="selectedRating >= 2 ? ' ⭐ ' : ' 🤍 '" />
                            <Label row="2" col="1" class="star" @tap="selectRating(3)" borderColor="#eee" borderRadius="5"
                                padding="10" fontSize="24" :text="selectedRating >= 3 ? ' ⭐ ' : ' 🤍 '" />
                            <Label row="3" col="1" class="star" @tap="selectRating(4)" borderColor="#eee" borderRadius="5"
                                padding="10" fontSize="24" :text="selectedRating >= 4 ? ' ⭐ ' : ' 🤍 '" />
                            <Label row="4" col="1" class="star" @tap="selectRating(5)" borderColor="#eee" borderRadius="5"
                                padding="10" fontSize="24" :text="selectedRating >= 5 ? ' ⭐ ' : ' 🤍 '" />
                        </WrapLayout>
                    </StackLayout>
                    <StackLayout row="1" col="1" class="comment-container" @loaded="initComment">
                        <Label text="Comment:" class="comment-label" />
                        <TextField class="comment-field" hint="Type your comment here" returnKeyType="done"
                            :text="commentINput" @textChange="onCommentChange" />
                    </StackLayout>
                    <Button row="2" col="1" class="submit-button" text="Submit" @tap="addComment" />
                    <ActivityIndicator row="3" col="1" class="activity-indicator" :busy="isLoading" />
                </StackLayout>
                <StackLayout row="6" col="1" orientation="horizontal">

                    <StackLayout width="100%" height="100%">
                        <GridLayout rows="*, *, auto">
                            <StackLayout row="2" flexDirection="column" orientation="vertical" marginTop="40">
                                <ScrollView>
                                    <!-- Add the 'v-if' directive to display products only when there are products -->
                                    <StackLayout class="card-body" justifyContent="space-around" alignItems="center"
                                        v-if="comments && comments.length > 0">
                                        <CommentBox v-for="comment of comments" :key="comment.id" :comment="comment"
                                            :product="product" :userID="userID" />
                                    </StackLayout>
                                    <!-- Display a message when there are no products -->
                                    <Label v-else class="info" text="No comment available" />
                                </ScrollView>
                            </StackLayout>
                        </GridLayout>
                    </StackLayout>
                </StackLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>


<script>

import { getString } from "@nativescript/core/application-settings";
import { apiUrl } from "../../config/config"
import ListCommentBox from "./../../container/ListCommentBox"
import CommentBox from "./../../container/CommentBox";
import Dropdown from "~/container/Dropdown";

export default {
    props: ["id"],
    name: "DetailProduct",
    components: {
        ListCommentBox, CommentBox, Dropdown
    },
    data() {
        return {
            product: {},
            quantity: 1,
            selectedRating: 0,
            commentINput: '',
            comments: [],
            newcomment: null,
            userID: null,
            availableSizes: [],
            size: null,
            quantityBySizes: {},
            sizeQuality: ""
        };
    },
    methods: {
        async fetchUser(token) {
            try {
                const response = await fetch(`${apiUrl}user/getprofile?token=${token}`, {
                    method: 'GET',
                })

                if (response) {
                    const data = await response.json();
                    this.userID = data.id;
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
        },
        async fetchData5() {
            try {
                const response = await fetch(`${apiUrl}product/getproduct/${this.id}`, {
                    method: "GET",
                });
                if (response) {
                    const data = await response.json();
                    this.product = data;
                    this.availableSizes = data.size.map((size, index) => {
                        return {
                            label: size,
                            value: `Quantity: ${data.quantityBySizes[index]}`
                        };
                    }).filter(size => size.value !== "Quantity: 0");
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
                        quantityBySizes: { [this.sizeQuality]: quantity },
                    })
                });

                if (response) {
                    const data = await response.json();
                    this.$store.commit('incrementCart', { value: this.quantity, callapi: -1 });
                    alert('Add cart success, please back home to pay');
                } else {
                    alert('error');
                }
            } catch (error) {
                console.error(error);
                if (error.message === 'Failed to fetch') {
                    alert('Unable to connect to server. Please check your internet connection and try again.');
                } else {
                    alert('Please select size.');
                }
            }
        },
        async btnAddWishList() {
            try {
                const response = await fetch(`${apiUrl}wishlist/add?token=${getString('token')}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: this.product.id,
                        name: this.product.name,
                        imageURL: this.product.imageURL,
                        price: this.product.price,
                        description: this.product.description,
                        categoryId: this.product.categoryId
                    })
                });
                if (response) {
                    alert("Add wish list success");
                }
                else {
                    alert("Error in fetching data");
                }
            }
            catch (error) {
                alert("Error in fetching data", error);
            }
        },
        initRating(args) {
            // Reset selected rating
            this.selectedRating = 0;
        },
        initComment(args) {
            // Reset comment
            this.comment = '';
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
                const token = getString('token');

                const response = await fetch(`${apiUrl}products/${this.product.id}/comments?token=${token}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: this.commentINput,
                        rating: this.selectedRating,
                        product: {}
                    })
                });

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
        }
    },
    mounted() {
        try {
            const token = getString('token');
            if (token) {
                this.fetchUser(token);
                this.fetchData5();
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
            }

        },
    }
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