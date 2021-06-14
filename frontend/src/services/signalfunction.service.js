import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:5000/api/v1/signalfunctions'

class SignalFunctionService {
  getAllSignalFunctions() {
    return axios.get(API_URL)
  }

  getSignalFunction(signalFunctionId) {
    return axios.get(API_URL + `/${signalFunctionId}`, {
      headers: authHeader()
    })
  }

  createSignalFunction(signalFunction) {
    return axios.post(API_URL, signalFunction, {
      headers: authHeader()
    })
  }

  updateSignalFunction(signalFunction) {
    return axios.put(API_URL + `/${signalFunction.id}`, signalFunction, {
      headers: authHeader()
    })
  }

  deleteSignalFunction(signalFunctionId) {
    return axios.delete(API_URL + `/${signalFunctionId}`, {
      headers: authHeader()
    })
  }
}

export default new SignalFunctionService()
