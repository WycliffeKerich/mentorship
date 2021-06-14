import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:5000/api/v1/sessions'

class SessionService {
  getAllSessions() {
    return axios.get(API_URL)
  }

  getSpecificSessions(menteeId) {
    return axios.get(API_URL + `?menteeId=${menteeId}`)
  }

  getSession(sessionId) {
    return axios.get(API_URL + `/${sessionId}`, { headers: authHeader() })
  }

  createSession(session) {
    return axios.post(API_URL, session, {
      headers: authHeader()
    })
  }

  updateSession(session) {
    return axios.put(API_URL + `/${session.id}`, session, {
      headers: authHeader()
    })
  }

  deleteSession(sessionId) {
    return axios.delete(API_URL + `/${sessionId}`, { headers: authHeader() })
  }
}

export default new SessionService()
