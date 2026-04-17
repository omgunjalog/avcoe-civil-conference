import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileDown,
  LoaderCircle,
  LogOut,
  Pencil,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react'
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import {
  deletePaper,
  deleteRegistration,
  fetchAdminOverview,
  fetchPapers,
  fetchRegistrations,
  SERVER_BASE_URL,
  setAdminToken,
  updatePaperEntry,
  updatePaperStatusEntry,
  updateRegistrationEntry,
} from '../services/api'
import { AdminSkeleton } from '../components/Skeletons'

const PAGE_SIZE = 8
const PAPER_STATUS_OPTIONS = [
  'submitted',
  'under_review',
  'revision_requested',
  'accepted',
  'rejected',
  'camera_ready_pending',
  'published',
]
const PAYMENT_STATUS_OPTIONS = ['proof_submitted', 'verified', 'rejected']

const formatDate = (value) => {
  if (!value) return 'N/A'
  return new Date(value).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

const downloadCsv = (filename, rows) => {
  if (!rows.length) {
    toast.error('No rows available to export.')
    return
  }

  const escapeCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`
  const csvContent = rows.map((row) => row.map(escapeCell).join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

const formatLabel = (value) =>
  String(value || '')
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())

const getStatusBadgeClass = (value, type = 'paper') => {
  if (type === 'payment') {
    if (value === 'verified') return 'border-emerald-200 bg-emerald-50 text-emerald-700'
    if (value === 'rejected') return 'border-rose-200 bg-rose-50 text-rose-700'
    return 'border-amber-200 bg-amber-50 text-amber-700'
  }

  if (value === 'accepted' || value === 'published') return 'border-emerald-200 bg-emerald-50 text-emerald-700'
  if (value === 'rejected') return 'border-rose-200 bg-rose-50 text-rose-700'
  if (value === 'revision_requested' || value === 'camera_ready_pending') return 'border-amber-200 bg-amber-50 text-amber-700'
  return 'border-sky-200 bg-sky-50 text-sky-700'
}

const hydrateRegistration = (record) => ({
  ...record,
  paymentReference: record.paymentReference || 'Not provided',
  paymentProofUrl: record.paymentProofUrl || null,
  paymentStatus: record.paymentStatus || 'proof_submitted',
  paymentReviewedAt: record.paymentReviewedAt || null,
})

const hydratePaper = (record) => ({
  ...record,
  trackingId: record.trackingId || 'Pending assignment',
  status: record.status || 'submitted',
  statusUpdatedAt: record.statusUpdatedAt || record.updatedAt || record.createdAt,
  reviewNote: record.reviewNote || '',
  registration: record.registration || {
    hasRegistration: false,
    isVerified: false,
    paymentStatus: 'not_registered',
    message: 'No completed registration is linked to this author email yet.',
  },
  history:
    record.history && record.history.length
      ? record.history
      : [
          {
            status: record.status || 'submitted',
            note: 'Submission received.',
            changedAt: record.createdAt || record.updatedAt,
          },
        ],
})

const getEditStateFromRecord = (record) => {
  if (!record) return null

  if (record.type === 'registration') {
    return {
      name: record.name ?? '',
      email: record.email ?? '',
      phone: record.phone ?? '',
      college: record.college ?? '',
      category: record.category ?? 'Faculty',
      paymentReference: record.paymentReference === 'Not provided' ? '' : record.paymentReference ?? '',
      paymentStatus: record.paymentStatus ?? 'proof_submitted',
    }
  }

  return {
    name: record.name ?? '',
    email: record.email ?? '',
    title: record.title ?? '',
    abstract: record.abstract ?? '',
  }
}

const getStatusStateFromRecord = (record) => {
  if (!record || record.type !== 'paper') return null

  return {
    status: record.status ?? 'submitted',
    reviewNote: record.reviewNote ?? '',
  }
}

const DetailRow = ({ label, value, children }) => (
  <div className="rounded-2xl bg-slate-50 px-5 py-4">
    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
    {children || <p className="mt-2 text-slate-800">{value}</p>}
  </div>
)

function AdminDashboardPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [activePanel, setActivePanel] = useState('registrations')
  const [overview, setOverview] = useState({ registrations: 0, papers: 0 })
  const [registrations, setRegistrations] = useState([])
  const [papers, setPapers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [registrationCategory, setRegistrationCategory] = useState('all')
  const [registrationPaymentStatus, setRegistrationPaymentStatus] = useState('all')
  const [paperStatusFilter, setPaperStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState(null)
  const [statusForm, setStatusForm] = useState(null)
  const [savingEdit, setSavingEdit] = useState(false)
  const [savingStatus, setSavingStatus] = useState(false)
  const deferredSearchTerm = useDeferredValue(searchTerm)

  const openRecord = (record, type) => {
    const hydratedRecord = type === 'registration' ? hydrateRegistration(record) : hydratePaper(record)
    const nextRecord = { ...hydratedRecord, type }
    setSelectedRecord(nextRecord)
    setIsEditing(false)
    setEditForm(getEditStateFromRecord(nextRecord))
    setStatusForm(getStatusStateFromRecord(nextRecord))
  }

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [overviewRes, registrationsRes, papersRes] = await Promise.all([
        fetchAdminOverview(),
        fetchRegistrations(),
        fetchPapers(),
      ])
      setOverview(overviewRes.data)
      setRegistrations((registrationsRes.data || []).map(hydrateRegistration))
      setPapers((papersRes.data || []).map(hydratePaper))
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to load admin data.')
      if (error.response?.status === 401) {
        setAdminToken(null)
        navigate('/admin/login')
      }
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    setPage(1)
  }, [activePanel, searchTerm, registrationCategory, registrationPaymentStatus, paperStatusFilter, dateFilter])

  useEffect(() => {
    setIsEditing(false)
    setEditForm(getEditStateFromRecord(selectedRecord))
    setStatusForm(getStatusStateFromRecord(selectedRecord))
  }, [selectedRecord])

  const updateLocalRecord = (updatedRecord, type) => {
    const normalizedRecord = type === 'registration' ? hydrateRegistration(updatedRecord) : hydratePaper(updatedRecord)

    if (type === 'registration') {
      setRegistrations((current) =>
        current.map((item) => (item._id === normalizedRecord._id ? normalizedRecord : item)),
      )
    } else {
      setPapers((current) =>
        current.map((item) => (item._id === normalizedRecord._id ? normalizedRecord : item)),
      )
    }

    const nextRecord = { ...normalizedRecord, type }
    setSelectedRecord(nextRecord)
    setEditForm(getEditStateFromRecord(nextRecord))
    setStatusForm(getStatusStateFromRecord(nextRecord))
  }

  const handleDeleteRegistration = async (id) => {
    try {
      await deleteRegistration(id)
      toast.success('Registration deleted.')
      if (selectedRecord?._id === id) {
        setSelectedRecord(null)
      }
      loadData()
    } catch {
      toast.error('Unable to delete registration.')
    }
  }

  const handleDeletePaper = async (id) => {
    try {
      await deletePaper(id)
      toast.success('Paper deleted.')
      if (selectedRecord?._id === id) {
        setSelectedRecord(null)
      }
      loadData()
    } catch {
      toast.error('Unable to delete paper.')
    }
  }

  const handleEditFieldChange = (event) => {
    const { name, value } = event.target
    setEditForm((current) => ({ ...current, [name]: value }))
  }

  const handleStatusFieldChange = (event) => {
    const { name, value } = event.target
    setStatusForm((current) => ({ ...current, [name]: value }))
  }

  const handleSaveEdit = async () => {
    if (!selectedRecord || !editForm) return
    setSavingEdit(true)

    try {
      if (selectedRecord.type === 'registration') {
        const { data } = await updateRegistrationEntry(selectedRecord._id, editForm)
        updateLocalRecord(data, 'registration')
        toast.success('Registration updated.')
      } else {
        const { data } = await updatePaperEntry(selectedRecord._id, editForm)
        updateLocalRecord(data, 'paper')
        toast.success('Paper metadata updated.')
      }
      setIsEditing(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to update record.')
    } finally {
      setSavingEdit(false)
    }
  }

  const handleSavePaperStatus = async () => {
    if (!selectedRecord || selectedRecord.type !== 'paper' || !statusForm) return

    setSavingStatus(true)

    try {
      const { data } = await updatePaperStatusEntry(selectedRecord._id, statusForm)
      updateLocalRecord(data, 'paper')
      toast.success('Paper status updated.')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to update paper status.')
    } finally {
      setSavingStatus(false)
    }
  }

  const matchesDateFilter = (record) => {
    if (dateFilter === 'all' || !record.createdAt) {
      return true
    }

    const createdAt = new Date(record.createdAt).getTime()
    const now = Date.now()
    const day = 24 * 60 * 60 * 1000

    if (dateFilter === '7d') return now - createdAt <= 7 * day
    if (dateFilter === '30d') return now - createdAt <= 30 * day
    return true
  }

  const normalizedQuery = useMemo(
    () => deferredSearchTerm.trim().toLowerCase(),
    [deferredSearchTerm],
  )

  const filteredRegistrations = useMemo(
    () =>
      registrations.filter((item) => {
        const matchesSearch =
          !normalizedQuery ||
          [item.name, item.email, item.phone, item.college, item.category, item.paymentReference, item.paymentStatus]
            .join(' ')
            .toLowerCase()
            .includes(normalizedQuery)

        const matchesCategory =
          registrationCategory === 'all' || item.category === registrationCategory

        const matchesPaymentStatus =
          registrationPaymentStatus === 'all' || item.paymentStatus === registrationPaymentStatus

        return matchesSearch && matchesCategory && matchesPaymentStatus && matchesDateFilter(item)
      }),
    [registrations, normalizedQuery, registrationCategory, registrationPaymentStatus, dateFilter],
  )

  const filteredPapers = useMemo(
    () =>
      papers.filter((item) => {
        const matchesSearch =
          !normalizedQuery ||
          [item.trackingId, item.name, item.email, item.title, item.abstract, item.status, item.registration?.paymentStatus]
            .join(' ')
            .toLowerCase()
            .includes(normalizedQuery)

        const matchesStatus = paperStatusFilter === 'all' || item.status === paperStatusFilter

        return matchesSearch && matchesStatus && matchesDateFilter(item)
      }),
    [papers, normalizedQuery, paperStatusFilter, dateFilter],
  )

  const activeRows = useMemo(
    () => (activePanel === 'registrations' ? filteredRegistrations : filteredPapers),
    [activePanel, filteredRegistrations, filteredPapers],
  )

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(activeRows.length / PAGE_SIZE)),
    [activeRows.length],
  )
  const currentPage = Math.min(page, totalPages)
  const paginatedRows = useMemo(
    () =>
      activeRows.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
      ),
    [activeRows, currentPage],
  )

  const panelButtonClass = (panel) =>
    `rounded-full px-5 py-2.5 text-sm font-semibold transition ${
      activePanel === panel
        ? 'bg-navy-900 text-white shadow-[0_14px_34px_rgba(10,25,47,0.18)]'
        : 'border border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-navy-900'
    }`

  const exportActivePanel = () => {
    if (activePanel === 'registrations') {
      downloadCsv(
        'civicon-registrations.csv',
        [
          ['Name', 'Email', 'Phone', 'College', 'Category', 'Payment Reference', 'Payment Status', 'Payment Reviewed At', 'Payment Proof URL', 'Created At', 'Updated At'],
          ...filteredRegistrations.map((item) => [
            item.name,
            item.email,
            item.phone,
            item.college,
            item.category,
            item.paymentReference,
            formatLabel(item.paymentStatus),
            formatDate(item.paymentReviewedAt),
            item.paymentProofUrl ? `${SERVER_BASE_URL}${item.paymentProofUrl}` : '',
            formatDate(item.createdAt),
            formatDate(item.updatedAt),
          ]),
        ],
      )
      return
    }

    downloadCsv(
      'civicon-paper-submissions.csv',
      [
        ['Tracking ID', 'Author', 'Email', 'Title', 'Status', 'Registration Status', 'Review Note', 'File URL', 'Created At', 'Status Updated At', 'Updated At'],
        ...filteredPapers.map((item) => [
          item.trackingId,
          item.name,
          item.email,
          item.title,
          formatLabel(item.status),
          formatLabel(item.registration?.paymentStatus),
          item.reviewNote,
          `${SERVER_BASE_URL}${item.fileUrl}`,
          formatDate(item.createdAt),
          formatDate(item.statusUpdatedAt),
          formatDate(item.updatedAt),
        ]),
      ],
    )
  }

  if (loading) {
    return <AdminSkeleton />
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="content-grid py-10">
        <div className="flex flex-col gap-4 rounded-[30px] bg-navy-900 px-5 py-6 text-white sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="section-kicker border-white/10 bg-white/8 text-teal-200">Admin Panel</p>
            <h1 className="mt-5 font-display text-3xl sm:text-5xl">Conference Operations Dashboard</h1>
          </div>
          <button
            type="button"
            className="button-secondary w-full justify-center sm:w-auto"
            onClick={() => {
              setAdminToken(null)
              navigate('/admin/login')
            }}
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <button
            type="button"
            className={`surface-card text-left ${activePanel === 'registrations' ? 'ring-2 ring-teal-300/60' : ''}`}
            onClick={() => setActivePanel('registrations')}
          >
            <p className="text-sm uppercase tracking-[0.18em] text-teal-600">Registrations</p>
            <h2 className="mt-3 font-display text-4xl text-slate-950 sm:text-5xl">{overview.registrations}</h2>
            <p className="mt-3 text-sm text-slate-500">Participant signups with payment verification workflow.</p>
          </button>
          <button
            type="button"
            className={`surface-card text-left ${activePanel === 'papers' ? 'ring-2 ring-teal-300/60' : ''}`}
            onClick={() => setActivePanel('papers')}
          >
            <p className="text-sm uppercase tracking-[0.18em] text-teal-600">Papers</p>
            <h2 className="mt-3 font-display text-4xl text-slate-950 sm:text-5xl">{overview.papers}</h2>
            <p className="mt-3 text-sm text-slate-500">Tracked manuscripts, review statuses, and author-facing progress.</p>
          </button>
        </div>

        <div className="mt-8">
          <div className="mb-5 grid gap-3 sm:flex sm:flex-wrap">
            <button type="button" className={`${panelButtonClass('registrations')} w-full justify-center sm:w-auto`} onClick={() => setActivePanel('registrations')}>
              Registrations Panel
            </button>
            <button type="button" className={`${panelButtonClass('papers')} w-full justify-center sm:w-auto`} onClick={() => setActivePanel('papers')}>
              Papers Panel
            </button>
          </div>

          <section className="surface-card">
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <h2 className="font-display text-3xl text-slate-950">
                  {activePanel === 'registrations' ? 'Registrations' : 'Paper Submissions'}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  {activePanel === 'registrations'
                    ? 'Search, verify payments, export records, and inspect participant details in one panel.'
                    : 'Search, filter by review stage, export records, and manage metadata plus submission status.'}
                </p>
              </div>

              <div className="grid gap-3 xl:min-w-[840px] xl:flex xl:flex-row xl:items-center xl:justify-end">
                <label className="relative min-w-0 xl:w-[320px]">
                  <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    className="field pl-11"
                    placeholder={
                      activePanel === 'registrations'
                        ? 'Search name, email, payment reference...'
                        : 'Search tracking ID, author, title, status...'
                    }
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </label>

                {activePanel === 'registrations' ? (
                  <>
                    <select
                      className="field xl:w-[180px]"
                      value={registrationCategory}
                      onChange={(event) => setRegistrationCategory(event.target.value)}
                    >
                      <option value="all">All categories</option>
                      <option value="Faculty">Faculty</option>
                      <option value="Students">Students</option>
                      <option value="Attendee">Attendee</option>
                    </select>
                    <select
                      className="field xl:w-[210px]"
                      value={registrationPaymentStatus}
                      onChange={(event) => setRegistrationPaymentStatus(event.target.value)}
                    >
                      <option value="all">All payment states</option>
                      {PAYMENT_STATUS_OPTIONS.map((item) => (
                        <option key={item} value={item}>
                          {formatLabel(item)}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <select
                    className="field xl:w-[210px]"
                    value={paperStatusFilter}
                    onChange={(event) => setPaperStatusFilter(event.target.value)}
                  >
                    <option value="all">All review stages</option>
                    {PAPER_STATUS_OPTIONS.map((item) => (
                      <option key={item} value={item}>
                        {formatLabel(item)}
                      </option>
                    ))}
                  </select>
                )}

                <select
                  className="field xl:w-[160px]"
                  value={dateFilter}
                  onChange={(event) => setDateFilter(event.target.value)}
                >
                  <option value="all">All time</option>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                </select>

                <button type="button" className="button-ghost w-full justify-center sm:w-auto" onClick={exportActivePanel}>
                  <FileDown size={14} className="mr-2" />
                  Export CSV
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-slate-500">{activeRows.length} filtered record(s)</p>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <button
                  type="button"
                  className="button-ghost px-3 py-2"
                  disabled={currentPage === 1}
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                >
                  <ChevronLeft size={14} />
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  className="button-ghost px-3 py-2"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto pb-2">
              {activePanel === 'registrations' ? (
                <table className="min-w-[980px] text-left text-sm">
                  <thead className="text-slate-500">
                    <tr>
                      <th className="pb-3 pr-6">Name</th>
                      <th className="pb-3 pr-6">Email</th>
                      <th className="pb-3 pr-6">Category</th>
                      <th className="pb-3 pr-6">Payment Ref</th>
                      <th className="pb-3 pr-6">Payment</th>
                      <th className="pb-3 pr-6">Proof</th>
                      <th className="pb-3 pr-6">Created</th>
                      <th className="pb-3 pr-6">View</th>
                      <th className="pb-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedRows.length ? (
                      paginatedRows.map((item) => (
                        <tr key={item._id} className="border-t border-slate-200 align-top">
                          <td className="py-4 pr-6 text-slate-800">{item.name}</td>
                          <td className="py-4 pr-6 text-slate-600">{item.email}</td>
                          <td className="py-4 pr-6 text-slate-600">{item.category}</td>
                          <td className="py-4 pr-6 text-slate-600">{item.paymentReference}</td>
                          <td className="py-4 pr-6">
                            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(item.paymentStatus, 'payment')}`}>
                              {formatLabel(item.paymentStatus)}
                            </span>
                          </td>
                          <td className="py-4 pr-6">
                            {item.paymentProofUrl ? (
                              <a
                                className="button-ghost"
                                href={`${SERVER_BASE_URL}${item.paymentProofUrl}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Download size={14} className="mr-2" />
                                Open
                              </a>
                            ) : (
                              <span className="text-slate-400">Unavailable</span>
                            )}
                          </td>
                          <td className="py-4 pr-6 text-slate-600">{formatDate(item.createdAt)}</td>
                          <td className="py-4 pr-6">
                            <button type="button" className="button-ghost" onClick={() => openRecord(item, 'registration')}>
                              <Eye size={14} className="mr-2" />
                              View
                            </button>
                          </td>
                          <td className="py-4">
                            <button type="button" className="button-ghost" onClick={() => handleDeleteRegistration(item._id)}>
                              <Trash2 size={14} className="mr-2" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="py-10 text-center text-slate-500">
                          No registrations match the current filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                <table className="min-w-[980px] text-left text-sm">
                  <thead className="text-slate-500">
                    <tr>
                      <th className="pb-3 pr-6">Tracking ID</th>
                      <th className="pb-3 pr-6">Author</th>
                      <th className="pb-3 pr-6">Title</th>
                      <th className="pb-3 pr-6">Status</th>
                      <th className="pb-3 pr-6">Updated</th>
                      <th className="pb-3 pr-6">Download</th>
                      <th className="pb-3 pr-6">View</th>
                      <th className="pb-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedRows.length ? (
                      paginatedRows.map((item) => (
                        <tr key={item._id} className="border-t border-slate-200 align-top">
                          <td className="py-4 pr-6 text-slate-800">{item.trackingId}</td>
                          <td className="py-4 pr-6 text-slate-600">
                            <p>{item.name}</p>
                            <p className="mt-1 text-xs text-slate-400">{item.email}</p>
                          </td>
                          <td className="py-4 pr-6 text-slate-600">
                            <div className="max-w-[320px]">
                              <p className="font-medium text-slate-800">{item.title}</p>
                              <p className="mt-1 line-clamp-2 text-xs leading-6 text-slate-400">{item.abstract}</p>
                            </div>
                          </td>
                          <td className="py-4 pr-6">
                            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(item.status)}`}>
                              {formatLabel(item.status)}
                            </span>
                          </td>
                          <td className="py-4 pr-6 text-slate-600">{formatDate(item.statusUpdatedAt)}</td>
                          <td className="py-4 pr-6">
                            <a className="button-ghost" href={`${SERVER_BASE_URL}${item.fileUrl}`} target="_blank" rel="noreferrer">
                              <Download size={14} className="mr-2" />
                              PDF
                            </a>
                          </td>
                          <td className="py-4 pr-6">
                            <button type="button" className="button-ghost" onClick={() => openRecord(item, 'paper')}>
                              <Eye size={14} className="mr-2" />
                              View
                            </button>
                          </td>
                          <td className="py-4">
                            <button type="button" className="button-ghost" onClick={() => handleDeletePaper(item._id)}>
                              <Trash2 size={14} className="mr-2" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="py-10 text-center text-slate-500">
                          No paper submissions match the current filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </div>

      {selectedRecord ? (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/35 backdrop-blur-sm">
          <div className="h-full w-full max-w-2xl overflow-y-auto bg-white p-5 shadow-[0_30px_90px_rgba(7,18,33,0.24)] sm:p-8">
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-teal-600">
                  {selectedRecord.type === 'registration' ? 'Registration Detail' : 'Paper Detail'}
                </p>
                <h2 className="mt-3 font-display text-3xl text-slate-950 sm:text-4xl">
                  {selectedRecord.type === 'registration'
                    ? selectedRecord.name
                    : selectedRecord.title}
                </h2>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  className="button-ghost w-full justify-center sm:w-auto"
                  onClick={() => {
                    setIsEditing((current) => !current)
                    setEditForm(getEditStateFromRecord(selectedRecord))
                  }}
                >
                  <Pencil size={14} className="mr-2" />
                  {isEditing ? 'Cancel Edit' : 'Edit'}
                </button>
                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 text-slate-500 transition hover:border-teal-300 hover:text-navy-900"
                  onClick={() => setSelectedRecord(null)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {selectedRecord.type === 'registration' ? (
              isEditing ? (
                <div className="mt-6 grid gap-4">
                  <input className="field" name="name" value={editForm?.name ?? ''} onChange={handleEditFieldChange} placeholder="Full name" />
                  <input className="field" name="email" value={editForm?.email ?? ''} onChange={handleEditFieldChange} placeholder="Email" />
                  <input className="field" name="phone" value={editForm?.phone ?? ''} onChange={handleEditFieldChange} placeholder="Phone" />
                  <input className="field" name="college" value={editForm?.college ?? ''} onChange={handleEditFieldChange} placeholder="College" />
                  <select className="field" name="category" value={editForm?.category ?? 'Faculty'} onChange={handleEditFieldChange}>
                    <option value="Faculty">Faculty</option>
                    <option value="Students">Students</option>
                    <option value="Attendee">Attendee</option>
                  </select>
                  <input
                    className="field"
                    name="paymentReference"
                    value={editForm?.paymentReference ?? ''}
                    onChange={handleEditFieldChange}
                    placeholder="Payment reference"
                  />
                  <select className="field" name="paymentStatus" value={editForm?.paymentStatus ?? 'proof_submitted'} onChange={handleEditFieldChange}>
                    {PAYMENT_STATUS_OPTIONS.map((item) => (
                      <option key={item} value={item}>
                        {formatLabel(item)}
                      </option>
                    ))}
                  </select>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-500">
                    Payment proof replacement is intentionally disabled here. Admin can review the uploaded proof and update the verification state.
                  </div>
                  <button type="button" className="button-primary w-full" disabled={savingEdit} onClick={handleSaveEdit}>
                    {savingEdit ? <LoaderCircle className="animate-spin" size={18} /> : <><Save size={16} className="mr-2" />Save Changes</>}
                  </button>
                </div>
              ) : (
                <div className="mt-6 grid gap-4">
                  <DetailRow label="Email" value={selectedRecord.email} />
                  <DetailRow label="Phone" value={selectedRecord.phone} />
                  <DetailRow label="College" value={selectedRecord.college} />
                  <DetailRow label="Category" value={selectedRecord.category} />
                  <DetailRow label="Payment Reference" value={selectedRecord.paymentReference} />
                  <DetailRow label="Payment Status">
                    <div className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(selectedRecord.paymentStatus, 'payment')}`}>
                      {formatLabel(selectedRecord.paymentStatus)}
                    </div>
                  </DetailRow>
                  <DetailRow label="Payment Reviewed At" value={formatDate(selectedRecord.paymentReviewedAt)} />
                  <DetailRow label="Created At" value={formatDate(selectedRecord.createdAt)} />
                  <DetailRow label="Updated At" value={formatDate(selectedRecord.updatedAt)} />
                  <div className="flex flex-wrap gap-3 pt-2">
                    {selectedRecord.paymentProofUrl ? (
                      <a
                        className="button-ghost"
                        href={`${SERVER_BASE_URL}${selectedRecord.paymentProofUrl}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ShieldCheck size={14} className="mr-2" />
                        Open Payment Proof
                      </a>
                    ) : (
                      <span className="text-sm text-slate-400">Payment proof is unavailable for this record.</span>
                    )}
                  </div>
                </div>
              )
            ) : (
              <div className="mt-6 space-y-6">
                {isEditing ? (
                  <div className="grid gap-4">
                    <input className="field" name="name" value={editForm?.name ?? ''} onChange={handleEditFieldChange} placeholder="Author name" />
                    <input className="field" name="email" value={editForm?.email ?? ''} onChange={handleEditFieldChange} placeholder="Author email" />
                    <input className="field" name="title" value={editForm?.title ?? ''} onChange={handleEditFieldChange} placeholder="Paper title" />
                    <textarea className="field min-h-40" name="abstract" value={editForm?.abstract ?? ''} onChange={handleEditFieldChange} placeholder="Abstract" />
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-500">
                      PDF replacement is intentionally disabled here. Only metadata can be edited from admin.
                    </div>
                    <button type="button" className="button-primary w-full" disabled={savingEdit} onClick={handleSaveEdit}>
                      {savingEdit ? <LoaderCircle className="animate-spin" size={18} /> : <><Save size={16} className="mr-2" />Save Metadata</>}
                    </button>
                  </div>
                ) : null}

                <div className="rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Review Workflow</p>
                      <p className="mt-2 text-sm text-slate-600">
                        Update the author-visible paper status and optionally include a public review note.
                      </p>
                    </div>
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(selectedRecord.status)}`}>
                      {formatLabel(selectedRecord.status)}
                    </span>
                  </div>
                  <div className="mt-5 grid gap-4">
                    <select className="field" name="status" value={statusForm?.status ?? 'submitted'} onChange={handleStatusFieldChange}>
                      {PAPER_STATUS_OPTIONS.map((item) => (
                        <option key={item} value={item}>
                          {formatLabel(item)}
                        </option>
                      ))}
                    </select>
                    <textarea
                      className="field min-h-32"
                      name="reviewNote"
                      value={statusForm?.reviewNote ?? ''}
                      onChange={handleStatusFieldChange}
                      placeholder="Optional note shown to the submitter"
                    />
                    <button type="button" className="button-primary w-full" disabled={savingStatus} onClick={handleSavePaperStatus}>
                      {savingStatus ? <LoaderCircle className="animate-spin" size={18} /> : <><Save size={16} className="mr-2" />Update Status</>}
                    </button>
                  </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Registration Readiness</p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">
                        {formatLabel(selectedRecord.registration?.paymentStatus)}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {selectedRecord.registration?.message}
                      </p>
                    </div>
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(selectedRecord.registration?.paymentStatus, 'payment')}`}>
                      {selectedRecord.registration?.isVerified ? 'Ready for publication' : 'Registration pending'}
                    </span>
                  </div>
                </div>

                <div className="grid gap-4">
                  <DetailRow label="Tracking ID" value={selectedRecord.trackingId} />
                  <DetailRow label="Author" value={selectedRecord.name} />
                  <DetailRow label="Email" value={selectedRecord.email} />
                  <DetailRow label="Created At" value={formatDate(selectedRecord.createdAt)} />
                  <DetailRow label="Status Updated At" value={formatDate(selectedRecord.statusUpdatedAt)} />
                  <DetailRow label="Updated At" value={formatDate(selectedRecord.updatedAt)} />
                  <DetailRow label="Review Note" value={selectedRecord.reviewNote || 'No public note shared yet.'} />
                  <DetailRow label="Abstract" value={selectedRecord.abstract} />
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      className="button-ghost"
                      href={`${SERVER_BASE_URL}${selectedRecord.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Download size={14} className="mr-2" />
                      Open PDF
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Submission Timeline</p>
                  <div className="mt-4 space-y-4">
                    {selectedRecord.history?.length ? (
                      selectedRecord.history
                        .slice()
                        .reverse()
                        .map((item, index) => (
                          <div key={`${item.status}-${item.changedAt}-${index}`} className="rounded-2xl bg-slate-50 px-5 py-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(item.status)}`}>
                                {formatLabel(item.status)}
                              </span>
                              <span className="text-xs uppercase tracking-[0.16em] text-slate-400">
                                {formatDate(item.changedAt)}
                              </span>
                            </div>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                              {item.note || 'Status updated without a public note.'}
                            </p>
                          </div>
                        ))
                    ) : (
                      <div className="rounded-2xl bg-slate-50 px-5 py-4 text-sm text-slate-500">
                        Timeline entries will appear here after the review state changes.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default AdminDashboardPage
