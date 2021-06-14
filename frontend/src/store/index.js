import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import sidebar from './modules/sidebar'
import header from './modules/header'
import footer from './modules/footer'
import translation from './modules/translation'
// import { auth } from './modules/auth.module'
import auth from './modules/auth'
import county from './modules/county'
import subcounty from './modules/subcounty'
import facility from './modules/facility'
import signalfunction from './modules/signalfunction'
import mentor from './modules/mentor'
import mentee from './modules/mentee'
import score from './modules/score'
import session from './modules/session'
import theme from './modules/theme'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters,
  mutations,
  actions,
  modules: {
    navigations: {
      namespaced: true,
      modules: {
        header,
        sidebar,
        footer
      }
    },
    scheme: {
      namespaced: true,
      modules: {
        theme
      }
    },
    translation,
    auth,
    county,
    subcounty,
    facility,
    signalfunction,
    mentor,
    mentee,
    score,
    session
  }
})
