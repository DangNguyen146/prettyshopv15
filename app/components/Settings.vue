<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton visibility="hidden" />
      <GridLayout columns="50, *">
        <Label class="action-bar-title" text="Settings" colSpan="2" />

        <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap" />
      </GridLayout>
    </ActionBar>

    <GridLayout class="page__content">
      <Label class="page__content-icon fas" text.decode="&#xf013;" />
      <Label class="page__content-placeholder" :text="message" />
      <Button class="submit-button" text="Logout" @tap="btnLogout" />
    </GridLayout>
  </Page>
</template>

<script>
import * as utils from "~/shared/utils";
import { SelectedPageService } from "../shared/selected-page-service";
import { setString, getString } from "@nativescript/core/application-settings";
import LoginPage from "./Auth/LoginPage";

export default {
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Settings");
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
    btnLogout() {
      setString('token', "");
      this.$navigateTo(LoginPage, {
        clearHistory: true
      });
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


