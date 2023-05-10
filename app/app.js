import Vue from 'nativescript-vue'
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue'

import Vuex from 'vuex'

Vue.prototype.$localStorage = {
  getItem(key) {
    return global.android.context.getSharedPreferences('app', 0).getString(key, null)
  },
  setItem(key, value) {
    global.android.context.getSharedPreferences('app', 0).edit().putString(key, value).commit()
  },
  removeItem(key) {
    global.android.context.getSharedPreferences('app', 0).edit().remove(key).commit()
  }
}



Vue.use(RadSideDrawer)

import App from './components/App'

Vue.config.silent = !__DEV__

// Call Vue.use(Vuex) before the store is imported and created
Vue.use(Vuex);

import store from './store/store';

Vue.registerElement('Carousel', () => require('@nstudio/nativescript-carousel').Carousel);
Vue.registerElement('CarouselItem', () => require('@nstudio/nativescript-carousel').CarouselItem);



new Vue({
  store,
  render: h => h(App)
}).$start()
