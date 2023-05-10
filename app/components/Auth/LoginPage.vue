<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton visibility="hidden" />
      <GridLayout columns="50, *">
        <Label class="action-bar-title" text="LoginPage" colSpan="2" />

        <!-- <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap" /> -->
      </GridLayout>
    </ActionBar>

    <GridLayout class="page__content">
      <StackLayout class="form-container">
        <Label class="label" text="Email:" />
        <TextField class="text-field" v-model="email" autocapitalizationType="none" />
        <Label class="label" text="Password:" />
        <TextField class="text-field" secure v-model="password" />
        <Button class="submit-button" text="Submit" @tap="submitForm" />
        <ActivityIndicator class="activity-indicator" :busy="isLoading" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
import * as utils from "~/shared/utils";
import { SelectedPageService } from "../../shared/selected-page-service";
import { setString, getString } from "@nativescript/core/application-settings";
import Home from "../Home";

export default {
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("LoginPage");
  },
  data() {
    return {
      email: '',
      password: '',
      isLoading: false
    }
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
    async submitForm() {
      try {
        this.isLoading = true;
        const response = await fetch('https://prettyshopbe-production.up.railway.app/user/signIn', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "email": this.email,
            "password": this.password
          })
        });
        if (response.status === 200) {
          const data = await response.json();
          if (data.status === 'success') {
            setString('token', data.token);
            alert('Token saved successfully. Token: ' + getString('token'));
            this.$navigateTo(Home, {
              clearHistory: true
            });
          } else {
            alert('Invalid email or password.');
          }
        }
      } catch (error) {
        console.error(error);
        if (error.message === 'Failed to fetch') {
          alert('Unable to connect to server. Please check your internet connection and try again.');
        } else {
          alert('An error occurred. Please try again later.');
        }
      } finally {
        this.isLoading = false;
      }
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
