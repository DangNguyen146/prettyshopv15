<template>
    <Page>
        <StackLayout width="100%" height="100%">
            <ScrollView>
                <StackLayout>
                    <StackLayout row="1" backgroundColor="#b3cde0" borderRadius="10" shadowColor="#000000"
                        shadowOffsetHeight="5" shadowOpacity="0.5">
                       
                        <StackLayout row="2" flexDirection="column" orientation="vertical" marginTop="40"> // Add
                            marginTop
                            property
                            with value of 50
                            <!-- Add the 'v-if' directive to only display the label when there are products -->
                            <Label text="Top Product" class="title" fontSize="20" fontWeight="bold" />
                            
                            <StackLayout  >
                                <Label :text="order.createdDate" fontSize="subtitle" fontWeight="bold" marginBottom="5" />
                                <Label :text="order.totalPrice" fontSize="subtitle" fontWeight="bold" marginBottom="5" />
                                <Label :text="order.orderItems" fontSize="subtitle" fontWeight="bold" marginBottom="5" />
                                <Label :text="JSON.stringify(order.status)" fontSize="subtitle" fontWeight="bold" marginBottom="5" />
                               
                            </StackLayout>
                            <ScrollView>
                                <!-- Add the 'v-if' directive to display products only when there are products -->
                                <StackLayout class="card-body" justifyContent="space-around" alignItems="center"
                                    v-for="(orderItem, index) in orderItems" :key="index">
                                    <GridLayout columns="auto, *" class="product-box" borderWidth="1" borderColor="#eee"
                                        borderRadius="5" padding="10" @tap="goToDetails">
                                        <StackLayout col="1" class="product-image" marginRight="5" width="40%">
                                            <Image :src="orderItem.product.imageURL" stretch="aspectFit" />
                                        </StackLayout>
                                        <StackLayout col="2" class="product-details" width="50%">
                                            <Label :text="orderItem.product.name" fontSize="subtitle" fontWeight="bold"
                                                marginBottom="5" />
                                            <Label :text="'$' + orderItem.product.price" fontSize="subtitle" color="red"
                                                marginBottom="5" />
                                            <Label :text="orderItem.product.description.substring(0, 65) + '...'" />
                                        </StackLayout>
                                    </GridLayout>
                                </StackLayout>
                                <!-- Display a message when there are no products -->

                            </ScrollView>
                        </StackLayout>
                    </StackLayout>
                </StackLayout>
            </ScrollView>
        </StackLayout>
    </Page>
</template>
<script>
import { apiUrl } from "~/config/config";
import { getString } from "@nativescript/core/application-settings";

export default {
    data() {
        return {
            orderItems: [],
            order: {},
        }
    },
    props: ["id"],
    methods: {
        async getOrder(token) {
            try {
                const response = await fetch(`${apiUrl}order/${this.id}?token=${token}`, {
                    method: "GET",
                });
                if (response) {
                    this.order = await response.json();
                    this.orderItems = this.order.orderItems;
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
                this.getOrder(token);
            }
        } catch (error) {
            alert(error)
        }

    },
}
</script>