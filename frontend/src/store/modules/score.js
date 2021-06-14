import ScoreService from '../../services/score.service'

const state = {
  scores: [],
  specificScores: [],
  createScoreSuccess: false,
  updateScoreSuccess: false,
  deleteScoreSuccess: false
}

const getters = {
  getScores: (state) => state.scores,
  getSpecificScores: (state) => state.specificScores,
  getCreateScoreSuccess: (state) => state.createScoreSuccess,
  getUpdateScoreSuccess: (state) => state.updateScoreSuccess,
  getDeleteScoreSuccess: (state) => state.deleteScoreSuccess
}

const mutations = {
  getScores(state, scores) {
    state.scores = scores
  },
  getSpecificScores(state, specificScores) {
    state.specificScores = specificScores
  },
  registerCreateScoreSuccess(state) {
    state.createScoreSuccess = true
  },
  registerCreateScoreFailure(state) {
    state.createScoreSuccess = false
  },
  resetCreateScoreSuccess(state) {
    state.createScoreSuccess = false
  },

  resetSpecificScores(state) {
    state.specificScores = []
  },

  registerUpdateScoreSuccess(state) {
    state.updateScoreSuccess = true
  },
  registerUpdateScoreFailure(state) {
    state.updateScoreSuccess = false
  },
  resetUpdateScoreSuccess(state) {
    state.updateScoreSuccess = false
  },

  registerDeleteScoreSuccess(state) {
    state.deleteScoreSuccess = true
  },
  registerDeleteScoreFailure(state) {
    state.deleteScoreSuccess = false
  },
  resetDeleteScoreSuccess(state) {
    state.deleteScoreSuccess = false
  }
}

const actions = {
  // Get all counties
  getScores({ commit }) {
    return ScoreService.getAllScores().then((res) => {
      commit('getScores', res.data.data)
      return Promise.resolve(res.data)
    })
  },
  getSpecificScores({ commit }, menteeId) {
    return ScoreService.getSpecificScores(menteeId).then((res) => {
      commit('getSpecificScores', res.data.data)
      return Promise.resolve(res.data)
    })
  },

  resetSpecificScores({ commit }) {
    commit('resetSpecificScores')
  },

  createScore({ commit }, score) {
    return ScoreService.createScore(score)
      .then((res) => {
        console.log(res)
        if (res.data.success === true) {
          commit('registerCreateScoreSuccess')
        } else if (res.data.success === false) {
          commit('registerCreateScoreFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerCreateScoreFailure')
      })
  },
  resetCreateScoreSuccess({ commit }) {
    commit('resetCreateScoreSuccess')
  },

  // Update county
  updateScore({ commit }, score) {
    return ScoreService.updateScore(score)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerUpdateScoreSuccess')
        } else if (res.data.success === false) {
          commit('registerUpdateScoreFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerUpdateScoreFailure')
      })
  },
  resetUpdateScoreSuccess({ commit }) {
    commit('resetUpdateScoreSuccess')
  },

  // Delete county
  deleteScore({ commit }, scoreId) {
    return ScoreService.deleteScore(scoreId)
      .then((res) => {
        if (res.data.success === true) {
          commit('registerDeleteScoreSuccess')
        } else if (res.data.success === false) {
          commit('registerDeleteScoreFailure')
        }
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        commit('registerDeleteScoreFailure')
      })
  },
  resetDeleteScoreSuccess({ commit }) {
    commit('resetDeleteScoreSuccess')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
