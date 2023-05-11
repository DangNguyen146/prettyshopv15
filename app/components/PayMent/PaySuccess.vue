<template>
    <Page>
        <ActionBar class="action-bar">
            <NavigationButton visibility="hidden" />
            <GridLayout columns="50, *">
                <Label class="action-bar-title" text="Pay check success" colSpan="2" />

                <Label class="fas" text.decode="&#xf00c;" @tap="onBackHome" />
            </GridLayout>
        </ActionBar>
        <StackLayout>
            <Button class="submit-button" text="Go home" @tap="onBackHome" />
        </StackLayout>

    </Page>
</template>

<script>
import Home from "../Home.vue";
import { setString, getString } from "@nativescript/core/application-settings";
import { apiUrl } from "~/config/config";

export default {
    data() {
        return {
            
        }
    },
    methods: {
        onBackHome() {
            this.$navigateTo(Home, {
                clearHistory: true
            });
        },
        async checkSuccess() {
            try {
                alert(`${apiUrl}order/add?token=${getString("token")}&sessionId=${getString("sessionId")}`);
                const response = await fetch(`${apiUrl}order/add?token=${getString("token")}&sessionId=${getString("sessionId")}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (response) {
                    alert(JSON.stringify(response));
                }
                else {
                    alert("error");
                }
            }
            catch (error) {
                alert(error);
                if (error.message === "Failed to fetch") {
                    alert("Unable to connect to server. Please check your internet connection and try again.");
                }
                else {
                    alert("An error occurred. Please try again later.");
                }
            }

        },
       
    },
    mounted() {
        this.checkSuccess();
    }
}
</script>