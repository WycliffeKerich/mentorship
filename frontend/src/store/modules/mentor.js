import MentorService from '../../services/mentor.service'

const state = {
  mentors: [],
  createMentorSuccess: false,
  updateMentorSuccess: false,
  deleteMentorSuccess: false
}

const getters = {
  getMentors: (state) => state.mentors,
  getCreateMentorSuccess: (state) => state.createMentorSuccess,
  getUpdateMentorSuccess: (state) => state.updateMentorSuccess,
  getDeleteMentorSuccess: (state) => state.deleteMentorSuccess
}

const mutations = {
  getMentors(state, mentors) {
    state.mentors = mentors
  },
  registerCreateMentorSuccess(state) {
    state.createMentorSuccess = true
  },
  registerCreateMentorFailure(state) {
    state.createMentorSuccess = false
  },
  resetCreateMentorSuccess(state) {
    state.createMentorSuccess = false
  },

  registerUpdateMentorSuccess(state) {
    state.updateMentorSuccess = true
  },
  registerUpdateMentorFailure(state) {
    state.updateMentorSuccess = false
  },
  resetUpdateMentorSuccess(state) {
    state.updateMentorSuccess = false
  },

  registerDeleteMentorSuccess(state) {
    state.deleteMentorSuccess = true
  },
  registerDeleteMentorFailure(state) {
    state.deleteMentorSuccess = false
  },
  resetDeleteMentorSuccess(state) {
    state.deleteMentorSuccess = false
  }
}

const actions = {
  // Get all mentors
  getMentors({ commit }) {
    return MentorService.getAllMentors().then((res) => {
      commit('getMentors', res.data.data)
      return Promise.resolve(res.data)
    })
  },
  createMentor({ commit }, mentor) {
    return MentorService.createMentor(mentor)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerCreateMentorSuccess')
        } else if (res.data.success === false) {
          commit('registerCreateMentorFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerCreateMentorFailure')
      })
  },
  resetCreateMentorSuccess({ commit }) {
    commit('resetCreateMentorSuccess')
  },

  // Update mentor
  updateMentor({ commit }, mentor) {
    return MentorService.updateMentor(mentor)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerUpdateMentorSuccess')
        } else if (res.data.success === false) {
          commit('registerUpdateMentorFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerUpdateMentorFailure')
      })
  },
  resetUpdateMentorSuccess({ commit }) {
    commit('resetUpdateMentorSuccess')
  },

  // Delete mentor
  deleteMentor({ commit }, mentorId) {
    return MentorService.deleteMentor(mentorId)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerDeleteMentorSuccess')
        } else if (res.data.success === false) {
          commit('registerDeleteMentorFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerDeleteMentorFailure')
      })
  },
  resetDeleteMentorSuccess({ commit }) {
    commit('resetDeleteMentorSuccess')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
