import { ArrowUpRight, ExternalLink } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import SectionFrame from '../components/SectionFrame'
import SurfaceCard from '../components/SurfaceCard'
import { externalForms, paymentInfo, submissionGuidelines, submissionProcess } from '../data/conferenceData'

function SubmitPaperPage() {
  return (
    <section className="section-space pt-10">
      <div className="content-grid space-y-8">
        <Reveal>
          <div className="glass-panel page-hero-band relative overflow-hidden px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="pointer-events-none absolute inset-0 hero-grid-overlay opacity-40" />
            <div className="pointer-events-none absolute -left-12 top-8 h-28 w-28 rounded-full bg-teal-300/14 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-cyan-300/12 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
              <div className="max-w-3xl">
                <SectionHeader
                  kicker="Submit Paper"
                  title="Submit your abstract through the official submission form."
                  description="Prepare the abstract according to the submission guidelines, then continue with the client-provided submission form instead of the old website portal."
                  light
                />
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={externalForms.abstractSubmission} target="_blank" rel="noreferrer" className="button-secondary">
                    Open Submission Form <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/12 bg-white/8 p-5 shadow-[0_24px_70px_rgba(3,10,20,0.18)] backdrop-blur-xl sm:p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-teal-200/85">Submission Link</p>
                <h3 className="mt-4 font-display text-3xl leading-[0.98] text-white sm:text-4xl">
                  Open the abstract submission form.
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-200/78">
                  The conference team has moved abstract collection to the official submission form. Please use the submission link shared by the client for all new submissions.
                </p>
                <div className="mt-6 rounded-[24px] border border-white/12 bg-white/8 p-5">
                  <div className="inline-flex rounded-2xl bg-white/12 p-3 text-teal-100">
                    <ExternalLink size={22} />
                  </div>
                  <p className="mt-5 text-sm uppercase tracking-[0.18em] text-teal-100/90">Official Submission Form</p>
                  <p className="mt-4 text-sm leading-7 text-slate-200/78">
                    Submit the author details and abstract in the submission form. The old website upload form and tracking workflow are no longer the primary submission route.
                  </p>
                  <a href={externalForms.abstractSubmission} target="_blank" rel="noreferrer" className="button-primary mt-6 w-full sm:w-auto">
                    Open Abstract Submission <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <SurfaceCard variant="dark" className="space-y-8">
              <div>
                <h3 className="font-display text-3xl text-white">Submission Guidelines</h3>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-200/78">
                  {submissionGuidelines.map((item) => (
                    <li key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 backdrop-blur-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-3xl text-white">Submission Process</h3>
                <div className="mt-5 space-y-3">
                  {submissionProcess.map((item, index) => (
                    <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-white/6 px-4 py-4 backdrop-blur-sm">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#38d39f,#7ad8ff)] text-sm font-semibold text-navy-950">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-7 text-slate-200/78">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SurfaceCard>
          </Reveal>

          <Reveal delay={0.08}>
            <SectionFrame variant="light">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                <div>
                  <h3 className="font-display text-2xl text-slate-950 sm:text-3xl">Payment Info</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                    Complete the payment after reviewing the submission guidelines, then keep the transaction details ready for author registration and any follow-up requested by the organizers.
                  </p>
                  <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 px-4 py-3">Bank: {paymentInfo.bank}</div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-3">Account Name: {paymentInfo.accountName}</div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-3">Account Number: {paymentInfo.accountNumber}</div>
                    {paymentInfo.ifsc ? <div className="rounded-2xl bg-slate-50 px-4 py-3">IFSC: {paymentInfo.ifsc}</div> : null}
                    {paymentInfo.branch ? <div className="rounded-2xl bg-slate-50 px-4 py-3 sm:col-span-2">Branch: {paymentInfo.branch}</div> : null}
                    <div className="rounded-2xl bg-slate-50 px-4 py-3 sm:col-span-2">{paymentInfo.acceptedModes}</div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-3 sm:col-span-2">{paymentInfo.note}</div>
                  </div>
                </div>

                {paymentInfo.qrCodePath ? (
                  <div className="rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Scan To Pay</p>
                    <img
                      src={paymentInfo.qrCodePath}
                      alt="Conference payment QR"
                      className="mt-4 h-40 w-40 rounded-3xl border border-slate-200 bg-white p-3 sm:h-48 sm:w-48"
                      width="192"
                      height="192"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <div className="rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-5 text-sm leading-7 text-slate-600">
                    QR-based payment information is not currently listed. Please use the bank details and accepted online payment modes shown here.
                  </div>
                )}
              </div>
            </SectionFrame>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default SubmitPaperPage
