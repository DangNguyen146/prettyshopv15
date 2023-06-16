<template>
  <StackLayout class="dropdown-container" marginLeft="350">

    <ListView class="dropdown-menu" v-for="item of items" @itemTap="selectItem">
      <v-template>
        <WrapLayout rows="auto" columns="*" class="dropdown-item">
          <Label :text="item.label" class="dropdown-item-label" />
          <Label :text="item.value" class="dropdown-item-value" />
        </WrapLayout>
      </v-template>
    </ListView>
  </StackLayout>
</template>

<script>
export default {
  props: {
    temp: null,
    items: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Select item",
    },
    selectedItem: {
      type: String,
      default: "",
    },
  },
  methods: {

    selectItem(args) {
      this.$emit("update:selectedItem", args.item);
    },
  },
};
</script>

<style scoped>
.dropdown-container {
  width: 100%;
  position: relative;
}

.dropdown {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  background-color: rgb(255, 255, 255);
}

.dropdown-label {
  font-size: 16;
}

.dropdown-arrow {
  font-size: 18;
  color: #ccc;
  text-align: right;
}

.dropdown-menu {
  border: 1px solid #969696;
  border-radius: 4px;
  background-color: rgb(135, 183, 255);
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 999;
  height: 200;
}

.dropdown-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.dropdown-item-label {
  font-size: 16;
}

.dropdown-item:last-child {
  border-bottom: none;
}
</style>
