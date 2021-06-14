import AuthService from '../../services/auth.service'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }



const state = initialState

const getters = {
  // isVisibleFooter: (state) => state.show,
  // isAppFooter: (state) => state.app,
  // isFixedFooter: (state) => state.fixed,
  // isAbsoluteFooter: (state) => state.absolute,
  // isInsetFooter: (state) => state.inset,
  // isPadlessFooter: (state) => state.padless,
};

const mutations = {
  loginSuccess (state, user) {
    state.status.loggedIn = true
    state.user = user
  },
  loginFailure (state) {
    state.status.loggedIn = false
    state.user = null
  },
  logout (state) {
    state.status.loggedIn = false
    state.user = null
  },
  registerSuccess (state) {
    state.status.loggedIn = false
  },
  registerFailure (state) {
    state.status.loggedIn = false
  }
};

const actions = {
  login ({ commit }, user) {
    return AuthService.login(user).then(
      user => {
        console.log(user)
        console.log("Action" + user)
        commit('loginSuccess', user)
        return Promise.resolve(user)
      },
      error => {
        commit('loginFailure')
        return Promise.reject(error)
      }
    )
  },
  logout ({ commit }) {
    AuthService.logout()
    commit('logout')
  },
  register ({ commit }, user) {
    return AuthService.register(user).then(
      response => {
        commit('registerSuccess')
        return Promise.resolve(response.data)
      },
      error => {
        commit('registerFailure')
        return Promise.reject(error)
      }
    )
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
