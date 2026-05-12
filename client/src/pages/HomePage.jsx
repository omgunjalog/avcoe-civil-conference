import { ArrowRight, ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import SectionFrame from '../components/SectionFrame'
import SurfaceCard from '../components/SurfaceCard'
import { aboutCards, externalForms, heroMetrics, siteMeta } from '../data/conferenceData'

function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute inset-0 hidden overflow-hidden lg:block">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/media/avcoe-campus-hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 hero-grid-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/30 via-navy-950/38 to-navy-950/60" />
        <div className="floating-orb absolute -left-24 top-28 h-72 w-72 rounded-full bg-teal-300/18 blur-3xl" />
        <div className="floating-orb-delayed absolute right-0 top-12 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute inset-x-[10%] top-20 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-[20%] top-36 h-44 rounded-full bg-teal-300/8 blur-3xl" />

        <div className="content-grid relative min-h-[calc(100vh-72px)] py-20 sm:py-24 lg:py-32">
          <Reveal>
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
              <span className="section-kicker">{siteMeta.theme}</span>

              <h1 className="mt-8 font-display text-6xl leading-[0.84] tracking-[-0.04em] text-white sm:text-7xl lg:text-[7.6rem]">
                {siteMeta.conferenceName}
              </h1>

              <p className="mt-6 max-w-4xl text-lg font-semibold tracking-[0.08em] uppercase text-teal-200 sm:text-2xl">
                {siteMeta.subtitle}
              </p>

              <p className="mt-7 max-w-3xl text-base italic text-slate-300/82 sm:text-lg">{siteMeta.tagline}.</p>

              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-100">
                <div className="glass-panel inline-flex items-center gap-2 px-5 py-3">
                  <CalendarDays size={16} className="text-teal-200" />
                  {siteMeta.date}
                </div>
                <div className="glass-panel inline-flex items-center gap-2 px-5 py-3">
                  <MapPin size={16} className="text-teal-200" />
                  {siteMeta.venue}
                </div>
              </div>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <a href={externalForms.abstractSubmission} target="_blank" rel="noreferrer" className="button-accent w-full sm:w-auto">
                  Submit Abstract <ArrowRight size={16} />
                </a>
                <a href={externalForms.authorRegistration} target="_blank" rel="noreferrer" className="button-primary w-full sm:w-auto">
                  Register Now <ArrowUpRight size={16} />
                </a>
                <Link to="/themes-schedule" className="button-secondary w-full sm:w-auto">
                  View Themes
                </Link>
              </div>

              <div className="mt-10 max-w-3xl rounded-[28px] border border-white/12 bg-white/6 p-4 text-sm leading-7 text-slate-200/78 backdrop-blur-xl sm:p-5 sm:leading-8">
                SRES-26 brings together researchers, faculty, industry delegates, and engineering students for focused discussion on sustainability, resilience, and integrated engineering systems.
              </div>

              <div className="mt-16 w-full max-w-5xl sm:mt-[4.5rem] lg:mt-20">
                <div className="hero-mesh-card floating-panel text-white sm:p-6">
                  <div className="pointer-events-none absolute inset-0 hero-grid-overlay opacity-35" />
                  <div className="pointer-events-none absolute right-6 top-6 h-28 w-28 rounded-full bg-teal-300/14 blur-3xl" />
                  <div className="relative">
                    <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                      <p className="text-center text-xs uppercase tracking-[0.28em] text-teal-200/90">Conference Snapshot</p>
                      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {heroMetrics.map((item) => (
                          <div key={item.label} className="stat-tile text-center">
                            <p className="font-display text-4xl text-white">{item.value}</p>
                            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-300/72">{item.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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
          <SectionFrame variant="light" className="mt-10">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal>
                <SurfaceCard variant="dark" className="h-full">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">Research Platform</p>
                  <h3 className="mt-5 font-display text-4xl text-white">Built for interdisciplinary infrastructure thinking.</h3>
                  <p className="mt-5 text-base leading-8 text-slate-200/76">
                    The SRES identity brings civil systems, renewable energy, structural resilience, and intelligent engineering into one coordinated research platform.
                  </p>
                  <div className="mt-8 space-y-4">
                    <div className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-4 text-sm text-slate-200/76">
                      Structural systems and resilient infrastructure
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-4 text-sm text-slate-200/76">
                      Sustainable materials and energy-aware engineering
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-4 text-sm text-slate-200/76">
                      Smart sensing, automation, and integrated system design
                    </div>
                  </div>
                </SurfaceCard>
              </Reveal>
              <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {aboutCards.map((card, index) => (
                  <Reveal key={card.title} delay={index * 0.08}>
                    <SurfaceCard as="article" variant="light" className="h-full p-7">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-500">{card.title}</p>
                      <p className="mt-6 text-lg leading-9 text-slate-600">{card.text}</p>
                    </SurfaceCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </SectionFrame>
        </div>
      </section>

      <section className="pb-8">
        <div className="content-grid">
          <Reveal>
            <div className="relative overflow-hidden rounded-[36px] bg-radial-premium px-6 py-10 text-white shadow-[0_28px_80px_rgba(10,25,47,0.28)] sm:px-8 sm:py-12 lg:flex lg:items-center lg:justify-between lg:px-12">
              <div className="pointer-events-none absolute inset-0 hero-grid-overlay opacity-25" />
              <div className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-teal-300/14 blur-3xl" />
              <div className="pointer-events-none absolute left-1/3 top-0 h-px w-40 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="relative z-10 max-w-3xl">
                <span className="section-kicker border-white/10 bg-white/8 text-teal-200">Opportunity</span>
                <h2 className="mt-6 font-display text-3xl leading-[0.98] sm:text-5xl lg:text-6xl">Don&apos;t Miss This Opportunity</h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300/78">
                  Present your research, connect with domain experts, and position your work for meaningful academic and industry visibility.
                </p>
              </div>
              <a
                href={externalForms.abstractSubmission}
                target="_blank"
                rel="noreferrer"
                className="button-primary relative z-10 mt-8 w-full justify-center sm:w-auto lg:mt-0"
              >
                Submit Abstract <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default HomePage
