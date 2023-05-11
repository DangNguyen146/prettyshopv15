<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton visibility="hidden" />
      <GridLayout columns="50, *">
        <Label class="action-bar-title" text="Change profile" colSpan="2" />

        <!-- <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap" /> -->
      </GridLayout>
    </ActionBar>

    <GridLayout class="page__content">
      <StackLayout class="form-container">
        <TextField v-model="firstName" :text="firstName" class="input" hint="First Name" keyboardType="name"
          autocorrect="false" />
        <TextField v-model="lastName" :text="lastName" class="input" hint="Last Name" keyboardType="name"
          autocorrect="false" />
        <TextField v-model="email" :text="email" class="input" hint="Email" keyboardType="email" autocorrect="false" />
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
      email: '',
      firstName: '',
      lastName: '',
      isLoading: false,
      token: ""
    }
  },
  computed: {
    message() {
      return "<!-- Page content goes here -->";
    }
  },
  methods: {
    async fetchUser(token) {
      try {
        const response = await fetch(`${apiUrl}user/getprofile?token=${token}`, {
          method: "GET",
        });
        if (response) {
          const data = await response.json();

          this.email = data.email;
          this.firstName = data.firstName;
          this.lastName = data.lastName;
        }
        else {
          alert("error");
        }
      }
      catch (error) {
        console.error(error);
        if (error.message === "Failed to fetch") {
          alert("Unable to connect to server. Please check your internet connection and try again.");
        }
        else {
          alert("An error occurred. Please try again later.");
        }
      }
    },
    async submitForm() {
      try {
        this.isLoading = true;
        const user = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
        };
        
        const response = await fetch(`${apiUrl}user/editprofile?token=${getString('token')}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        if (response) {
          this.$navigateTo(Home, {
            clearHistory: true
          });

        }
      } catch (error) {
        alert(error);
        if (error.message === 'Failed to fetch') {
          alert('Unable to connect to server. Please check your internet connection and try again.');
        } else {
          alert('An error occurred. Please try again later.');
        }
      }
    },
  },
  mounted() {
    try {
      this.token = getString("token");
      if (!this.token || this.token == "") {
        alert("Please login");
      }
      else {
        this.fetchUser(this.token);
      }
    }
    catch (error) {
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
  