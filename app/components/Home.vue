<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton visibility="hidden" />
      <GridLayout columns="*, auto, auto">
        <!-- <Label text.decode="&#xf0c9;" @tap="onDrawerButtonTap" class="fas " col="2" /> -->
        <Label class="action-bar-title" text="PrettyShop" colSpan="2" />
        <Image src="https://prettyshopfemobilev2.vercel.app/icon/search.png" class="fas right-aligned" @tap="onDrawerButtonTap" col="1" />
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
        <FrameSetting />
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
import FrameSetting from "../container/FrameHome/FrameSetting";

import SearchPage from "./SearchPage/SearchPage";

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
    FrameHome, FrameProduct, FrameCart, FrameSetting
  },
  computed: {
    message() {
      return "<!-- Page content goes here -->";
    }
  },
  methods: {
    onDrawerButtonTap() {
     this.$navigateTo(SearchPage);
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

.fas {
  font-size: 24;
  vertical-align: center;
}

.action-bar-title {
  font-size: 20;
  text-align: center;
  vertical-align: center;
}

.right-aligned {
  font-size: 24;
  width: 24;
  text-align: right;
  vertical-align: center;

}
</style>
