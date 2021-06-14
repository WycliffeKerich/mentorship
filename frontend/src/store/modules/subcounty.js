import SubCountyService from '../../services/subcounty.service'

const state = {
  subCounties: [],
  createSubCountySuccess: false,
  updateSubCountySuccess: false,
  deleteSubCountySuccess: false
}

const getters = {
  getSubCounties: (state) => state.subCounties,
  getCreateSubCountySuccess: (state) => state.createSubCountySuccess,
  getUpdateSubCountySuccess: (state) => state.updateSubCountySuccess,
  getDeleteSubCountySuccess: (state) => state.deleteSubCountySuccess
}

const mutations = {
  getSubCounties(state, subCounties) {
    state.subCounties = subCounties
  },
  registerCreateSubCountySuccess(state) {
    state.createSubCountySuccess = true
  },
  registerCreateSubCountyFailure(state) {
    state.createSubCountySuccess = false
  },
  resetCreateSubCountySuccess(state) {
    state.createSubCountySuccess = false
  },

  registerUpdateSubCountySuccess(state) {
    state.updateSubCountySuccess = true
  },
  registerUpdateSubCountyFailure(state) {
    state.updateSubCountySuccess = false
  },
  resetUpdateSubCountySuccess(state) {
    state.updateSubCountySuccess = false
  },

  registerDeleteSubCountySuccess(state) {
    state.deleteSubCountySuccess = true
  },
  registerDeleteSubCountyFailure(state) {
    state.deleteSubCountySuccess = false
  },
  resetDeleteSubCountySuccess(state) {
    state.deleteSubCountySuccess = false
  }
}

const actions = {
  // Get all counties
  getSubCounties({ commit }) {
    return SubCountyService.getAllSubCounties().then((res) => {
      commit('getSubCounties', res.data.data)
      return Promise.resolve(res.data)
    })
  },
  createSubCounty({ commit }, subCounty) {
    return SubCountyService.createSubCounty(subCounty)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerCreateSubCountySuccess')
        } else if (res.data.success === false) {
          commit('registerCreateSubCountyFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerCreateSubCountyFailure')
      })
  },
  resetCreateSubCountySuccess({ commit }) {
    commit('resetCreateSubCountySuccess')
  },

  // Update county
  updateSubCounty({ commit }, subCounty) {
    return SubCountyService.updateSubCounty(subCounty)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerUpdateSubCountySuccess')
        } else if (res.data.success === false) {
          commit('registerUpdateSubCountyFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerUpdateSubCountyFailure')
      })
  },
  resetUpdateSubCountySuccess({ commit }) {
    commit('resetUpdateSubCountySuccess')
  },

  // Delete county
  deleteSubCounty({ commit }, subCountyId) {
    return SubCountyService.deleteSubCounty(subCountyId)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerDeleteSubCountySuccess')
        } else if (res.data.success === false) {
          commit('registerDeleteSubCountyFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerDeleteSubCountyFailure')
      })
  },
  resetDeleteSubCountySuccess({ commit }) {
    commit('resetDeleteSubCountySuccess')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
