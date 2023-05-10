<template>
    <TabView :selectedIndex="selectedIndex" @selectedIndexChange="indexChange">
        <TabViewItem title="Cart">
            <CartView />
        </TabViewItem>
        <TabViewItem title="Wishlist">
            <Wishlist/>
        </TabViewItem>
    </TabView>
</template>
<script>
import CartView from "./FramCart/CartView";
import Wishlist from "./FramCart/Wishlist";

export default {
    components: {
        CartView, Wishlist
    },
}
</script>