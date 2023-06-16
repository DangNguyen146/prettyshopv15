<template>
   
</template>
  
<script>
import { apiUrl } from '~/config/config';


export default {
    name: "ProductBoxHome",
    data() {
        return {
            product1: null,
            product2: null
        };
    },

    methods: {
        async fetchData5() {
            try {
                const response = await fetch(`${apiUrl}tag/random`, {
                    method: "GET",
                });
                if (response) {
                    const data = await response.json();
                    this.product1 = data;
                } else {
                    alert("Error in fetching data");
                }
            } catch (error) {
                alert("Error in fetching data", error);
            }

            try {
                const response = await fetch(`${apiUrl}color/random`, {
                    method: "GET",
                });
                if (response) {
                    const data = await response.json();
                    this.product2 = data;
                } else {
                    alert("Error in fetching data");
                }
            } catch (error) {
                alert("Error in fetching data", error);
            }

        },
    },
    mounted() {
        fetchData5();
    }

};
</script>
  
<style scoped></style>
  