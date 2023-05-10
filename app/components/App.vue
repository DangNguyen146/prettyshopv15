<template lang="html">
  <RadSideDrawer ref="drawer" drawerLocation="Left" gesturesEnabled="true" :drawerTransition="transition">
    <StackLayout ~drawerContent backgroundColor="#ffffff">
      <DrawerContent />
    </StackLayout>
    <Frame ~mainContent ref="drawerMainContent">
        <HomeVue />     
    </Frame>

  </RadSideDrawer>
</template>

<script>
import DrawerContent from './DrawerContent'
import HomeVue from './Home';
import { SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';


export default {
  data() {
    return {
      transition: new SlideInOnTopTransition(),
      token: null,
    }
  },

  components: {
    DrawerContent,
    HomeVue
  },
  
}
</script>

<style scoped lang="scss">
// Start custom common variables
@import '@nativescript/theme/scss/variables/blue';
// End custom common variables

// Custom styles
</style>

