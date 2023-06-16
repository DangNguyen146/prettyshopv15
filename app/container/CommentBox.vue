<template>
  <GridLayout
    columns="auto, *"
    class="comment-box"
    borderWidth="1"
    borderColor="#eee"
    borderRadius="5"
    padding="10"
    v-if="deleteVIF == 0"
  >
    <StackLayout col="0" class="product-image" marginRight="5" width="10%">
      <Image
        src="data:image/png;base64,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"
        stretch="aspectFit"
      />
    </StackLayout>
    <StackLayout col="1" class="product-details" width="80%">
      <Label
        :text="comment.user.lastName + ' id:' + comment.user.id"
        fontSize="subtitle"
        fontWeight="bold"
        marginBottom="5"
      />
      <WrapLayout itemSpacing="12" class="star-container">
        <Label
          row="0"
          col="1"
          class="star"
          borderColor="#eee"
          borderRadius="5"
          padding="10"
          fontSize="24"
          :text="comment.rating >= 1 ? ' ⭐ ' : ''"
        />
        <Label
          row="1"
          col="1"
          class="star"
          borderColor="#eee"
          borderRadius="5"
          padding="10"
          fontSize="24"
          :text="comment.rating >= 2 ? ' ⭐ ' : ''"
        />
        <Label
          row="2"
          col="1"
          class="star"
          borderColor="#eee"
          borderRadius="5"
          padding="10"
          fontSize="24"
          :text="comment.rating >= 3 ? ' ⭐ ' : ''"
        />
        <Label
          row="3"
          col="1"
          class="star"
          borderColor="#eee"
          borderRadius="5"
          padding="10"
          fontSize="24"
          :text="comment.rating >= 4 ? ' ⭐ ' : ''"
        />
        <Label
          row="4"
          col="1"
          class="star"
          borderColor="#eee"
          borderRadius="5"
          padding="10"
          fontSize="24"
          :text="comment.rating >= 5 ? ' ⭐ ' : ''"
        />
      </WrapLayout>
      <!-- <Label :text="comment.rating" fontSize="subtitle" color="red" marginBottom="5" /> -->
      <Label :text="comment.content" />
      <StackLayout row="5" col="1" class="product-details" width="80%">
        <Button
          text="Edit"
          borderRadius="100"
          backgroundColor="green"
          fontWeight="bold"
          marginRight="5"
          boxShadow="0 8 15 rgba(0, 0, 0, 0.2)"
          color="white"
          @tap="onEdit"
          v-if="comment.user.id === userID && !editing"
        />
        <Button
          text="Delete"
          marginRight="5"
          borderRadius="100"
          backgroundColor="red"
          fontWeight="bold"
          boxShadow="0 8 15 rgba(0, 0, 0, 0.2)"
          color="white"
          v-if="comment.user.id === userID && !editing"
          @tap="onDelete"
        />
      </StackLayout>
      <StackLayout
        row="6"
        col="1"
        class="comment-container"
        @loaded="initComment"
        v-if="editing"
      >
        <Label text="Comment:" class="comment-label" />
        <TextField
          class="comment-field"
          hint="Type your comment here"
          returnKeyType="done"
          :text="comment.content"
          @textChange="onCommentChange"
        />
        <Button
          text="Save"
          fontWeight="bold"
          marginRight="5"
          color="#000"
          @tap="onSave"
        />
      </StackLayout>
    </StackLayout>
  </GridLayout>
</template>

<script>
import { apiUrl } from "~/config/config";
import { getString } from "@nativescript/core/application-settings";

export default {
  props: ["comment", "product", "userID"],
  data() {
    return {
      editing: false,
      commentInput: "",
      commentedit: null,
      deleteVIF: 0,
    };
  },
  methods: {
    onEdit() {
      this.editing = true;
      this.commentInput = this.comment.content;
    },
    async onDelete() {
      try {
        const response = await fetch(
          `${apiUrl}products/${this.product.id}/comments/${
            this.comment.id
          }?token=${getString("token")}`,
          {
            method: "DELETE",
          }
        );
        if (response) {
          this.deleteVIF = 1;
          alert("Success");
        } else {
          alert("error");
        }
      } catch (error) {
        // alert(JSON.stringify(error));
        if (error.message === "Failed to fetch") {
          alert(
            "Unable to connect to server. Please check your internet connection and try again."
          );
        } else {
          alert("An error occurred. Please try again later.");
        }
      }
    },
    onCommentChange(args) {
      this.commentInput = args.object.text;
    },
    async onSave() {
      try {
        this.commentedit = this.comment;
        this.commentedit.content = this.commentInput;
        this.commentedit = Object.assign({}, this.commentedit);

        const response = await fetch(
          `${apiUrl}products/${this.product.id}/comments/${
            this.comment.id
          }?token=${getString("token")}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.commentedit),
          }
        );

        if (response) {
          alert("Success");
        } else {
          alert("error");
        }
      } catch (error) {
        // alert(JSON.stringify(error));
        if (error.message === "Failed to fetch") {
          alert(
            "Unable to connect to server. Please check your internet connection and try again."
          );
        } else {
          alert("An error occurred. Please try again later.");
        }
      }
      this.editing = false;
    },
  },
};
</script>

<style>
.comment {
  border-radius: 0.5rem;
  box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07),
    0 10px 20px -2px rgba(0, 0, 0, 0.04);
}
</style>
