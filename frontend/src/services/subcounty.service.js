import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:5000/api/v1/subcounties'

class SubCountyService {
  getAllSubCounties() {
    return axios.get(API_URL)
  }

  getSubCounty(subCountyId) {
    return axios.get(API_URL + `/${subCountyId}`, { headers: authHeader() })
  }

  createSubCounty(subCounty) {
    return axios.post(API_URL, subCounty, {
      headers: authHeader()
    })
  }

  updateSubCounty(subCounty) {
    return axios.put(API_URL + `/${subCounty.id}`, subCounty, {
      headers: authHeader()
    })
  }

  deleteSubCounty(subCountyId) {
    return axios.delete(API_URL + `/${subCountyId}`, { headers: authHeader() })
  }
}

export default new SubCountyService()
