import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './layouts/SiteLayout'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import HomePage from './pages/HomePage'
import SpeakersPage from './pages/SpeakersPage'
import CommitteePage from './pages/CommitteePage'
import ThemesSchedulePage from './pages/ThemesSchedulePage'
import RegistrationPage from './pages/RegistrationPage'
import ImportantDatesPage from './pages/ImportantDatesPage'
import PublicationsPage from './pages/PublicationsPage'
import SubmitPaperPage from './pages/SubmitPaperPage'
import TrackPaperPage from './pages/TrackPaperPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/keynote-speakers" element={<SpeakersPage />} />
        <Route path="/committee" element={<CommitteePage />} />
        <Route path="/themes-schedule" element={<ThemesSchedulePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/important-dates" element={<ImportantDatesPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/submit-paper" element={<SubmitPaperPage />} />
        <Route path="/track-paper" element={<TrackPaperPage />} />
      </Route>
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboardPage />
          </AdminProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
