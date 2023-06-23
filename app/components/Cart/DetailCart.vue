<template>
  <Page>
    <ScrollView>
      <StackLayout>
        <StackLayout
          backgroundColor="white"
          borderRadius="5"
          shadowColor="#000000"
          shadowOffsetHeight="5"
          shadowOpacity="0.5"
          marginLeft="18"
          marginTop="10"
        >
          <Label
            :text="'📜 00' + order.id"
            class="title"
            fontSize="30"
            fontWeight="bold"
            marginBottom="10"
          />
          <Label
            :text="
              
              Date(order.createdDate).toLocaleString('en-US', {
                timeZone: 'Asia/Ho_Chi_Minh',
              })
            "
            fontSize="18"
           fontStyle="italic"
            marginBottom="5"
          />
          <Label
            :text="'TotalPrice: $' + order.totalPrice"
            fontSize="18"
            fontWeight="bold"
            marginBottom="5"
            color="red"

          />
          <Label
            :text="
              shipcod ? 'Payment method: Shipcod' : 'Payment method: Paypal'
            "
            fontSize="18"
            fontWeight="bold"
            marginBottom="5"
          />

          <Label
            :text="order.status ? 'Status: ' + order.status : 'Status: Pending'"
            fontSize="18"
            fontWeight="bold"
            marginBottom="5"
          />
          <Label :text="'Address:' " fontSize="18" fontWeight="bold"
            marginBottom="5"></Label>
          <Label :text="order.fullname" fontSize="18"></Label>
          <Label :text="order.phone" fontSize="18" ></Label>
          <Label :text="order.addpress" fontSize="18"></Label>
          <Label
          text="OrderItems: "
            fontSize="18"
            fontWeight="bold"
            marginBottom="5"
            heigh="20"
            
          />
          <GridLayout v-for="(orderItem, index) in orderItems"
              :key="index">
          
            <!-- Add the 'v-if' directive to display products only when there are products -->
            <StackLayout
              class="card-body"
              justifyContent="space-around"
              alignItems="center"
             
            >
              <GridLayout
                columns="auto, *"
                class="product-box"
                borderWidth="1"
                borderColor="#eee"
                borderRadius="5"
                padding="10"
                @tap="goToDetails"
              >
                <StackLayout
                  col="0"
                  class="product-image"
                  marginRight="5"
                  width="40%"
                >
                  <Image
                    :src="orderItem.product.imageURL"
                    stretch="aspectFit"
                  />
                </StackLayout>
                <StackLayout col="1" class="product-details" width="50%">
                  <Label
                    :text="orderItem.product.name"
                    fontSize="subtitle"
                    fontWeight="bold"
                    marginBottom="5"
                  />
                  <Label
                    :text="'$' + orderItem.product.price"
                    fontSize="subtitle"
                    color="red"
                    marginBottom="5"
                  />
                  <Label :text="orderItem.product.description" />
                  <label :text="'Size: L'" />
                  <label :text="'Color: ⚫'" />
                  <Label fontSize="18"
                    :text="
                      'x'+ orderItem.quantity
                    "
                    marginBottom="5"
                  />
                </StackLayout>
              </GridLayout>
            </StackLayout>
            <!-- Display a message when there are no products -->
          
        </GridLayout>
          <!-- <GridLayout v-for="product of orderItems" :key="product.id"  borderWidth="1" borderColor="#eee" borderRadius="5" padding="10">
            <StackLayout col="0" class="product-image" marginRight="5" width="40%">
                                    <Image :src="order.orderItems.quanlity" stretch="aspectFit" />
                                </StackLayout>
                                <StackLayout col="1" class="product-details" width="50%">
                                    <Label :text="cartItem.product.name" fontSize="subtitle" fontWeight="bold"
                                        marginBottom="5" />
                                    <Label :text="'$' + cartItem.product.price" fontSize="subtitle" color="red"
                                        marginBottom="5" />
                                    <Label :text="cartItem.product.description" />
                                    <Label :text="'Quantity: ' + cartItem.quantity" fontSize="subtitle" fontWeight="bold"
                                        marginBottom="5" />
                                    <Button text="Delete"
                                        style=" backgroundColor: rgb(255, 0, 0);  color: white;  fontSize: 16px;  fontWeight: bold;  padding: 10px; border: none; border-radius: 15px; box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.25); cursor: pointer;"
                                        @tap="delteCart(cartItem.id)" />
                                </StackLayout>
          </GridLayout>
        -->
        </StackLayout>
        <StackLayout>
          <Label
            class="text"
            text="Payment is overdue by 12 hours, cannot pay"
            v-if="hourDiff > 12"
            margin="20"
            textAlign="center"
            fontWeight="bold"
            color="red"
          />
          <Button
            class="submit-button"
            text="PAYMENT"
            @tap="submitPayment"
            v-if="!order.statuspayment && hourDiff < 12"
            margin="20"
            borderRadius="5"
            backgroundColor="black"
            color="white"
            fontWeight="bold"
            padding="10"
          />
        </StackLayout>
        <label
          text="Re-purchase"
          class="title"
          fontSize="20"
          fontWeight="bold"
          margin="5 5 10 18"
        >
        </label>
        <GridLayout v-for="(orderItem, index) in orderItems"
              :key="index">
        <ScrollView >
          <StackLayout >
            <ProductBox :product="orderItem.product" />
          </StackLayout>
        </ScrollView>
        </GridLayout>
        
      </StackLayout>
    </ScrollView>
  </Page>
</template>
<script>
import { apiUrl } from "~/config/config";
import { getString } from "@nativescript/core/application-settings";
import MakePayMentHaveSession from "@/components/PayMent/MakePayMentHaveSession";
import ProductBox from "@/container/ProductBox.vue";
export default {
  data() {
    return {
      orderItems: [],
      order: {},
      hourDiff: 0,
    };
  },
  components: {
    ProductBox,
  },
  props: ["id"],
  methods: {
    async getOrder(token) {
      try {
        const response = await fetch(
          `${apiUrl}order/${this.id}?token=${token}`,
          {
            method: "GET",
          }
        );
        if (response) {
          this.order = await response.json();
          this.orderItems = this.order.orderItems;
          const currentTime = new Date();
          const orderCreatedTime = new Date(this.order.createdDate);

          const localOrderCreatedTime = orderCreatedTime.toLocaleString(
            "en-US",
            { timeZone: "Asia/Ho_Chi_Minh" }
          );

          const hourDiff =
            (currentTime - new Date(localOrderCreatedTime)) / (1000 * 60 * 60);

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
          },
        });
      } catch (e) {
        alert(e);
      }
    },
    cacultime() {},
  },

  mounted() {
    try {
      const token = getString("token");
      if (!token || token == "") {
        // alert("Please login");
      } else {
        this.getOrder(token);
      }
    } catch (error) {
      alert(error);
    }
  },
};
</script>
<style>
.text {
  text-align: center;
  font-weight: 700;
  color: red;
}
</style>
