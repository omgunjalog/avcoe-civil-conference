import { Link } from 'react-router-dom'
import PaperSubmissionForm from '../components/PaperSubmissionForm'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import { paymentInfo, submissionGuidelines, submissionProcess } from '../data/conferenceData'

function SubmitPaperPage() {
  return (
    <section className="section-space pt-10">
      <div className="content-grid space-y-8">
        <PageHero
          kicker="Submit Paper"
          title="A structured submission experience for serious academic contributors."
          description="Submit your manuscript first, then complete verified registration before final publication or presentation readiness. The workflow mirrors a real conference review cycle."
        >
          <div className="flex flex-wrap gap-3">
            <Link to="/track-paper" className="button-secondary">
              Track Existing Submission
            </Link>
          </div>
        </PageHero>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="surface-card space-y-8">
              <div>
                <h3 className="font-display text-3xl text-slate-950">Submission Guidelines</h3>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                  {submissionGuidelines.map((item) => (
                    <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-3xl text-slate-950">Submission Process</h3>
                <div className="mt-5 space-y-3">
                  {submissionProcess.map((item, index) => (
                    <div key={item} className="flex gap-4 rounded-2xl bg-slate-50 px-4 py-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-900 text-sm font-semibold text-white">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-7 text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-8">
              <SectionHeader
                kicker="Upload CTA"
                title="Upload your manuscript."
                description="PDF metadata, tracking ID, review status, and registration-readiness checks are stored by the backend for both admin review and author-facing progress updates."
              />
              <div className="mt-6">
                <PaperSubmissionForm />
              </div>

              <div className="surface-card">
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                  <div>
                    <h3 className="font-display text-3xl text-slate-950">Payment Info</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                      Complete the payment after reviewing the manuscript guidelines, then keep the transaction details ready for registration and later verification.
                    </p>
                    <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">Bank: {paymentInfo.bank}</div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">Account Name: {paymentInfo.accountName}</div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">Account Number: {paymentInfo.accountNumber}</div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">IFSC: {paymentInfo.ifsc}</div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3 sm:col-span-2">Branch: {paymentInfo.branch}</div>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Scan To Pay</p>
                    <img
                      src={paymentInfo.qrCodePath || '/uploads-demo/qr-placeholder.svg'}
                      alt="Conference payment QR"
                      className="mt-4 h-48 w-48 rounded-3xl border border-slate-200 bg-white p-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default SubmitPaperPage
