<template>
  <GridLayout rows="auto, auto, auto, *, auto" class="nt-drawer__content">
    <StackLayout row="0" class="nt-drawer__header" v-if="!user" backgroundColor="white">
      <Image
 
        src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/336997181_543230114601663_8718737744514792626_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=4mqcEeEcMMcAX8QyeJX&_nc_ht=scontent.fsgn5-3.fna&oh=00_AfAGoB4C0VySVpDesL4Ll8y771rM_JSgZVBav3l40AunWg&oe=6497F86E"
      />
      <Label class="nt-drawer__header-brand" text="User Name" />
      <Label class="nt-drawer__header-footnote" text="username@mail.com" />
    </StackLayout>
    <StackLayout row="1" class="nt-drawer__header" v-if="user" backgroundColor="white" >
      <Image
        
        src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/336997181_543230114601663_8718737744514792626_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=4mqcEeEcMMcAX8QyeJX&_nc_ht=scontent.fsgn5-3.fna&oh=00_AfAGoB4C0VySVpDesL4Ll8y771rM_JSgZVBav3l40AunWg&oe=6497F86E"
      />
      <Label class="nt-drawer__header-brand" :text="user.lastName" />
      <Label class="nt-drawer__header-footnote" :text="user.email" />
    </StackLayout>
    <StackLayout
      row="2"
      borderRadius="10"
      shadowColor="#000000"
      shadowOffsetHeight="5"
      shadowOpacity="0.5"
    >
      <Button
        width="80%"
        class="submit-button p-r-10"
        text="Change password"
        color="white"
        fontWeight="bold"
        backgroundColor="black"
        borderRadius="5"
        @tap="btnChangePass"
      />
      <Button
        width="80%"
        class="submit-button p-r-10"
        backgroundColor="black"
        color="white"
        fontWeight="bold"
        borderRadius="5"
        text="Change profile"
        @tap="btnChangeProfile"
      />
    </StackLayout>
    <StackLayout
      row="3"
      borderRadius="10"
      shadowColor="#000000"
      shadowOffsetHeight="5"
      shadowOpacity="0.5"
    >
      <Button
        width="80%"
        class="submit-button p-r-10"
        text="View Policy"
        color="white"
        backgroundColor="black"
        borderRadius="5"
        fontWeight="bold"
        @tap="btnPolicy"
      />
    </StackLayout>
    <StackLayout
      row="4"
      shadowColor="#000000"
      shadowOffsetHeight="5"
      shadowOpacity="0.5"
    >
      <Button
        width="80%"
        backgroundColor="red"
        color="white"
        fontWeight="bold"
        borderRadius="5"
        class="submit-button p-r-10"
        text="Log out"
        @tap="btnLogout"
      />
    </StackLayout>
  </GridLayout>
</template>
<script>
import { apiUrl } from "~/config/config";
import { setString, getString } from "@nativescript/core/application-settings";
import LoginPage from "../../components/Auth/LoginPage";
import ChangeProfile from "../../components/Auth/ChangeProfile";
import ChangPassword from "../../components/Auth/ChangPassword";
import PolicyPage from "../../components/Auth/PolicyPage";

export default {
  data() {
    return {
      token: null,
      user: null,
    };
  },
  methods: {
    btnLogout() {
      setString("token", "");
      this.$navigateTo(LoginPage, {
        clearHistory: true,
      });
    },
    async fetchData() {},
    btnChangePass() {
      this.$navigateTo(ChangPassword);
    },
    btnChangeProfile() {
      this.$navigateTo(ChangeProfile);
    },
    btnPolicy() {
      this.$navigateTo(PolicyPage);
    },
    async fetchUser(token) {
      try {
        const response = await fetch(
          `${apiUrl}user/getprofile?token=${token}`,
          {
            method: "GET",
          }
        );
        if (response) {
          const data = await response.json();
          this.user = data;
        } else {
          alert("error");
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
      }
    },
  },
  mounted() {
    try {
      this.token = getString("token");
      if (!this.token || this.token == "") {
        // alert("Please login");
      } else {
        this.fetchData();
        this.fetchUser(this.token);
      }
    } catch (error) {
      alert(error);
    }
  },
};
</script>
