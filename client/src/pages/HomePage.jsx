import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import SectionFrame from '../components/SectionFrame'
import SurfaceCard from '../components/SurfaceCard'
import { aboutCards, heroMetrics, siteMeta } from '../data/conferenceData'

function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute inset-0 hero-grid-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-navy-950/30 to-navy-950/70" />
        <div className="floating-orb absolute -left-24 top-28 h-72 w-72 rounded-full bg-teal-300/18 blur-3xl" />
        <div className="floating-orb-delayed absolute right-0 top-12 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute inset-x-[10%] top-20 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="content-grid relative grid min-h-[calc(100vh-72px)] items-center py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <Reveal>
            <div className="max-w-3xl">
              <span className="section-kicker">September 2026 Conference</span>
              <h1 className="mt-6 font-display text-5xl leading-[0.88] tracking-[-0.03em] text-white sm:text-7xl lg:text-[7rem]">
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
            <motion.div
              className="hero-mesh-card mt-10 text-white sm:p-6 lg:mt-0"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="pointer-events-none absolute inset-0 hero-grid-overlay opacity-35" />
              <div className="pointer-events-none absolute right-6 top-6 h-28 w-28 rounded-full bg-teal-300/14 blur-3xl" />
              <div className="glow-divider absolute left-10 right-10 top-24" />
              <span className="grid-node left-10 top-20" />
              <span className="grid-node left-[42%] top-20" />
              <span className="grid-node right-10 top-20" />
              <div className="relative">
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

              <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 to-white/4 p-5">
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
                <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0c2030]/75 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-300/72">Systems Network</p>
                  <svg viewBox="0 0 320 220" className="mt-4 h-[210px] w-full text-white/80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M38 171L94 118L148 139L208 72L282 101" stroke="url(#networkStroke)" strokeWidth="2.5" />
                    <path d="M38 57L96 89L148 55L208 118L282 152" stroke="rgba(122,216,255,0.45)" strokeWidth="2" strokeDasharray="8 8" />
                    <path d="M95 118L96 89M148 139L148 55M208 72L208 118M282 101L282 152" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
                    <circle cx="38" cy="171" r="7" fill="#38d39f" />
                    <circle cx="94" cy="118" r="7" fill="#7ad8ff" />
                    <circle cx="148" cy="139" r="7" fill="#38d39f" />
                    <circle cx="208" cy="72" r="7" fill="#7ad8ff" />
                    <circle cx="282" cy="101" r="7" fill="#38d39f" />
                    <circle cx="38" cy="57" r="6" fill="#f4b860" />
                    <circle cx="96" cy="89" r="6" fill="#7ad8ff" />
                    <circle cx="148" cy="55" r="6" fill="#f4b860" />
                    <circle cx="208" cy="118" r="6" fill="#38d39f" />
                    <circle cx="282" cy="152" r="6" fill="#7ad8ff" />
                    <defs>
                      <linearGradient id="networkStroke" x1="38" y1="171" x2="282" y2="101" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#38d39f" />
                        <stop offset="0.5" stopColor="#7ad8ff" />
                        <stop offset="1" stopColor="#f4b860" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              </div>
            </motion.div>
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
                <h2 className="mt-6 font-display text-3xl leading-[0.98] sm:text-5xl lg:text-6xl">Don't Miss This Opportunity</h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300/78">
                  Present your research, connect with domain experts, and position your work for meaningful academic and industry visibility.
                </p>
              </div>
              <Link to="/submit-paper" className="button-primary relative z-10 mt-8 w-full justify-center sm:w-auto lg:mt-0">
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
