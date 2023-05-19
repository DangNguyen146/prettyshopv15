<template>
    <Page>
        <StackLayout width="100%" height="100%">
            <ScrollView>
                <StackLayout>
                    <StackLayout row="1" backgroundColor="#b3cde0" borderRadius="10" shadowColor="#000000"
                        shadowOffsetHeight="5" shadowOpacity="0.5">

                        <StackLayout row="2" flexDirection="column" orientation="vertical" marginTop="40">
                            <Label :text="'Cart detail ' + order.id" class="title" fontSize="20" fontWeight="bold" />
                            <StackLayout>
                                <Label
                                    :text="'createdDate: ' + Date(order.createdDate).toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })"
                                    fontSize="subtitle" fontWeight="bold" marginBottom="5" />
                                <Label :text="'totalPrice: ' + order.totalPrice" fontSize="subtitle" fontWeight="bold"
                                    marginBottom="5" />
                                <Label :text="shipcod ? 'Delivery method: shipcod' : 'Delivery method: payment'"
                                    fontSize="subtitle" fontWeight="bold" marginBottom="5" />
                                <Label :text="'orderItems: ' + JSON.stringify(order.orderItems)" fontSize="subtitle"
                                    fontWeight="bold" marginBottom="5" />
                                <Label :text="order.status ? 'status: ' + order.status : 'status: pending'"
                                    fontSize="subtitle" fontWeight="bold" marginBottom="5" />
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
                                            <Label :text="orderItem.product.description" />
                                        </StackLayout>
                                    </GridLayout>
                                </StackLayout>
                                <!-- Display a message when there are no products -->

                            </ScrollView>
                        </StackLayout>
                    </StackLayout>
                    <StackLayout row="1">
                        <Label class="text" text="Payment is overdue by 12 hours, cannot pay" v-if="hourDiff>12" />
                        <Button class="submit-button" text="Make payment" @tap="submitPayment"
                            v-if="!order.statuspayment && hourDiff<12" />
                    </StackLayout>
                </StackLayout>

            </ScrollView>
        </StackLayout>
    </Page>
</template>
<script>
import { apiUrl } from "~/config/config";
import { getString } from "@nativescript/core/application-settings";
import MakePayMentHaveSession from '@/components/PayMent/MakePayMentHaveSession'

export default {
    data() {
        return {
            orderItems: [],
            order: {},
            hourDiff: 0
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
                    const currentTime = new Date();
                    const orderCreatedTime = new Date(this.order.createdDate);


                    const localOrderCreatedTime = orderCreatedTime.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });

                    const hourDiff = (currentTime - new Date(localOrderCreatedTime)) / (1000 * 60 * 60);

                    this.hourDiff = hourDiff;
                }
            } catch (error) {
                alert(error);
            }
        },
        submitPayment() {
            try {
                this.$navigateTo(MakePayMentHaveSession, {
                    props: {
                        sessionId: this.order.sessionId,
                        id: this.id,
                        fullname: this.order.fullname,
                        addpress: this.order.addpress,
                        phone: this.order.phone,
                    }
                })
            }
            catch (e) {
                alert(e)
            }
        },
        cacultime() {

        }
    },

    mounted() {
        try {
            const token = getString('token');
            if (!token || token == "") {
                // alert("Please login");
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
<style>
.text{
    text-align: center;
    font-weight: 700;
    color: red;
}
</style>