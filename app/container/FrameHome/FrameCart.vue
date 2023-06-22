<template>
  <TabView :selectedIndex="selectedIndex" @selectedIndexChange="indexChange">
    <TabViewItem title="Order">
      <CartView />
    </TabViewItem>
    <TabViewItem title="Wishlist">
      <Wishlist />
    </TabViewItem>
  </TabView>
</template>
<script>
import CartView from "./FramCart/CartView";
import Wishlist from "./FramCart/Wishlist";

export default {
  components: {
    CartView,
    Wishlist,
  },
  methods: {
    onDrawerButtonTap() {
      this.$navigateTo(SearchPage);
    },
    indexChange: function (args) {
      let newIndex = args.value;
      // alert('Current tab index: ' + newIndex)
    },
  },
};
</script>
