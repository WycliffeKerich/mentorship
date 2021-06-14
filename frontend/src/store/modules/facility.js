import FacilityService from '../../services/facility.service'

const state = {
  facilities: [],
  createFacilitySuccess: false,
  updateFacilitySuccess: false,
  deleteFacilitySuccess: false
}

const getters = {
  getFacilities: (state) => state.facilities,
  getCreateFacilitySuccess: (state) => state.createFacilitySuccess,
  getUpdateFacilitySuccess: (state) => state.updateFacilitySuccess,
  getDeleteFacilitySuccess: (state) => state.deleteFacilitySuccess
}

const mutations = {
  getFacilities(state, facilities) {
    state.facilities = facilities
  },
  registerCreateFacilitySuccess(state) {
    state.createFacilitySuccess = true
  },
  registerCreateFacilityFailure(state) {
    state.createFacilitySuccess = false
  },
  resetCreateFacilitySuccess(state) {
    state.createFacilitySuccess = false
  },

  registerUpdateFacilitySuccess(state) {
    state.updateFacilitySuccess = true
  },
  registerUpdateFacilityFailure(state) {
    state.updateFacilitySuccess = false
  },
  resetUpdateFacilitySuccess(state) {
    state.updateFacilitySuccess = false
  },

  registerDeleteFacilitySuccess(state) {
    state.deleteFacilitySuccess = true
  },
  registerDeleteFacilityFailure(state) {
    state.deleteFacilitySuccess = false
  },
  resetDeleteFacilitySuccess(state) {
    state.deleteFacilitySuccess = false
  }
}

const actions = {
  // Get all counties
  getFacilities({ commit }) {
    return FacilityService.getAllFacilities().then((res) => {
      commit('getFacilities', res.data.data)
      return Promise.resolve(res.data)
    })
  },
  createFacility({ commit }, facility) {
    return FacilityService.createFacility(facility)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerCreateFacilitySuccess')
        } else if (res.data.success === false) {
          commit('registerCreateFacilityFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerCreateFacilityFailure')
      })
  },
  resetCreateFacilitySuccess({ commit }) {
    commit('resetCreateFacilitySuccess')
  },

  // Update county
  updateFacility({ commit }, facility) {
    return FacilityService.updateFacility(facility)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerUpdateFacilitySuccess')
        } else if (res.data.success === false) {
          commit('registerUpdateFacilityFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerUpdateFacilityFailure')
      })
  },
  resetUpdateFacilitySuccess({ commit }) {
    commit('resetUpdateFacilitySuccess')
  },

  // Delete county
  deleteFacility({ commit }, facilityId) {
    return FacilityService.deleteFacility(facilityId)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerDeleteFacilitySuccess')
        } else if (res.data.success === false) {
          commit('registerDeleteFacilityFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerDeleteFacilityFailure')
      })
  },
  resetDeleteFacilitySuccess({ commit }) {
    commit('resetDeleteFacilitySuccess')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
