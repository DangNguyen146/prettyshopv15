<template>
    <GridLayout columns="auto, *" class="product-box" borderWidth="1" borderColor="#eee" borderRadius="5" padding="10"
        @tap="goToDetails">
        <StackLayout col="0" class="product-image" marginRight="5" width="40%">
            <Image :src="product.imageURL" stretch="aspectFit" />
        </StackLayout>
        <StackLayout col="1" class="product-details" width="50%">
            <Label :text="product.name" fontSize="subtitle" fontWeight="bold" marginBottom="5" />
            <Label :text="'$' + product.price" fontSize="subtitle" color="red" marginBottom="5" />
            <Label :text="product.description" />
        </StackLayout>
    </GridLayout>
</template>
  
<script>
import DetailProduct from "../components/DetailProduct/DetailProduct"


export default {
    name: "ProductBox",
    props: ["product"],
    methods: {
        goToDetails() {
            const id = this.product.id
            try {
                this.$navigateTo(DetailProduct, {
                    props: {
                        id
                    }
                });
            }
            catch (error) {
                alert(error);
            };
        }
    }
};
</script> 

<!--I assumed that the component DetailProductView already exists in the project.-->
