
<template>
    <Page>
        <ActionBar class="action-bar">
            <NavigationButton visibility="hidden" />
            <GridLayout columns="auto, *, auto">
                <Image src="https://prettyshopfemobilev2.vercel.app/icon/house.png" class="fas left-aligned"
                    @tap="onBackHome" col="0" />
                <Label text="Shipment Details" col="1" />
                <!-- <Image src="https://prettyshopfemobilev2.vercel.app/icon/house.png" class="fas"   @tap="onBackHome" col="2"   /> -->
            </GridLayout>
        </ActionBar>
        <WebView :src="url" @loadFinished="onLoadFinished" @loadStarted="onLoadStarted" />

    </Page>
</template>

<script>
import Home from "~/components/Home";
import { getString } from "@nativescript/core/application-settings";
import PaySuccess from "./PaySuccess";
import { apiUrl } from "~/config/config";


export default {
    props: ["id"],
    data() {
        return {
            url: "https://prettyshopfemobilev2.vercel.app/checkoutmobile/" + getString('sessionId'),
        }
    },

    methods: {
        onBackHome() {
            this.$navigateTo(Home, {
                clearHistory: true
            })
        },
        async onLoadFinished(args) {
            const url = args.url;
            if (url == "https://prettyshopfemobilev2.vercel.app/payment/success") {
                try {
                    const response = await fetch(`${apiUrl}order/${this.id}/payment?token=${getString("token")}`, {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            status: true
                        })
                    });
                    if (response) {
                        alert(JSON.stringify(response))
                        alert({
                            title: "State payment",
                            message: "Payment success, please backhome and check cart! <3",
                            okButtonText: "Back home"
                        }).then(() => {
                            this.$navigateTo(Home, {
                                clearHistory: true
                            })
                        });
                    }
                }
                catch (error) { }
            };
        },
        // onLoadStarted(args) {
        //     const url = args.url;

        //     if (url == "https://prettyshopfemobilev2.vercel.app/payment/success") {
        //         checkSuccess()
        //     };
        // }
    },
    watch: {

    }
}
</script>


