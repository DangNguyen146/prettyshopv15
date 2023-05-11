<template>
    <!-- <GridLayout class="page__content"> -->
    <StackLayout rows="auto, auto, auto, auto, auto" columns="*, auto">
        <StackLayout row="0" col="0" rowSpan="5" @loaded="initRating">
            <Label text="Rating:" class="rating-label" />
            <WrapLayout itemSpacing="12" class="star-container">
                <Label row="0" col="1" class="star" @tap="selectRating(1)" borderColor="#eee" borderRadius="5" padding="10"
                    fontSize="24" :text="selectedRating >= 1 ? ' ⭐ ' : ' 🤍 '" />
                <Label row="1" col="1" class="star" @tap="selectRating(2)" borderColor="#eee" borderRadius="5" padding="10"
                    fontSize="24" :text="selectedRating >= 2 ? ' ⭐ ' : ' 🤍 '" />
                <Label row="2" col="1" class="star" @tap="selectRating(3)" borderColor="#eee" borderRadius="5" padding="10"
                    fontSize="24" :text="selectedRating >= 3 ? ' ⭐ ' : ' 🤍 '" />
                <Label row="3" col="1" class="star" @tap="selectRating(4)" borderColor="#eee" borderRadius="5" padding="10"
                    fontSize="24" :text="selectedRating >= 4 ? ' ⭐ ' : ' 🤍 '" />
                <Label row="4" col="1" class="star" @tap="selectRating(5)" borderColor="#eee" borderRadius="5" padding="10"
                    fontSize="24" :text="selectedRating >= 5 ? ' ⭐ ' : ' 🤍 '" />
            </WrapLayout>
        </StackLayout>
        <StackLayout row="1" col="1" class="comment-container" @loaded="initComment">
            <Label text="Comment:" class="comment-label" />
            <TextField class="comment-field" hint="Type your comment here" returnKeyType="done" :text="comment"
                @textChange="onCommentChange" />
        </StackLayout>
        <Button row="2" col="1" class="submit-button" text="Submit" @tap="addComment" />
        <ActivityIndicator row="3" col="1" class="activity-indicator" :busy="isLoading" />
    </StackLayout>
    <!-- </GridLayout> -->
</template>

<script>
import { Observable } from '@nativescript/core';
import { apiUrl } from '~/config/config';
import { getString } from "@nativescript/core/application-settings";

export default {
    data() {
        return {
            selectedRating: 0,
            comment: ''
        };
    }, 
    props: ["product"],
    methods: {
        initRating(args) {
            // Reset selected rating
            this.selectedRating = 0;
        },
        initComment(args) {
            // Reset comment
            this.comment = '';
        },
        selectRating(value) {
            // Select the rating value
            this.selectedRating = value;
        },
        onCommentChange(args) {
            const textField = args.object;
            this.comment = textField.text;
        },
        async addComment() {
            // Submit comment using this.selectedRating and this.comment
            try {
                const token = getString('token');
                // alert(JSON.stringify({
                //         content: this.comment,
                //         rating: this.selectedRating,
                //         product: {}
                //     }))
                const response = await fetch(`${apiUrl}products/${this.product.id}/comments?token=${token}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: this.comment,
                        rating: this.selectedRating,
                        product: {}
                    })
                });
                
                if (response) {
                    // alert(JSON.stringify(response))
                    if (this.response) {
                        alert("success")
                    } else {
                    }
                } else {
                    alert("Error in fetching data");
                }
            } catch (error) {
                alert("Error in fetching data", error);
            }
        }
    }
}
</script>
