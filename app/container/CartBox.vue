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
        :text="'No. 00' + order.id"
        fontSize="subtitle"
        fontWeight="bold"
        marginBottom="5"
      />
      <Label
        :text="'x' + order.totalItems + ' Item'"
        fontSize="subtitle"
       
        marginBottom="5"
      />
      <Label
        :text="'TotalCost: $' + order.totalCost"
        fontSize="subtitle"
        color="red"
        marginBottom="5"
      />
      <Label class="mb-0" fontSize="subtitle" :text="'Ordered on : ' + order.orderdate"></Label>
      <Label
        class="mb-0" fontSize="subtitle"
        :text="order.status ? 'Status: ' + order.status : 'Status: Pending'"
      ></Label>
      <Label
        text="View more"
        textWrap="true"
        margin="10 10 2 140"
        
        fontStyle="italic"
      />
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
