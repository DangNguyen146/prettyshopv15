<template>
    <Page>
        <ActionBar class="action-bar">
            <NavigationButton visibility="hidden" />
            <GridLayout columns="50, *">
                <Label class="action-bar-title" text="Home" colSpan="2" />

                <Label class="fas" text.decode="&#xf00c;" @tap="onBackHome" />
            </GridLayout>
        </ActionBar>
        <WebView :src="url" />

    </Page>
</template>

<script>
import Home from "../Home.vue";
import { getString } from "@nativescript/core/application-settings";

export default {
    data() {
        return {
            url: "https://prettyshopfemobilev2.vercel.app/checkoutmobile/" + getString('token'),
        }
    },
    methods:{
        onBackHome(){
            this.$navigateTo(Home, {
              clearHistory: true
            });
        }
    }
}
</script>