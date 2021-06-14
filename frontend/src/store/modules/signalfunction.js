import SignalFunctionService from '../../services/signalfunction.service'

const state = {
  signalFunctions: [],
  createSignalFunctionSuccess: false,
  updateSignalFunctionSuccess: false,
  deleteSignalFunctionSuccess: false
}

const getters = {
  getSignalFunctions: (state) => state.signalFunctions,
  getCreateSignalFunctionSuccess: (state) => state.createSignalFunctionSuccess,
  getUpdateSignalFunctionSuccess: (state) => state.updateSignalFunctionSuccess,
  getDeleteSignalFunctionSuccess: (state) => state.deleteSignalFunctionSuccess
}

const mutations = {
  getSignalFunctions(state, signalFunctions) {
    state.signalFunctions = signalFunctions
  },
  registerCreateSignalFunctionSuccess(state) {
    state.createSignalFunctionSuccess = true
  },
  registerCreateSignalFunctionFailure(state) {
    state.createSignalFunctionSuccess = false
  },
  resetCreateSignalFunctionSuccess(state) {
    state.createSignalFunctionSuccess = false
  },

  registerUpdateSignalFunctionSuccess(state) {
    state.updateSignalFunctionSuccess = true
  },
  registerUpdateSignalFunctionFailure(state) {
    state.updateSignalFunctionSuccess = false
  },
  resetUpdateSignalFunctionSuccess(state) {
    state.updateSignalFunctionSuccess = false
  },

  registerDeleteSignalFunctionSuccess(state) {
    state.deleteSignalFunctionSuccess = true
  },
  registerDeleteSignalFunctionFailure(state) {
    state.deleteSignalFunctionSuccess = false
  },
  resetDeleteSignalFunctionSuccess(state) {
    state.deleteSignalFunctionSuccess = false
  }
}

const actions = {
  // Get all counties
  getSignalFunctions({ commit }) {
    return SignalFunctionService.getAllSignalFunctions().then((res) => {
      commit('getSignalFunctions', res.data.data)
      return Promise.resolve(res.data)
    })
  },
  createSignalFunction({ commit }, signalFunction) {
    return SignalFunctionService.createSignalFunction(signalFunction)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerCreateSignalFunctionSuccess')
        } else if (res.data.success === false) {
          commit('registerCreateSignalFunctionFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerCreateSignalFunctionFailure')
      })
  },
  resetCreateSignalFunctionSuccess({ commit }) {
    commit('resetCreateSignalFunctionSuccess')
  },

  // Update SignalFunction
  updateSignalFunction({ commit }, signalFunction) {
    return SignalFunctionService.updateSignalFunction(signalFunction)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerUpdateSignalFunctionSuccess')
        } else if (res.data.success === false) {
          commit('registerUpdateSignalFunctionFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerUpdateSignalFunctionFailure')
      })
  },
  resetUpdateSignalFunctionSuccess({ commit }) {
    commit('resetUpdateSignalFunctionSuccess')
  },

  // Delete SignalFunction
  deleteSignalFunction({ commit }, signalFunctionId) {
    return SignalFunctionService.deleteSignalFunction(signalFunctionId)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerDeleteSignalFunctionSuccess')
        } else if (res.data.success === false) {
          commit('registerDeleteSignalFunctionFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerDeleteSignalFunctionFailure')
      })
  },
  resetDeleteSignalFunctionSuccess({ commit }) {
    commit('resetDeleteSignalFunctionSuccess')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
