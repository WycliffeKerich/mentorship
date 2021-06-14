import MenteeService from '../../services/mentee.service'

const state = {
  mentees: [],
  createMenteeSuccess: false,
  updateMenteeSuccess: false,
  deleteMenteeSuccess: false
}

const getters = {
  getMentees: (state) => state.mentees,
  getCreateMenteeSuccess: (state) => state.createMenteeSuccess,
  getUpdateMenteeSuccess: (state) => state.updateMenteeSuccess,
  getDeleteMenteeSuccess: (state) => state.deleteMenteeSuccess
}

const mutations = {
  getMentees(state, mentees) {
    state.mentees = mentees
  },
  registerCreateMenteeSuccess(state) {
    state.createMenteeSuccess = true
  },
  registerCreateMenteeFailure(state) {
    state.createMenteeSuccess = false
  },
  resetCreateMenteeSuccess(state) {
    state.createMenteeSuccess = false
  },

  registerUpdateMenteeSuccess(state) {
    state.updateMenteeSuccess = true
  },
  registerUpdateMenteeFailure(state) {
    state.updateMenteeSuccess = false
  },
  resetUpdateMenteeSuccess(state) {
    state.updateMenteeSuccess = false
  },

  registerDeleteMenteeSuccess(state) {
    state.deleteMenteeSuccess = true
  },
  registerDeleteMenteeFailure(state) {
    state.deleteMenteeSuccess = false
  },
  resetDeleteMenteeSuccess(state) {
    state.deleteMenteeSuccess = false
  }
}

const actions = {
  // Get all mentees
  getMentees({ commit }) {
    return MenteeService.getAllMentees().then((res) => {
      commit('getMentees', res.data.data)
      return Promise.resolve(res.data)
    })
  },
  createMentee({ commit }, mentee) {
    return MenteeService.createMentee(mentee)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerCreateMenteeSuccess')
        } else if (res.data.success === false) {
          commit('registerCreateMenteeFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerCreateMenteeFailure')
      })
  },
  resetCreateMenteeSuccess({ commit }) {
    commit('resetCreateMenteeSuccess')
  },

  // Update mentee
  updateMentee({ commit }, mentee) {
    return MenteeService.updateMentee(mentee)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerUpdateMenteeSuccess')
        } else if (res.data.success === false) {
          commit('registerUpdateMenteeFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerUpdateMenteeFailure')
      })
  },
  resetUpdateMenteeSuccess({ commit }) {
    commit('resetUpdateMenteeSuccess')
  },

  // Delete mentee
  deleteMentee({ commit }, menteeId) {
    return MenteeService.deleteMentee(menteeId)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerDeleteMenteeSuccess')
        } else if (res.data.success === false) {
          commit('registerDeleteMenteeFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerDeleteMenteeFailure')
      })
  },
  resetDeleteMenteeSuccess({ commit }) {
    commit('resetDeleteMenteeSuccess')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
