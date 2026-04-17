import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import { PageShellSkeleton } from './components/Skeletons'
import SiteLayout from './layouts/SiteLayout'
import NotFoundPage from './pages/NotFoundPage'

const HomePage = lazy(() => import('./pages/HomePage'))
const SpeakersPage = lazy(() => import('./pages/SpeakersPage'))
const CommitteePage = lazy(() => import('./pages/CommitteePage'))
const ThemesSchedulePage = lazy(() => import('./pages/ThemesSchedulePage'))
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'))
const ImportantDatesPage = lazy(() => import('./pages/ImportantDatesPage'))
const PublicationsPage = lazy(() => import('./pages/PublicationsPage'))
const SubmitPaperPage = lazy(() => import('./pages/SubmitPaperPage'))
const TrackPaperPage = lazy(() => import('./pages/TrackPaperPage'))
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'))
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'))

const withPageSuspense = (node) => <Suspense fallback={<PageShellSkeleton />}>{node}</Suspense>

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={withPageSuspense(<HomePage />)} />
        <Route path="/keynote-speakers" element={withPageSuspense(<SpeakersPage />)} />
        <Route path="/committee" element={withPageSuspense(<CommitteePage />)} />
        <Route path="/themes-schedule" element={withPageSuspense(<ThemesSchedulePage />)} />
        <Route path="/registration" element={withPageSuspense(<RegistrationPage />)} />
        <Route path="/important-dates" element={withPageSuspense(<ImportantDatesPage />)} />
        <Route path="/publications" element={withPageSuspense(<PublicationsPage />)} />
        <Route path="/submit-paper" element={withPageSuspense(<SubmitPaperPage />)} />
        <Route path="/track-paper" element={withPageSuspense(<TrackPaperPage />)} />
      </Route>
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={withPageSuspense(<AdminLoginPage />)} />
      <Route
        path="/admin/dashboard"
        element={withPageSuspense(
          <AdminProtectedRoute>
            <AdminDashboardPage />
          </AdminProtectedRoute>,
        )}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
