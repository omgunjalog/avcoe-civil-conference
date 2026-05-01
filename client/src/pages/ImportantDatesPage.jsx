import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import SectionFrame from '../components/SectionFrame'
import SurfaceCard from '../components/SurfaceCard'
import { importantDates, siteMeta } from '../data/conferenceData'

function ImportantDatesPage() {
  return (
    <section className="section-space pt-10">
      <div className="content-grid">
        <Reveal>
          <SurfaceCard variant="glass" className="page-hero-band engineering-panel overflow-hidden px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <p className="section-kicker border-white/10 bg-white/8 text-teal-200">Conference Timeline</p>
            <h1 className="mt-6 max-w-5xl font-display text-4xl leading-[0.98] sm:text-6xl">
              Important milestones leading to {siteMeta.conferenceName} at AVCOE, Sangamner.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200/82">
              The abstract deadline, acceptance notification, final registration and full-length paper deadline, and the conference date in September 2026 are listed here for quick reference.
            </p>
          </SurfaceCard>
        </Reveal>

        <SectionFrame variant="light" className="mt-12">
          <Reveal>
            <SectionHeader
              kicker="Important Dates"
              title="Keep your submission and registration timeline on track."
              description="The calendar below marks the critical milestones for authors, presenters, and attendees."
            />
          </Reveal>

          <div className="relative mt-10 space-y-6 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-emerald-400/70 before:via-cyan-300/50 before:to-transparent sm:before:left-1/2">
            {importantDates.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.08}>
                <div className="relative sm:grid sm:grid-cols-2">
                  <div className={index % 2 === 0 ? 'hidden sm:block' : 'hidden sm:block sm:order-2'} />
                  <div className={`surface-card relative ml-10 p-5 sm:ml-0 sm:p-6 ${index % 2 === 0 ? '' : 'sm:order-1'}`}>
                    <span
                      className={`absolute top-8 grid h-8 w-8 place-items-center rounded-full bg-teal-300 text-sm font-semibold text-navy-950 ${
                        index % 2 === 0
                          ? '-left-10 sm:left-auto sm:right-[calc(100%+1.8rem)]'
                          : '-left-10 sm:-right-10'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <p className="text-sm uppercase tracking-[0.18em] text-teal-600">{item.date}</p>
                    <h3 className="mt-3 font-display text-2xl text-slate-950 sm:text-3xl">{item.label}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </SectionFrame>
      </div>
    </section>
  )
}

export default ImportantDatesPage
