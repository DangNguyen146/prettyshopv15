<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <NavigationButton visibility="hidden" />
      <GridLayout columns="50, *">
        <Label class="action-bar-title" text="Policy page" colSpan="2" />

        <!-- <Label class="fas" text.decode="&#xf0c9;" @tap="onDrawerButtonTap" /> -->
      </GridLayout>
    </ActionBar>


  </Page>
</template>
  
<script>


export default {
  data() {

  },
  computed: {
    message() {
      return "<!-- Page content goes here -->";
    }
  },
  methods: {
  }
};
</script>
  
<style scoped lang="scss">
// Start custom common variables
@import '@nativescript/theme/scss/variables/blue';
// End custom common variables

// Custom styles
</style>
  