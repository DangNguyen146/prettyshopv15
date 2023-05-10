<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton visibility="hidden" />
      <GridLayout columns="50, *">
        <Label class="action-bar-title" text="Home" colSpan="2" />

        <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap" />
      </GridLayout>
    </ActionBar>

    <TabView androidTabsPosition="bottom" :selectedIndex="selectedIndex" @selectedIndexChange="indexChange">
      <TabViewItem title="Home">
        <FrameHome />
      </TabViewItem>
      <TabViewItem title="Product">
        <FrameProduct />
      </TabViewItem>
      <TabViewItem title="Cart">
        <FrameCart />
      </TabViewItem>
      <TabViewItem title="Setting">
        <label text="Content for Tab 4" />
      </TabViewItem>
    </TabView>

  </Page>
</template>

<script>
import * as utils from "~/shared/utils";
import { SelectedPageService } from "../shared/selected-page-service";
import { getString } from "@nativescript/core/application-settings";
import LoginPage from './Auth/LoginPage';

import FrameHome from "../container/FrameHome/FrameHome"
import FrameProduct from "~/container/FrameHome/FrameProduct";
import FrameCart from "../container/FrameHome/FrameCart";

export default {
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Home");
    try {
      this.token = getString('token');
      if (!this.token || this.token == "") {
        this.$navigateTo(LoginPage, {
          clearHistory: true
        });
      }
    } catch (error) {
      alert(error)
    }

  },
  data() {
    return {
      token: null,
    }
  },
  components: {
    FrameHome, FrameProduct, FrameCart
  },
  computed: {
    message() {
      return "<!-- Page content goes here -->";
    }
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    indexChange: function (args) {
      let newIndex = args.value
      // alert('Current tab index: ' + newIndex)
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import '@nativescript/theme/scss/variables/blue';
// End custom common variables

// Custom styles
</style>
