<template>
    <StackLayout width="100%" height="100%">
        <GridLayout rows="*, *, auto">
            <StackLayout row="2" flexDirection="column" orientation="vertical" marginTop="40">
                <ScrollView>
                    <!-- Add the 'v-if' directive to display products only when there are products -->
                    <StackLayout class="card-body" justifyContent="space-around" alignItems="center"
                        v-if="comments && comments.length > 0">
                        <CommentBox v-for="comment of comments" :key="comment.id" :comment="comment" :product="product" />
                    </StackLayout>
                    <!-- Display a message when there are no products -->
                    <Label v-else class="info" text="No products available" />
                </ScrollView>
            </StackLayout>
        </GridLayout>
    </StackLayout>
</template>

<script>
import { apiUrl } from "~/config/config";
import { getString } from "@nativescript/core/application-settings";
import CommentBox from "./CommentBox";

export default {
    data() {
        return {
            comments: [],
        }
    },
    components: {
        CommentBox
    },
    props: ["product"],
    methods: {
        async loadComments() {
            try {
                const response = await fetch(`${apiUrl}products/${this.product.id}/comments/`, {
                    method: "GET",
                });
                if (response) {
                    this.comments = await response.json();
                } else {
                    console.log("Error in fetching data");
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    watch: {
        product: {
            immediate: true, // This ensures that the loadComments() function is called when the component is first mounted
            handler() {
                if (this.product) {
                    this.loadComments();
                }
            }
        }
    }
}
</script>
