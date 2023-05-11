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
        <Label class="label" text="Password current:" />
        <TextField class="text-field" v-model="passwordCurrent" secure autocapitalizationType="none" />
        <Label class="label" text="Password:" />
        <TextField class="text-field" v-model="password" secure autocapitalizationType="none" />
        <Label class="label" text="Password confirm:" />
        <TextField class="text-field" secure v-model="passwordConfirm" />
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
import { apiUrl } from "~/config/config";

export default {
  data() {
    return {
      password: '',
      passwordConfirm: '',
      isLoading: false
    }
  },
  computed: {
  },
  methods: {
    async submitForm() {
      try {
        this.isLoading = true;
        if (this.password === this.passwordConfirm) {
          const response = await fetch(`${apiUrl}user/changepassword?token=${getString('token')}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "password": this.password
            })
          });
          if (response) {
            this.$navigateTo(Home, {
              clearHistory: true
            });
          }
        }
        else {
          alert("password != passwordConfirm")
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
  }
};
</script>
  
<style scoped lang="scss">
// Start custom common variables
@import '@nativescript/theme/scss/variables/blue';
// End custom common variables

// Custom styles
</style>
  