import { LoaderCircle, Radar, SearchCheck } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import { trackPaperSubmission } from '../services/api'

const initialForm = {
  trackingId: '',
  email: '',
}

const formatDate = (value) => {
  if (!value) return 'N/A'
  return new Date(value).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

const formatStatus = (value) =>
  String(value || 'submitted')
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())

const formatPaymentStatus = (value) =>
  value === 'not_registered' ? 'Not Registered' : formatStatus(value)

function TrackPaperPage() {
  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const { data } = await trackPaperSubmission({
        trackingId: form.trackingId,
        email: form.email,
      })
      setResult(data)
      toast.success('Submission status loaded.')
    } catch (error) {
      setResult(null)
      toast.error(error.response?.data?.message || 'Unable to find that submission.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section-space pt-10">
      <div className="content-grid space-y-8">
        <PageHero
          kicker="Track Paper"
          title="Give authors a simple, private way to follow review progress."
          description="Enter the tracking ID issued after submission along with the author email to view the current decision stage and any committee note."
        />

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className="surface-card">
              <SectionHeader
                kicker="Submission Lookup"
                title="Track a manuscript"
                description="No separate account is required. Tracking uses the unique submission ID and the original author email."
              />
              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <input
                  className="field uppercase"
                  name="trackingId"
                  placeholder="Tracking ID"
                  value={form.trackingId}
                  onChange={handleChange}
                  required
                />
                <input
                  className="field"
                  type="email"
                  name="email"
                  placeholder="Author email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="button-primary w-full" disabled={loading}>
                  {loading ? <LoaderCircle className="animate-spin" size={18} /> : 'Check Status'}
                </button>
              </form>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            {result ? (
              <div className="surface-card">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-6">
                  <div>
                    <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-teal-600">
                      <Radar size={16} />
                      Tracking Result
                    </p>
                    <h2 className="mt-4 font-display text-4xl text-slate-950">{result.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      Author: {result.author} | Tracking ID: {result.trackingId}
                    </p>
                  </div>
                  <div className="rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
                    {formatStatus(result.status)}
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Submitted</p>
                    <p className="mt-2 text-slate-800">{formatDate(result.createdAt)}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Last Updated</p>
                    <p className="mt-2 text-slate-800">{formatDate(result.statusUpdatedAt || result.updatedAt)}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Registration Readiness</p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">
                        {formatPaymentStatus(result.registration?.paymentStatus)}
                      </p>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                        {result.registration?.message || 'Registration state is unavailable for this submission.'}
                      </p>
                    </div>
                    {!result.registration?.isVerified ? (
                      <Link to="/registration" className="button-primary">
                        Complete Registration
                      </Link>
                    ) : null}
                  </div>
                </div>

                <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Committee Note</p>
                  <p className="mt-3 leading-8 text-slate-700">
                    {result.reviewNote || 'No additional note has been shared yet. Please check again later.'}
                  </p>
                </div>

                <div className="mt-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Review Timeline</p>
                  <div className="mt-4 space-y-4">
                    {(result.history || []).length ? (
                      result.history
                        .slice()
                        .reverse()
                        .map((item, index) => (
                          <div key={`${item.status}-${item.changedAt}-${index}`} className="flex gap-4 rounded-2xl bg-white px-5 py-4 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
                            <div className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-900 text-sm font-semibold text-white">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">{formatStatus(item.status)}</p>
                              <p className="mt-1 text-sm text-slate-500">{formatDate(item.changedAt)}</p>
                              <p className="mt-2 text-sm leading-7 text-slate-600">
                                {item.note || 'Status updated without a public note.'}
                              </p>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="rounded-2xl bg-slate-50 px-5 py-4 text-sm text-slate-500">
                        Timeline updates will appear here once the review team changes the submission status.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="surface-card">
                <div className="grid min-h-[420px] place-items-center text-center">
                  <div className="max-w-md">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal-50 text-teal-600">
                      <SearchCheck size={24} />
                    </div>
                    <h2 className="mt-6 font-display text-4xl text-slate-950">Ready to look up a submission</h2>
                    <p className="mt-4 text-sm leading-8 text-slate-600">
                      Enter a valid tracking ID and the author email to view the live progress of a paper submission.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default TrackPaperPage
