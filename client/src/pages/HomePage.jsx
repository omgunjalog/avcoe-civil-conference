import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import { aboutCards, heroMetrics, siteMeta } from '../data/conferenceData'

function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute inset-0 bg-[url('/uploads-demo/hero-grid.svg')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-navy-950/30 to-navy-950/70" />
        <div className="absolute -left-24 top-28 h-72 w-72 rounded-full bg-teal-300/18 blur-3xl" />
        <div className="absolute right-0 top-12 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="content-grid relative grid min-h-[calc(100vh-72px)] items-center py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <Reveal>
            <div className="max-w-3xl">
              <span className="section-kicker">September 2026 Conference</span>
              <h1 className="mt-6 font-display text-5xl leading-[0.9] text-white sm:text-7xl lg:text-[7rem]">
                {siteMeta.conferenceName}
              </h1>
              <p className="mt-5 text-base font-semibold tracking-[0.16em] uppercase text-teal-200 sm:text-xl">
                {siteMeta.subtitle}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200/86 sm:mt-7 sm:text-[1.18rem] sm:leading-9">{siteMeta.theme}</p>
              <p className="mt-4 max-w-2xl text-base italic text-slate-300/82 sm:mt-5 sm:text-lg">{siteMeta.tagline}</p>

              <div className="mt-9 flex flex-wrap gap-4 text-sm text-slate-100">
                <div className="glass-panel inline-flex items-center gap-2 px-5 py-3">
                  <CalendarDays size={16} className="text-teal-200" />
                  {siteMeta.date}
                </div>
                <div className="glass-panel inline-flex items-center gap-2 px-5 py-3">
                  <MapPin size={16} className="text-teal-200" />
                  {siteMeta.venue}
                </div>
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link to="/registration" className="button-primary w-full sm:w-auto">
                  Register Now
                </Link>
                <Link to="/themes-schedule" className="button-secondary w-full sm:w-auto">
                  View Themes
                </Link>
              </div>

              <div className="mt-8 max-w-2xl rounded-[28px] border border-white/12 bg-white/6 p-4 text-sm leading-7 text-slate-200/78 backdrop-blur-xl sm:mt-10 sm:p-5 sm:leading-8">
                SRES-26 brings together researchers, faculty, industry delegates, and engineering students for focused discussion on sustainability, resilience, and integrated engineering systems.
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="glass-panel mt-10 overflow-hidden p-5 text-white sm:p-6 lg:mt-0">
              <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-teal-200/90">Conference Snapshot</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {heroMetrics.map((item) => (
                    <div key={item.label} className="stat-tile">
                      <p className="font-display text-4xl text-white">{item.value}</p>
                      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-300/72">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 to-white/4 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-300/72">Featured Experience</p>
                  <span className="rounded-full border border-teal-300/30 bg-teal-300/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-teal-200">
                    SRES-26
                  </span>
                </div>
                <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl">Sustainability meets resilience.</h2>
                <p className="mt-4 text-sm leading-8 text-slate-200/74">
                  The conference focuses on resilient infrastructure, renewable energy transitions, smart grids, intelligent sensing, sustainable construction, and interdisciplinary engineering solutions.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space">
        <div className="content-grid page-halo">
          <Reveal>
            <SectionHeader
              kicker="About SRES-26"
              title="A conference forum built around sustainable and resilient engineering systems."
              description={siteMeta.description}
            />
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {aboutCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.08}>
                <article className="surface-card h-full p-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-500">{card.title}</p>
                  <p className="mt-6 text-lg leading-9 text-slate-600">{card.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="content-grid">
          <Reveal>
            <div className="relative overflow-hidden rounded-[36px] bg-navy-900 px-6 py-10 text-white shadow-[0_28px_80px_rgba(10,25,47,0.28)] sm:px-8 sm:py-12 lg:flex lg:items-center lg:justify-between lg:px-12">
              <div className="absolute -right-16 top-0 h-48 w-48 rounded-full bg-teal-300/14 blur-3xl" />
              <div className="max-w-3xl">
                <span className="section-kicker border-white/10 bg-white/8 text-teal-200">Opportunity</span>
                <h2 className="mt-6 font-display text-3xl leading-[0.98] sm:text-5xl lg:text-6xl">Don't Miss This Opportunity</h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300/78">
                  Present your research, connect with domain experts, and position your work for meaningful academic and industry visibility.
                </p>
              </div>
              <Link to="/submit-paper" className="button-primary mt-8 w-full justify-center sm:w-auto lg:mt-0">
                Submit Paper <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default HomePage
