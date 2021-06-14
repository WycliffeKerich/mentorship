import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:5000/api/v1/facilities'

class FacilityService {
  getAllFacilities() {
    return axios.get(API_URL)
  }

  getFacility(facilityId) {
    return axios.get(API_URL + `/${facilityId}`, { headers: authHeader() })
  }

  createFacility(facility) {
    return axios.post(API_URL, facility, {
      headers: authHeader()
    })
  }

  updateFacility(facility) {
    return axios.put(API_URL + `/${facility.id}`, facility, {
      headers: authHeader()
    })
  }

  deleteFacility(facilityId) {
    return axios.delete(API_URL + `/${facilityId}`, { headers: authHeader() })
  }
}

export default new FacilityService()
