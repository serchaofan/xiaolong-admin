import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import namespace from "@/store/modules/namespace";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    namespace
  },
  getters
})

export default store
