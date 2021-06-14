export default function authHeader () {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user.accessToken) {
    // return { Authorization: 'Bearer ' + user.accessToken}
    // For node.js backend
    return { 'x-access-token': user.accessToken }
  } else {
    return {}
  }
}
