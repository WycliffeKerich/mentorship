import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:5000/api/v1/mentees'

class MenteeService {
  getAllMentees() {
    return axios.get(API_URL)
  }

  getMentee(menteeId) {
    return axios.get(API_URL + `/${menteeId}`, { headers: authHeader() })
  }

  createMentee(mentee) {
    return axios.post(API_URL, mentee, {
      headers: authHeader()
    })
  }

  updateMentee(mentee) {
    return axios.put(API_URL + `/${mentee.id}`, mentee, {
      headers: authHeader()
    })
  }

  deleteMentee(menteeId) {
    return axios.delete(API_URL + `/${menteeId}`, { headers: authHeader() })
  }
}

export default new MenteeService()
