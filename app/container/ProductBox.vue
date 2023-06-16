<template>
  <GridLayout
    columns="auto, *"
    class="product-box"
    borderWidth="1"
    borderColor="#eee"
    borderRadius="50"
    padding="0 0 0 0"
    @tap="goToDetails"
    marginTop="10"
    boxShadow="0 8 15 rgba(0, 0, 0, 0.1)"
    width="340"
  >
    <StackLayout col="0" class="product-image" marginRight="5" width="50%">
      <Image
        :src="product.imageURL"
        stretch="aspectFit"
        borderRadius="50 0 0 50"
      />
    </StackLayout>
    <StackLayout col="1" class="product-details" width="50%">
      <Label
        :text="product.name"
        fontSize="subtitle"
        fontWeight="bold"
        margin="10"
        height="70"
        display="block"
        textWrap="true"
      />
      <Label
        :text="'$' + product.price"
        fontSize="20"
        color="red"
        margin="10"
      />
      <Label :text="product.description" textWrap="true" margin="10" />
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
        alert(error);
      }
    },
  },
};
</script>

<!--I assumed that the component DetailProductView already exists in the project.-->
