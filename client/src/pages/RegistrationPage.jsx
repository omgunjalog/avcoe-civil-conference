import { CalendarClock, Check, CreditCard, TimerReset } from 'lucide-react'
import { useState } from 'react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import RegistrationForm from '../components/RegistrationForm'
import SectionHeader from '../components/SectionHeader'
import { paymentInfo, registrationPlans, registrationProcess } from '../data/conferenceData'

const segmentButtonClass = (isActive) =>
  `inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
    isActive
      ? 'bg-[linear-gradient(135deg,#0ea5b6,#41d3bd)] text-white shadow-[0_18px_40px_rgba(14,165,182,0.24)]'
      : 'text-slate-500 hover:text-slate-900'
  }`

function RegistrationPage() {
  const [pricingMode, setPricingMode] = useState('regular')
  const pricingState = registrationPlans[pricingMode]

  return (
    <section className="section-space pt-10">
      <div className="content-grid">
        <PageHero
          kicker="Registration Details"
          title="Flexible conference registration shaped around timing, participation, and delegate type."
          description="Papers can be submitted first, but verified registration is still required before final publication and presentation readiness. Choose your pricing window before completing payment and verification."
        >
          <div className="mx-auto max-w-xl rounded-[32px] border border-white/12 bg-white/8 p-2 shadow-[0_24px_70px_rgba(5,14,26,0.2)] backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className={segmentButtonClass(pricingMode === 'earlyBird')} onClick={() => setPricingMode('earlyBird')}>
                <TimerReset size={16} />
                Early Bird
              </button>
              <button type="button" className={segmentButtonClass(pricingMode === 'regular')} onClick={() => setPricingMode('regular')}>
                <CalendarClock size={16} />
                Regular
              </button>
            </div>
          </div>
        </PageHero>

        <Reveal>
          <div className="mt-14 surface-card overflow-hidden">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="section-kicker border-teal-200/80 bg-teal-50 text-teal-700">{pricingState.badge}</span>
                <h2 className="mt-5 font-display text-3xl text-slate-950 sm:text-4xl">{pricingState.label} Registration</h2>
                <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-600 sm:text-[1.02rem]">
                  {pricingState.note}
                </p>
              </div>

              <div className="rounded-[26px] border border-slate-200 bg-slate-50/90 px-5 py-5 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Verification policy</p>
                <p className="mt-3 leading-7">
                  Every registration requires payment proof upload and admin verification. This keeps paper publication readiness and attendee confirmation aligned.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pricingState.plans.map((item, index) => (
            <Reveal key={`${pricingMode}-${item.category}`} delay={index * 0.08}>
              <article className={`surface-card h-full border-t-4 ${item.accent}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex rounded-2xl bg-teal-50 p-3 text-teal-600">
                    <CreditCard size={22} />
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {item.tag}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl text-slate-950 sm:text-3xl">{item.category}</h3>
                <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{item.price}</p>
                <div className="mt-6 space-y-3">
                  {item.features.map((feature) => (
                    <div key={feature} className="flex gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                      <Check size={16} className="mt-0.5 shrink-0 text-teal-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <a href="#registration-form" className="button-primary mt-6 w-full">
                  Register
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="space-y-8">
              <div className="surface-card">
                <h3 className="font-display text-3xl text-slate-950">Registration Process</h3>
                <div className="mt-6 space-y-4">
                  {registrationProcess.map((step, index) => (
                    <div key={step} className="flex gap-4 rounded-2xl bg-slate-50 px-4 py-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-900 text-sm font-semibold text-white">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-7 text-slate-600">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="surface-card">
                <h3 className="font-display text-3xl text-slate-950">Payment Details</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Share the transaction reference and upload payment proof in the form. This makes admin verification faster and reduces follow-up with authors.
                </p>
                <div className="mt-6 grid gap-3 text-sm text-slate-600">
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">Bank: {paymentInfo.bank}</div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">Account Name: {paymentInfo.accountName}</div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">Account Number: {paymentInfo.accountNumber}</div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">IFSC: {paymentInfo.ifsc}</div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">Branch: {paymentInfo.branch}</div>
                </div>
                <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Scan To Pay</p>
                  <img
                    src={paymentInfo.qrCodePath}
                    alt="Conference payment QR"
                    className="mt-4 h-40 w-40 rounded-3xl border border-slate-200 bg-white p-3 sm:h-48 sm:w-48"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div id="registration-form">
              <SectionHeader
                kicker="Registration Form"
                title="Confirm your participation."
                description="This form connects directly to the conference API and requires a payment reference plus proof upload for admin verification."
              />
              <div className="mt-6">
                <RegistrationForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default RegistrationPage
