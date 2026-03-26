import { FileText, LoaderCircle, Radar } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { submitPaper } from '../services/api'

const initialForm = {
  name: '',
  email: '',
  title: '',
  abstract: '',
  file: null,
}

function PaperSubmissionForm() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [submissionResult, setSubmissionResult] = useState(null)

  const handleChange = (event) => {
    const { name, value, files } = event.target
    setForm((current) => ({ ...current, [name]: files ? files[0] : value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.file || form.file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file.')
      return
    }

    const payload = new FormData()
    Object.entries(form).forEach(([key, value]) => payload.append(key, value))

    setLoading(true)
    try {
      const { data } = await submitPaper(payload)
      setSubmissionResult({
        trackingId: data.trackingId,
        status: data.status,
        email: data.email,
      })
      toast.success('Paper uploaded successfully.')
      setForm(initialForm)
      event.target.reset()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Paper submission failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      {submissionResult ? (
        <div className="surface-card border border-teal-200/70 bg-[linear-gradient(135deg,rgba(95,228,202,0.16),rgba(255,255,255,0.92))]">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            <Radar size={16} />
            Tracking Enabled
          </p>
          <h3 className="mt-4 font-display text-3xl text-slate-950">Submission recorded.</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Keep this tracking ID safe. Authors can use it with their email to check review progress without needing a full account.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white/90 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Tracking ID</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{submissionResult.trackingId}</p>
            </div>
            <div className="rounded-2xl bg-white/90 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Current Status</p>
              <p className="mt-2 text-lg font-semibold capitalize text-slate-900">
                {submissionResult.status.replaceAll('_', ' ')}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/track-paper" className="button-primary">
              Track Submission
            </Link>
            <button type="button" className="button-ghost" onClick={() => setSubmissionResult(null)}>
              Submit Another Paper
            </button>
          </div>
        </div>
      ) : null}

      {!submissionResult ? (
        <form className="surface-card space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <input className="field" name="name" placeholder="Author name" value={form.name} onChange={handleChange} required />
            <input className="field" type="email" name="email" placeholder="Author email" value={form.email} onChange={handleChange} required />
          </div>
          <input className="field" name="title" placeholder="Paper title" value={form.title} onChange={handleChange} required />
          <textarea className="field min-h-36" name="abstract" placeholder="Paper abstract" value={form.abstract} onChange={handleChange} required />
          <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <FileText size={16} />
              {form.file?.name || 'Upload PDF manuscript'}
            </span>
            <span className="button-ghost">Choose file</span>
            <input type="file" name="file" accept="application/pdf" className="hidden" onChange={handleChange} required />
          </label>
          <button type="submit" className="button-primary w-full" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" size={18} /> : 'Submit Paper'}
          </button>
        </form>
      ) : null}
    </div>
  )
}

export default PaperSubmissionForm
