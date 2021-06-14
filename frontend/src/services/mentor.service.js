import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:5000/api/v1/mentors'

class MentorService {
  getAllMentors() {
    return axios.get(API_URL)
  }

  getMentor(mentorId) {
    return axios.get(API_URL + `/${mentorId}`, { headers: authHeader() })
  }

  createMentor(mentor) {
    return axios.post(API_URL, mentor, {
      headers: authHeader()
    })
  }

  updateMentor(mentor) {
    return axios.put(API_URL + `/${mentor.id}`, mentor, {
      headers: authHeader()
    })
  }

  deleteMentor(mentorId) {
    return axios.delete(API_URL + `/${mentorId}`, { headers: authHeader() })
  }
}

export default new MentorService()
