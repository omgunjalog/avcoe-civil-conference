import axios from 'axios'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
export const SERVER_BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export const setAdminToken = (token) => {
  if (token) {
    localStorage.setItem('civicon_admin_token', token)
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    localStorage.removeItem('civicon_admin_token')
    delete api.defaults.headers.common.Authorization
  }
}

const existingToken = localStorage.getItem('civicon_admin_token')
if (existingToken) {
  api.defaults.headers.common.Authorization = `Bearer ${existingToken}`
}

export const registerParticipant = (formData) =>
  api.post('/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
export const submitPaper = (formData) =>
  api.post('/submit-paper', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
export const trackPaperSubmission = (payload) => api.post('/track-paper', payload)
export const loginAdmin = (payload) => api.post('/admin/login', payload)
export const fetchAdminOverview = () => api.get('/admin/overview')
export const fetchRegistrations = () => api.get('/register')
export const fetchPapers = () => api.get('/papers')
export const updateRegistrationEntry = (id, payload) => api.patch(`/register/${id}`, payload)
export const updatePaperEntry = (id, payload) => api.patch(`/papers/${id}`, payload)
export const updatePaperStatusEntry = (id, payload) => api.patch(`/papers/${id}/status`, payload)
export const deleteRegistration = (id) => api.delete(`/register/${id}`)
export const deletePaper = (id) => api.delete(`/papers/${id}`)

export default api
