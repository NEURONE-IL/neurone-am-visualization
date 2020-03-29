import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    configuration:{}, // Configuration parameters
    initTime: null // InitTime parameter
  },
  mutations: {

    // Update init Time 
    setInitTime(state,payload){
      console.log('setINittime',payload)
      let initTime=payload.initTime
      state.initTime=initTime
    },

    // Update configuration parameters
    setMetrics(state,payload){
      let conf=payload.configuration
      console.log("conf",conf)
      state.configuration= conf
    }
  },
  getters:{

    // Get global configuration object with parameters
    getConfiguration(state){
      return state.configuration
    },
    // Get init session time
    getInitTime(state){
      return state.initTime
    }

  },
  actions: {

  }
})
