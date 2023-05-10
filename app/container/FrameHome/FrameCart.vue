<template>
    <TabView  :selectedIndex="selectedIndex" @selectedIndexChange="indexChange">
        <TabViewItem title="Cart">
            <label text="Cart" />
        </TabViewItem>
        <TabViewItem title="Wishlist">
            <label text="Wishlist" />
        </TabViewItem>
    </TabView>
</template>
<script>

export default {

}
</script>