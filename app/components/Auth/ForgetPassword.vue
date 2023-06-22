<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton visibility="hidden" />
      <GridLayout columns="50, auto, auto">
        <Label class="action-bar-title" text="Forgot pasword" colSpan="3" />
      </GridLayout>
    </ActionBar>

    <GridLayout class="page__content">
      <StackLayout class="form-container">
        <Label class="label" text="Email:" />
        <TextField
          class="text-field"
          v-model="email"
          autocapitalizationType="none"
        />

        <Button class="submit-button" text="Submit" @tap="submitForm" />
        <ActivityIndicator class="activity-indicator" :busy="isLoading" />
        <label text="OR" class="Or" />
        <Button class="submit-button" text="Login" @tap="onForgetTap" />
        <Button class="submit-button" text="Sign Up" @tap="onSignUpTap" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
import * as utils from "~/shared/utils";
import { SelectedPageService } from "../../shared/selected-page-service";
import { setString, getString } from "@nativescript/core/application-settings";
import Home from "../Home";
import LoginPage from "./LoginPage";
import Signup from "./Signup";
import { apiUrl } from "~/config/config";

export default {
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("LoginPage");
  },
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
    };
  },
  computed: {
    message() {
      return "<!-- Page content goes here -->";
    },
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
    },
    async submitForm() {
      try {
        this.isLoading = true;
        const response = await fetch(
          `${apiUrl}user/resetpassword?email=${this.email}`,
          {
            method: "POST",
          }
        );
        if (response) {
          alert("Check email");
          this.$navigateTo(Login, {
            clearHistory: true,
          });
        } else {
          alert("Invalid email or password.");
        }
      } catch (error) {
        console.error(error);
        if (error.message === "Failed to fetch") {
          alert(
            "Unable to connect to server. Please check your internet connection and try again."
          );
        } else {
          alert("An error occurred. Please try again later.");
        }
      } finally {
        this.isLoading = false;
      }
    },
    onForgetTap() {
      this.$navigateTo(LoginPage, {
        clearHistory: true,
      });
    },
    onSignUpTap() {
      this.$navigateTo(Signup, {
        clearHistory: true,
      });
    },
  },
};
</script>

<style scoped lang="scss">
$red-color: black;


.Or {
  text-align: center;
  font-size: 20px;
  margin-bottom: 200px;
}
.action-bar {
  background-color: $red-color;
  // color: white;
}

.action-bar-title {
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 20;
}

.form-container {
  margin: 30;
}

.label {
  // color: white;
  font-weight: bold;
  margin-bottom: 10;
  font-size: 18;
}

.text-field {
  // background-color: white;
  // color: black;
  margin-bottom: 20;
  font-size: 16;
  height: 40;
  padding-left: 10;
  border-radius: 5;
}

.submit-button {
  background-color: $red-color;
  color: #fff;
  text-align: center;
  padding: 5;
  height: 50;
  border-radius: 100;
  font-size: 18;
  margin-bottom: 20;
  font-weight: bold;
  box-shadow: 5px 5px 5px #666;
}

.activity-indicator {
  margin-top: 20;
}
</style>
