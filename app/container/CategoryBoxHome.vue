<template>
    <StackLayout class="item-category" @tap="goToCategoryProducts">
        <Image :src="category.imageUrl" class="card-img-top" stretch="aspectFit" width="200" height="200" />
    </StackLayout>
</template>
  
<script>
import ListCategoryProducts from "../components/ListCategoryProducts/ListCategoryProducts";

export default {
    props: ["category"],
    components: { ListCategoryProducts },
    methods: {
        goToCategoryProducts() {
            const id = this.category.id
            const categoryName = this.category.categoryName
            try {
                this.$navigateTo(ListCategoryProducts, {
                    props: { id, categoryName }
                });
            } catch (error) {
                alert(error)
            }
        },
    },
};
</script>
  
<style scoped></style>
  