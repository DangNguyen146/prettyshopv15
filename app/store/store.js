// It seems that the error is caused by not calling Vue.use(Vuex) before creating a store instance.
// You can fix this by adding Vue.use(Vuex) before creating the store instance.

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state() {
    // định nghĩa state
    return {
      count: 0,
      countCart: 0,
      userProfile: {},
    }
  },
  mutations: {
    // định nghĩa mutations
    increment(state, value = 0) {
      if (value != 0) {
        state.count = value;
      }
      else
        state.count++;
    },
    incrementCart(state, payload) {
      if (payload.callapi != 0) {
        state.countCart = payload.callapi;
      }
      else
        state.countCart += payload.value;
    },
    saveUser(state, payload) {
      state.userProfile = payload.payload;
    }
  },
  actions: {
    // định nghĩa actions
    increment({ commit }, value) {
      commit('increment', value);
    },
    incrementCart({ commit }, payload) {
      commit('incrementCart', payload);
    },
    saveUser({ commit }, payload) {
      commit('saveUser', payload);
    },
  },
  getters: {
    // định nghĩa getters
    getCount: (state) => {
      return state.count;
    },
    getCountCart: (state) => {
      ;
      return state.countCart
    },
    getUser: (state) => {
      return state.userProfile;
    }
  }
});

export default store;
