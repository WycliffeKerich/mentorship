import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:5000/api/v1/counties'

class CountyService {
  getAllCounties() {
    return axios.get(API_URL)
  }

  getCounty(countyId) {
    return axios.get(API_URL + `/${countyId}`, { headers: authHeader() })
  }

  createCounty(county) {
    return axios.post(API_URL, county, {
      headers: authHeader()
    })
  }

  updateCounty(county) {
    return axios.put(API_URL + `/${county.id}`, county, {
      headers: authHeader()
    })
  }

  deleteCounty(countyId) {
    return axios.delete(API_URL + `/${countyId}`, { headers: authHeader() })
  }
}

export default new CountyService()
