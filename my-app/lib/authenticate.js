import { jwtDecode } from 'jwt-decode'

export async function authenticateUser(user, password) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/login`
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ userName: user, password: password }),
    headers: {
      'content-type': 'application/json',
    },
  })

  const data = await res.json()

  if (res.status === 200) {
    setToken(data.token)
    return true
  } else {
    throw new Error(data.message)
  }
}

export async function registerUser(user, password, password2) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/register`
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      userName: user,
      password: password,
      password2: password2,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })

  const data = await res.json()

  if (res.status === 200) {
    return true
  } else {
    throw new Error(data.message)
  }
}

function setToken(token) {
  localStorage.setItem('access_token', token)
}

export function getToken() {
  try {
    return localStorage.getItem('access_token')
  } catch (err) {
    return null
  }
}

export function removeToken() {
  localStorage.removeItem('access_token')
}

export function readToken() {
  try {
    const token = getToken()
    return token ? jwtDecode(token) : null
  } catch (err) {
    return null
  }
}

export function isAuthenticated() {
  return !!readToken()
}
