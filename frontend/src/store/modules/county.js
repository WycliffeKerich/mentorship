import AuthService from '../../services/auth.service'
import CountyService from '../../services/county.service'

// const user = JSON.parse(localStorage.getItem('user'))
// const initialState = user
//   ? { status: { loggedIn: true }, user }
//   : { status: { loggedIn: false }, user: null }

// const state = initialState

const state = {
  counties: [],
  createCountySuccess: false,
  updateCountySuccess: false,
  deleteCountySuccess: false
}

const getters = {
  getCounties: (state) => state.counties,
  getCreateCountySuccess: (state) => state.createCountySuccess,
  getUpdateCountySuccess: (state) => state.updateCountySuccess,
  getDeleteCountySuccess: (state) => state.deleteCountySuccess
}

const mutations = {
  getCounties(state, counties) {
    state.counties = counties
  },
  registerCreateCountySuccess(state) {
    state.createCountySuccess = true
  },
  registerCreateCountyFailure(state) {
    state.createCountySuccess = false
  },
  resetCreateCountySuccess(state) {
    state.createCountySuccess = false
  },

  registerUpdateCountySuccess(state) {
    state.updateCountySuccess = true
  },
  registerUpdateCountyFailure(state) {
    state.updateCountySuccess = false
  },
  resetUpdateCountySuccess(state) {
    state.updateCountySuccess = false
  },

  registerDeleteCountySuccess(state) {
    state.deleteCountySuccess = true
  },
  registerDeleteCountyFailure(state) {
    state.deleteCountySuccess = false
  },
  resetDeleteCountySuccess(state) {
    state.deleteCountySuccess = false
  },

  loginFailure(state) {
    state.status.loggedIn = false
    state.user = null
  },
  logout(state) {
    state.status.loggedIn = false
    state.user = null
  },
  registerSuccess(state) {
    state.status.loggedIn = false
  },
  registerFailure(state) {
    state.status.loggedIn = false
  }
}

const actions = {
  // Get all counties
  getCounties({ commit }) {
    return CountyService.getAllCounties().then((res) => {
      commit('getCounties', res.data.data)
      return Promise.resolve(res.data)
    })
  },
  createCounty({ commit }, county) {
    return CountyService.createCounty(county)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerCreateCountySuccess')
        } else if (res.data.success === false) {
          commit('registerCreateCountyFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerCreateCountyFailure')
      })
  },
  resetCreateCountySuccess({ commit }) {
    commit('resetCreateCountySuccess')
  },

  // Update county
  updateCounty({ commit }, county) {
    return CountyService.updateCounty(county)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerUpdateCountySuccess')
        } else if (res.data.success === false) {
          commit('registerUpdateCountyFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerUpdateCountyFailure')
      })
  },
  resetUpdateCountySuccess({ commit }) {
    commit('resetUpdateCountySuccess')
  },

  // Delete county
  deleteCounty({ commit }, countyId) {
    return CountyService.deleteCounty(countyId)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerDeleteCountySuccess')
        } else if (res.data.success === false) {
          commit('registerDeleteCountyFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerDeleteCountyFailure')
      })
  },
  resetDeleteCountySuccess({ commit }) {
    commit('resetDeleteCountySuccess')
  },

  logout({ commit }) {
    AuthService.logout()
    commit('logout')
  },
  register({ commit }, user) {
    return AuthService.register(user).then(
      (response) => {
        commit('registerSuccess')
        return Promise.resolve(response.data)
      },
      (error) => {
        commit('registerFailure')
        return Promise.reject(error)
      }
    )
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
