<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton visibility="hidden" />
      <GridLayout columns="50, auto, auto">
        <Label class="action-bar-title" text="SIGN UP" colSpan="3" />
      </GridLayout>
    </ActionBar>

    <GridLayout class="page__content">
      <StackLayout class="form-container">
        <Label class="label" text="FirstName:" />
        <TextField
          class="text-field"
          v-model="firstName"
          autocapitalizationType="none"
        />

        <Label class="label" text="LastName:" />
        <TextField
          class="text-field"
          v-model="lastName"
          autocapitalizationType="none"
        />

        <Label class="label" text="Email:" />
        <TextField
          class="text-field"
          v-model="email"
          autocapitalizationType="none"
        />

        <Label class="label" text="Password:" />
        <TextField class="text-field" secure v-model="password" />

        <Label class="label" text="Password Confirm:" />
        <TextField class="text-field" secure v-model="passwordConfirm" />

        <Button class="submit-button" text="Submit" @tap="submitForm" />
        <ActivityIndicator class="activity-indicator" :busy="isLoading" />

        <Button
          class="submit-button"
          text="Forget Password"
          @tap="onForgetTap"
        />
        <Button class="submit-button" text="Sign In" @tap="onSignInTap" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>
<script>
import { apiUrl } from "~/config/config";
import LoginPage from "./LoginPage";
import ForgetPassword from "./ForgetPassword";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };
  },
  methods: {
    onForgetTap() {
      this.$navigateTo(ForgetPassword, {
        clearHistory: true,
      });
    },
    onSignInTap() {
      this.$navigateTo(LoginPage, {
        clearHistory: true,
      });
    },
    async submitForm() {
      if (this.password === this.passwordConfirm) {
        // make the post body
        const user = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        };
        try {
          const response = await fetch(`${apiUrl}user/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          if (response) {
            alert("Sign up successful");
            this.$navigateTo(LoginPage, {
              clearHistory: true,
            });
          } else {
            alert("Sign up failed");
          }
        } catch (error) {
          console.error(error);
          if (error.message === "Failed to fetch") {
            alert(
              "Unable to connect to server. Please check your internet connection and try again."
            );
          } else {
            alert("An unexpected error occurred. Please try again later.");
          }
        }
      } else {
        alert("password != passwordConfirm");
      }
    },
  },
};
</script>

<style scoped lang="scss">
$red-color: rgb(0, 191, 255);

.page {
  // background-color: $red-color;
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
  border-radius: 100px;
  font-size: 18;
  margin-bottom: 20;
  box-shadow: 5px 5px 5px #666;
  font-weight: bold;
}

.activity-indicator {
  margin-top: 20;
}
</style>
