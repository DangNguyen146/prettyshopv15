<template>
    <GridLayout rows="auto, auto, auto, *, auto" class="nt-drawer__content">
        <StackLayout row="0" class="nt-drawer__header" v-if="!user">
            <Image class="nt-drawer__header-image fas t-36" src.decode="font://&#xf2bd;" />
            <Label class="nt-drawer__header-brand" text="User Name" />
            <Label class="nt-drawer__header-footnote" text="username@mail.com" />
        </StackLayout>
        <StackLayout row="1" class="nt-drawer__header" v-if="user">
            <Image class="nt-drawer__header-image fas t-36" src.decode="font://&#xf2bd;" />
            <Label class="nt-drawer__header-brand" :text="user.lastName" />
            <Label class="nt-drawer__header-footnote" :text="user.email" />
        </StackLayout>
        <StackLayout row="2"  borderRadius="10" shadowColor="#000000" shadowOffsetHeight="5"
            shadowOpacity="0.5">
            <Button width="100%" class="submit-button p-r-10" text="Change password" @tap="btnChangePass" />
            <Button width="100%" class="submit-button p-r-10" text="Change profile" @tap="btnChangeProfile" />
        </StackLayout>
        <StackLayout row="3"  borderRadius="10" shadowColor="#000000" shadowOffsetHeight="5"
            shadowOpacity="0.5">
            <Button width="100%" class="submit-button p-r-10" text="View Policy" @tap="btnPolicy" />
        </StackLayout>
        <StackLayout row="4"  borderRadius="10" shadowColor="#000000" shadowOffsetHeight="5"
            shadowOpacity="0.5">
            <Button width="100%" class="submit-button p-r-10" text="Logout" @tap="btnLogout" />
        </StackLayout>
    </GridLayout>
</template>
<script>
import { apiUrl } from '~/config/config';
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
                clearHistory: true
            });
        },
        async fetchData() { },
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
                const response = await fetch(`${apiUrl}user/getprofile?token=${token}`, {
                    method: "GET",
                });
                if (response) {
                    const data = await response.json();
                    this.user = data;
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
        }
    },
    mounted() {
        try {
            this.token = getString("token");
            if (!this.token || this.token == "") {
                // alert("Please login");
            }
            else {
                this.fetchData();
                this.fetchUser(this.token);
            }
        }
        catch (error) {
            alert(error);
        }
    },
}
</script>