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
        <GridLayout class="page__content">
            <StackLayout class="form-container" row="0" margin="0 10 0 10">
                <Label class="label" text="Fullname:" />
                <TextField class="text-field" v-model="fullname"  autocapitalizationType="none" />

                <Label class="label" text="Address:" />
                <TextField class="text-field" v-model="addpress"  autocapitalizationType="none" />

                <Label class="label" text="Phone:" />
                <TextField class="text-field mb-20" v-model="phone" autocapitalizationType="none" />

                <GridLayout columns="*, *" height="200">
                    <StackLayout col="0" :class="'borderr ' + (selectedPage === 'shipcod' ? ' active' : '')" width="50%"
                        @tap="onChangeActive('shipcod')">
                        <Label class="label" text="Ship cod" />
                        <Label class="label-span" text="Payment on delivery" />
                        <Image src="https://prettyshopfemobilev2.vercel.app/img/cash-on-delivery.png" class="img" />

                    </StackLayout>
                    <StackLayout col="1" :class="'borderr ' + (selectedPage === 'payment' ? ' active' : '')" width="50%"
                        @tap="onChangeActive('payment')">
                        <Label class="label" text="Paypal" />
                        <Label class="label-span" text="Payment via paypal, visa" />
                        <Image src="https://prettyshopfemobilev2.vercel.app/img/cashless-payment.png" class="img" />
                    </StackLayout>
                </GridLayout>
                <StackLayout>
                    <Button class="submit-button" backgroundColor="BLACK" text="Submit" @tap="submitPayment" borderRadius="5"  marginTop="20" color="white" fontWeight="bold" />
                </StackLayout>
            </StackLayout>
        </GridLayout>

    </Page>
</template>

<script>
import { setString, getString } from "@nativescript/core/application-settings";
import { apiUrl } from "~/config/config";
import WebPayMent from './WebPayMent';
import Home from "~/components/Home";

export default {
    data() {
        return {
            url: "https://prettyshopfemobilev2.vercel.app/checkoutmobile/" + getString('token'),
            checkoutBodyArray: [], fullname: "Le Quang Huy", addpress: "Linh Trung, Thu Duc, TPHCM", phone: "0123456789", selectedPage: 'shipcod'
        }
    },
    methods: {
        onChangeActive(component) {
            this.selectedPage = component;
        },
        onBackHome() {
            this.$navigateTo(Home, {
                clearHistory: true
            })
        },
        
        
        async submitPayment() {
            if (this.selectedPage === 'payment') {
                try {
                    const response = await fetch(`${apiUrl}order/add?token=${getString("token")}&sessionId=${getString("sessionId")}`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            phone: this.phone,
                            fullname: this.fullname,
                            addpress: this.addpress,
                            shipcod: false
                        })
                    });
                    if (response) {
                        const data = await response.json();
                        const id = data.id;
                        // alert(JSON.stringify(data));
                        // alert(id);
                        this.$navigateTo(WebPayMent, {
                            props: {
                                id: id,
                            }
                        });
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

            } else {
                try {
                    const response = await fetch(`${apiUrl}order/add?token=${getString("token")}&sessionId=${getString("sessionId")}`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            phone: this.phone,
                            fullname: this.fullname,
                            addpress: this.addpress,
                            shipcod: "true"
                        })
                    });
                    if (response) {
                        // alert(JSON.stringify(response))
                        alert('Order is successful, please pay when you receive the goods');
                        this.$navigateTo(Home, {
                            clearHistory: true
                        });
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
            }
        }
    },
    mounted() {
        
    }
}
</script>
<style scoped lang="scss">
.fas {
    width: 24;
    // font-size: 24;
    // vertical-align: center;
}

.action-bar-title {
    font-size: 20;
    // text-align: center;
    // vertical-align: center;
}

.left-aligned {
    align-items: left;
}

.img {
    width: 50%;
    align-items: center;
}

.label {
    font-weight: 700;
    padding: 2;
    margin: 2;
}

.text-field {
    margin-bottom: 10;
}

.mb-20 {
    margin-bottom: 20;
}

.borderr {
    padding: 10;
    border: 1px solid #000;
    border-radius: 5;
}

.borderr.active {
    padding: 10;
    border-radius: 5;
    background-color: rgba(114, 251, 80, 0.2);
}
</style>

