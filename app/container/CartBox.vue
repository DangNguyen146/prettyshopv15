<template>
  <GridLayout
    columns="auto, *"
    class="product-box"
    borderWidth="1"
    borderColor="#eee"
    borderRadius="5"
    padding="10"
    @tap="goToDetails"
  >
    <StackLayout col="0" class="product-image" marginRight="5" width="40%">
      <Image :src="order.imageURL" stretch="aspectFit" />
    </StackLayout>
    <StackLayout col="1" class="product-details" width="50%">
      <Label
        :text="'No. ' + order.id"
        fontSize="subtitle"
        fontWeight="bold"
        marginBottom="5"
      />
      <Label
        :text="'TotalItems: ' + order.totalItems"
        fontSize="subtitle"
        color="red"
        marginBottom="5"
      />
      <Label
        :text="'TotalCost: $' + order.totalCost"
        fontSize="subtitle"
        color="red"
        marginBottom="5"
      />
      <Label class="mb-0" :text="'Ordered on : ' + order.orderdate"></Label>
      <Label class="mb-0" :text="'Status : ' + order.status"></Label>
    </StackLayout>
  </GridLayout>
</template>

<script>
import DetailCart from "./../components/Cart/DetailCart";

export default {
  props: ["order"],
  methods: {
    goToDetails() {
      const id = this.order.id;
      try {
        this.$navigateTo(DetailCart, {
          props: {
            id,
          },
        });
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>
