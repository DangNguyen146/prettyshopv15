<template lang="html">
  <GridLayout rows="auto, *" class="nt-drawer__content">
    <StackLayout row="0" class="nt-drawer__header" v-if="!user">
      <Image class="nt-drawer__header-image fas t-36" src.decode="font://&#xf2bd;" />
      <Label class="nt-drawer__header-brand" text="User Name" />
      <Label class="nt-drawer__header-footnote" text="username@mail.com" />
    </StackLayout>
    <StackLayout row="0" class="nt-drawer__header" v-if="user">
      <Image class="nt-drawer__header-image fas t-36" src.decode="font://&#xf2bd;" />
      <Label class="nt-drawer__header-brand" :text="user.lastName" />
      <Label class="nt-drawer__header-footnote" :text="user.email" />
    </StackLayout>

    <ScrollView row="1" class="nt-drawer__body">
      <StackLayout>
        <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'Home' ? ' -selected' : '')"
          @tap="onNavigationItemTap(Home)">
          <Label col="0" text.decode="&#xf015;" class="nt-icon fas" />
          <Label col="1" text="Home" class="p-r-10" />
        </GridLayout>

        <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'Browse' ? ' -selected' : '')"
          @tap="onNavigationItemTap(Browse)">
          <Label col="0" text.decode="&#xf1ea;" class="nt-icon far" />
          <Label col="1" text="Browse" class="p-r-10" />
        </GridLayout>

        <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'Search' ? ' -selected' : '')"
          @tap="onNavigationItemTap(Search)">
          <Label col="0" text.decode="&#xf002;" class="nt-icon fas" />
          <Label col="1" text="Search" class="p-r-10" />
        </GridLayout>

        <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'Featured' ? ' -selected' : '')"
          @tap="onNavigationItemTap(Featured)">
          <Label col="0" text.decode="&#xf005;" class="nt-icon fas" />
          <Label col="1" text="Featured" class="p-r-10" />
        </GridLayout>

        <StackLayout class="hr" />

        <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'Settings' ? ' -selected' : '')"
          @tap="onNavigationItemTap(Settings)">
          <Label col="0" text.decode="&#xf013;" class="nt-icon fas" />
          <Label col="1" text="Settings" class="p-r-10" />
        </GridLayout>

        <!-- <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'LoginPage' ? ' -selected' : '')"
          @tap="onNavigationItemTap(LoginPage)">
          <Label col="0" text.decode="&#xf013;" class="nt-icon fas" />
          <Label col="1" text="LoginPage" class="p-r-10" />
        </GridLayout> -->
      </StackLayout>
    </ScrollView>
  </GridLayout>
</template>

<script>
import Home from "./Home";
import Browse from "./Browse";
import Featured from "./Featured";
import Search from "./Search";
import Settings from "./Settings";
import LoginPage from "./Auth/LoginPage";
import * as utils from "~/shared/utils";
import { SelectedPageService } from "~/shared/selected-page-service";
import { apiUrl } from "~/config/config";
import { getString } from "@nativescript/core/application-settings";

export default {
  mounted() {
    SelectedPageService.getInstance().selectedPage$
      .subscribe((selectedPage) => this.selectedPage = selectedPage);
  },
  data() {
    return {
      Home: Home,
      Browse: Browse,
      Featured: Featured,
      Search: Search,
      Settings: Settings,
      LoginPage: LoginPage,
      selectedPage: "",
      user: {}
    };
  },
  components: {
    Home,
    Browse,
    Featured,
    Search,
    Settings,
    LoginPage
  },
  methods: {
    onNavigationItemTap(component) {
      this.$navigateTo(component, {
        clearHistory: true
      });
      utils.closeDrawer();
    },
    async fetchUser(token) {
      try {
        const response = await fetch(`${apiUrl}user/getprofile?token=${token}`, {
          method: 'GET',
        })

        if (response) {
          const data = await response.json();
          this.user = data;
        } else {
          alert('error');
        }
      } catch (error) {
        console.error(error);
        if (error.message === 'Failed to fetch') {
          alert('Unable to connect to server. Please check your internet connection and try again.');
        } else {
          alert('An error occurred. Please try again later.');
        }
      }
    }

  },
  mounted() {
    try {
      const token = getString('token');
      if (token)
        this.fetchUser(token);
    } catch (error) {
      alert(error);
    }
  },
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import '@nativescript/theme/scss/variables/blue';
// End custom common variables

// Custom styles
</style>
