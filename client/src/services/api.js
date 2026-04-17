export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
export const SERVER_BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'

const REQUEST_TIMEOUT = 30000
const ADMIN_TOKEN_KEY = 'civicon_admin_token'

let adminToken = localStorage.getItem(ADMIN_TOKEN_KEY)

class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.response = { status, data }
  }
}

const buildHeaders = (headers, body) => {
  const nextHeaders = new Headers(headers)

  if (adminToken) {
    nextHeaders.set('Authorization', `Bearer ${adminToken}`)
  }

  if (!(body instanceof FormData) && !nextHeaders.has('Content-Type')) {
    nextHeaders.set('Content-Type', 'application/json')
  }

  return nextHeaders
}

const request = async (path, { method = 'GET', body, headers } = {}) => {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      body: body instanceof FormData || body == null ? body : JSON.stringify(body),
      headers: buildHeaders(headers, body),
      signal: controller.signal,
    })

    const contentType = response.headers.get('content-type') || ''
    const data = contentType.includes('application/json')
      ? await response.json()
      : await response.text()

    if (!response.ok) {
      const message =
        typeof data === 'object' && data?.message
          ? data.message
          : `Request failed with status ${response.status}`
      throw new ApiError(message, response.status, data)
    }

    return data
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new ApiError('Request timed out. Please try again.', 408, {
        message: 'Request timed out. Please try again.',
      })
    }

    if (error instanceof ApiError) {
      throw error
    }

    throw new ApiError(error.message || 'Network request failed.', 0, {
      message: error.message || 'Network request failed.',
    })
  } finally {
    window.clearTimeout(timeoutId)
  }
}

const responseWrapper = (promise) => promise.then((data) => ({ data }))

export const setAdminToken = (token) => {
  if (token) {
    localStorage.setItem(ADMIN_TOKEN_KEY, token)
    adminToken = token
  } else {
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    adminToken = null
  }
}

export const registerParticipant = (formData) =>
  responseWrapper(request('/register', { method: 'POST', body: formData }))

export const submitPaper = (formData) =>
  responseWrapper(request('/submit-paper', { method: 'POST', body: formData }))

export const trackPaperSubmission = (payload) =>
  responseWrapper(request('/track-paper', { method: 'POST', body: payload }))

export const loginAdmin = (payload) =>
  responseWrapper(request('/admin/login', { method: 'POST', body: payload }))

export const fetchAdminOverview = () => responseWrapper(request('/admin/overview'))
export const fetchRegistrations = () => responseWrapper(request('/register'))
export const fetchPapers = () => responseWrapper(request('/papers'))

export const updateRegistrationEntry = (id, payload) =>
  responseWrapper(request(`/register/${id}`, { method: 'PATCH', body: payload }))

export const updatePaperEntry = (id, payload) =>
  responseWrapper(request(`/papers/${id}`, { method: 'PATCH', body: payload }))

export const updatePaperStatusEntry = (id, payload) =>
  responseWrapper(request(`/papers/${id}/status`, { method: 'PATCH', body: payload }))

export const deleteRegistration = (id) =>
  responseWrapper(request(`/register/${id}`, { method: 'DELETE' }))

export const deletePaper = (id) =>
  responseWrapper(request(`/papers/${id}`, { method: 'DELETE' }))
