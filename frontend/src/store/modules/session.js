import SessionService from '../../services/session.service'

const state = {
  sessions: [],
  specificSessions: [],
  createSessionSuccess: false,
  updateSessionSuccess: false,
  deleteSessionSuccess: false
}

const getters = {
  getSessions: (state) => state.sessions,
  getSpecificSessions: (state) => state.specificSessions,
  getCreateSessionSuccess: (state) => state.createSessionSuccess,
  getUpdateSessionSuccess: (state) => state.updateSessionSuccess,
  getDeleteSessionSuccess: (state) => state.deleteSessionSuccess
}

const mutations = {
  getSessions(state, sessions) {
    state.sessions = sessions
  },
  getSpecificSessions(state, specificSessions) {
    state.specificSessions = specificSessions
  },
  registerCreateSessionSuccess(state) {
    state.createSessionSuccess = true
  },
  registerCreateSessionFailure(state) {
    state.createSessionSuccess = false
  },
  resetCreateSessionSuccess(state) {
    state.createSessionSuccess = false
  },

  resetSpecificSessions(state) {
    state.specificSessions = []
  },

  registerUpdateSessionSuccess(state) {
    state.updateSessionSuccess = true
  },
  registerUpdateSessionFailure(state) {
    state.updateSessionSuccess = false
  },
  resetUpdateSessionSuccess(state) {
    state.updateSessionSuccess = false
  },

  registerDeleteSessionSuccess(state) {
    state.deleteSessionSuccess = true
  },
  registerDeleteSessionFailure(state) {
    state.deleteSessionSuccess = false
  },
  resetDeleteSessionSuccess(state) {
    state.deleteSessionSuccess = false
  }
}

const actions = {
  // Get all counties
  getSessions({ commit }) {
    return SessionService.getAllSessions().then((res) => {
      commit('getSessions', res.data.data)
      return Promise.resolve(res.data)
    })
  },
  getSpecificSessions({ commit }, menteeId) {
    return SessionService.getSpecificSessions(menteeId).then((res) => {
      commit('getSpecificSessions', res.data.data)
      return Promise.resolve(res.data)
    })
  },

  resetSpecificSessions({ commit }) {
    commit('resetSpecificSessions')
  },

  createSession({ commit }, session) {
    return SessionService.createSession(session)
      .then((res) => {
        console.log(res)
        if (res.data.success === true) {
          commit('registerCreateSessionSuccess')
        } else if (res.data.success === false) {
          commit('registerCreateSessionFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerCreateSessionFailure')
      })
  },
  resetCreateSessionSuccess({ commit }) {
    commit('resetCreateSessionSuccess')
  },

  // Update county
  updateSession({ commit }, session) {
    return SessionService.updateSession(session)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerUpdateSessionSuccess')
        } else if (res.data.success === false) {
          commit('registerUpdateSessionFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerUpdateSessionFailure')
      })
  },
  resetUpdateSessionSuccess({ commit }) {
    commit('resetUpdateSessionSuccess')
  },

  // Delete county
  deleteSession({ commit }, sessionId) {
    return SessionService.deleteSession(sessionId)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerDeleteSessionSuccess')
        } else if (res.data.success === false) {
          commit('registerDeleteSessionFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerDeleteSessionFailure')
      })
  },
  resetDeleteSessionSuccess({ commit }) {
    commit('resetDeleteSessionSuccess')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
