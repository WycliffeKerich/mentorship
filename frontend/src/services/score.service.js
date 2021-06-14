import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:5000/api/v1/scores'

class ScoreService {
  getAllScores() {
    return axios.get(API_URL)
  }

  getSpecificScores(menteeId) {
    return axios.get(API_URL + `?menteeId=${menteeId}`)
  }

  getScore(scoreId) {
    return axios.get(API_URL + `/${scoreId}`, { headers: authHeader() })
  }

  createScore(score) {
    return axios.post(API_URL, score, {
      headers: authHeader()
    })
  }

  updateScore(score) {
    return axios.put(API_URL + `/${score.id}`, score, {
      headers: authHeader()
    })
  }

  deleteScore(scoreId) {
    return axios.delete(API_URL + `/${scoreId}`, { headers: authHeader() })
  }
}

export default new ScoreService()
