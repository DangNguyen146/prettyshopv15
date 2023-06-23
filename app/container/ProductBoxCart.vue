<template>
  <GridLayout
    columns="auto, *"
    class="product-box"
    borderWidth="1"
    borderColor="#eee"
    borderRadius="10"
    padding="0 0 0 0"
    @tap="goToDetails"
    marginTop="10"
    boxShadow="0 8 15 rgba(0, 0, 0, 0.1)"
    width="340"
    height="170"
  >
    <StackLayout col="0" class="product-image" marginRight="5" width="50%">
      <Image
        v-if="product.imageURL"
        :src="product.imageURL"
        stretch="aspectFit"
        borderRadius="10 0 0 10"
        height="170"
        @error="handleImageError"
      />
    </StackLayout>
    <StackLayout col="1" class="product-details" width="50%">
      <Label
        :text="product.name"
        fontSize="subtitle"
        fontWeight="bold"
        margin="5 10 2 10"
        height="70"
        display="block"
        textWrap="true"
        justifyContent="top"
      />
      <Label
        :text="'$' + product.price"
        fontSize="20"
        color="red"
        margin="0 10 2 10"
      />
      <Label
        :text="product.description + '...'"
        textWrap="true"
        margin="10 10 2 10"
      />
    </StackLayout>
  </GridLayout>
</template>

<script>
import DetailProduct from "../components/DetailProduct/DetailProduct";

export default {
  name: "ProductBox",
  props: ["product"],
  methods: {
    goToDetails() {
      const id = this.product.id;
      try {
        this.$navigateTo(DetailProduct, {
          props: {
            id,
          },
        });
      } catch (error) {
        console.error(error);
        alert("Failed to navigate to product details.");
      }
    },
    handleImageError() {
      console.log("Failed to load image:", this.product.imageURL);
      // You can optionally set a fallback image here or take any other appropriate action
    },
  },
  mounted() {
    // alert(JSON.stringify(this.product));
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
